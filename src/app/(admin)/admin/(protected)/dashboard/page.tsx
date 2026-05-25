import { articleService } from "@/services/article.service";
import { categories } from "@/data/mock-data";
import DashboardClient from "@/components/admin/DashboardClient";

export default function DashboardPage() {
  const articles = articleService.getAll();

  const stats = {
    total: articles.length,
    published: articles.filter((a) => a.status === "published").length,
    draft: articles.filter((a) => a.status === "draft").length,
    featured: articles.filter((a) => a.isFeatured).length,
  };

  const categoryStats = categories.map((c) => ({
    ...c,
    count: articles.filter((a) => a.categorySlug === c.slug).length,
  }));

  const recent = [...articles].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()).slice(0, 8);

  return <DashboardClient stats={stats} categoryStats={categoryStats} recentArticles={recent} allArticles={articles} />;
}
