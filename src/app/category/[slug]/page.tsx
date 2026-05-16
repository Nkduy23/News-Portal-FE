import { categories } from "@/data/mock-data";
import Link from "next/link";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);

  return (
    <div className="max-w-[1080px] mx-auto px-4 py-8">
      <nav className="flex items-center gap-2 text-[12px] mb-4" style={{ color: "var(--color-text-muted)" }}>
        <Link href="/" className="hover:text-white transition-colors">
          Trang chủ
        </Link>
        <span>/</span>
        <span>{category?.nameVi ?? slug}</span>
      </nav>

      <h1 className="text-[28px] font-extrabold uppercase mb-6" style={{ color: "var(--color-accent)" }}>
        {category?.nameVi ?? slug}
      </h1>

      <p style={{ color: "var(--color-text-muted)" }}>Nội dung chuyên mục đang được cập nhật...</p>
    </div>
  );
}
