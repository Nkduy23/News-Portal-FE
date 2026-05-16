import Link from "next/link";

interface SectionHeaderProps {
  title: string;
  slug?: string;
  className?: string;
}

export default function SectionHeader({ title, slug, className = "" }: SectionHeaderProps) {
  return (
    <div className={`flex items-center justify-between mb-4 ${className}`}>
      <div className="section-title-line">
        <h2 className="text-[22px] font-extrabold uppercase tracking-wide" style={{ color: "var(--color-section-title)", fontFamily: "var(--font-display)" }}>
          {title}
        </h2>
      </div>
      {slug && (
        <Link
          href={`/category/${slug}`}
          className="text-[12px] font-semibold px-3 py-1.5 rounded-sm border transition-colors whitespace-nowrap"
          style={{
            borderColor: "rgba(255,255,255,0.2)",
            color: "rgba(255,255,255,0.7)",
          }}
        >
          Xem thêm →
        </Link>
      )}
    </div>
  );
}
