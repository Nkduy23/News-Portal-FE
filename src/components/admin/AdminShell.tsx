"use client";

import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        background: "var(--admin-bg)",
        color: "var(--admin-text)",
        fontFamily: "var(--font-display), system-ui, sans-serif",
      }}
    >
      <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <main
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "28px 32px",
          minWidth: 0,
          background: "var(--admin-bg)",
        }}
      >
        {children}
      </main>
    </div>
  );
}
