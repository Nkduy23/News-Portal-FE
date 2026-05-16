import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="relative w-full overflow-hidden" style={{ background: "linear-gradient(180deg, #0a1628 0%, #1a2e50 100%)" }}>
      {/* Decorative left & right SVGs */}
      <div className="absolute left-0 top-0 h-full pointer-events-none select-none" style={{ width: "clamp(80px, 12vw, 200px)" }}>
        <Image src="/left.a7f0bbbe.svg" alt="" fill className="object-contain object-left-top" priority />
      </div>
      <div className="absolute right-0 top-0 h-full pointer-events-none select-none" style={{ width: "clamp(80px, 12vw, 200px)" }}>
        <Image src="/right.705d4cd9.svg" alt="" fill className="object-contain object-right-top" priority />
      </div>

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center py-3 px-4">
        {/* VOV Logo */}
        <Link href="/" className="mb-2">
          <Image src="/VOV-White.579d34df.svg" alt="VOV" width={80} height={28} priority />
        </Link>

        {/* Slogan webp */}
        <Link href="/">
          <Image
            src="/slogan.4e0c75ed.webp"
            alt="Xuân Bình Ngọ 2026 - Việt Nam tự cường - Bứt phá vươn xa"
            width={560}
            height={80}
            priority
            className="max-w-full"
            style={{ maxWidth: "min(560px, 80vw)" }}
          />
        </Link>
      </div>
    </header>
  );
}
