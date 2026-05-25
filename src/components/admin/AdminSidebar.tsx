"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, FolderOpen, Image, Star, Settings, ChevronRight, ChevronLeft, LogOut, ChevronDown } from "lucide-react";
import { categories } from "@/data/mock-data";
import { logoutAction } from "@/lib/admin-auth";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  {
    id: "articles",
    label: "Bài viết",
    href: "/admin/articles",
    icon: FileText,
    children: categories.map((c) => ({
      label: c.name,
      href: `/admin/articles?category=${c.slug}`,
      color: c.color,
    })),
  },
  { id: "categories", label: "Chuyên mục", href: "/admin/categories", icon: FolderOpen },
  { id: "media", label: "Thư viện Media", href: "/admin/media", icon: Image },
  { id: "hero", label: "Hero / Featured", href: "/admin/hero", icon: Star },
  { id: "settings", label: "Cài đặt", href: "/admin/settings", icon: Settings },
];

interface Props {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
}

export default function AdminSidebar({ collapsed, setCollapsed }: Props) {
  const pathname = usePathname();
  const [articlesOpen, setArticlesOpen] = useState(true);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "?") || pathname.startsWith(href + "/");

  return (
    <aside
      style={{
        width: collapsed ? 56 : 240,
        minWidth: collapsed ? 56 : 240,
        background: "var(--admin-sidebar)",
        borderRight: "1px solid var(--admin-border)",
        display: "flex",
        flexDirection: "column",
        transition: "width 0.2s ease, min-width 0.2s ease",
        overflow: "hidden",
        position: "relative",
        zIndex: 10,
      }}
    >
      {/* ── Logo row ─────────────────────────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "14px 10px 12px",
          borderBottom: "1px solid var(--admin-border)",
          flexShrink: 0,
          minHeight: 56,
          position: "relative",
        }}
      >
        {/* Logo mark — always visible */}
        <Link
          href="/admin/dashboard"
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: "#E8435A",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            textDecoration: "none",
          }}
          title="VOV Admin"
        >
          <span style={{ color: "#fff", fontSize: 14, fontWeight: 800, lineHeight: 1 }}>V</span>
        </Link>

        {/* Label — only when expanded */}
        {!collapsed && (
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--admin-text)", lineHeight: 1 }}>VOV Admin</div>
            <div style={{ fontSize: 10, color: "var(--admin-text-muted)", marginTop: 2 }}>Xuân Bình Ngọ 2026</div>
          </div>
        )}

        {/* Toggle button — always visible, right-aligned */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? "Mở sidebar" : "Thu sidebar"}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 28,
            height: 28,
            borderRadius: 6,
            border: "none",
            background: "transparent",
            cursor: "pointer",
            color: "var(--admin-text-muted)",
            flexShrink: 0,
            // When collapsed push it to fill available space naturally
            marginLeft: collapsed ? "auto" : undefined,
          }}
        >
          {collapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
        </button>
      </div>

      {/* ── Nav ──────────────────────────────────────────────────────────── */}
      <nav style={{ flex: 1, overflowY: "auto", overflowX: "hidden", padding: "8px 0" }}>
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;

          return (
            <div key={item.id}>
              {/* Main nav item */}
              {item.children ? (
                /* Articles — toggle accordion, not a link */
                <button
                  onClick={() => {
                    if (collapsed) setCollapsed(false);
                    setArticlesOpen((o) => !o);
                  }}
                  title={collapsed ? item.label : undefined}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: collapsed ? "9px 0" : "9px 12px",
                    justifyContent: collapsed ? "center" : "flex-start",
                    background: active ? "var(--admin-accent-dim)" : "transparent",
                    border: "none",
                    borderLeft: active ? "2px solid var(--admin-accent)" : "2px solid transparent",
                    cursor: "pointer",
                    color: active ? "var(--admin-accent)" : "var(--admin-text-sub)",
                    fontSize: 13,
                    fontWeight: active ? 600 : 400,
                    transition: "all 0.15s",
                    textAlign: "left",
                  }}
                >
                  <Icon size={16} style={{ flexShrink: 0 }} />
                  {!collapsed && (
                    <>
                      <span style={{ flex: 1 }}>{item.label}</span>
                      <ChevronDown
                        size={13}
                        style={{
                          transform: articlesOpen ? "rotate(180deg)" : "rotate(0deg)",
                          transition: "transform 0.2s",
                          flexShrink: 0,
                        }}
                      />
                    </>
                  )}
                </button>
              ) : (
                <Link
                  href={item.href}
                  title={collapsed ? item.label : undefined}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: collapsed ? "9px 0" : "9px 12px",
                    justifyContent: collapsed ? "center" : "flex-start",
                    background: active ? "var(--admin-accent-dim)" : "transparent",
                    borderLeft: active ? "2px solid var(--admin-accent)" : "2px solid transparent",
                    color: active ? "var(--admin-accent)" : "var(--admin-text-sub)",
                    fontSize: 13,
                    fontWeight: active ? 600 : 400,
                    textDecoration: "none",
                    transition: "all 0.15s",
                  }}
                >
                  <Icon size={16} style={{ flexShrink: 0 }} />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              )}

              {/* Sub-items (categories) */}
              {!collapsed && item.children && articlesOpen && (
                <div style={{ background: "rgba(0,0,0,0.15)" }}>
                  {item.children.map((child) => {
                    const childActive = pathname.includes(child.href.split("?")[1] ?? "__none__");
                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          padding: "6px 12px 6px 36px",
                          background: childActive ? "var(--admin-accent-dim)" : "transparent",
                          borderLeft: childActive ? "2px solid var(--admin-accent)" : "2px solid transparent",
                          color: childActive ? "var(--admin-accent)" : "var(--admin-text-muted)",
                          fontSize: 12,
                          textDecoration: "none",
                          transition: "all 0.12s",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                        }}
                      >
                        <span
                          style={{
                            width: 7,
                            height: 7,
                            borderRadius: "50%",
                            background: child.color,
                            flexShrink: 0,
                          }}
                        />
                        <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{child.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* ── Footer / User ────────────────────────────────────────────────── */}
      <div
        style={{
          padding: collapsed ? "12px 0" : "12px 14px",
          borderTop: "1px solid var(--admin-border)",
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          gap: 8,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              background: "var(--admin-accent-dim)",
              border: "1px solid var(--admin-accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <span style={{ fontSize: 11, color: "var(--admin-accent)", fontWeight: 700 }}>AD</span>
          </div>
          {!collapsed && (
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--admin-text)" }}>Admin</div>
              <div style={{ fontSize: 10, color: "var(--admin-text-muted)", overflow: "hidden", textOverflow: "ellipsis" }}>admin@vov.vn</div>
            </div>
          )}
        </div>
        {!collapsed && (
          <form action={logoutAction}>
            <button
              type="submit"
              title="Đăng xuất"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 28,
                height: 28,
                borderRadius: 6,
                border: "none",
                background: "transparent",
                cursor: "pointer",
                color: "var(--admin-text-muted)",
              }}
            >
              <LogOut size={14} />
            </button>
          </form>
        )}
      </div>
    </aside>
  );
}
