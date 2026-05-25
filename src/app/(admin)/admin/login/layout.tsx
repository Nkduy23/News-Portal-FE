import "@/styles/admin.css";
import { Be_Vietnam_Pro } from "next/font/google";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-display",
  subsets: ["vietnamese", "latin"],
  weight: ["400", "500", "600", "700"],
});

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={beVietnamPro.variable}
      style={{
        minHeight: "100vh",
        background: "var(--admin-bg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-display), system-ui, sans-serif",
      }}
    >
      {children}
    </div>
  );
}
