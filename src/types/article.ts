export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  content?: string;
  thumbnail: string;
  category: string;
  categorySlug: string;
  publishedAt: string;
  author?: string;
  tags?: string[];
}
