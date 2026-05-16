import { ApiService } from "@/lib/api";
import { TeacherCourseOverview } from "@/features/professor/TeacherCourseOverview";

export default async function TeacherCoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const course = await ApiService.courses.getById(id);

  if (!course) {
    return <div className="p-8 text-center text-slate-500">Disciplina não encontrada.</div>;
  }

  return <TeacherCourseOverview course={course} />;
}
