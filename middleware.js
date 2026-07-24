import { NextResponse } from "next/server";
import { verifySession } from "./lib/session";

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/assessment") ||
    pathname.startsWith("/home") ||
    pathname.startsWith("/training")
  ) {
    const token = req.cookies.get("session")?.value;
    const payload = await verifySession(token);
    if (!payload || !payload.email) {
      const loginUrl = new URL("/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = req.cookies.get("admin_session")?.value;
    const payload = await verifySession(token);
    if (!payload || !payload.admin) {
      const loginUrl = new URL("/admin/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/assessment/:path*", "/home/:path*", "/training/:path*", "/admin/:path*"],
};
