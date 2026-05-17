export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  content?: string; // HTML string rendered via dangerouslySetInnerHTML
  thumbnail: string;
  category: string; // VOV section display name (e.g. "Ký ức làm báo")
  categorySlug: string; // VOV section slug
  articleType?: string; // Editorial label at top of article (e.g. "Văn hoá", "Chính trị")
  publishedAt: string; // ISO datetime "2026-01-25T14:44:00"
  author?: string;
  tags?: string[];
}
