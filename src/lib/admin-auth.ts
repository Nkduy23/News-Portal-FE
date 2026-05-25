"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// ─── Mock credentials ────────────────────────────────────────────────────────
// TODO: replace with real DB/API check before going to production
const ADMIN_CREDENTIALS = {
  email: "admin@vov.vn",
  password: "vov2026",
};

const TOKEN_VALUE = "vov-admin-mock-token";
const COOKIE_NAME = "admin_token";
const COOKIE_MAX_AGE = 60 * 60 * 8; // 8 hours

// ─── Login ───────────────────────────────────────────────────────────────────
export async function loginAction(_prevState: { error?: string }, formData: FormData): Promise<{ error?: string }> {
  const email = formData.get("email")?.toString().trim() ?? "";
  const password = formData.get("password")?.toString() ?? "";

  if (email !== ADMIN_CREDENTIALS.email || password !== ADMIN_CREDENTIALS.password) {
    return { error: "Email hoặc mật khẩu không đúng." };
  }

  (await cookies()).set(COOKIE_NAME, TOKEN_VALUE, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });

  redirect("/admin/dashboard");
}

// ─── Logout ──────────────────────────────────────────────────────────────────
export async function logoutAction() {
  (await cookies()).delete(COOKIE_NAME);
  redirect("/admin/login");
}
