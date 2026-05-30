import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const ADMIN_PREFIX = "/admin";
const LOGIN_PATH = "/admin/login";
const COOKIE_NAME = "admin_token";

// Phải khớp với JWT_SECRET ở BE (.env)
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET ?? "vov-dev-secret");

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith(ADMIN_PREFIX)) return NextResponse.next();
  if (pathname === LOGIN_PATH) return NextResponse.next();

  const token = request.cookies.get(COOKIE_NAME)?.value;

  if (!token) return redirectToLogin(request);

  // Verify JWT — nếu hết hạn hoặc sai secret thì redirect login
  try {
    await jwtVerify(token, JWT_SECRET);
    return NextResponse.next();
  } catch {
    return redirectToLogin(request);
  }
}

function redirectToLogin(request: NextRequest) {
  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = LOGIN_PATH;
  loginUrl.searchParams.set("from", request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*"],
};
