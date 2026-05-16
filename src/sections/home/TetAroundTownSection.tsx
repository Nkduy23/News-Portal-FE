import Image from "next/image";
import Link from "next/link";
import { Article } from "@/types/article";
import SectionHeader from "@/components/ui/SectionHeader";

interface TetAroundTownSectionProps {
  articles: Article[];
}

export default function TetAroundTownSection({ articles }: TetAroundTownSectionProps) {
  const row1 = articles.slice(0, 3);
  const mainRow2 = articles[3];
  const sideRow2 = articles[4];

  return (
    <section className="mt-8">
      <SectionHeader title="Tết Around Town" slug="tet-around-town" />

      <div className="rounded-sm overflow-hidden p-3 md:p-4 space-y-3 md:space-y-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
        {/* Row 1: 3 cards — 1-col on mobile, 3-col on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          {row1.map((article) => (
            <Link key={article.id} href={`/article/${article.slug}`} className="group flex gap-3 items-start">
              <div className="relative shrink-0 overflow-hidden rounded-sm" style={{ width: 90, height: 68 }}>
                <Image src={article.thumbnail} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <h3 className="text-[12px] md:text-[12px] font-semibold leading-snug line-clamp-3 group-hover:text-[var(--color-accent)] transition-colors" style={{ color: "rgba(255,255,255,0.9)" }}>
                {article.title}
              </h3>
            </Link>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "rgba(255,255,255,0.08)" }} />

        {/* Row 2: large left + smaller right — stacked on mobile */}
        <div className="flex flex-col md:grid md:grid-cols-[1.4fr_1fr] gap-3 md:gap-4">
          {mainRow2 && (
            <Link href={`/article/${mainRow2.slug}`} className="group flex gap-3">
              <div className="relative shrink-0 overflow-hidden rounded-sm" style={{ width: 160, height: 130 }}>
                <Image src={mainRow2.thumbnail} alt={mainRow2.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute top-1 left-1">
                  <span className="vov-badge">VOV</span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3
                  className="text-[13px] md:text-[14px] font-bold leading-snug line-clamp-2 mb-1.5 group-hover:text-[var(--color-accent)] transition-colors"
                  style={{ color: "rgba(255,255,255,0.95)" }}
                >
                  {mainRow2.title}
                </h3>
                {mainRow2.excerpt && (
                  <p className="text-[12px] line-clamp-4 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                    {mainRow2.excerpt}
                  </p>
                )}
              </div>
            </Link>
          )}

          {sideRow2 && (
            <Link href={`/article/${sideRow2.slug}`} className="group flex gap-3">
              <div className="relative shrink-0 overflow-hidden rounded-sm" style={{ width: 120, height: 100 }}>
                <Image src={sideRow2.thumbnail} alt={sideRow2.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute top-1 left-1">
                  <span className="vov-badge">VOV</span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3
                  className="text-[12px] md:text-[13px] font-semibold leading-snug line-clamp-2 mb-1.5 group-hover:text-[var(--color-accent)] transition-colors"
                  style={{ color: "rgba(255,255,255,0.9)" }}
                >
                  {sideRow2.title}
                </h3>
                {sideRow2.excerpt && (
                  <p className="text-[12px] line-clamp-4 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                    {sideRow2.excerpt}
                  </p>
                )}
              </div>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
