"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { navItems } from "@/data/mock-data";
import { Search, Menu, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Focus input when search opens
  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus();
    }
  }, [searchOpen]);

  // Close menu when route changes
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <nav className="w-full sticky top-0 z-50" style={{ backgroundColor: "#c0122b" }}>
      {/* Main bar */}
      <div className="max-w-[1080px] mx-auto flex items-center">
        {/* Hamburger — mobile only */}
        <button
          className="md:hidden p-2.5 text-white hover:bg-white/10 transition-colors shrink-0"
          aria-label="Mở menu"
          onClick={() => {
            setMenuOpen((v) => !v);
            setSearchOpen(false);
          }}
        >
          {menuOpen ? <X size={17} /> : <Menu size={17} />}
        </button>

        {/* Nav links — hidden on mobile (shown in dropdown), visible on md+ */}
        <ul className="hidden md:flex items-center flex-1 overflow-x-auto" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {navItems.map((item) => {
            const isActive = pathname === `/category/${item.slug}`;
            return (
              <li key={item.slug} className="shrink-0">
                <Link
                  href={`/category/${item.slug}`}
                  className={`block px-2.5 py-2.5 text-[13px] font-semibold whitespace-nowrap transition-colors hover:bg-white/10 ${isActive ? "bg-white/20 text-white" : "text-white/90"}`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile: scrollable nav strip (always visible) */}
        <ul className="md:hidden flex items-center flex-1 overflow-x-auto" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {navItems.map((item) => {
            const isActive = pathname === `/category/${item.slug}`;
            return (
              <li key={item.slug} className="shrink-0">
                <Link
                  href={`/category/${item.slug}`}
                  className={`block px-2.5 py-2.5 text-[11px] font-semibold whitespace-nowrap transition-colors hover:bg-white/10 ${isActive ? "bg-white/20 text-white" : "text-white/90"}`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Search icon */}
        <button
          className="p-2.5 text-white hover:bg-white/10 transition-colors shrink-0"
          aria-label="Tìm kiếm"
          onClick={() => {
            setSearchOpen((v) => !v);
            setMenuOpen(false);
          }}
        >
          {searchOpen ? <X size={15} /> : <Search size={15} />}
        </button>
      </div>

      {/* Search bar — slides down when open */}
      <div className="overflow-hidden transition-all duration-200" style={{ maxHeight: searchOpen ? 64 : 0 }}>
        <form onSubmit={handleSearchSubmit} className="max-w-[1080px] mx-auto px-3 py-2 flex gap-2 items-center">
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            placeholder="Nhập từ khóa tìm kiếm..."
            className="flex-1 px-3 py-2 rounded-sm text-[13px] outline-none"
            style={{
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.25)",
              color: "white",
            }}
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-sm text-[12px] font-semibold text-white transition-colors hover:bg-white/20"
            style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)" }}
          >
            Tìm
          </button>
        </form>
      </div>

      {/* Mobile full menu dropdown */}
      {menuOpen && (
        <div className="md:hidden border-t" style={{ borderColor: "rgba(255,255,255,0.15)", background: "#a81025" }}>
          <ul className="max-w-[1080px] mx-auto flex flex-col">
            {navItems.map((item) => {
              const isActive = pathname === `/category/${item.slug}`;
              return (
                <li key={item.slug}>
                  <Link
                    href={`/category/${item.slug}`}
                    className={`block px-4 py-3 text-[13px] font-semibold border-b transition-colors hover:bg-white/10 ${isActive ? "text-white bg-white/10" : "text-white/85"}`}
                    style={{ borderColor: "rgba(255,255,255,0.08)" }}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </nav>
  );
}
