import { articleService } from "@/services/article.service";
import { categories } from "@/data/mock-data";
import HeroClient from "@/components/admin/HeroClient";

export default function HeroPage() {
  const all = articleService.getAll();
  const featured = articleService.getHeroArticles();
  const published = all.filter((a) => a.status === "published");

  return <HeroClient featuredArticles={featured} allPublished={published} categories={categories} />;
}
