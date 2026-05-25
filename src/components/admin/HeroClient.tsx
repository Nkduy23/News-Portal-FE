"use client";

import { useState } from "react";
import { Article } from "@/types/article";
import { Category } from "@/types/category";
import { Star, AlertCircle, X, Plus } from "lucide-react";

const MAX_FEATURED = 5;

interface Props {
  featuredArticles: Article[];
  allPublished: Article[];
  categories: Category[];
}

export default function HeroClient({ featuredArticles, allPublished, categories }: Props) {
  const [featured, setFeatured] = useState<Article[]>(featuredArticles);
  const [showPicker, setShowPicker] = useState(false);
  const [search, setSearch] = useState("");

  const catMap = Object.fromEntries(categories.map((c) => [c.slug, c]));

  const removeFeatured = (id: string) => setFeatured((prev) => prev.filter((a) => a.id !== id));

  const addFeatured = (article: Article) => {
    if (featured.some((a) => a.id === article.id)) return;
    if (featured.length >= MAX_FEATURED) return;
    setFeatured((prev) => [...prev, article]);
    setShowPicker(false);
    setSearch("");
  };

  const pickable = allPublished.filter((a) => !featured.some((f) => f.id === a.id) && (!search || a.title.toLowerCase().includes(search.toLowerCase())));

  return (
    <div style={{ maxWidth: 700 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20, gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "var(--admin-text)", margin: "0 0 4px" }}>Hero / Featured</h1>
          <p style={{ fontSize: 13, color: "var(--admin-text-muted)", margin: 0 }}>Bài nổi bật hiển thị ở Hero Section trang chủ. Tối đa {MAX_FEATURED} bài.</p>
        </div>
        <button className="admin-btn-primary" onClick={() => setShowPicker(true)} disabled={featured.length >= MAX_FEATURED} style={{ opacity: featured.length >= MAX_FEATURED ? 0.5 : 1 }}>
          <Plus size={14} />
          Thêm bài
        </button>
      </div>

      {/* Info banner */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 14px",
          borderRadius: 8,
          background: "var(--admin-amber-dim)",
          border: "1px solid rgba(245,158,11,0.2)",
          marginBottom: 20,
          fontSize: 13,
          color: "var(--admin-amber)",
        }}
      >
        <AlertCircle size={15} style={{ flexShrink: 0 }} />
        <span>
          {featured.length}/{MAX_FEATURED} bài đang được featured.
          {featured.length >= MAX_FEATURED && " Xoá bài khỏi danh sách trước khi thêm mới."}
        </span>
      </div>

      {/* Featured list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {featured.map((a, i) => {
          const cat = catMap[a.categorySlug];
          return (
            <div
              key={a.id}
              className="admin-card"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "12px 16px",
              }}
            >
              {/* Order number */}
              <span
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: "var(--admin-text-muted)",
                  width: 28,
                  textAlign: "center",
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </span>

              {/* Thumbnail */}
              <img src={a.thumbnail} alt="" style={{ width: 64, height: 44, borderRadius: 6, objectFit: "cover", flexShrink: 0 }} />

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: "var(--admin-text)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    marginBottom: 4,
                  }}
                >
                  {a.title}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span
                    className="admin-badge"
                    style={{
                      fontSize: 10,
                      color: cat?.color ?? "#E8435A",
                      background: `${cat?.color ?? "#E8435A"}22`,
                    }}
                  >
                    {cat?.name ?? a.categorySlug}
                  </span>
                  <span style={{ fontSize: 11, color: "var(--admin-text-muted)" }}>{new Date(a.publishedAt).toLocaleDateString("vi-VN")}</span>
                  <Star size={11} fill="#3B82F6" color="#3B82F6" />
                  <span style={{ fontSize: 10, color: "#3B82F6" }}>Featured</span>
                </div>
              </div>

              {/* Remove */}
              <button
                onClick={() => removeFeatured(a.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 30,
                  height: 30,
                  borderRadius: 6,
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  color: "var(--admin-red)",
                  flexShrink: 0,
                }}
                title="Bỏ featured"
              >
                <X size={15} />
              </button>
            </div>
          );
        })}

        {featured.length === 0 && (
          <div
            className="admin-card"
            style={{
              textAlign: "center",
              padding: "48px 24px",
              color: "var(--admin-text-muted)",
              fontSize: 13,
            }}
          >
            Chưa có bài nào được featured. Nhấn "Thêm bài" để bắt đầu.
          </div>
        )}
      </div>

      {/* Article picker modal */}
      {showPicker && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowPicker(false);
              setSearch("");
            }
          }}
        >
          <div className="admin-card" style={{ width: 520, maxHeight: "70vh", display: "flex", flexDirection: "column", padding: "20px 0" }} onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: "0 20px 14px", borderBottom: "1px solid var(--admin-border)" }}>
              <h2 style={{ fontSize: 15, fontWeight: 700, color: "var(--admin-text)", margin: "0 0 12px" }}>Chọn bài viết để featured</h2>
              <input className="admin-input" placeholder="Tìm kiếm bài viết..." value={search} onChange={(e) => setSearch(e.target.value)} autoFocus />
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: "8px 0" }}>
              {pickable.slice(0, 20).map((a) => {
                const cat = catMap[a.categorySlug];
                return (
                  <button
                    key={a.id}
                    onClick={() => addFeatured(a)}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "10px 20px",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "background 0.12s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "var(--admin-surface-hover)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <img src={a.thumbnail} alt="" style={{ width: 48, height: 34, borderRadius: 5, objectFit: "cover", flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, color: "var(--admin-text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.title}</div>
                      <span className="admin-badge" style={{ fontSize: 10, marginTop: 3, color: cat?.color ?? "#E8435A", background: `${cat?.color ?? "#E8435A"}22` }}>
                        {cat?.name}
                      </span>
                    </div>
                  </button>
                );
              })}
              {pickable.length === 0 && <div style={{ padding: "32px 20px", textAlign: "center", color: "var(--admin-text-muted)", fontSize: 13 }}>Không tìm thấy bài viết phù hợp</div>}
            </div>

            <div style={{ padding: "12px 20px 0", borderTop: "1px solid var(--admin-border)" }}>
              <button
                className="admin-btn-ghost"
                onClick={() => {
                  setShowPicker(false);
                  setSearch("");
                }}
                style={{ width: "100%", justifyContent: "center" }}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
