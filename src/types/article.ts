export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  thumbnail: string;
  content?: string;

  // Classification
  categoryName: string; // tên hiển thị (vd: "Bên chén trà Xuân")
  categorySlug: string; // dùng để filter/link (vd: "ben-chen-tra-xuan")
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
