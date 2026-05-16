"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SearchContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "";

  return (
    <div className="max-w-[800px] mx-auto px-4 py-12">
      <h1 className="text-[24px] font-extrabold mb-6" style={{ color: "var(--color-accent)" }}>
        Tìm kiếm
      </h1>
      <input
        type="text"
        defaultValue={q}
        placeholder="Nhập từ khóa tìm kiếm..."
        className="w-full px-4 py-3 rounded-sm text-[14px] outline-none"
        style={{
          background: "rgba(255,255,255,0.07)",
          border: "1px solid rgba(255,255,255,0.15)",
          color: "white",
        }}
      />
      {q && (
        <p className="mt-4 text-[13px]" style={{ color: "rgba(255,255,255,0.5)" }}>
          Kết quả tìm kiếm cho: <span className="text-white font-semibold">"{q}"</span>
        </p>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchContent />
    </Suspense>
  );
}
