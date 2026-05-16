import { ApiService } from "@/lib/api";
import { TeacherCourseActivities } from "@/features/professor/TeacherCourseActivities";

export default async function AtividadesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // Aqui pegaria as atividades desta disciplina
  const activities = await ApiService.activities.getStudentActivities('3');
  const courseActivities = activities.filter(a => a.courseId === id);

  return <TeacherCourseActivities courseId={id} activities={courseActivities} />;
}
