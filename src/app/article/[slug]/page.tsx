import { articleService } from "@/services/article.service";
import { categories } from "@/data/mock-data";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

function formatDateFull(iso: string) {
  const d = new Date(iso);
  const days = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];
  return `${days[d.getDay()]}, ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}, ${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
}

// Social share icons as inline SVG
function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = articleService.getArticleBySlug(slug);
  if (!article) return notFound();

  const related = articleService.getRelated(slug, article.categorySlug, 4);
  const category = categories.find((c) => c.slug === article.categorySlug);
  const accentColor = category?.color ?? "var(--color-accent)";

  return (
    <div className="max-w-[1000px] mx-auto px-4 py-6">
      {/* ── BREADCRUMB ─────────────────────────────────────────────── */}
      <nav className="flex items-center gap-2 text-[12px] mb-4" style={{ color: "var(--color-text-muted)" }}>
        <Link href="/" className="hover:text-white transition-colors">
          Trang chủ
        </Link>
        <span>/</span>
        <Link href={`/category/${article.categorySlug}`} className="hover:text-white transition-colors">
          {article.category}
        </Link>
        <span>/</span>
        <span className="line-clamp-1" style={{ color: "rgba(255,255,255,0.5)" }}>
          {article.title}
        </span>
      </nav>

      {/* ── ARTICLE TYPE + DATETIME ────────────────────────────────── */}
      <div className="flex items-center justify-between mb-3 gap-3">
        {article.articleType ? (
          <span className="text-[11px] font-extrabold uppercase px-3 py-1.5 rounded-sm tracking-wider" style={{ background: accentColor, color: "white" }}>
            {article.articleType}
          </span>
        ) : (
          <span className="text-[11px] font-extrabold uppercase px-3 py-1.5 rounded-sm tracking-wider" style={{ background: "var(--color-accent)", color: "white" }}>
            {article.category}
          </span>
        )}
        <p className="text-[11px] shrink-0" style={{ color: "rgba(255,255,255,0.4)" }}>
          {formatDateFull(article.publishedAt)}
        </p>
      </div>

      {/* ── TITLE ─────────────────────────────────────────────────── */}
      <h1 className="text-[22px] sm:text-[28px] font-extrabold leading-tight mb-3" style={{ color: "rgba(255,255,255,0.98)", fontFamily: "var(--font-display)" }}>
        {article.title}
      </h1>

      {/* ── AUTHOR + SOCIAL SHARE ─────────────────────────────────── */}
      <div className="flex items-center justify-between mb-5 pb-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        {article.author ? (
          <p className="text-[13px] font-semibold" style={{ color: accentColor }}>
            {article.author}
          </p>
        ) : (
          <div />
        )}

        <div className="flex items-center gap-2">
          <span className="text-[11px] mr-1" style={{ color: "rgba(255,255,255,0.35)" }}>
            Chia sẻ:
          </span>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://baoxuan.vov.vn/article/${article.slug}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-8 h-8 rounded-full transition-colors hover:opacity-80"
            style={{ background: "#1877F2", color: "white" }}
            aria-label="Chia sẻ Facebook"
          >
            <FacebookIcon />
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://baoxuan.vov.vn/article/${article.slug}`)}&text=${encodeURIComponent(article.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-8 h-8 rounded-full transition-colors hover:opacity-80"
            style={{ background: "#000", color: "white", border: "1px solid rgba(255,255,255,0.2)" }}
            aria-label="Chia sẻ X (Twitter)"
          >
            <XIcon />
          </a>
          <a
            href={`mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(`https://baoxuan.vov.vn/article/${article.slug}`)}`}
            className="flex items-center justify-center w-8 h-8 rounded-full transition-colors hover:opacity-80"
            style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.12)" }}
            aria-label="Chia sẻ qua Email"
          >
            <MailIcon />
          </a>
        </div>
      </div>

      {/* ── EXCERPT ───────────────────────────────────────────────── */}
      {article.excerpt && (
        <p className="text-[15px] leading-relaxed font-semibold mb-5 italic" style={{ color: "rgba(255,255,255,0.82)", borderLeft: `3px solid ${accentColor}`, paddingLeft: "14px" }}>
          {article.excerpt}
        </p>
      )}

      {/* ── THUMBNAIL ─────────────────────────────────────────────── */}
      {article.thumbnail && (
        <div className="relative w-full mb-6 overflow-hidden rounded-sm" style={{ height: "clamp(200px, 50vw, 420px)" }}>
          <Image src={article.thumbnail} alt={article.title} fill className="object-cover" priority />
        </div>
      )}

      {/* ── CONTENT (HTML) ────────────────────────────────────────── */}
      {article.content && <div className="article-body mb-8" dangerouslySetInnerHTML={{ __html: article.content }} />}

      {/* ── TAGS ──────────────────────────────────────────────────── */}
      {article.tags && article.tags.length > 0 && (
        <div className="mb-8 pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <p className="text-[11px] font-bold uppercase mb-3" style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em" }}>
            Từ khoá
          </p>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Link
                key={tag}
                href={`/search?q=${encodeURIComponent(tag)}`}
                className="text-[12px] font-semibold px-3 py-1.5 rounded-full transition-colors hover:bg-white/15"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "rgba(255,255,255,0.75)",
                }}
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ── RELATED ARTICLES ──────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="mb-8">
          <h2 className="text-[16px] font-extrabold uppercase mb-4" style={{ color: accentColor }}>
            Bài viết liên quan
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {related.map((rel) => (
              <Link
                key={rel.id}
                href={`/article/${rel.slug}`}
                className="group flex gap-3 p-3 rounded-sm transition-colors hover:bg-white/[0.04]"
                style={{ border: "1px solid rgba(255,255,255,0.07)" }}
              >
                {rel.thumbnail && (
                  <div className="relative shrink-0 overflow-hidden rounded-sm" style={{ width: 90, height: 68 }}>
                    <Image src={rel.thumbnail} alt={rel.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  {rel.articleType && (
                    <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-sm inline-block mb-1" style={{ background: accentColor, color: "white" }}>
                      {rel.articleType}
                    </span>
                  )}
                  <h3 className="text-[12px] font-semibold leading-snug line-clamp-3 group-hover:text-[var(--color-accent)] transition-colors" style={{ color: "rgba(255,255,255,0.88)" }}>
                    {rel.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── COMMENT SECTION ───────────────────────────────────────── */}
      <section className="rounded-sm p-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
        <h2 className="text-[16px] font-extrabold uppercase mb-4" style={{ color: "rgba(255,255,255,0.85)" }}>
          Bình luận
        </h2>

        {/* Comment list placeholder */}
        <div className="mb-5 space-y-4">
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-[12px] font-bold text-white" style={{ background: accentColor }}>
              V
            </div>
            <div className="flex-1 rounded-sm p-3" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <p className="text-[12px] font-semibold mb-1" style={{ color: accentColor }}>
                Văn Hùng
              </p>
              <p className="text-[13px] leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
                Bài viết rất hay và ý nghĩa! Cảm ơn VOV đã đưa tin kịp thời.
              </p>
              <p className="text-[10px] mt-1.5" style={{ color: "rgba(255,255,255,0.3)" }}>
                2 giờ trước
              </p>
            </div>
          </div>
        </div>

        {/* Write comment form */}
        <div className="space-y-3">
          <textarea
            rows={4}
            placeholder="Viết bình luận của bạn..."
            className="w-full px-4 py-3 rounded-sm text-[13px] resize-none outline-none transition-colors"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.9)",
            }}
          />
          <div className="flex items-center justify-between gap-3">
            <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.3)" }}>
              Bình luận sẽ được kiểm duyệt trước khi hiển thị.
            </p>
            <button className="px-5 py-2 rounded-sm text-[13px] font-bold text-white transition-opacity hover:opacity-85 shrink-0" style={{ background: accentColor }}>
              Gửi bình luận
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
