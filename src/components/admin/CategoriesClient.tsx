"use client";

import { useState } from "react";
import { Category } from "@/types/category";
import { Plus, Edit2, Trash2, X, Check } from "lucide-react";
import Link from "next/link";

type CategoryWithCount = Category & { count: number };

const COLOR_PRESETS = ["#E8435A", "#F97316", "#10B981", "#8B5CF6", "#EC4899", "#F59E0B", "#06B6D4", "#EF4444", "#3B82F6", "#14B8A6", "#84CC16", "#A855F7"];

interface ModalProps {
  cat?: CategoryWithCount;
  onSave: (data: Omit<Category, "id">) => void;
  onClose: () => void;
}

function CategoryModal({ cat, onSave, onClose }: ModalProps) {
  const [form, setForm] = useState({
    name: cat?.name ?? "",
    nameVi: cat?.nameVi ?? "",
    slug: cat?.slug ?? "",
    color: cat?.color ?? COLOR_PRESETS[0],
  });

  const slugify = (s: string) =>
    s
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/[^a-z0-9\s]/g, "")
      .trim()
      .replace(/\s+/g, "-");

  return (
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
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="admin-card" style={{ width: 420, padding: "24px 28px" }} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "var(--admin-text)", margin: 0 }}>{cat ? "Sửa chuyên mục" : "Tạo chuyên mục mới"}</h2>
          <button
            onClick={onClose}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 28,
              height: 28,
              borderRadius: 6,
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "var(--admin-text-muted)",
            }}
          >
            <X size={16} />
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Name (Tiếng Việt) */}
          <div>
            <label className="admin-label">Tên chuyên mục (Tiếng Việt)</label>
            <input
              className="admin-input"
              value={form.nameVi}
              placeholder="Đất nước vào Xuân"
              onChange={(e) => {
                setForm((f) => ({
                  ...f,
                  nameVi: e.target.value,
                  name: e.target.value,
                  slug: cat ? f.slug : slugify(e.target.value),
                }));
              }}
            />
          </div>

          {/* Slug */}
          <div>
            <label className="admin-label">Slug</label>
            <input className="admin-input" value={form.slug} placeholder="dat-nuoc-vao-xuan" onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} />
            <p style={{ fontSize: 11, color: "var(--admin-text-muted)", marginTop: 4 }}>
              URL: /category/<strong style={{ color: "var(--admin-text-sub)" }}>{form.slug || "slug"}</strong>
            </p>
          </div>

          {/* Color */}
          <div>
            <label className="admin-label">Màu đại diện</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
              {COLOR_PRESETS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, color: c }))}
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: c,
                    border: "none",
                    cursor: "pointer",
                    boxShadow: form.color === c ? `0 0 0 3px rgba(255,255,255,0.3), 0 0 0 2px ${c}` : "none",
                    transition: "box-shadow 0.15s",
                  }}
                />
              ))}
            </div>
            {/* Custom color */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <input
                type="color"
                value={form.color}
                onChange={(e) => setForm((f) => ({ ...f, color: e.target.value }))}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  border: "1px solid var(--admin-border)",
                  background: "none",
                  cursor: "pointer",
                  padding: 2,
                }}
              />
              <input className="admin-input" value={form.color} onChange={(e) => setForm((f) => ({ ...f, color: e.target.value }))} style={{ flex: 1 }} placeholder="#E8435A" />
            </div>
          </div>

          {/* Preview */}
          <div
            style={{
              padding: "10px 14px",
              borderRadius: 8,
              background: `${form.color}15`,
              border: `1px solid ${form.color}40`,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: form.color, flexShrink: 0 }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: "var(--admin-text)" }}>{form.nameVi || "Tên chuyên mục"}</span>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 8, marginTop: 22, justifyContent: "flex-end" }}>
          <button className="admin-btn-ghost" onClick={onClose}>
            Huỷ
          </button>
          <button
            className="admin-btn-primary"
            onClick={() => {
              if (!form.nameVi.trim() || !form.slug.trim()) return;
              onSave({ name: form.nameVi, nameVi: form.nameVi, slug: form.slug, color: form.color });
              onClose();
            }}
          >
            <Check size={14} />
            {cat ? "Lưu" : "Tạo chuyên mục"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export default function CategoriesClient({ initialCategories }: { initialCategories: CategoryWithCount[] }) {
  const [cats, setCats] = useState(initialCategories);
  const [modal, setModal] = useState<"create" | CategoryWithCount | null>(null);
  const [deleting, setDel] = useState<string | null>(null);

  const handleSave = (data: Omit<Category, "id">, editCat?: CategoryWithCount) => {
    if (editCat) {
      setCats((prev) => prev.map((c) => (c.id === editCat.id ? { ...c, ...data } : c)));
    } else {
      const newCat: CategoryWithCount = {
        id: `cat-${Date.now()}`,
        count: 0,
        ...data,
      };
      setCats((prev) => [...prev, newCat]);
    }
  };

  const handleDelete = (id: string) => {
    const cat = cats.find((c) => c.id === id);
    if (!cat) return;
    if (cat.count > 0) {
      alert(`Chuyên mục "${cat.name}" còn ${cat.count} bài viết. Hãy chuyển bài trước khi xoá.`);
      return;
    }
    if (confirm(`Xoá chuyên mục "${cat.name}"?`)) {
      setCats((prev) => prev.filter((c) => c.id !== id));
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "var(--admin-text)", margin: "0 0 2px" }}>Chuyên mục</h1>
          <span style={{ fontSize: 13, color: "var(--admin-text-muted)" }}>{cats.length} chuyên mục</span>
        </div>
        <button className="admin-btn-primary" onClick={() => setModal("create")}>
          <Plus size={14} />
          Tạo chuyên mục
        </button>
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 14,
        }}
      >
        {cats.map((cat) => (
          <div
            key={cat.id}
            className="admin-card"
            style={{
              borderLeft: `3px solid ${cat.color}`,
              padding: "16px 18px",
              position: "relative",
            }}
          >
            {/* Count badge */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: cat.color }} />
              <span style={{ fontSize: 22, fontWeight: 700, color: cat.color, lineHeight: 1 }}>{cat.count}</span>
            </div>

            <div style={{ fontSize: 14, fontWeight: 600, color: "var(--admin-text)", lineHeight: 1.3, marginBottom: 4 }}>{cat.name}</div>
            <div style={{ fontSize: 11, color: "var(--admin-text-muted)", marginBottom: 14 }}>/category/{cat.slug}</div>

            {/* Actions */}
            <div style={{ display: "flex", gap: 6 }}>
              <Link
                href={`/admin/articles?category=${cat.slug}`}
                style={{
                  fontSize: 11,
                  color: cat.color,
                  textDecoration: "none",
                  flexShrink: 0,
                  padding: "4px 0",
                }}
              >
                Xem bài →
              </Link>
              <div style={{ flex: 1 }} />
              <button
                onClick={() => setModal(cat)}
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
                  color: "var(--admin-blue)",
                }}
                title="Sửa"
              >
                <Edit2 size={13} />
              </button>
              <button
                onClick={() => handleDelete(cat.id)}
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
                  color: cat.count > 0 ? "var(--admin-text-muted)" : "var(--admin-red)",
                }}
                title={cat.count > 0 ? "Còn bài viết, không thể xoá" : "Xoá"}
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modal && <CategoryModal cat={modal === "create" ? undefined : modal} onSave={(data) => handleSave(data, modal === "create" ? undefined : modal)} onClose={() => setModal(null)} />}
    </div>
  );
}
