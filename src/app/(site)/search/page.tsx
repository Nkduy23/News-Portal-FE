"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { api } from "@/services/api";
import type { Article } from "@/types/article";

const PER_PAGE = 8;

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
}

// ── Empty state ────────────────────────────────────────────────────────────
function EmptyState({ query }: { query: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
      </div>
      <h3 className="text-[16px] font-bold mb-2" style={{ color: "rgba(255,255,255,0.7)" }}>
        Không tìm thấy kết quả
      </h3>
      <p className="text-[13px] max-w-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
        Không có bài viết nào phù hợp với từ khoá{" "}
        <span className="font-semibold" style={{ color: "rgba(255,255,255,0.7)" }}>
          &ldquo;{query}&rdquo;
        </span>
        . Hãy thử từ khoá khác.
      </p>
    </div>
  );
}

// ── Article row card ───────────────────────────────────────────────────────
function ArticleRow({ article, query }: { article: Article; query: string }) {
  // Highlight matching text
  function highlight(text: string) {
    if (!query.trim()) return <>{text}</>;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
    const parts = text.split(regex);
    return (
      <>
        {parts.map((part, i) =>
          regex.test(part) ? (
            <mark key={i} style={{ background: "rgba(232,67,90,0.35)", color: "white", borderRadius: "2px", padding: "0 1px" }}>
              {part}
            </mark>
          ) : (
            part
          ),
        )}
      </>
    );
  }

  return (
    <article className="group flex gap-4 p-4 rounded-sm transition-colors hover:bg-white/[0.04]" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
      {/* Text */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
          {article.articleType && (
            <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-sm" style={{ background: "var(--color-accent)", color: "white" }}>
              {article.articleType}
            </span>
          )}
          <Link href={`/category/${article.categorySlug}`} className="text-[11px] font-semibold hover:underline" style={{ color: "var(--color-accent)" }}>
            {article.categoryName ?? article.category}
          </Link>
        </div>

        <Link href={`/article/${article.slug}`}>
          <h3 className="text-[14px] sm:text-[15px] font-bold leading-snug mb-1.5 group-hover:text-[var(--color-accent)] transition-colors" style={{ color: "rgba(255,255,255,0.95)" }}>
            {highlight(article.title)}
          </h3>
        </Link>

        {article.excerpt && (
          <p className="text-[12px] leading-relaxed line-clamp-2 hidden sm:block" style={{ color: "rgba(255,255,255,0.5)" }}>
            {highlight(article.excerpt)}
          </p>
        )}

        <div className="flex items-center gap-3 mt-2">
          {article.author && (
            <span className="text-[11px] font-semibold" style={{ color: "var(--color-accent)" }}>
              {article.author}
            </span>
          )}
          <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.3)" }}>
            {formatDate(article.publishedAt)}
          </span>
          {article.tags && article.tags.length > 0 && (
            <div className="hidden sm:flex gap-1.5">
              {article.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.45)" }}>
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Thumbnail */}
      {article.thumbnail && (
        <Link href={`/article/${article.slug}`}>
          <div className="relative shrink-0 overflow-hidden rounded-sm" style={{ width: "clamp(90px, 20vw, 160px)", height: "clamp(65px, 14vw, 110px)" }}>
            <Image src={article.thumbnail} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
          </div>
        </Link>
      )}
    </article>
  );
}

// ── Pagination ─────────────────────────────────────────────────────────────
function Pagination({ current, total, onChange }: { current: number; total: number; onChange: (p: number) => void }) {
  if (total <= 1) return null;
  return (
    <nav className="flex items-center justify-center gap-1 pt-6" aria-label="Phân trang">
      <button
        onClick={() => onChange(current - 1)}
        disabled={current === 1}
        className="flex items-center justify-center w-9 h-9 rounded-sm text-[13px] font-semibold transition-colors hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
        style={{ border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.7)" }}
      >
        ‹
      </button>

      {Array.from({ length: total }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className="flex items-center justify-center w-9 h-9 rounded-sm text-[13px] font-semibold transition-colors"
          style={{
            background: p === current ? "var(--color-accent)" : "transparent",
            color: p === current ? "white" : "rgba(255,255,255,0.65)",
            border: p === current ? "none" : "1px solid rgba(255,255,255,0.12)",
          }}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onChange(current + 1)}
        disabled={current === total}
        className="flex items-center justify-center w-9 h-9 rounded-sm text-[13px] font-semibold transition-colors hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
        style={{ border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.7)" }}
      >
        ›
      </button>
    </nav>
  );
}

// ── Main search content ────────────────────────────────────────────────────
function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialQ = searchParams.get("q") ?? "";
  const initialPage = Math.max(1, parseInt(searchParams.get("page") ?? "1"));

  const [inputValue, setInputValue] = useState(initialQ);
  const [query, setQuery] = useState(initialQ);
  const [page, setPage] = useState(initialPage);
  const [results, setResults] = useState<Article[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(!!initialQ);

  // Gọi API khi query hoặc page thay đổi
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setTotal(0);
      return;
    }

    setLoading(true);
    api.articles
      .list({ search: query, status: "published", page, limit: PER_PAGE })
      .then(({ data, meta }) => {
        setResults(data);
        setTotal(meta.total);
        setHasSearched(true);
      })
      .catch(() => {
        setResults([]);
        setTotal(0);
      })
      .finally(() => setLoading(false));
  }, [query, page]);

  // Sync URL
  useEffect(() => {
    if (!query.trim()) return;
    const params = new URLSearchParams();
    params.set("q", query);
    if (page > 1) params.set("page", String(page));
    router.replace(`/search?${params.toString()}`, { scroll: false });
  }, [query, page, router]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setPage(1);
      setQuery(inputValue.trim());
    },
    [inputValue],
  );

  const handlePageChange = (p: number) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const totalPages = Math.ceil(total / PER_PAGE);

  return (
    <div className="max-w-[860px] mx-auto px-4 py-8">
      <h1 className="text-[24px] sm:text-[28px] font-extrabold uppercase mb-6" style={{ color: "var(--color-accent)", fontFamily: "var(--font-display)" }}>
        Tìm kiếm
      </h1>

      {/* Search input */}
      <form onSubmit={handleSubmit} className="relative mb-8">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Nhập từ khoá tìm kiếm..."
          autoFocus
          className="w-full pl-5 pr-14 py-4 rounded-sm text-[14px] outline-none transition-colors"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", color: "white" }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-accent)")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)")}
        />
        <button
          type="submit"
          className="absolute right-0 top-0 h-full px-4 flex items-center justify-center transition-colors hover:text-[var(--color-accent)]"
          style={{ color: "rgba(255,255,255,0.5)" }}
          aria-label="Tìm kiếm"
        >
          <SearchIcon />
        </button>
      </form>

      {/* Result summary */}
      {hasSearched && query && (
        <p className="text-[13px] mb-5" style={{ color: "rgba(255,255,255,0.45)" }}>
          {total > 0 ? (
            <>
              Tìm thấy <span className="font-bold text-white">{total}</span> kết quả cho từ khoá{" "}
              <span className="font-bold" style={{ color: "var(--color-accent)" }}>
                &ldquo;{query}&rdquo;
              </span>
            </>
          ) : (
            <>
              Tìm kiếm cho:{" "}
              <span className="font-bold" style={{ color: "var(--color-accent)" }}>
                &ldquo;{query}&rdquo;
              </span>
            </>
          )}
        </p>
      )}

      {/* Loading */}
      {loading && (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-24 rounded-sm animate-pulse" style={{ background: "rgba(255,255,255,0.05)" }} />
          ))}
        </div>
      )}

      {/* Results */}
      {!loading && hasSearched && query && total === 0 && <EmptyState query={query} />}

      {!loading && results.length > 0 && (
        <>
          <div className="space-y-3">
            {results.map((article) => (
              <ArticleRow key={article.id} article={article} query={query} />
            ))}
          </div>
          <Pagination current={page} total={totalPages} onChange={handlePageChange} />
        </>
      )}

      {/* Idle state */}
      {!hasSearched && (
        <div className="text-center py-16">
          <p className="text-[14px]" style={{ color: "rgba(255,255,255,0.3)" }}>
            Nhập từ khoá để bắt đầu tìm kiếm bài viết.
          </p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-[860px] mx-auto px-4 py-8">
          <div className="h-10 w-48 rounded-sm mb-6 animate-pulse" style={{ background: "rgba(255,255,255,0.08)" }} />
          <div className="h-14 rounded-sm animate-pulse" style={{ background: "rgba(255,255,255,0.06)" }} />
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
