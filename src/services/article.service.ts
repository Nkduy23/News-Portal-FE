import {
  heroArticles,
  kyUcLamBaoArticles,
  datNuocVaoXuanArticles,
  benChenTraXuanArticles,
  sacMauGiaiTriArticles,
  tetMuonNoiArticles,
  khatVongVietArticles,
  camNangTetArticles,
  tetAroundTownArticles,
  chucXuanArticles,
} from "@/data/mock-data";
import { Article } from "@/types/article";

const ALL_ARTICLES: Article[] = [
  ...heroArticles,
  ...kyUcLamBaoArticles,
  ...datNuocVaoXuanArticles,
  ...benChenTraXuanArticles,
  ...sacMauGiaiTriArticles,
  ...tetMuonNoiArticles,
  ...khatVongVietArticles,
  ...camNangTetArticles,
  ...tetAroundTownArticles,
  ...chucXuanArticles,
];

// Deduplicate by slug (hero articles may overlap with category articles)
const UNIQUE_ARTICLES = Array.from(new Map(ALL_ARTICLES.map((a) => [a.slug, a])).values());

export const articleService = {
  getHeroArticles: (): Article[] => heroArticles,
  getKyUcLamBao: (): Article[] => kyUcLamBaoArticles,
  getDatNuocVaoXuan: (): Article[] => datNuocVaoXuanArticles,
  getBenChenTraXuan: (): Article[] => benChenTraXuanArticles,
  getSacMauGiaiTri: (): Article[] => sacMauGiaiTriArticles,
  getTetMuonNoi: (): Article[] => tetMuonNoiArticles,
  getKhatVongViet: (): Article[] => khatVongVietArticles,
  getCamNangTet: (): Article[] => camNangTetArticles,
  getTetAroundTown: (): Article[] => tetAroundTownArticles,
  getChucXuan: (): Article[] => chucXuanArticles,

  /** Return articles for a given category slug */
  getByCategory: (slug: string): Article[] => UNIQUE_ARTICLES.filter((a) => a.categorySlug === slug),

  /** Get related articles: same category, exclude current slug, up to limit */
  getRelated: (currentSlug: string, categorySlug: string, limit = 4): Article[] => UNIQUE_ARTICLES.filter((a) => a.categorySlug === categorySlug && a.slug !== currentSlug).slice(0, limit),

  getArticleBySlug: (slug: string): Article | undefined => UNIQUE_ARTICLES.find((a) => a.slug === slug),
};

export type SearchResult = {
  articles: Article[];
  total: number;
};

/**
 * Search articles by keyword.
 * Matches against: title, excerpt, tags, category, articleType (case-insensitive).
 * Returns paginated result.
 */
export function searchArticles(query: string, page = 1, perPage = 8): SearchResult {
  const q = query.trim().toLowerCase();
  if (!q) return { articles: [], total: 0 };

  const matched = UNIQUE_ARTICLES.filter((a) => {
    return (
      a.title.toLowerCase().includes(q) ||
      (a.excerpt ?? "").toLowerCase().includes(q) ||
      (a.articleType ?? "").toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q) ||
      (a.tags ?? []).some((t) => t.toLowerCase().includes(q))
    );
  });

  const start = (page - 1) * perPage;
  return {
    articles: matched.slice(start, start + perPage),
    total: matched.length,
  };
}
