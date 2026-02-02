import { requireAdmin } from "@/lib/session";
import { redirect } from "next/navigation";
import AdminDashboard from "@/components/AdminDashboard";

export default async function AdminPage() {
  try {
    const user = await requireAdmin();
    return <AdminDashboard user={user} />;
  } catch (error) {
    redirect("/espace-patient");
  }
}
