import { api } from "@/services/api";
import { getAdminToken } from "@/lib/admin-auth";
import DashboardClient from "@/components/admin/DashboardClient";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const token = (await getAdminToken()) ?? "";

  const [stats, articlesRes, categories] = await Promise.all([api.articles.stats(token), api.articles.list({ limit: 100 }), api.categories.list()]);

  const articles = articlesRes.data;

  const categoryStats = categories.map((c) => ({
    ...c,
    count: articles.filter((a) => a.categorySlug === c.slug).length,
  }));

  const recent = [...articles].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()).slice(0, 20); // lấy nhiều hơn để filter range ngày ở client còn data

  return <DashboardClient stats={stats} categoryStats={categoryStats} recentArticles={recent} allArticles={articles} />;
}
