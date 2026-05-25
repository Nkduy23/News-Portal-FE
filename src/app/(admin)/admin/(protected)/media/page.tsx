import { articleService } from "@/services/article.service";
import MediaClient from "@/components/admin/MediaClient";

export default function MediaPage() {
  const images = articleService
    .getAll()
    .filter((a) => a.thumbnail)
    .map((a) => ({ src: a.thumbnail, title: a.title, id: a.id, articleId: a.id }));

  return <MediaClient images={images} />;
}
