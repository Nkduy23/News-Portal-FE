import Image from "next/image";
import Link from "next/link";
import { Article } from "@/types/article";
import SectionHeader from "@/components/ui/SectionHeader";

interface TetAroundTownSectionProps {
  articles: Article[];
}

export default function TetAroundTownSection({ articles }: TetAroundTownSectionProps) {
  // Layout:
  // Row1: 3 small equal cards (image + title)
  // Row2: 1 large left with full article + right col has 1 article with image+text
  const row1 = articles.slice(0, 3);
  const mainRow2 = articles[3];
  const sideRow2 = articles[4];

  return (
    <section className="mt-8">
      <SectionHeader title="Tết Around Town" slug="tet-around-town" />

      <div className="rounded-sm overflow-hidden p-4 space-y-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
        {/* Row 1: 3 small cards */}
        <div className="grid grid-cols-3 gap-4">
          {row1.map((article) => (
            <Link key={article.id} href={`/article/${article.slug}`} className="group flex gap-2 items-start">
              <div className="relative shrink-0 overflow-hidden rounded-sm" style={{ width: 100, height: 72 }}>
                <Image src={article.thumbnail} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <h3 className="text-[12px] font-semibold leading-snug line-clamp-3 group-hover:text-[var(--color-accent)] transition-colors" style={{ color: "rgba(255,255,255,0.9)" }}>
                {article.title}
              </h3>
            </Link>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "rgba(255,255,255,0.08)" }} />

        {/* Row 2: large left + smaller right */}
        <div className="grid grid-cols-[1.4fr_1fr] gap-4">
          {mainRow2 && (
            <Link href={`/article/${mainRow2.slug}`} className="group flex gap-3">
              <div className="relative shrink-0 overflow-hidden rounded-sm" style={{ width: 220, height: 180 }}>
                <Image src={mainRow2.thumbnail} alt={mainRow2.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute top-1 left-1">
                  <span className="vov-badge">VOV</span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-[14px] font-bold leading-snug line-clamp-2 mb-2 group-hover:text-[var(--color-accent)] transition-colors" style={{ color: "rgba(255,255,255,0.95)" }}>
                  {mainRow2.title}
                </h3>
                {mainRow2.excerpt && (
                  <p className="text-[12px] line-clamp-5 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                    {mainRow2.excerpt}
                  </p>
                )}
              </div>
            </Link>
          )}

          {sideRow2 && (
            <Link href={`/article/${sideRow2.slug}`} className="group flex gap-3">
              <div className="relative shrink-0 overflow-hidden rounded-sm" style={{ width: 140, height: 120 }}>
                <Image src={sideRow2.thumbnail} alt={sideRow2.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute top-1 left-1">
                  <span className="vov-badge">VOV</span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-[13px] font-semibold leading-snug line-clamp-2 mb-1.5 group-hover:text-[var(--color-accent)] transition-colors" style={{ color: "rgba(255,255,255,0.9)" }}>
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
