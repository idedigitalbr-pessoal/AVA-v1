import { ApiService } from "@/lib/api";
import { TeacherCourseGrades } from "@/features/professor/TeacherCourseGrades";

export default async function NotasPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const gradebook = await ApiService.teachers.getGradebook(id);

  return <TeacherCourseGrades classSubjectId={id} initialGradebook={gradebook} />;
}
