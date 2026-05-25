export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  thumbnail: string;
  content?: string;

  // Classification
  category: string;
  categorySlug: string;
  articleType?: string;
  tags?: string[];

  // Authoring
  author?: string;
  publishedAt: string;

  // Display flags
  /** When true, article appears in the Hero/Featured section on the homepage */
  isFeatured?: boolean;

  status: "published" | "draft";
}
