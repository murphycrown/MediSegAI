
import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions, SessionData } from "@/lib/session";
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ⛔️ iron-session default cookie name
  const sessionCookie =
    req.cookies.get("medisegai_session") ||
    req.cookies.get("medisegai_session.sig");

  const isLoggedIn = !!sessionCookie;

  // 🔁 Root redirect
  if (pathname === "/") {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/main", req.url));
    }
    //return NextResponse.redirect(new URL("/login", req.url));
  }

  // 🔐 Protect /main
  if (pathname.startsWith("/main") && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 🚫 Prevent logged-in users from seeing /login
  if (pathname === "/login" && isLoggedIn) {
    return NextResponse.redirect(new URL("/main", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/main/:path*", "/", "/login"],
};
