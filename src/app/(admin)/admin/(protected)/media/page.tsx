import { api } from "@/services/api";
import MediaClient from "@/components/admin/MediaClient";

export const dynamic = "force-dynamic";

export default async function MediaPage() {
  const articlesRes = await api.articles.list({ limit: 100 });

  const images = articlesRes.data
    .filter((a) => a.thumbnail)
    .map((a) => ({
      src: a.thumbnail!,
      title: a.title,
      id: a.id,
      articleId: a.id,
    }));

  return <MediaClient images={images} />;
}
