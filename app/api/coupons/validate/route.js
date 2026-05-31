import { NextResponse } from "next/server";
import { queryOne } from "@/lib/db";

export async function POST(request) {
  try {
    const { code, subtotal } = await request.json();
    if (!code) return NextResponse.json({ success: false, error: "Coupon code required" }, { status: 400 });

    const coupon = await queryOne(
      `SELECT * FROM coupons
       WHERE coupon_code = ? AND expiry_date >= CURDATE()`,
      [code.toUpperCase()]
    );

    if (!coupon) return NextResponse.json({ success: false, error: "Invalid or expired coupon", valid: false });

    // SART's coupon has no min_order_amount or usage limits. It's a simple percentage discount.
    const discount = Math.round((subtotal * coupon.discount_percentage) / 100);

    return NextResponse.json({
      success: true,
      valid: true,
      discount,
      coupon: { 
        code: coupon.coupon_code, 
        discount_type: "percentage", 
        discount_value: coupon.discount_percentage 
      },
      message: `${coupon.discount_percentage}% discount applied!`,
    });
  } catch (err) {
    console.error("Coupon validation error:", err);
    return NextResponse.json({ success: false, error: "Coupon validation failed" }, { status: 500 });
  }
}

