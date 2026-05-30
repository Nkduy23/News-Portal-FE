import { api } from "@/services/api";
import { getAdminToken } from "@/lib/admin-auth";
import ArticleListClient from "@/components/admin/ArticleListClient";

interface Props {
  searchParams: Promise<{ category?: string }>;
}

export default async function ArticlesPage({ searchParams }: Props) {
  const { category } = await searchParams;

  const token = (await getAdminToken()) ?? "";

  const [articlesRes, categories] = await Promise.all([api.articles.list({ category, limit: 100 }), api.categories.list()]);

  const activeCat = category ? categories.find((c) => c.slug === category) : null;

  return <ArticleListClient articles={articlesRes.data} categories={categories} activeCategorySlug={category} activeCategoryName={activeCat?.nameVi} token={token} />;
}
