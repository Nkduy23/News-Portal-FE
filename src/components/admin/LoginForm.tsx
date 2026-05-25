"use client";

import { useActionState } from "react";
import { loginAction } from "@/lib/admin-auth";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";

const initialState = { error: undefined };

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);
  const [showPass, setShowPass] = useState(false);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 400,
        margin: "0 16px",
      }}
    >
      {/* Logo */}
      <div style={{ textAlign: "center", marginBottom: 36 }}>
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 14,
            background: "var(--admin-accent)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
          }}
        >
          <span style={{ color: "#fff", fontSize: 22, fontWeight: 800 }}>V</span>
        </div>
        <h1
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: "var(--admin-text)",
            margin: "0 0 6px",
          }}
        >
          VOV Admin
        </h1>
        <p style={{ fontSize: 13, color: "var(--admin-text-muted)", margin: 0 }}>Trang quản trị nội bộ · Xuân Bình Ngọ 2026</p>
      </div>

      {/* Card */}
      <div className="admin-card" style={{ padding: "28px 28px 24px" }}>
        <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {/* Error */}
          {state?.error && (
            <div
              style={{
                background: "var(--admin-red-dim)",
                border: "1px solid rgba(239,68,68,0.25)",
                borderRadius: 8,
                padding: "10px 14px",
                fontSize: 13,
                color: "var(--admin-red)",
              }}
            >
              {state.error}
            </div>
          )}

          {/* Email */}
          <div>
            <label className="admin-label" htmlFor="email">
              Email
            </label>
            <div style={{ position: "relative" }}>
              <Mail
                size={15}
                style={{
                  position: "absolute",
                  left: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--admin-text-muted)",
                  pointerEvents: "none",
                }}
              />
              <input id="email" name="email" type="email" autoComplete="email" required placeholder="admin@vov.vn" className="admin-input" style={{ paddingLeft: 36 }} />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="admin-label" htmlFor="password">
              Mật khẩu
            </label>
            <div style={{ position: "relative" }}>
              <Lock
                size={15}
                style={{
                  position: "absolute",
                  left: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--admin-text-muted)",
                  pointerEvents: "none",
                }}
              />
              <input
                id="password"
                name="password"
                type={showPass ? "text" : "password"}
                autoComplete="current-password"
                required
                placeholder="••••••••"
                className="admin-input"
                style={{ paddingLeft: 36, paddingRight: 40 }}
              />
              <button
                type="button"
                onClick={() => setShowPass((v) => !v)}
                style={{
                  position: "absolute",
                  right: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--admin-text-muted)",
                  display: "flex",
                }}
                tabIndex={-1}
              >
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={pending}
            className="admin-btn-primary"
            style={{
              width: "100%",
              justifyContent: "center",
              padding: "11px 16px",
              fontSize: 14,
              opacity: pending ? 0.7 : 1,
              cursor: pending ? "not-allowed" : "pointer",
            }}
          >
            {pending ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>
      </div>

      <p style={{ textAlign: "center", fontSize: 11, color: "var(--admin-text-muted)", marginTop: 20 }}>Chỉ dành cho nhân viên VOV nội bộ</p>
    </div>
  );
}
