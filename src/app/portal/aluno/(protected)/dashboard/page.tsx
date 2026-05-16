import { ApiService } from "@/lib/api";
import { StudentDashboard } from "@/features/aluno/StudentDashboard";

export default async function StudentDashboardPage() {
  const stats = await ApiService.stats.getStudentStats();
  const activities = await ApiService.activities.getPending();

  return <StudentDashboard stats={stats} activities={activities} />;
}
