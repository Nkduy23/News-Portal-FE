import { api } from "@/services/api";
import { getAdminToken } from "@/lib/admin-auth";
import HeroClient from "@/components/admin/HeroClient";

export const dynamic = "force-dynamic";

export default async function HeroPage() {
  const [articlesRes, categories, token] = await Promise.all([api.articles.list({ status: "published", limit: 100 }), api.categories.list(), getAdminToken()]);

  const all = articlesRes.data;
  const featured = all.filter((a) => a.isFeatured);

  return <HeroClient featuredArticles={featured} allPublished={all} categories={categories} token={token ?? ""} />;
}
