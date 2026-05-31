import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { query, withTransaction, execute } from "@/lib/db";

export async function GET(request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const page   = parseInt(searchParams.get("page")  || "1");
    const limit  = parseInt(searchParams.get("limit") || "10");
    const offset = (page - 1) * limit;

    let orders;
    if (user.role === "admin") {
      orders = await query("SELECT * FROM orders ORDER BY order_date DESC LIMIT ? OFFSET ?", [limit, offset]);
    } else if (user.role === "customer") {
      const cust = await query("SELECT customer_id FROM customers WHERE user_id = ?", [user.userId]);
      if (!cust.length) return NextResponse.json({ success: true, data: [] });
      orders = await query("SELECT * FROM orders WHERE customer_id = ? ORDER BY order_date DESC LIMIT ? OFFSET ?", [cust[0].customer_id, limit, offset]);
    } else if (user.role === "restaurant") {
      const rest = await query("SELECT restaurant_id FROM restaurants WHERE user_id = ?", [user.userId]);
      if (!rest.length) return NextResponse.json({ success: true, data: [] });
      orders = await query("SELECT * FROM orders WHERE restaurant_id = ? ORDER BY order_date DESC LIMIT ? OFFSET ?", [rest[0].restaurant_id, limit, offset]);
    } else {
      orders = await query("SELECT * FROM orders WHERE rider_id = (SELECT rider_id FROM delivery_riders WHERE user_id = ?) ORDER BY order_date DESC LIMIT ? OFFSET ?", [user.userId, limit, offset]);
    }

    return NextResponse.json({ success: true, data: orders });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const user = await getCurrentUser();
    const body = await request.json();
    const { items, delivery_address, payment_method, subtotal, delivery_fee, tax_amount, total_amount, restaurantName, special_instructions } = body;

    if (!items || !items.length || !delivery_address) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    const result = await withTransaction(async (conn) => {
      // Get customer matching SART's customers/users schema
      let customerId = null;
      let customerName = "Guest";
      if (user) {
        const custs = await conn.execute(
          `SELECT c.customer_id, u.full_name AS customer_name 
           FROM customers c 
           JOIN users u ON c.user_id = u.user_id 
           WHERE c.user_id = ?`,
          [user.userId]
        );
        if (custs[0].length) {
          customerId = custs[0][0].customer_id;
          customerName = custs[0][0].customer_name;
        }
      }

      const restaurantId = items[0]?.restaurant_id || 1;

      // Insert order (SART's orders schema does not contain delivery_fee, tax_amount, etc.)
      const [orderRes] = await conn.execute(
        `INSERT INTO orders (customer_id, restaurant_id, customer_name, restaurant_name, delivery_address, total_amount, order_status, order_date)
         VALUES (?, ?, ?, ?, ?, ?, 'pending', NOW())`,
        [customerId, restaurantId, customerName, restaurantName || "", delivery_address, total_amount]
      );
      const orderId = orderRes.insertId;

      // Insert order items mapping frontend structures to food_id/food_name
      for (const item of items) {
        const foodId = item.food_id || item.item_id;
        const foodName = item.food_name || item.name;
        await conn.execute(
          "INSERT INTO order_items (order_id, food_id, food_name, quantity, price, subtotal) VALUES (?, ?, ?, ?, ?, ?)",
          [orderId, foodId, foodName, item.quantity, item.price, item.price * item.quantity]
        );
      }

      // Insert payment record matching SART's payments schema
      const mappedMethod = (payment_method === "cod" || payment_method === "cash") ? "cash" : (payment_method === "wallet" ? "wallet" : "card");
      await conn.execute(
        "INSERT INTO payments (order_id, payment_method, payment_status) VALUES (?, ?, 'pending')",
        [orderId, mappedMethod]
      );

      // Log transaction matching SART's transaction_logs schema
      await conn.execute(
        "INSERT INTO transaction_logs (transaction_type, status) VALUES (?, ?)",
        ["Place Order", "Success"]
      );

      // Clean customer cart items if registered
      if (customerId) {
        await conn.execute(
          `DELETE FROM cart_items 
           WHERE cart_id IN (
             SELECT cart_id 
             FROM cart 
             WHERE customer_id = ?
           )`,
          [customerId]
        );
      }

      return { order_id: orderId };
    });

    return NextResponse.json({ success: true, data: result, message: "Order placed successfully" }, { status: 201 });
  } catch (err) {
    console.error("Order error:", err);
    return NextResponse.json({ success: false, error: "Failed to place order" }, { status: 500 });
  }
}

