import { articleService } from "@/services/article.service";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = articleService.getArticleBySlug(slug);

  if (!article) return notFound();

  return (
    <div className="max-w-[800px] mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-[12px] mb-4" style={{ color: "var(--color-text-muted)" }}>
        <Link href="/" className="hover:text-white transition-colors">
          Trang chủ
        </Link>
        <span>/</span>
        <Link href={`/category/${article.categorySlug}`} className="hover:text-white transition-colors">
          {article.category}
        </Link>
      </nav>

      {/* Category tag */}
      <div className="mb-3">
        <span className="text-[11px] font-bold uppercase px-2 py-1 rounded-sm" style={{ background: "var(--color-accent)", color: "white" }}>
          {article.category}
        </span>
      </div>

      {/* Title */}
      <h1 className="text-[26px] font-extrabold leading-tight mb-4" style={{ color: "rgba(255,255,255,0.98)" }}>
        {article.title}
      </h1>

      {/* Thumbnail */}
      {article.thumbnail && (
        <div className="relative w-full mb-6 overflow-hidden rounded-sm" style={{ height: 400 }}>
          <Image src={article.thumbnail} alt={article.title} fill className="object-cover" />
        </div>
      )}

      {/* Excerpt / content */}
      {article.excerpt && (
        <p className="text-[15px] leading-relaxed font-medium mb-6" style={{ color: "rgba(255,255,255,0.85)" }}>
          {article.excerpt}
        </p>
      )}

      <p className="text-[14px] leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
        Nội dung bài viết đang được cập nhật...
      </p>

      <div className="mt-8">
        <Link href="/" className="text-[13px] hover:underline" style={{ color: "var(--color-accent)" }}>
          ← Quay lại trang chủ
        </Link>
      </div>
    </div>
  );
}
