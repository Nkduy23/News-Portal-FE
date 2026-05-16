"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/data/mock-data";
import { Search } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="w-full sticky top-0 z-50" style={{ backgroundColor: "#c0122b" }}>
      <div className="max-w-[1080px] mx-auto px-4 flex items-center">
        {/* Nav links */}
        <ul className="flex items-center overflow-x-auto scrollbar-none flex-1 gap-0">
          {navItems.map((item) => {
            const isActive = pathname === `/category/${item.slug}`;
            return (
              <li key={item.slug} className="shrink-0">
                <Link
                  href={`/category/${item.slug}`}
                  className={`block px-3 py-3 text-[13px] font-semibold whitespace-nowrap transition-colors hover:bg-white/10 ${isActive ? "bg-white/20 text-white" : "text-white/90"}`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Search icon */}
        <button className="p-3 text-white hover:bg-white/10 transition-colors shrink-0" aria-label="Tìm kiếm">
          <Search size={16} />
        </button>
      </div>
    </nav>
  );
}
