import { articleService } from "@/services/article.service";
import { categories } from "@/data/mock-data";
import ArticleFormClient from "@/components/admin/ArticleFormClient";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ArticleEditPage({ params }: Props) {
  const { id } = await params;
  const isNew = id === "new";

  const article = isNew ? null : articleService.getAll().find((a) => a.id === id);

  if (!isNew && !article) notFound();

  return <ArticleFormClient article={article ?? null} categories={categories} isNew={isNew} />;
}

export async function generateStaticParams() {
  // Only pre-render /new; actual article IDs will be handled at runtime
  return [{ id: "new" }];
}
