import Image from "next/image";
import Link from "next/link";
import { Article } from "@/types/article";
import SectionHeader from "@/components/ui/SectionHeader";

interface ChucXuanSectionProps {
  articles: Article[];
}

export default function ChucXuanSection({ articles }: ChucXuanSectionProps) {
  const topLeft = articles[0];
  const bottomLeft = articles[3];
  const center = articles[2];
  const topRight = articles[1];
  const bottomRight = articles[4];

  return (
    <section className="mt-8">
      <SectionHeader title="Chúc Xuân" slug="chuc-xuan" />

      <div className="rounded-sm overflow-hidden p-3 md:p-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
        {/* Desktop: mosaic grid */}
        <div className="hidden md:grid grid-cols-[1fr_1.6fr_1fr] gap-3" style={{ height: 300 }}>
          {/* Left col */}
          <div className="flex flex-col gap-3 h-full">
            {topLeft && (
              <Link href={`/article/${topLeft.slug}`} className="group relative block overflow-hidden rounded-sm flex-1">
                <Image src={topLeft.thumbnail} alt={topLeft.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.85) 100%)" }} />
                <div className="absolute bottom-0 p-2">
                  <h3 className="text-[12px] font-bold text-white leading-snug line-clamp-3 group-hover:text-[var(--color-accent)] transition-colors">{topLeft.title}</h3>
                </div>
              </Link>
            )}
            {bottomLeft && (
              <Link href={`/article/${bottomLeft.slug}`} className="group relative block overflow-hidden rounded-sm flex-1">
                <Image src={bottomLeft.thumbnail} alt={bottomLeft.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.85) 100%)" }} />
                <div className="absolute bottom-0 p-2">
                  <h3 className="text-[12px] font-bold text-white leading-snug line-clamp-3 group-hover:text-[var(--color-accent)] transition-colors">{bottomLeft.title}</h3>
                </div>
              </Link>
            )}
          </div>

          {/* Center large */}
          {center && (
            <Link href={`/article/${center.slug}`} className="group relative block overflow-hidden rounded-sm">
              <Image src={center.thumbnail} alt={center.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.9) 100%)" }} />
              <div className="absolute top-2 left-2">
                <span className="vov-badge">VOV</span>
              </div>
              <div className="absolute bottom-0 p-4">
                <h3 className="text-[15px] font-bold text-white leading-snug line-clamp-3 group-hover:text-[var(--color-accent)] transition-colors">{center.title}</h3>
              </div>
            </Link>
          )}

          {/* Right col */}
          <div className="flex flex-col gap-3 h-full">
            {topRight && (
              <Link href={`/article/${topRight.slug}`} className="group relative block overflow-hidden rounded-sm flex-1">
                <Image src={topRight.thumbnail} alt={topRight.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.85) 100%)" }} />
                <div className="absolute top-0 left-0 right-0 p-1" style={{ background: "rgba(192,18,43,0.85)" }}>
                  <p className="text-[10px] text-white font-bold text-center">GIÁ BÁO ĐIỆN TỬ TIẾNG NÓI VIỆT NAM</p>
                </div>
                <div className="absolute bottom-0 p-2">
                  <h3 className="text-[12px] font-bold text-white leading-snug line-clamp-2 group-hover:text-[var(--color-accent)] transition-colors">{topRight.title}</h3>
                </div>
              </Link>
            )}
            {bottomRight && (
              <Link href={`/article/${bottomRight.slug}`} className="group relative block overflow-hidden rounded-sm flex-1">
                <Image src={bottomRight.thumbnail} alt={bottomRight.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.85) 100%)" }} />
                <div className="absolute bottom-0 p-2">
                  <h3 className="text-[12px] font-bold text-white leading-snug line-clamp-3 group-hover:text-[var(--color-accent)] transition-colors">{bottomRight.title}</h3>
                </div>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile: center hero on top, 4 cards in 2x2 grid below */}
        <div className="md:hidden flex flex-col gap-3">
          {center && (
            <Link href={`/article/${center.slug}`} className="group relative block overflow-hidden rounded-sm" style={{ height: 200 }}>
              <Image src={center.thumbnail} alt={center.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 35%, rgba(0,0,0,0.9) 100%)" }} />
              <div className="absolute top-2 left-2">
                <span className="vov-badge">VOV</span>
              </div>
              <div className="absolute bottom-0 p-3">
                <h3 className="text-[14px] font-bold text-white leading-snug line-clamp-2 group-hover:text-[var(--color-accent)] transition-colors">{center.title}</h3>
              </div>
            </Link>
          )}

          <div className="grid grid-cols-2 gap-3">
            {[topLeft, topRight, bottomLeft, bottomRight].filter(Boolean).map((article) => (
              <Link key={article!.id} href={`/article/${article!.slug}`} className="group relative block overflow-hidden rounded-sm" style={{ height: 120 }}>
                <Image src={article!.thumbnail} alt={article!.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 25%, rgba(0,0,0,0.85) 100%)" }} />
                <div className="absolute bottom-0 p-2">
                  <h3 className="text-[11px] font-bold text-white leading-snug line-clamp-2 group-hover:text-[var(--color-accent)] transition-colors">{article!.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
