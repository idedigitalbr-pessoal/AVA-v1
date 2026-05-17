import { ApiService } from "@/lib/api";
import { TeacherCourseActivities } from "@/features/professor/TeacherCourseActivities";

export default async function AtividadesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const courseActivities = await ApiService.activities.getCourseActivities(id);

  return <TeacherCourseActivities courseId={id} activities={courseActivities} />;
}
