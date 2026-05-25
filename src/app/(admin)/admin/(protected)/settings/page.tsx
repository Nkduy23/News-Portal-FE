"use client";

import { useState } from "react";
import { Check } from "lucide-react";

const SETTINGS_FIELDS = [
  { key: "siteName", label: "Tên website", placeholder: "VOV.VN – Xuân Bình Ngọ 2026", defaultValue: "VOV.VN – Xuân Bình Ngọ 2026" },
  { key: "desc", label: "Mô tả", placeholder: "Việt Nam tự cường – Bứt phá vươn xa", defaultValue: "Việt Nam tự cường – Bứt phá vươn xa" },
  { key: "baseUrl", label: "Base URL", placeholder: "https://vov.vn/xuan-2026", defaultValue: "https://vov.vn/xuan-2026" },
  { key: "gaId", label: "Google Analytics ID", placeholder: "G-XXXXXXXX", defaultValue: "" },
  { key: "maxHero", label: "Số bài Hero tối đa", placeholder: "5", defaultValue: "5" },
];

export default function SettingsPage() {
  const [values, setValues] = useState(Object.fromEntries(SETTINGS_FIELDS.map((f) => [f.key, f.defaultValue])));
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    // TODO: persist via API
    await new Promise((r) => setTimeout(r, 400));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={{ maxWidth: 560 }}>
      <h1 style={{ fontSize: 20, fontWeight: 700, color: "var(--admin-text)", margin: "0 0 24px" }}>Cài đặt</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {SETTINGS_FIELDS.map((field) => (
          <div key={field.key} className="admin-card">
            <label className="admin-label" htmlFor={field.key}>
              {field.label}
            </label>
            <input id={field.key} className="admin-input" value={values[field.key]} placeholder={field.placeholder} onChange={(e) => setValues((v) => ({ ...v, [field.key]: e.target.value }))} />
          </div>
        ))}
      </div>

      <div style={{ marginTop: 20, display: "flex", gap: 10, alignItems: "center" }}>
        <button className="admin-btn-primary" onClick={handleSave} style={{ opacity: saved ? 0.75 : 1 }}>
          <Check size={14} />
          {saved ? "Đã lưu!" : "Lưu cài đặt"}
        </button>
        {saved && <span style={{ fontSize: 13, color: "var(--admin-green)" }}>✓ Cài đặt đã được lưu</span>}
      </div>
    </div>
  );
}
