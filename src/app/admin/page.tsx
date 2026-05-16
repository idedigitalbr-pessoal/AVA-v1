import { ApiService } from "@/lib/api";
import { AdminDashboard } from "@/features/admin/AdminDashboard";

export default async function AdminDashboardPage() {
  const stats = await ApiService.stats.getAdminStats();
  
  return <AdminDashboard stats={stats} />;
}
