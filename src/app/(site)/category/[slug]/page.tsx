import { api } from "@/services/api";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

const ITEMS_PER_PAGE = 6;

function formatDate(iso: string) {
  const d = new Date(iso);
  const days = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];
  return `${days[d.getDay()]}, ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}, ${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params;
  const { page: pageStr } = await searchParams;
  const currentPage = Math.max(1, parseInt(pageStr ?? "1"));

  // Lấy song song: category info + trang đầu (3 hero) + trang list
  const [category, heroRes, listRes] = await Promise.all([
    api.categories.getBySlug(slug).catch(() => null),
    api.articles.list({ category: slug, status: "published", page: 1, limit: 3 }),
    api.articles.list({ category: slug, status: "published", page: currentPage, limit: ITEMS_PER_PAGE }),
  ]);

  if (!category) return notFound();
  if (heroRes.meta.total === 0) return notFound();

  const [heroMain, heroSub1, heroSub2] = heroRes.data;
  const pagedList = listRes.data;
  const totalPages = Math.max(1, Math.ceil((listRes.meta.total - 3) / ITEMS_PER_PAGE));

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-[12px] mb-5" style={{ color: "var(--color-text-muted)" }}>
        <Link href="/" className="hover:text-white transition-colors">
          Trang chủ
        </Link>
        <span>/</span>
        <span style={{ color: "var(--color-accent)" }}>{category.nameVi}</span>
      </nav>

      {/* Category title */}
      <h1 className="text-[28px] sm:text-[32px] font-extrabold uppercase mb-6 tracking-wide" style={{ color: "var(--color-accent)", fontFamily: "var(--font-display)" }}>
        {category.nameVi}
      </h1>

      {/* ── HERO SECTION ─────────────────────────────────────────────── */}
      {heroMain && (
        <section className="mb-8">
          <div
            className="flex flex-col md:grid gap-2 md:rounded-sm md:overflow-hidden"
            style={{ gridTemplateColumns: "1.55fr 1fr", gridTemplateRows: "1fr 1fr", background: "rgba(255,255,255,0.06)" }}
          >
            {/* Main hero */}
            <Link href={`/article/${heroMain.slug}`} className="group relative block overflow-hidden md:row-span-2 mb-px md:mb-0" style={{ background: "var(--color-bg)" }}>
              <div className="relative" style={{ height: "clamp(240px, 42vw, 420px)" }}>
                {heroMain.thumbnail && <Image src={heroMain.thumbnail} alt={heroMain.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" priority />}
                <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 25%, rgba(0,0,0,0.88) 100%)" }} />
                <div className="absolute top-2 left-2 flex items-center gap-2">
                  <span className="vov-badge">VOV</span>
                  {heroMain.articleType && (
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-sm text-white" style={{ background: category.color }}>
                      {heroMain.articleType}
                    </span>
                  )}
                </div>
                <div className="absolute bottom-0 p-4 sm:p-5">
                  <h2 className="text-[18px] sm:text-[22px] font-extrabold text-white leading-snug line-clamp-3 mb-2 group-hover:text-[var(--color-accent)] transition-colors">{heroMain.title}</h2>
                  {heroMain.excerpt && <p className="text-[12px] sm:text-[13px] text-white/75 line-clamp-2 leading-relaxed hidden sm:block">{heroMain.excerpt}</p>}
                  <p className="text-[11px] mt-2" style={{ color: "rgba(255,255,255,0.45)" }}>
                    {formatDate(heroMain.publishedAt)}
                  </p>
                </div>
              </div>
            </Link>

            {/* Sub 1 */}
            {heroSub1 && (
              <Link href={`/article/${heroSub1.slug}`} className="group relative block overflow-hidden mb-px md:mb-0" style={{ background: "var(--color-bg)" }}>
                <div className="relative" style={{ height: "clamp(150px, 22vw, 210px)" }}>
                  {heroSub1.thumbnail && <Image src={heroSub1.thumbnail} alt={heroSub1.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />}
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 20%, rgba(0,0,0,0.83) 100%)" }} />
                  {heroSub1.articleType && (
                    <div className="absolute top-2 left-2">
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-sm text-white" style={{ background: category.color }}>
                        {heroSub1.articleType}
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-0 p-3">
                    <h3 className="text-[13px] sm:text-[14px] font-bold text-white leading-snug line-clamp-3 group-hover:text-[var(--color-accent)] transition-colors">{heroSub1.title}</h3>
                  </div>
                </div>
              </Link>
            )}

            {/* Sub 2 */}
            {heroSub2 && (
              <Link href={`/article/${heroSub2.slug}`} className="group relative block overflow-hidden" style={{ background: "var(--color-bg)" }}>
                <div className="relative" style={{ height: "clamp(150px, 22vw, 210px)" }}>
                  {heroSub2.thumbnail && <Image src={heroSub2.thumbnail} alt={heroSub2.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />}
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 20%, rgba(0,0,0,0.83) 100%)" }} />
                  {heroSub2.articleType && (
                    <div className="absolute top-2 left-2">
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-sm text-white" style={{ background: category.color }}>
                        {heroSub2.articleType}
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-0 p-3">
                    <h3 className="text-[13px] sm:text-[14px] font-bold text-white leading-snug line-clamp-3 group-hover:text-[var(--color-accent)] transition-colors">{heroSub2.title}</h3>
                  </div>
                </div>
              </Link>
            )}
          </div>
        </section>
      )}

      {/* ── ARTICLE LIST ──────────────────────────────────────────────── */}
      {pagedList.length > 0 && (
        <section className="mb-8">
          <div className="rounded-sm overflow-hidden" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            {pagedList.map((article, i) => (
              <Link
                key={article.id}
                href={`/article/${article.slug}`}
                className="group flex gap-4 p-4 transition-colors hover:bg-white/[0.04]"
                style={{ borderBottom: i < pagedList.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}
              >
                {/* Text */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    {article.articleType && (
                      <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-sm inline-block mb-1.5" style={{ background: category.color, color: "white" }}>
                        {article.articleType}
                      </span>
                    )}
                    <h3
                      className="text-[14px] sm:text-[15px] font-bold leading-snug line-clamp-2 mb-1.5 group-hover:text-[var(--color-accent)] transition-colors"
                      style={{ color: "rgba(255,255,255,0.95)" }}
                    >
                      {article.title}
                    </h3>
                    {article.excerpt && (
                      <p className="text-[12px] leading-relaxed line-clamp-2 hidden sm:block" style={{ color: "var(--color-text-muted)" }}>
                        {article.excerpt}
                      </p>
                    )}
                  </div>
                  <p className="text-[11px] mt-2" style={{ color: "rgba(255,255,255,0.35)" }}>
                    {article.author && (
                      <span className="mr-2 font-semibold" style={{ color: category.color }}>
                        {article.author}
                      </span>
                    )}
                    {formatDate(article.publishedAt)}
                  </p>
                </div>

                {/* Thumbnail */}
                {article.thumbnail && (
                  <div className="relative shrink-0 overflow-hidden rounded-sm" style={{ width: "clamp(100px, 22vw, 180px)", height: "clamp(70px, 15vw, 120px)" }}>
                    <Image src={article.thumbnail} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── PAGINATION ────────────────────────────────────────────────── */}
      {totalPages > 1 && (
        <nav className="flex items-center justify-center gap-1 pb-4" aria-label="Phân trang">
          {currentPage > 1 ? (
            <Link
              href={`/category/${slug}?page=${currentPage - 1}`}
              className="flex items-center justify-center w-9 h-9 rounded-sm text-[13px] font-semibold transition-colors hover:bg-white/10"
              style={{ color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.12)" }}
            >
              ‹
            </Link>
          ) : (
            <span className="flex items-center justify-center w-9 h-9 rounded-sm text-[13px]" style={{ color: "rgba(255,255,255,0.25)", border: "1px solid rgba(255,255,255,0.06)" }}>
              ‹
            </span>
          )}

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={`/category/${slug}?page=${p}`}
              className="flex items-center justify-center w-9 h-9 rounded-sm text-[13px] font-semibold transition-colors"
              style={{
                background: p === currentPage ? "var(--color-accent)" : "transparent",
                color: p === currentPage ? "white" : "rgba(255,255,255,0.65)",
                border: p === currentPage ? "none" : "1px solid rgba(255,255,255,0.12)",
              }}
            >
              {p}
            </Link>
          ))}

          {currentPage < totalPages ? (
            <Link
              href={`/category/${slug}?page=${currentPage + 1}`}
              className="flex items-center justify-center w-9 h-9 rounded-sm text-[13px] font-semibold transition-colors hover:bg-white/10"
              style={{ color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.12)" }}
            >
              ›
            </Link>
          ) : (
            <span className="flex items-center justify-center w-9 h-9 rounded-sm text-[13px]" style={{ color: "rgba(255,255,255,0.25)", border: "1px solid rgba(255,255,255,0.06)" }}>
              ›
            </span>
          )}
        </nav>
      )}
    </div>
  );
}
