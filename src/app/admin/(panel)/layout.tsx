import { getCurrentUser } from "@/lib/admin-auth";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";

interface PanelLayoutProps {
  children: React.ReactNode;
}

export default async function PanelLayout({ children }: PanelLayoutProps) {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect("/admin/login");
  }

  return <AdminShell user={user}>{children}</AdminShell>;
}
