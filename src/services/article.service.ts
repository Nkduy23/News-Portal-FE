import {
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
  ...datNuocVaoXuanArticles,
  ...kyUcLamBaoArticles,
  ...benChenTraXuanArticles,
  ...sacMauGiaiTriArticles,
  ...tetMuonNoiArticles,
  ...khatVongVietArticles,
  ...camNangTetArticles,
  ...tetAroundTownArticles,
  ...chucXuanArticles,
];

// Deduplicate by slug
const UNIQUE_ARTICLES = Array.from(new Map(ALL_ARTICLES.map((a) => [a.slug, a])).values());

export const articleService = {
  getAll: (): Article[] => UNIQUE_ARTICLES,

  /**
   * Returns articles marked isFeatured: true, sorted by publishedAt desc.
   * Max 5 — matches the Hero section on the homepage.
   */
  getHeroArticles: (): Article[] =>
    UNIQUE_ARTICLES.filter((a) => a.isFeatured && a.status === "published")
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, 5),

  getKyUcLamBao: (): Article[] => kyUcLamBaoArticles,
  getDatNuocVaoXuan: (): Article[] => datNuocVaoXuanArticles,
  getBenChenTraXuan: (): Article[] => benChenTraXuanArticles,
  getSacMauGiaiTri: (): Article[] => sacMauGiaiTriArticles,
  getTetMuonNoi: (): Article[] => tetMuonNoiArticles,
  getKhatVongViet: (): Article[] => khatVongVietArticles,
  getCamNangTet: (): Article[] => camNangTetArticles,
  getTetAroundTown: (): Article[] => tetAroundTownArticles,
  getChucXuan: (): Article[] => chucXuanArticles,

  getByCategory: (slug: string): Article[] => UNIQUE_ARTICLES.filter((a) => a.categorySlug === slug),

  getRelated: (currentSlug: string, categorySlug: string, limit = 4): Article[] => UNIQUE_ARTICLES.filter((a) => a.categorySlug === categorySlug && a.slug !== currentSlug).slice(0, limit),

  getArticleBySlug: (slug: string): Article | undefined => UNIQUE_ARTICLES.find((a) => a.slug === slug),
};

export type SearchResult = {
  articles: Article[];
  total: number;
};

export function searchArticles(query: string, page = 1, perPage = 8): SearchResult {
  const q = query.trim().toLowerCase();
  if (!q) return { articles: [], total: 0 };

  const matched = UNIQUE_ARTICLES.filter(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      (a.excerpt ?? "").toLowerCase().includes(q) ||
      (a.articleType ?? "").toLowerCase().includes(q) ||
      a.categoryName.toLowerCase().includes(q) ||
      (a.tags ?? []).some((t) => t.toLowerCase().includes(q)),
  );

  const start = (page - 1) * perPage;
  return { articles: matched.slice(start, start + perPage), total: matched.length };
}
