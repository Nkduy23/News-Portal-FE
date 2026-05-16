export default function SearchPage() {
  return (
    <div className="max-w-[800px] mx-auto px-4 py-12">
      <h1 className="text-[24px] font-extrabold mb-6" style={{ color: "var(--color-accent)" }}>
        Tìm kiếm
      </h1>
      <input
        type="text"
        placeholder="Nhập từ khóa tìm kiếm..."
        className="w-full px-4 py-3 rounded-sm text-[14px] outline-none"
        style={{
          background: "rgba(255,255,255,0.07)",
          border: "1px solid rgba(255,255,255,0.15)",
          color: "white",
        }}
      />
    </div>
  );
}
