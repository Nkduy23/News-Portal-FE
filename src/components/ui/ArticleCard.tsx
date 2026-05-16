import Image from "next/image";
import Link from "next/link";
import { Article } from "@/types/article";

interface ArticleCardProps {
  article: Article;
  variant?: "horizontal" | "vertical" | "overlay" | "text-only";
  imageSize?: "sm" | "md" | "lg" | "xl";
  showExcerpt?: boolean;
  titleLines?: number;
  className?: string;
  imageHeight?: number;
  imageWidth?: number;
}

const titleClampMap: Record<number, string> = {
  2: "line-clamp-2",
  3: "line-clamp-3",
  4: "line-clamp-4",
};

export default function ArticleCard({ article, variant = "vertical", showExcerpt = false, titleLines = 3, className = "", imageHeight = 200, imageWidth = 300 }: ArticleCardProps) {
  const titleClamp = titleClampMap[titleLines] ?? "line-clamp-3";

  if (variant === "text-only") {
    return (
      <Link href={`/article/${article.slug}`} className={`article-card block group ${className}`}>
        <h3 className={`article-title text-[13px] font-semibold leading-snug transition-colors ${titleClamp}`} style={{ color: "rgba(255,255,255,0.9)" }}>
          {article.title}
        </h3>
        {showExcerpt && article.excerpt && (
          <p className="text-[12px] mt-1 line-clamp-2" style={{ color: "var(--color-text-muted)" }}>
            {article.excerpt}
          </p>
        )}
      </Link>
    );
  }

  if (variant === "horizontal") {
    return (
      <Link href={`/article/${article.slug}`} className={`article-card flex gap-3 group ${className}`}>
        {article.thumbnail && (
          <div className="relative shrink-0 overflow-hidden rounded-sm" style={{ width: imageWidth, height: imageHeight }}>
            <Image src={article.thumbnail} alt={article.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute top-1 left-1">
              <span className="vov-badge">VOV</span>
            </div>
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className={`article-title text-[13px] font-semibold leading-snug transition-colors ${titleClamp}`} style={{ color: "rgba(255,255,255,0.9)" }}>
            {article.title}
          </h3>
          {showExcerpt && article.excerpt && (
            <p className="text-[12px] mt-1.5 line-clamp-3" style={{ color: "var(--color-text-muted)" }}>
              {article.excerpt}
            </p>
          )}
        </div>
      </Link>
    );
  }

  if (variant === "overlay") {
    return (
      <Link href={`/article/${article.slug}`} className={`article-card relative block group overflow-hidden rounded-sm ${className}`}>
        <div className="relative" style={{ height: imageHeight }}>
          {article.thumbnail && <Image src={article.thumbnail} alt={article.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />}
          {/* Gradient overlay */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.85) 100%)" }} />
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <span className="vov-badge mb-1 inline-block">VOV</span>
            <h3 className={`article-title text-[14px] font-bold leading-snug text-white transition-colors ${titleClamp}`}>{article.title}</h3>
          </div>
        </div>
      </Link>
    );
  }

  // Default: vertical
  return (
    <Link href={`/article/${article.slug}`} className={`article-card block group ${className}`}>
      {article.thumbnail && (
        <div className="relative overflow-hidden rounded-sm mb-2" style={{ height: imageHeight }}>
          <Image src={article.thumbnail} alt={article.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
          <div className="absolute top-1 left-1">
            <span className="vov-badge">VOV</span>
          </div>
        </div>
      )}
      <h3 className={`article-title text-[13px] font-semibold leading-snug transition-colors ${titleClamp}`} style={{ color: "rgba(255,255,255,0.9)" }}>
        {article.title}
      </h3>
      {showExcerpt && article.excerpt && (
        <p className="text-[12px] mt-1.5 line-clamp-2" style={{ color: "var(--color-text-muted)" }}>
          {article.excerpt}
        </p>
      )}
    </Link>
  );
}
