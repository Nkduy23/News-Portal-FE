import Image from "next/image";
import Link from "next/link";
import { Article } from "@/types/article";
import SectionHeader from "@/components/ui/SectionHeader";

interface BenChenTraXuanSectionProps {
  articles: Article[];
}

export default function BenChenTraXuanSection({ articles }: BenChenTraXuanSectionProps) {
  // Layout from screenshot:
  // Row1: 2 cards - left: large image + title+excerpt, right: large image + title+excerpt
  // Row2: 2 cards - left: small image + title only, right: small image + title only
  const row1 = articles.slice(0, 2);
  const row2 = articles.slice(2, 4);

  return (
    <section className="mt-8">
      <SectionHeader title="Bên chén trà Xuân" slug="ben-chen-tra-xuan" />

      <div className="rounded-sm overflow-hidden p-4 space-y-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
        {/* Row 1: 2 large cards side by side */}
        <div className="grid grid-cols-2 gap-4">
          {row1.map((article) => (
            <Link key={article.id} href={`/article/${article.slug}`} className="group flex gap-3">
              <div className="relative shrink-0 overflow-hidden rounded-sm" style={{ width: 160, height: 110 }}>
                <Image src={article.thumbnail} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-[13px] font-bold leading-snug line-clamp-2 mb-1.5 group-hover:text-[var(--color-accent)] transition-colors" style={{ color: "rgba(255,255,255,0.95)" }}>
                  {article.title}
                </h3>
                {article.excerpt && (
                  <p className="text-[12px] line-clamp-4 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                    {article.excerpt}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "rgba(255,255,255,0.08)" }} />

        {/* Row 2: 2 cards with small images */}
        <div className="grid grid-cols-2 gap-4">
          {row2.map((article) => (
            <Link key={article.id} href={`/article/${article.slug}`} className="group flex gap-3 items-start">
              {article.thumbnail && (
                <div className="relative shrink-0 overflow-hidden rounded-sm" style={{ width: 90, height: 72 }}>
                  <Image src={article.thumbnail} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="text-[13px] font-semibold leading-snug line-clamp-3 group-hover:text-[var(--color-accent)] transition-colors" style={{ color: "rgba(255,255,255,0.9)" }}>
                  {article.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
