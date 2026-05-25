import { articleService } from "@/services/article.service";
import { categories } from "@/data/mock-data";
import ArticleListClient from "@/components/admin/ArticleListClient";

interface Props {
  searchParams: Promise<{ category?: string }>;
}

export default async function ArticlesPage({ searchParams }: Props) {
  const { category } = await searchParams;
  const articles = articleService.getAll();
  const activeCat = category ? categories.find((c) => c.slug === category) : null;

  return <ArticleListClient articles={articles} categories={categories} activeCategorySlug={category} activeCategoryName={activeCat?.name} />;
}
