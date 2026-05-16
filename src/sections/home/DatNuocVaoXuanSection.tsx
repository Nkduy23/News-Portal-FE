import Image from "next/image";
import Link from "next/link";
import { Article } from "@/types/article";
import SectionHeader from "@/components/ui/SectionHeader";

interface DatNuocVaoXuanSectionProps {
  articles: Article[];
}

export default function DatNuocVaoXuanSection({ articles }: DatNuocVaoXuanSectionProps) {
  const [main, ...rest] = articles;
  const stacked = rest.slice(0, 2);
  const bottom = rest.slice(2);

  return (
    <section className="mt-8">
      <SectionHeader title="Đất nước vào Xuân" slug="dat-nuoc-vao-xuan" />

      <div className="rounded-sm overflow-hidden p-3 md:p-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
        {/* Top row: large left + 2 stacked right */}
        <div className="flex flex-col md:grid md:grid-cols-[1.4fr_1fr] gap-3 md:gap-4 mb-3 md:mb-4">
          {/* Large left card */}
          {main && (
            <Link href={`/article/${main.slug}`} className="group relative block overflow-hidden rounded-sm">
              <div className="relative" style={{ height: 220 }}>
                <Image src={main.thumbnail} alt={main.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 35%, rgba(0,0,0,0.85) 100%)" }} />
                <div className="absolute top-2 left-2">
                  <span className="vov-badge">VOV</span>
                </div>
                <div className="absolute bottom-0 p-3 md:p-4">
                  <h3 className="text-[14px] md:text-[15px] font-bold text-white leading-snug line-clamp-3 group-hover:text-[var(--color-accent)] transition-colors">{main.title}</h3>
                  {main.excerpt && <p className="text-[11px] md:text-[12px] text-white/70 mt-1 line-clamp-2">{main.excerpt}</p>}
                </div>
              </div>
            </Link>
          )}

          {/* 2 stacked right */}
          <div className="grid grid-cols-2 md:flex md:flex-col gap-3 md:gap-4">
            {stacked.map((article) => (
              <Link key={article.id} href={`/article/${article.slug}`} className="group flex gap-2 md:gap-3 md:flex-1">
                <div className="relative shrink-0 overflow-hidden rounded-sm" style={{ width: 90, height: 80 }}>
                  <Image src={article.thumbnail} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute top-1 left-1">
                    <span className="vov-badge">VOV</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3
                    className="text-[12px] md:text-[13px] font-semibold leading-snug line-clamp-3 group-hover:text-[var(--color-accent)] transition-colors"
                    style={{ color: "rgba(255,255,255,0.92)" }}
                  >
                    {article.title}
                  </h3>
                  {article.excerpt && (
                    <p className="hidden md:block text-[12px] mt-1.5 line-clamp-3" style={{ color: "var(--color-text-muted)" }}>
                      {article.excerpt}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom row: remaining articles */}
        {bottom.length > 0 && (
          <div className="grid gap-3 md:gap-4" style={{ gridTemplateColumns: `repeat(${Math.min(bottom.length, 2)}, 1fr)` }}>
            {bottom.map((article) => (
              <Link key={article.id} href={`/article/${article.slug}`} className="group block">
                <div className="relative overflow-hidden rounded-sm mb-2" style={{ height: 130 }}>
                  <Image src={article.thumbnail} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute top-1 left-1">
                    <span className="vov-badge">VOV</span>
                  </div>
                </div>
                <h3 className="text-[12px] md:text-[13px] font-semibold leading-snug line-clamp-3 group-hover:text-[var(--color-accent)] transition-colors" style={{ color: "rgba(255,255,255,0.9)" }}>
                  {article.title}
                </h3>
                {article.excerpt && (
                  <p className="hidden md:block text-[12px] mt-1 line-clamp-2" style={{ color: "var(--color-text-muted)" }}>
                    {article.excerpt}
                  </p>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
