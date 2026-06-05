import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-display",
  subsets: ["vietnamese", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const domain = "https://www.baoxuan-demo.io.vn/";

export const metadata: Metadata = {
  title: "Xuân Bình Ngọ 2026 - VOV.VN",
  description: "Việt Nam tự cường - Bứt phá vươn xa. Chuyên trang Xuân Bình Ngọ 2026 của VOV.VN với những câu chuyện, thành tựu và khát vọng phát triển của đất nước trong kỷ nguyên mới.",

  metadataBase: new URL(domain),

  keywords: ["Xuân Bình Ngọ 2026", "VOV", "VOV.VN", "Việt Nam tự cường", "Bứt phá vươn xa", "Xuân 2026", "Báo điện tử VOV", "Tin tức Việt Nam"],

  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
  },

  manifest: "/manifest.json",

  openGraph: {
    title: "Xuân Bình Ngọ 2026 - VOV.VN",
    description: "Việt Nam tự cường - Bứt phá vươn xa. Chuyên trang Xuân Bình Ngọ 2026 của VOV.VN.",
    url: domain,
    siteName: "VOV.VN",
    locale: "vi_VN",
    type: "website",

    images: [
      {
        url: `${domain}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Xuân Bình Ngọ 2026 - VOV.VN",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Xuân Bình Ngọ 2026 - VOV.VN",
    description: "Việt Nam tự cường - Bứt phá vươn xa. Chuyên trang Xuân Bình Ngọ 2026 của VOV.VN.",
    images: [`${domain}/og-image.jpg`],
  },

  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Xuân Bình Ngọ 2026",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={beVietnamPro.variable}>
      <body>{children}</body>
    </html>
  );
}
