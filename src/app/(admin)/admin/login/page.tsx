import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import LoginForm from "@/components/admin/LoginForm";

export default async function AdminLoginPage() {
  // Nếu đã login rồi thì redirect thẳng vào dashboard
  const token = (await cookies()).get("admin_token")?.value;
  if (token) redirect("/admin/dashboard");

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--admin-bg)",
        fontFamily: "var(--font-display), system-ui, sans-serif",
      }}
    >
      <LoginForm />
    </div>
  );
}
