"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Article } from "@/types/article";
import { Category } from "@/types/category";
import { Check, ChevronLeft, Star } from "lucide-react";

interface Props {
  article: Article | null;
  categories: Category[];
  isNew: boolean;
}

function slugify(title: string) {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export default function ArticleFormClient({ article, categories, isNew }: Props) {
  const router = useRouter();

  const [form, setForm] = useState<Partial<Article>>(
    article ?? {
      title: "",
      slug: "",
      categorySlug: categories[0]?.slug ?? "",
      category: categories[0]?.name ?? "",
      articleType: "",
      author: "",
      excerpt: "",
      thumbnail: "",
      status: "draft",
      isFeatured: false,
      publishedAt: new Date().toISOString().slice(0, 16),
      tags: [],
    },
  );

  const [tagsInput, setTagsInput] = useState((article?.tags ?? []).join(", "));
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const set = <K extends keyof Article>(k: K, v: Article[K]) => setForm((f) => ({ ...f, [k]: v }));

  const handleTitleChange = (v: string) => {
    set("title", v);
    if (isNew) set("slug", slugify(v));
  };

  const handleCategoryChange = (slug: string) => {
    const cat = categories.find((c) => c.slug === slug);
    set("categorySlug", slug);
    set("category", cat?.name ?? slug);
  };

  const handleSave = async () => {
    setSaving(true);
    // TODO: replace with real API call
    await new Promise((r) => setTimeout(r, 600));
    setSaving(false);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      router.push("/admin/articles");
    }, 800);
  };

  return (
    <div>
      {/* Top bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 24,
          gap: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={() => router.back()}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 32,
              height: 32,
              borderRadius: 7,
              border: "none",
              background: "var(--admin-surface)",
              cursor: "pointer",
              color: "var(--admin-text-muted)",
            }}
          >
            <ChevronLeft size={18} />
          </button>
          <h1 style={{ fontSize: 18, fontWeight: 700, color: "var(--admin-text)", margin: 0 }}>{isNew ? "Tạo bài viết mới" : "Sửa bài viết"}</h1>
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <button className="admin-btn-ghost" onClick={() => router.back()}>
            Huỷ
          </button>
          <button className="admin-btn-primary" onClick={handleSave} disabled={saving || saved} style={{ opacity: saving ? 0.75 : 1 }}>
            <Check size={14} />
            {saved ? "Đã lưu!" : saving ? "Đang lưu..." : isNew ? "Tạo bài viết" : "Lưu thay đổi"}
          </button>
        </div>
      </div>

      {/* Body */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 20, alignItems: "start" }}>
        {/* Main content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Title + slug */}
          <div className="admin-card">
            <div>
              <label className="admin-label">Tiêu đề</label>
              <input
                className="admin-input"
                style={{ fontSize: 15, fontWeight: 500 }}
                value={form.title ?? ""}
                placeholder="Nhập tiêu đề bài viết..."
                onChange={(e) => handleTitleChange(e.target.value)}
              />
            </div>
            <div style={{ marginTop: 14 }}>
              <label className="admin-label">Slug URL</label>
              <input className="admin-input" value={form.slug ?? ""} placeholder="tieu-de-bai-viet" onChange={(e) => set("slug", e.target.value)} />
              <p style={{ fontSize: 11, color: "var(--admin-text-muted)", marginTop: 5 }}>
                URL: /article/<strong style={{ color: "var(--admin-text-sub)" }}>{form.slug || "slug-bai-viet"}</strong>
              </p>
            </div>
          </div>

          {/* Excerpt */}
          <div className="admin-card">
            <label className="admin-label">Tóm tắt (excerpt)</label>
            <textarea
              className="admin-input"
              style={{ minHeight: 90, resize: "vertical" }}
              value={form.excerpt ?? ""}
              placeholder="Mô tả ngắn hiển thị ở trang chủ và danh sách bài viết..."
              onChange={(e) => set("excerpt", e.target.value)}
            />
          </div>

          {/* Thumbnail */}
          <div className="admin-card">
            <label className="admin-label">Ảnh thumbnail (URL)</label>
            <input className="admin-input" value={form.thumbnail ?? ""} placeholder="https://..." onChange={(e) => set("thumbnail", e.target.value)} />
            {form.thumbnail && (
              <div style={{ marginTop: 12 }}>
                <img
                  src={form.thumbnail}
                  alt="preview"
                  style={{
                    height: 140,
                    borderRadius: 8,
                    objectFit: "cover",
                    border: "1px solid var(--admin-border)",
                  }}
                />
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="admin-card">
            <label className="admin-label">Tags (phân cách bằng dấu phẩy)</label>
            <input
              className="admin-input"
              value={tagsInput}
              placeholder="tết, văn hoá, hà nội"
              onChange={(e) => {
                setTagsInput(e.target.value);
                set(
                  "tags",
                  e.target.value
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean),
                );
              }}
            />
            {(form.tags ?? []).length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
                {(form.tags ?? []).map((tag) => (
                  <span key={tag} className="admin-badge" style={{ background: "var(--admin-surface-hover)", color: "var(--admin-text-sub)", fontSize: 11 }}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar meta */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {/* Publish settings */}
          <div className="admin-card">
            <div style={{ marginBottom: 14 }}>
              <label className="admin-label">Trạng thái</label>
              <select className="admin-input" value={form.status} onChange={(e) => set("status", e.target.value as Article["status"])}>
                <option value="draft">Bản nháp</option>
                <option value="published">Xuất bản</option>
              </select>
            </div>
            <div style={{ marginBottom: 14 }}>
              <label className="admin-label">Ngày xuất bản</label>
              <input type="datetime-local" className="admin-input" value={(form.publishedAt ?? "").slice(0, 16)} onChange={(e) => set("publishedAt", e.target.value)} />
            </div>
            <div>
              <label className="admin-label">Tác giả</label>
              <input className="admin-input" value={form.author ?? ""} placeholder="Tên tác giả" onChange={(e) => set("author", e.target.value)} />
            </div>
          </div>

          {/* Category + type */}
          <div className="admin-card">
            <div style={{ marginBottom: 14 }}>
              <label className="admin-label">Chuyên mục</label>
              <select className="admin-input" value={form.categorySlug} onChange={(e) => handleCategoryChange(e.target.value)}>
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="admin-label">Loại bài</label>
              <input className="admin-input" value={form.articleType ?? ""} placeholder="Văn hoá, Thể thao, Kinh tế..." onChange={(e) => set("articleType", e.target.value)} />
            </div>
          </div>

          {/* Featured */}
          <div className="admin-card">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                  <Star size={14} color="#3B82F6" fill={form.isFeatured ? "#3B82F6" : "none"} />
                  <span style={{ fontSize: 13, fontWeight: 600, color: "var(--admin-text)" }}>Hero / Featured</span>
                </div>
                <p style={{ fontSize: 11, color: "var(--admin-text-muted)", margin: 0 }}>Hiển thị ở khu vực hero trang chủ</p>
              </div>
              <button
                type="button"
                onClick={() => set("isFeatured", !form.isFeatured)}
                style={{
                  width: 40,
                  height: 22,
                  borderRadius: 11,
                  border: "none",
                  cursor: "pointer",
                  transition: "background 0.2s",
                  background: form.isFeatured ? "#3B82F6" : "var(--admin-border)",
                  position: "relative",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: 3,
                    left: form.isFeatured ? 21 : 3,
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    background: "#fff",
                    transition: "left 0.2s",
                  }}
                />
              </button>
            </div>
            {form.isFeatured && <p style={{ fontSize: 11, color: "#3B82F6", marginTop: 8 }}>✓ Bài này sẽ hiển thị trong Hero Section</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
