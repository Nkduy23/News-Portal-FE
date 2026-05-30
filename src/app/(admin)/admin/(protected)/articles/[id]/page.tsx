import { api } from "@/services/api";
import { getAdminToken } from "@/lib/admin-auth";
import ArticleFormClient from "@/components/admin/ArticleFormClient";
import { notFound } from "next/navigation";

// Render động tất cả các id (kể cả UUID), không dùng static generation
export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ArticleEditPage({ params }: Props) {
  const { id } = await params;
  const isNew = id === "new";

  const [article, categories, token] = await Promise.all([isNew ? Promise.resolve(null) : api.articles.getById(id).catch(() => null), api.categories.list(), getAdminToken()]);

  if (!isNew && !article) notFound();

  return <ArticleFormClient article={article} categories={categories} isNew={isNew} token={token ?? ""} />;
}
