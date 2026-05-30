"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { api } from "@/services/api";

const COOKIE_NAME = "admin_token";
const COOKIE_MAX_AGE = 60 * 60 * 8; // 8 hours

// ─── Login ───────────────────────────────────────────────────────────────────
export async function loginAction(_prevState: { error?: string }, formData: FormData): Promise<{ error?: string }> {
  const email = formData.get("email")?.toString().trim() ?? "";
  const password = formData.get("password")?.toString() ?? "";

  if (!email || !password) {
    return { error: "Vui lòng nhập đầy đủ email và mật khẩu." };
  }

  try {
    const { access_token } = await api.auth.login(email, password);

    (await cookies()).set(COOKIE_NAME, access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: COOKIE_MAX_AGE,
      path: "/",
    });
  } catch {
    return { error: "Email hoặc mật khẩu không đúng." };
  }

  redirect("/admin/dashboard");
}

// ─── Logout ──────────────────────────────────────────────────────────────────
export async function logoutAction() {
  (await cookies()).delete(COOKIE_NAME);
  redirect("/admin/login");
}

// ─── Get token (dùng khi gọi admin API) ──────────────────────────────────────
export async function getAdminToken(): Promise<string | null> {
  return (await cookies()).get(COOKIE_NAME)?.value ?? null;
}
