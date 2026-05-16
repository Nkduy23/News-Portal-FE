import Image from "next/image";
import Link from "next/link";
import { Article } from "@/types/article";

interface ThreeColSectionProps {
  sections: Array<{
    title: string;
    slug: string;
    articles: Article[];
    accentColor?: string;
  }>;
}

function ColSection({ title, slug, articles, accentColor = "#e8435a" }: { title: string; slug: string; articles: Article[]; accentColor?: string }) {
  const [main, ...rest] = articles;

  return (
    <div className="flex flex-col">
      {/* Column header */}
      <div className="flex items-center justify-between mb-3">
        <Link href={`/category/${slug}`}>
          <h3 className="text-[16px] font-extrabold uppercase leading-tight" style={{ color: accentColor }}>
            {title.split(" ").map((word, i) => (
              <span key={i} className="block leading-[1.1]">
                {word}
              </span>
            ))}
          </h3>
        </Link>
        <Link
          href={`/category/${slug}`}
          className="text-[11px] font-semibold px-2 py-1 rounded-sm border whitespace-nowrap"
          style={{ borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.6)" }}
        >
          Xem thêm →
        </Link>
      </div>

      {/* Main article with image */}
      {main && (
        <Link href={`/article/${main.slug}`} className="group block mb-3">
          <div className="relative overflow-hidden rounded-sm mb-2" style={{ height: 180 }}>
            <Image src={main.thumbnail} alt={main.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
            <div className="absolute top-1 left-1">
              <span className="vov-badge">VOV</span>
            </div>
          </div>
          <h4 className="text-[13px] font-bold leading-snug line-clamp-2 group-hover:text-[var(--color-accent)] transition-colors" style={{ color: "rgba(255,255,255,0.95)" }}>
            {main.title}
          </h4>
          {main.excerpt && (
            <p className="text-[12px] mt-1 line-clamp-3 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
              {main.excerpt}
            </p>
          )}
        </Link>
      )}

      {/* Rest as list */}
      <div className="space-y-0">
        {rest.map((article) => (
          <div key={article.id} className="article-list-item">
            <Link href={`/article/${article.slug}`} className="group block">
              <p className="text-[12px] font-semibold leading-snug line-clamp-2 group-hover:text-[var(--color-accent)] transition-colors" style={{ color: "rgba(255,255,255,0.85)" }}>
                {article.title}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ThreeColSection({ sections }: ThreeColSectionProps) {
  const colors = ["#e8435a", "#f5a623", "#06b6d4"];

  return (
    <section className="mt-8">
      <div className="rounded-sm overflow-hidden p-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="grid grid-cols-3 gap-6 divide-x" style={{ "--tw-divide-opacity": "0.1" } as React.CSSProperties}>
          {sections.map((section, i) => (
            <div key={section.slug} className={i > 0 ? "pl-6" : ""}>
              <ColSection {...section} accentColor={colors[i]} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
