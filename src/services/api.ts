import type { Article } from "@/types/article";

// ─── Base ────────────────────────────────────────────────────────────────────

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api/v1";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const { headers: optHeaders, ...restOptions } = options ?? {};

  const res = await fetch(`${BASE_URL}${path}`, {
    ...restOptions,
    headers: {
      "Content-Type": "application/json",
      ...optHeaders,
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error?.message ?? `Request failed: ${res.status}`);
  }

  return res.json() as Promise<T>;
}
// ─── Types ───────────────────────────────────────────────────────────────────

export type { Article };

export interface Category {
  id: string;
  slug: string;
  name: string;
  nameVi: string;
  color: string;
}

export interface PaginatedArticles {
  data: Article[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface HomeData {
  hero: Article[];
  sections: {
    datNuocVaoXuan: Article[];
    benChenTraXuan: Article[];
    sacMauGiaiTri: Article[];
    tetMuonNoi: Article[];
    khatVongViet: Article[];
    camNangTet: Article[];
    tetAroundTown: Article[];
    chucXuan: Article[];
  };
}

export interface DashboardStats {
  total: number;
  published: number;
  draft: number;
  featured: number;
}

export interface LoginResponse {
  access_token: string;
}

// ─── API ─────────────────────────────────────────────────────────────────────

export const api = {
  // ── Home ──────────────────────────────────────────────────────────────────
  home: {
    getData: () => request<HomeData>("/home"),
  },

  // ── Articles ──────────────────────────────────────────────────────────────
  articles: {
    /** Danh sách có filter + phân trang */
    list: (params?: { category?: string; search?: string; status?: "published" | "draft"; featured?: boolean; page?: number; limit?: number }) => {
      const qs = new URLSearchParams();
      if (params?.category) qs.set("category", params.category);
      if (params?.search) qs.set("search", params.search);
      if (params?.status) qs.set("status", params.status);
      if (params?.featured !== undefined) qs.set("featured", String(params.featured));
      if (params?.page) qs.set("page", String(params.page));
      if (params?.limit) qs.set("limit", String(params.limit));
      const query = qs.toString();
      return request<PaginatedArticles>(`/articles${query ? `?${query}` : ""}`);
    },

    /** 5 bài isFeatured mới nhất */
    featured: () => request<Article[]>("/articles/featured"),

    /** Chi tiết theo slug */
    getBySlug: (slug: string) => request<Article>(`/articles/${slug}`),

    /** Lấy theo ID — dùng trong admin edit */
    getById: (id: string) => request<Article>(`/articles/by-id/${id}`),

    /** Bài viết liên quan */
    related: (slug: string, limit = 4) => request<Article[]>(`/articles/${slug}/related?limit=${limit}`),

    /** Admin: tạo bài */
    create: (data: Partial<Article>, token: string) =>
      request<Article>("/articles", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(data),
      }),

    /** Admin: cập nhật bài */
    update: (id: string, data: Partial<Article>, token: string) =>
      request<Article>(`/articles/${id}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(data),
      }),

    /** Admin: bật/tắt featured */
    setFeatured: (id: string, isFeatured: boolean, token: string) =>
      request<Article>(`/articles/${id}/featured`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({ isFeatured }),
      }),

    /** Admin: xóa bài */
    remove: (id: string, token: string) =>
      request<void>(`/articles/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }),

    /** Admin: dashboard stats */
    stats: (token: string) =>
      request<DashboardStats>("/articles/admin/stats", {
        headers: { Authorization: `Bearer ${token}` },
      }),
  },

  // ── Categories ────────────────────────────────────────────────────────────
  categories: {
    /** Toàn bộ danh mục */
    list: () => request<Category[]>("/categories"),

    /** Chi tiết category theo slug */
    getBySlug: (slug: string) => request<Category>(`/categories/${slug}`),

    /** Admin: tạo */
    create: (data: Partial<Category>, token: string) =>
      request<Category>("/categories", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(data),
      }),

    /** Admin: cập nhật */
    update: (id: string, data: Partial<Category>, token: string) =>
      request<Category>(`/categories/${id}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(data),
      }),

    /** Admin: xóa */
    remove: (id: string, token: string) =>
      request<void>(`/categories/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }),
  },

  // ── Auth ──────────────────────────────────────────────────────────────────
  auth: {
    login: (email: string, password: string) =>
      request<LoginResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      }),

    me: (token: string) =>
      request<{ email: string; role: string }>("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      }),
  },
};
