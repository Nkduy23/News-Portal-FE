import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "@/styles/admin.css";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-display",
  subsets: ["vietnamese", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "VOV Admin – Xuân Bình Ngọ 2026",
  description: "Trang quản trị nội bộ VOV.VN",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={beVietnamPro.variable} style={{ height: "100vh", overflow: "hidden" }}>
      {children}
    </div>
  );
}
