import { ApiService } from "@/lib/api";
import { TeacherDashboard } from "@/features/professor/TeacherDashboard";

export default async function TeacherDashboardPage() {
  const dashboardData = await ApiService.teachers.getTeacherDashboard();

  return <TeacherDashboard data={dashboardData} />;
}
