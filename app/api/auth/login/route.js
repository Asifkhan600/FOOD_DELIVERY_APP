import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { query } from "@/lib/db";
import { signToken, setAuthCookie } from "@/lib/auth";

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json({ success: false, error: "Email and password required" }, { status: 400 });
    }

    // Query using SART's original table fields
    const users = await query("SELECT * FROM users WHERE email = ?", [email]);
    if (users.length === 0) {
      return NextResponse.json({ success: false, error: "Invalid email or password" }, { status: 401 });
    }

    const user = users[0];
    const valid = await bcrypt.compare(password, user.password); // password column instead of password_hash
    if (!valid) {
      return NextResponse.json({ success: false, error: "Invalid email or password" }, { status: 401 });
    }

    const token = await signToken({ userId: user.user_id, email: user.email, role: user.role });
    await setAuthCookie(token);

    return NextResponse.json({
      success: true,
      data: {
        user_id:    user.user_id,
        name:       user.full_name, // Mapping full_name to name for frontend compatibility
        email:      user.email,
        role:       user.role,
        phone:      user.phone,
        is_active:  true,
        created_at: user.created_at,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ success: false, error: "Login failed" }, { status: 500 });
  }
}
