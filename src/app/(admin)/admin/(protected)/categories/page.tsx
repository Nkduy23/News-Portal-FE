import { api } from "@/services/api";
import { getAdminToken } from "@/lib/admin-auth";
import CategoriesClient from "@/components/admin/CategoriesClient";

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  const [categories, articlesRes, token] = await Promise.all([api.categories.list(), api.articles.list({ limit: 100 }), getAdminToken()]);

  // Tính số bài viết của từng category
  const categoryStats = categories.map((c) => ({
    ...c,
    count: articlesRes.data.filter((a) => a.categorySlug === c.slug).length,
  }));

  return <CategoriesClient initialCategories={categoryStats} token={token ?? ""} />;
}
