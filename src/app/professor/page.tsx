import { ApiService } from "@/lib/api";
import { TeacherDashboard } from "@/features/professor/TeacherDashboard";

export default async function TeacherDashboardPage() {
  const stats = await ApiService.stats.getTeacherStats();
  const courses = await ApiService.courses.getAll();

  return <TeacherDashboard stats={stats} courses={courses} />;
}
