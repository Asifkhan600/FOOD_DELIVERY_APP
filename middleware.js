import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "change-this-secret-in-production-32chars"
);

const COOKIE_NAME = "sfd_token";

// Only hard-protect dashboard routes — profile/checkout handled client-side
const protectedRoutes = [
  { pattern: /^\/admin(\/.*)?$/,      roles: ["admin"] },
  { pattern: /^\/restaurant(\/.*)?$/, roles: ["restaurant", "admin"] },
  { pattern: /^\/rider(\/.*)?$/,      roles: ["rider", "admin"] },
  { pattern: /^\/api\/admin(\/.*)?$/, roles: ["admin"] },
];

const authRoutes = ["/login", "/signup", "/forgot-password", "/reset-password"];

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(COOKIE_NAME)?.value;

  // Redirect already-logged-in users away from auth pages
  if (authRoutes.some((r) => pathname.startsWith(r))) {
    if (token) {
      try {
        await jwtVerify(token, SECRET);
        return NextResponse.redirect(new URL("/", req.url));
      } catch { /* invalid token – let through */ }
    }
    return NextResponse.next();
  }

  const matched = protectedRoutes.find((r) => r.pattern.test(pathname));
  if (matched) {
    if (!token) {
      const url = new URL("/login", req.url);
      url.searchParams.set("from", pathname);
      return NextResponse.redirect(url);
    }
    try {
      const { payload } = await jwtVerify(token, SECRET);
      if (!matched.roles.includes(payload.role)) {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
      const headers = new Headers(req.headers);
      headers.set("x-user-id",    String(payload.userId));
      headers.set("x-user-role",  payload.role);
      headers.set("x-user-email", payload.email);
      return NextResponse.next({ request: { headers } });
    } catch {
      const url = new URL("/login", req.url);
      url.searchParams.set("from", pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images|icons|public).*)"],
};
