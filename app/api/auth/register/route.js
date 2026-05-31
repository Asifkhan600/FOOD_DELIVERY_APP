import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { query } from "@/lib/db";
import { signToken, setAuthCookie } from "@/lib/auth";

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      password,
      phone,
      role = "customer",
      // Restaurant-specific fields
      restaurant_name,
      address,
      city,
      opening_time,
      closing_time,
      delivery_fee,
      // Rider-specific fields
      vehicle_type,
      license_number,
    } = body;

    // Validate required base fields
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: "Name, email and password are required" },
        { status: 400 }
      );
    }

    // Validate role
    if (!["customer", "restaurant", "rider", "admin"].includes(role)) {
      return NextResponse.json(
        { success: false, error: "Invalid role" },
        { status: 400 }
      );
    }

    // Validate role-specific required fields
    if (role === "restaurant") {
      if (!restaurant_name || !address || !city || delivery_fee === undefined) {
        return NextResponse.json(
          {
            success: false,
            error: "Restaurant name, address, city, and delivery fee are required for restaurant role",
          },
          { status: 400 }
        );
      }
      if (!phone) {
        return NextResponse.json(
          { success: false, error: "Phone number is required for restaurant role" },
          { status: 400 }
        );
      }
    }

    if (role === "rider") {
      if (!vehicle_type || !license_number) {
        return NextResponse.json(
          { success: false, error: "Vehicle type and license number are required for rider role" },
          { status: 400 }
        );
      }
      if (!phone) {
        return NextResponse.json(
          { success: false, error: "Phone number is required for rider role" },
          { status: 400 }
        );
      }
    }

    // Check if email already exists in ANY role (prevent multi-role accounts)
    const existing = await query("SELECT user_id, role FROM users WHERE email = ?", [email]);
    if (existing.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: `This email is already registered as a ${existing[0].role}. You cannot create multiple accounts with the same email.`,
          existing_role: existing[0].role,
        },
        { status: 409 }
      );
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 12);

    // Insert user record
    const result = await query(
      "INSERT INTO users (full_name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)",
      [name, email, hashed, phone || null, role]
    );
    const userId = result.insertId;

    try {
      // Insert role-specific record based on role
      if (role === "customer") {
        await query("INSERT INTO customers (user_id) VALUES (?)", [userId]);
      } else if (role === "restaurant") {
        await query(
          `INSERT INTO restaurants 
           (user_id, restaurant_name, address, city, opening_time, closing_time, delivery_fee, status) 
           VALUES (?, ?, ?, ?, ?, ?, ?, 'open')`,
          [
            userId,
            restaurant_name,
            address,
            city,
            opening_time || null,
            closing_time || null,
            delivery_fee,
          ]
        );
      } else if (role === "rider") {
        await query(
          `INSERT INTO delivery_riders 
           (user_id, vehicle_type, license_number, availability) 
           VALUES (?, ?, ?, 1)`,
          [userId, vehicle_type, license_number]
        );
      } else if (role === "admin") {
        // Admin role for now just creates user record (no specific table)
        // Can be extended in future
      }
    } catch (roleErr) {
      // If role-specific insert fails, rollback user insert
      await query("DELETE FROM users WHERE user_id = ?", [userId]);
      throw roleErr;
    }

    // Generate token and set cookie
    const token = await signToken({ userId, email, role });
    await setAuthCookie(token);

    return NextResponse.json(
      {
        success: true,
        data: {
          user_id: userId,
          name,
          email,
          phone: phone || null,
          role,
          is_active: true,
        },
        message: `${role.charAt(0).toUpperCase() + role.slice(1)} account created successfully`,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Register error:", err);
    return NextResponse.json(
      { success: false, error: "Registration failed. Please try again." },
      { status: 500 }
    );
  }
}
