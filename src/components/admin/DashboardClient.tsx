"use client";

import { useState, useMemo } from "react";
import { Article } from "@/types/article";
import { Category } from "@/types/category";
import { FileText, Eye, Edit3, Star, TrendingUp } from "lucide-react";
import Link from "next/link";

interface Props {
  stats: { total: number; published: number; draft: number; featured: number };
  categoryStats: (Category & { count: number })[];
  recentArticles: Article[];
  allArticles: Article[];
}

const DATE_RANGES = [
  { label: "7 ngày", days: 7 },
  { label: "30 ngày", days: 30 },
  { label: "Tất cả", days: 0 },
] as const;

function StatCard({ label, value, sub, color, icon: Icon }: { label: string; value: number; sub?: string; color: string; icon: React.ElementType }) {
  return (
    <div className="admin-card" style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
      <div
        style={{
          width: 42,
          height: 42,
          borderRadius: 10,
          flexShrink: 0,
          background: `${color}22`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon size={20} color={color} />
      </div>
      <div>
        <div style={{ fontSize: 28, fontWeight: 700, color: "var(--admin-text)", lineHeight: 1 }}>{value}</div>
        <div style={{ fontSize: 13, color: "var(--admin-text-muted)", marginTop: 4 }}>{label}</div>
        {sub && <div style={{ fontSize: 11, color, marginTop: 3 }}>{sub}</div>}
      </div>
    </div>
  );
}

export default function DashboardClient({ stats, categoryStats, recentArticles, allArticles }: Props) {
  const [range, setRange] = useState<0 | 7 | 30>(7);
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const catMap = Object.fromEntries(categoryStats.map((c) => [c.slug, c]));

  const filtered = useMemo(() => {
    const now = Date.now();
    return recentArticles.filter((a) => {
      const withinRange = range === 0 || now - new Date(a.publishedAt).getTime() <= range * 86400_000;
      const matchStatus = statusFilter === "all" || a.status === statusFilter;
      return withinRange && matchStatus;
    });
  }, [recentArticles, range, statusFilter]);

  const maxCat = Math.max(...categoryStats.map((c) => c.count), 1);

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--admin-text)", margin: "0 0 4px" }}>Dashboard</h1>
        <p style={{ fontSize: 13, color: "var(--admin-text-muted)", margin: 0 }}>Tổng quan nội dung · Xuân Bình Ngọ 2026</p>
      </div>

      {/* Stat cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 14,
          marginBottom: 28,
        }}
      >
        <StatCard label="Tổng bài viết" value={stats.total} color="#E8435A" icon={FileText} sub={`+${stats.draft} bản nháp`} />
        <StatCard label="Đã xuất bản" value={stats.published} color="#10B981" icon={Eye} sub="Đang hiển thị" />
        <StatCard label="Bản nháp" value={stats.draft} color="#F59E0B" icon={Edit3} sub="Chờ duyệt" />
        <StatCard label="Hero / Featured" value={stats.featured} color="#3B82F6" icon={Star} sub="Hiển thị trang chủ" />
      </div>

      {/* Main grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 16 }}>
        {/* Recent articles */}
        <div className="admin-card" style={{ padding: 0, overflow: "hidden" }}>
          {/* Toolbar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "14px 18px 12px",
              borderBottom: "1px solid var(--admin-border)",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <span style={{ fontSize: 14, fontWeight: 600, color: "var(--admin-text)" }}>Bài viết gần đây</span>

            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              {/* Date range */}
              <div style={{ display: "flex", gap: 4 }}>
                {DATE_RANGES.map(({ label, days }) => (
                  <button
                    key={days}
                    onClick={() => setRange(days as 0 | 7 | 30)}
                    style={{
                      padding: "4px 10px",
                      borderRadius: 5,
                      border: "none",
                      fontSize: 11,
                      fontWeight: 500,
                      cursor: "pointer",
                      background: range === days ? "var(--admin-accent)" : "var(--admin-surface-hover)",
                      color: range === days ? "#fff" : "var(--admin-text-muted)",
                      transition: "all 0.15s",
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Status filter */}
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)} className="admin-input" style={{ width: "auto", padding: "4px 8px", fontSize: 11 }}>
                <option value="all">Tất cả</option>
                <option value="published">Đã xuất bản</option>
                <option value="draft">Bản nháp</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["Bài viết", "Chuyên mục", "Ngày", "Trạng thái"].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "8px 16px",
                      textAlign: "left",
                      fontSize: 10,
                      fontWeight: 600,
                      color: "var(--admin-text-muted)",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      borderBottom: "1px solid var(--admin-border)",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((a, i) => (
                <tr
                  key={a.id}
                  style={{
                    borderBottom: "1px solid var(--admin-border)",
                    background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)",
                  }}
                >
                  <td style={{ padding: "9px 16px", maxWidth: 220 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      {a.thumbnail && <img src={a.thumbnail} alt="" style={{ width: 40, height: 28, borderRadius: 4, objectFit: "cover", flexShrink: 0 }} />}
                      <div style={{ minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: 12,
                            fontWeight: 500,
                            color: "var(--admin-text)",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {a.title}
                        </div>
                        {a.isFeatured && <span style={{ fontSize: 10, color: "#3B82F6" }}>★ Featured</span>}
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "9px 16px", whiteSpace: "nowrap" }}>
                    <span className="admin-badge" style={{ fontSize: 10, color: catMap[a.categorySlug]?.color ?? "#E8435A", background: `${catMap[a.categorySlug]?.color ?? "#E8435A"}22` }}>
                      {a.categoryName ?? a.categorySlug}
                    </span>
                  </td>
                  <td style={{ padding: "9px 16px", fontSize: 11, color: "var(--admin-text-muted)", whiteSpace: "nowrap" }}>{new Date(a.publishedAt).toLocaleDateString("vi-VN")}</td>
                  <td style={{ padding: "9px 16px" }}>
                    <span className={`admin-badge ${a.status === "published" ? "admin-badge-green" : "admin-badge-amber"}`}>{a.status === "published" ? "Live" : "Draft"}</span>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ padding: "32px 16px", textAlign: "center", color: "var(--admin-text-muted)", fontSize: 13 }}>
                    Không có bài viết nào trong khoảng thời gian này
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div style={{ padding: "10px 16px", borderTop: "1px solid var(--admin-border)", textAlign: "right" }}>
            <Link href="/admin/articles" style={{ fontSize: 12, color: "var(--admin-accent)", textDecoration: "none" }}>
              Xem tất cả bài viết →
            </Link>
          </div>
        </div>

        {/* Category breakdown */}
        <div className="admin-card">
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
            <TrendingUp size={16} color="var(--admin-text-muted)" />
            <span style={{ fontSize: 14, fontWeight: 600, color: "var(--admin-text)" }}>Phân bổ chuyên mục</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[...categoryStats]
              .sort((a, b) => b.count - a.count)
              .map((c) => (
                <div key={c.id}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 4,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          background: c.color,
                          flexShrink: 0,
                        }}
                      />
                      <span style={{ fontSize: 12, color: "var(--admin-text-sub)" }}>{c.name}</span>
                    </div>
                    <span style={{ fontSize: 12, color: "var(--admin-text-muted)", fontWeight: 600 }}>{c.count}</span>
                  </div>
                  <div
                    style={{
                      height: 4,
                      borderRadius: 2,
                      background: "var(--admin-border)",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        borderRadius: 2,
                        background: c.color,
                        width: `${(c.count / maxCat) * 100}%`,
                        transition: "width 0.5s ease",
                      }}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
