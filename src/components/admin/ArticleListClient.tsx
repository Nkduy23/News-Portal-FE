"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Article } from "@/types/article";
import { Category } from "@/types/category";
import { Search, Plus, Edit2, Trash2, Star } from "lucide-react";
import { api } from "@/services/api";

interface Props {
  articles: Article[];
  categories: Category[];
  activeCategorySlug?: string;
  activeCategoryName?: string;
  token: string;
}

export default function ArticleListClient({ articles, categories, activeCategorySlug, activeCategoryName, token }: Props) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"all" | "published" | "draft">("all");
  const [catFilter, setCat] = useState(activeCategorySlug ?? "all");
  const [deleted, setDeleted] = useState<Set<string>>(new Set());
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    setCat(activeCategorySlug ?? "all");
  }, [activeCategorySlug]);

  const catMap = useMemo(() => Object.fromEntries(categories.map((c) => [c.slug, c])), [categories]);

  const filtered = useMemo(
    () =>
      articles.filter((a) => {
        if (deleted.has(a.id)) return false;
        if (catFilter !== "all" && a.categorySlug !== catFilter) return false;
        if (status !== "all" && a.status !== status) return false;
        const q = search.toLowerCase();
        if (q && !a.title.toLowerCase().includes(q) && !(a.author ?? "").toLowerCase().includes(q)) return false;
        return true;
      }),
    [articles, deleted, catFilter, status, search],
  );

  const handleDelete = async (id: string) => {
    if (!confirm("Xoá bài viết này?")) return;
    setDeleting(id);
    try {
      await api.articles.remove(id, token);
      setDeleted((s) => new Set([...s, id]));
    } catch {
      alert("Xoá thất bại, vui lòng thử lại.");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "var(--admin-text)", margin: "0 0 2px" }}>{activeCategoryName ?? "Tất cả bài viết"}</h1>
          <span style={{ fontSize: 13, color: "var(--admin-text-muted)" }}>{filtered.length} bài viết</span>
        </div>
        <Link href="/admin/articles/new" className="admin-btn-primary">
          <Plus size={14} />
          Tạo bài mới
        </Link>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 180 }}>
          <Search size={14} style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: "var(--admin-text-muted)", pointerEvents: "none" }} />
          <input className="admin-input" style={{ paddingLeft: 32 }} placeholder="Tìm theo tiêu đề, tác giả..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <select className="admin-input" style={{ width: "auto", minWidth: 160 }} value={catFilter} onChange={(e) => setCat(e.target.value)}>
          <option value="all">Tất cả chuyên mục</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.nameVi ?? c.name}
            </option>
          ))}
        </select>
        <select className="admin-input" style={{ width: "auto" }} value={status} onChange={(e) => setStatus(e.target.value as typeof status)}>
          <option value="all">Tất cả trạng thái</option>
          <option value="published">Đã xuất bản</option>
          <option value="draft">Bản nháp</option>
        </select>
      </div>

      {/* Table */}
      <div className="admin-card" style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--admin-border)" }}>
              {["Bài viết", "Chuyên mục", "Loại", "Tác giả", "Ngày", "Trạng thái", ""].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "10px 16px",
                    textAlign: "left",
                    fontSize: 10,
                    fontWeight: 600,
                    color: "var(--admin-text-muted)",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((a, i) => {
              const cat = catMap[a.categorySlug];
              const isDeleting = deleting === a.id;
              return (
                <tr
                  key={a.id}
                  style={{
                    borderBottom: "1px solid var(--admin-border)",
                    background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)",
                    opacity: isDeleting ? 0.5 : 1,
                    transition: "opacity 0.2s",
                  }}
                >
                  {/* Title */}
                  <td style={{ padding: "10px 16px", maxWidth: 260 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      {a.thumbnail && <img src={a.thumbnail} alt="" style={{ width: 44, height: 32, borderRadius: 5, objectFit: "cover", flexShrink: 0 }} />}
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 12, fontWeight: 500, color: "var(--admin-text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.title}</div>
                        {a.isFeatured && (
                          <div style={{ display: "flex", alignItems: "center", gap: 3, marginTop: 2 }}>
                            <Star size={10} color="#3B82F6" fill="#3B82F6" />
                            <span style={{ fontSize: 10, color: "#3B82F6" }}>Featured</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  {/* Category */}
                  <td style={{ padding: "10px 16px", whiteSpace: "nowrap" }}>
                    <span className="admin-badge" style={{ color: cat?.color ?? "#E8435A", background: `${cat?.color ?? "#E8435A"}22`, fontSize: 11 }}>
                      {cat?.nameVi ?? cat?.name ?? a.categorySlug}
                    </span>
                  </td>
                  {/* Type */}
                  <td style={{ padding: "10px 16px", fontSize: 12, color: "var(--admin-text-muted)", whiteSpace: "nowrap" }}>{a.articleType ?? "—"}</td>
                  {/* Author */}
                  <td style={{ padding: "10px 16px", fontSize: 12, color: "var(--admin-text-sub)", whiteSpace: "nowrap" }}>{a.author ?? "—"}</td>
                  {/* Date */}
                  <td style={{ padding: "10px 16px", fontSize: 11, color: "var(--admin-text-muted)", whiteSpace: "nowrap" }}>{new Date(a.publishedAt).toLocaleDateString("vi-VN")}</td>
                  {/* Status */}
                  <td style={{ padding: "10px 16px" }}>
                    <span className={`admin-badge ${a.status === "published" ? "admin-badge-green" : "admin-badge-amber"}`}>{a.status === "published" ? "Live" : "Draft"}</span>
                  </td>
                  {/* Actions */}
                  <td style={{ padding: "10px 16px" }}>
                    <div style={{ display: "flex", gap: 4 }}>
                      <Link
                        href={`/admin/articles/${a.id}`}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: 30,
                          height: 30,
                          borderRadius: 6,
                          color: "var(--admin-blue)",
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          textDecoration: "none",
                        }}
                        title="Sửa"
                      >
                        <Edit2 size={14} />
                      </Link>
                      <button
                        onClick={() => handleDelete(a.id)}
                        disabled={isDeleting}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: 30,
                          height: 30,
                          borderRadius: 6,
                          color: "var(--admin-red)",
                          background: "transparent",
                          border: "none",
                          cursor: isDeleting ? "not-allowed" : "pointer",
                        }}
                        title="Xoá"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}

            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} style={{ padding: "48px 16px", textAlign: "center", color: "var(--admin-text-muted)", fontSize: 13 }}>
                  Không tìm thấy bài viết nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
