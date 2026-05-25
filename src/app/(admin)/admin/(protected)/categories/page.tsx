import { categories } from "@/data/mock-data";
import { articleService } from "@/services/article.service";
import CategoriesClient from "@/components/admin/CategoriesClient";

export default function CategoriesPage() {
  const articles = articleService.getAll();
  const categoryStats = categories.map((c) => ({
    ...c,
    count: articles.filter((a) => a.categorySlug === c.slug).length,
  }));

  return <CategoriesClient initialCategories={categoryStats} />;
}
