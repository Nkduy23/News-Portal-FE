import Image from "next/image";
import Link from "next/link";
import { Article } from "@/types/article";

interface HeroSectionProps {
  articles: Article[];
}

export default function HeroSection({ articles }: HeroSectionProps) {
  // Layout:
  // [0] top-left small  | [1] large center (tall) | [2] top-right small
  // [3] bottom-left small                          | [4] bottom-right small
  const [topLeft, center, topRight, bottomLeft, bottomRight] = articles;

  return (
    <section className="w-full rounded-sm overflow-hidden" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="grid grid-cols-[1fr_1.8fr_1fr] grid-rows-2 gap-px" style={{ background: "rgba(255,255,255,0.06)" }}>
        {/* Top-left */}
        {topLeft && (
          <Link href={`/article/${topLeft.slug}`} className="group relative overflow-hidden" style={{ background: "var(--color-bg)" }}>
            <div className="relative h-[160px]">
              <Image src={topLeft.thumbnail} alt={topLeft.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 20%, rgba(0,0,0,0.8) 100%)" }} />
              <div className="absolute top-1 left-1">
                <span className="vov-badge">VOV</span>
              </div>
              <div className="absolute bottom-0 p-2">
                <p className="text-[12px] font-semibold text-white leading-snug line-clamp-3">{topLeft.title}</p>
              </div>
            </div>
          </Link>
        )}

        {/* Center - spans 2 rows */}
        {center && (
          <Link href={`/article/${center.slug}`} className="group relative overflow-hidden row-span-2" style={{ background: "var(--color-bg)" }}>
            <div className="relative h-full min-h-[320px]">
              <Image src={center.thumbnail} alt={center.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.85) 100%)" }} />
              <div className="absolute top-1 left-1">
                <span className="vov-badge">VOV</span>
              </div>
              <div className="absolute bottom-0 p-4">
                <h2 className="text-[18px] font-bold text-white leading-snug line-clamp-3 mb-2">{center.title}</h2>
                {center.excerpt && <p className="text-[12px] text-white/80 line-clamp-3 leading-relaxed">{center.excerpt}</p>}
              </div>
            </div>
          </Link>
        )}

        {/* Top-right */}
        {topRight && (
          <Link href={`/article/${topRight.slug}`} className="group relative overflow-hidden" style={{ background: "var(--color-bg)" }}>
            <div className="relative h-[160px]">
              <Image src={topRight.thumbnail} alt={topRight.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 20%, rgba(0,0,0,0.8) 100%)" }} />
              <div className="absolute top-1 left-1">
                <span className="vov-badge">VOV</span>
              </div>
              <div className="absolute bottom-0 p-2">
                <p className="text-[12px] font-semibold text-white leading-snug line-clamp-3">{topRight.title}</p>
              </div>
            </div>
          </Link>
        )}

        {/* Bottom-left */}
        {bottomLeft && (
          <Link href={`/article/${bottomLeft.slug}`} className="group relative overflow-hidden" style={{ background: "var(--color-bg)" }}>
            <div className="relative h-[160px]">
              <Image src={bottomLeft.thumbnail} alt={bottomLeft.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 20%, rgba(0,0,0,0.8) 100%)" }} />
              <div className="absolute top-1 left-1">
                <span className="vov-badge">VOV</span>
              </div>
              <div className="absolute bottom-0 p-2">
                <p className="text-[12px] font-semibold text-white leading-snug line-clamp-3">{bottomLeft.title}</p>
              </div>
            </div>
          </Link>
        )}

        {/* Bottom-right */}
        {bottomRight && (
          <Link href={`/article/${bottomRight.slug}`} className="group relative overflow-hidden" style={{ background: "var(--color-bg)" }}>
            <div className="relative h-[160px]">
              <Image src={bottomRight.thumbnail} alt={bottomRight.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 20%, rgba(0,0,0,0.8) 100%)" }} />
              <div className="absolute top-1 left-1">
                <span className="vov-badge">VOV</span>
              </div>
              <div className="absolute bottom-0 p-2">
                <p className="text-[12px] font-semibold text-white leading-snug line-clamp-3">{bottomRight.title}</p>
              </div>
            </div>
          </Link>
        )}
      </div>
    </section>
  );
}
