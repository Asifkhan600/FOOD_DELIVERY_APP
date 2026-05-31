import { NextResponse } from "next/server";
import { query, queryOne } from "@/lib/db";

export async function GET(request, { params }) {
  try {
    const { id } = params;

    // Retrieve restaurant details mapping original columns
    const restaurant = await queryOne(
      `SELECT 
        restaurant_id, 
        user_id, 
        restaurant_name AS name, 
        address, 
        city, 
        rating, 
        opening_time, 
        closing_time, 
        delivery_fee, 
        (status = 'open') AS is_open,
        30 AS avg_delivery_time
       FROM restaurants 
       WHERE restaurant_id = ?`,
      [id]
    );

    if (!restaurant) return NextResponse.json({ success: false, error: "Restaurant not found" }, { status: 404 });

    // Retrieve food items mapping SART's original table columns (food_name AS name, etc.)
    const items = await query(
      `SELECT 
        fi.food_id AS item_id, 
        fi.food_name AS name, 
        fi.description, 
        fi.price, 
        fi.image AS image_url, 
        fi.availability AS is_available, 
        fc.category_name
       FROM food_items fi
       LEFT JOIN food_categories fc ON fi.category_id = fc.category_id
       WHERE fi.restaurant_id = ?
       ORDER BY fc.category_name, fi.food_name`,
      [id]
    );

    // Group by category name
    const menuByCategory = items.reduce((acc, item) => {
      const cat = item.category_name || "Other";
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(item);
      return acc;
    }, {});

    // Retrieve reviews mapping users.full_name AS customer_name via customers table
    const reviews = await query(
      `SELECT r.*, u.full_name AS customer_name
       FROM reviews r
       LEFT JOIN customers c ON r.customer_id = c.customer_id
       LEFT JOIN users u ON c.user_id = u.user_id
       WHERE r.restaurant_id = ?
       ORDER BY r.created_at DESC LIMIT 10`,
      [id]
    );

    return NextResponse.json({ success: true, data: { restaurant, menuByCategory, reviews } });
  } catch (err) {
    console.error("Get restaurant error:", err);
    return NextResponse.json({ success: false, error: "Failed to fetch restaurant" }, { status: 500 });
  }
}
