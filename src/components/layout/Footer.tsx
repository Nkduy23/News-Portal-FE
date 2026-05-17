import Image from "next/image";
import Link from "next/link";
import { navItems } from "@/data/mock-data";

export default function Footer() {
  return (
    <footer className="relative w-full mt-8 overflow-hidden" style={{ backgroundColor: "#0a1628", borderTop: "3px solid #c0122b" }}>
      {/* Decorative footer SVGs */}
      <div className="absolute left-0 bottom-0 pointer-events-none select-none" style={{ width: "clamp(60px, 10vw, 160px)", height: "100%" }}>
        <Image src="/left-footer.c98d66a6.svg" alt="" fill className="object-contain object-left-bottom" />
      </div>
      <div className="absolute right-0 bottom-0 pointer-events-none select-none" style={{ width: "clamp(60px, 10vw, 160px)", height: "100%" }}>
        <Image src="/right-footer.87f46fe3.svg" alt="" fill className="object-contain object-right-bottom" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 py-8">
        {/* Footer nav */}
        <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-6">
          {navItems.map((item) => (
            <Link key={item.slug} href={`/category/${item.slug}`} className="text-[12px] text-white/70 hover:text-white transition-colors">
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Logo */}
        <div className="flex justify-center mb-4">
          <Link href="/">
            <Image src="/VOV-White.579d34df.svg" alt="VOV" width={64} height={22} />
          </Link>
        </div>

        {/* Address info */}
        <div className="text-center space-y-1">
          <p className="text-[12px] text-white/60">
            <span className="font-semibold text-white/80">Tổng biên tập:</span> NGÔ TIÊU PHONG
          </p>
          <p className="text-[12px] text-white/60">Phó Tổng biên tập: Phạm Công Hán, Đặng Thị Khánh, Giang Trung Sơn, Nguyễn Thị Hội</p>
          <div className="flex flex-wrap justify-center gap-4 mt-2 text-[12px] text-white/60">
            <span>Địa chỉ: 37 Bà Triệu, Cửa Nam, Hà Nội, Việt Nam</span>
            <span>Điện thoại: 84-24-22058588; 84-24-3571/85/85</span>
          </div>
          <p className="text-[12px] text-white/60">Cơ quan chủ quản: ĐÀI TIẾNG NÓI VIỆT NAM</p>
          <p className="text-[11px] text-white/40 mt-3">© 2026 VOV.VN – Đài Tiếng Nói Việt Nam. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
