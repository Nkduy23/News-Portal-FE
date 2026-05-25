import { Analytics } from "@vercel/analytics/next";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-full flex flex-col bg-[var(--color-bg)] text-[var(--color-text)]">
      <Analytics />
      <Header />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
