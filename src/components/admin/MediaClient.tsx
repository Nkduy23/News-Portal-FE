"use client";

import { useState } from "react";
import { Upload, Copy, Check, Search } from "lucide-react";

interface MediaItem {
  src: string;
  title: string;
  id: string;
  articleId: string;
}

export default function MediaClient({ images }: { images: MediaItem[] }) {
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [selected, setSelected] = useState<MediaItem | null>(null);

  const filtered = images.filter((img) => !search || img.title.toLowerCase().includes(search.toLowerCase()));

  const copyUrl = (src: string) => {
    navigator.clipboard.writeText(src);
    setCopied(src);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "var(--admin-text)", margin: "0 0 2px" }}>Thư viện Media</h1>
          <span style={{ fontSize: 13, color: "var(--admin-text-muted)" }}>{images.length} ảnh</span>
        </div>
        <button className="admin-btn-primary">
          <Upload size={14} />
          Tải lên
        </button>
      </div>

      {/* Search */}
      <div style={{ position: "relative", maxWidth: 320, marginBottom: 20 }}>
        <Search size={14} style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: "var(--admin-text-muted)", pointerEvents: "none" }} />
        <input className="admin-input" style={{ paddingLeft: 32 }} placeholder="Tìm theo tiêu đề bài..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 20, alignItems: "start" }}>
        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: 10 }}>
          {filtered.map((img) => (
            <div
              key={img.id}
              onClick={() => setSelected(img)}
              style={{
                borderRadius: 8,
                overflow: "hidden",
                border: selected?.id === img.id ? "2px solid var(--admin-accent)" : "2px solid var(--admin-border)",
                cursor: "pointer",
                aspectRatio: "4/3",
                position: "relative",
                transition: "border-color 0.15s",
              }}
            >
              <img src={img.src} alt={img.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
          ))}
          {filtered.length === 0 && <div style={{ gridColumn: "1/-1", padding: "48px 0", textAlign: "center", color: "var(--admin-text-muted)", fontSize: 13 }}>Không tìm thấy ảnh nào</div>}
        </div>

        {/* Detail panel */}
        {selected ? (
          <div className="admin-card" style={{ position: "sticky", top: 0 }}>
            <img src={selected.src} alt={selected.title} style={{ width: "100%", borderRadius: 7, objectFit: "cover", marginBottom: 14, aspectRatio: "16/9" }} />
            <p style={{ fontSize: 12, color: "var(--admin-text)", marginBottom: 10, lineHeight: 1.4 }}>{selected.title}</p>
            <div>
              <label className="admin-label">URL ảnh</label>
              <div style={{ display: "flex", gap: 6 }}>
                <input className="admin-input" readOnly value={selected.src} style={{ fontSize: 11, flex: 1 }} />
                <button onClick={() => copyUrl(selected.src)} className="admin-btn-ghost" style={{ padding: "0 10px", flexShrink: 0 }} title="Copy URL">
                  {copied === selected.src ? <Check size={14} /> : <Copy size={14} />}
                </button>
              </div>
            </div>
            <button onClick={() => setSelected(null)} className="admin-btn-ghost" style={{ marginTop: 12, width: "100%", justifyContent: "center" }}>
              Bỏ chọn
            </button>
          </div>
        ) : (
          <div
            className="admin-card"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 180,
              textAlign: "center",
              position: "sticky",
              top: 0,
            }}
          >
            <span style={{ fontSize: 13, color: "var(--admin-text-muted)" }}>Chọn một ảnh để xem chi tiết</span>
          </div>
        )}
      </div>
    </div>
  );
}
