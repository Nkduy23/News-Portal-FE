import { NextRequest, NextResponse } from "next/server";

const ADMIN_PREFIX = "/admin";
const LOGIN_PATH = "/admin/login";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only guard /admin routes
  if (!pathname.startsWith(ADMIN_PREFIX)) return NextResponse.next();

  // Login page is always accessible
  if (pathname === LOGIN_PATH) return NextResponse.next();

  const token = request.cookies.get("admin_token")?.value;

  if (!token) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = LOGIN_PATH;
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
