import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search    = searchParams.get("search")    || "";
    const city      = searchParams.get("city")      || "";
    const minRating = searchParams.get("minRating") || "";
    const maxFee    = searchParams.get("maxFee")    || "";
    const isOpen    = searchParams.get("isOpen")    || "";
    const sortBy    = searchParams.get("sortBy")    || "rating";
    const page      = parseInt(searchParams.get("page")  || "1");
    const limit     = parseInt(searchParams.get("limit") || "12");
    const offset    = (page - 1) * limit;

    // Use aliases to map original DB columns (restaurant_name AS name, status = 'open' AS is_open) to the frontend expected schema
    let sql = `
      SELECT 
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
      WHERE 1=1
    `;
    const args = [];

    if (search) {
      sql += " AND restaurant_name LIKE ?";
      args.push(`%${search}%`);
    }
    if (city) {
      sql += " AND city = ?";
      args.push(city);
    }
    if (minRating) {
      sql += " AND rating >= ?";
      args.push(parseFloat(minRating));
    }
    if (maxFee) {
      sql += " AND delivery_fee <= ?";
      args.push(parseInt(maxFee));
    }
    if (isOpen === "true") {
      sql += " AND status = 'open'";
    }

    const orderMap = {
      rating: "rating DESC",
      delivery_fee: "delivery_fee ASC",
      delivery_time: "restaurant_id ASC", // placeholder since avg_delivery_time doesn't exist
      name: "restaurant_name ASC"
    };

    sql += ` ORDER BY ${orderMap[sortBy] || "rating DESC"} LIMIT ? OFFSET ?`;
    args.push(limit, offset);

    const restaurants = await query(sql, args);

    // Get total count
    const countSql = sql
      .replace(/SELECT[\s\S]*?FROM/, "SELECT COUNT(*) as total FROM")
      .replace(/ORDER BY[\s\S]*$/, "");
    const countArgs = args.slice(0, -2);
    const countRes = await query(countSql, countArgs);
    const total = countRes[0]?.total || 0;

    return NextResponse.json({
      success: true,
      data: restaurants,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (err) {
    console.error("Fetch restaurants error:", err);
    return NextResponse.json({ success: false, error: "Failed to fetch restaurants" }, { status: 500 });
  }
}
