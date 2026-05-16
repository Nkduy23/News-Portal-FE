import Image from "next/image";
import Link from "next/link";
import { Article } from "@/types/article";
import SectionHeader from "@/components/ui/SectionHeader";

interface SacMauGiaiTriSectionProps {
  articles: Article[];
}

export default function SacMauGiaiTriSection({ articles }: SacMauGiaiTriSectionProps) {
  const portrait = articles[0];
  const stacked = articles.slice(1, 3);
  const row2 = articles.slice(3);

  return (
    <section className="mt-8">
      <SectionHeader title="Sắc màu giải trí" slug="sac-mau-giai-tri" />

      <div className="rounded-sm overflow-hidden p-3 md:p-4 space-y-3 md:space-y-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
        {/* Row 1: portrait left + 2 stacked right */}
        {/* Mobile: portrait full-width, then 2 cards in a row below */}
        <div className="flex flex-col md:grid md:grid-cols-[1fr_1.8fr] gap-3 md:gap-4">
          {/* Portrait image */}
          {portrait && (
            <Link href={`/article/${portrait.slug}`} className="group relative block overflow-hidden rounded-sm">
              <div className="relative" style={{ height: 200 }}>
                <Image src={portrait.thumbnail} alt={portrait.title} fill className="object-cover object-top group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.8) 100%)" }} />
                <div className="absolute bottom-0 p-3">
                  <h3 className="text-[13px] md:text-[14px] font-bold text-white leading-snug line-clamp-3 group-hover:text-[var(--color-accent)] transition-colors">{portrait.title}</h3>
                </div>
              </div>
            </Link>
          )}

          {/* 2 stacked cards — 2-col grid on mobile, flex-col on desktop */}
          <div className="grid grid-cols-2 md:flex md:flex-col gap-3 md:gap-4">
            {stacked.map((article) => (
              <Link key={article.id} href={`/article/${article.slug}`} className="group flex gap-2 md:gap-3 md:flex-1">
                <div className="relative shrink-0 overflow-hidden rounded-sm" style={{ width: 90, height: 80 }}>
                  <Image src={article.thumbnail} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3
                    className="text-[12px] md:text-[13px] font-semibold leading-snug line-clamp-3 group-hover:text-[var(--color-accent)] transition-colors"
                    style={{ color: "rgba(255,255,255,0.9)" }}
                  >
                    {article.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "rgba(255,255,255,0.08)" }} />

        {/* Row 2: 4 equal cards — 2-col on mobile, 4-col on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {row2.map((article) => (
            <Link key={article.id} href={`/article/${article.slug}`} className="group block">
              <div className="relative overflow-hidden rounded-sm mb-2" style={{ height: 100 }}>
                <Image src={article.thumbnail} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <h3 className="text-[12px] font-semibold leading-snug line-clamp-3 group-hover:text-[var(--color-accent)] transition-colors" style={{ color: "rgba(255,255,255,0.9)" }}>
                {article.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
