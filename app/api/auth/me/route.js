import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { queryOne } from "@/lib/db";

export async function GET() {
  try {
    const payload = await getCurrentUser();
    if (!payload) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

    // Selecting full_name AS name to map directly to frontend structure
    const user = await queryOne(
      "SELECT user_id, full_name AS name, email, role, phone, created_at FROM users WHERE user_id = ?",
      [payload.userId]
    );
    if (!user) return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });

    // Inject is_active so frontend doesn't break
    user.is_active = true;

    return NextResponse.json({ success: true, data: user });
  } catch (err) {
    return NextResponse.json({ success: false, error: "Failed to fetch user" }, { status: 500 });
  }
}
