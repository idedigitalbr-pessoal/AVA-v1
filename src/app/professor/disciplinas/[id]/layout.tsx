import { ApiService } from "@/lib/api";
import { TeacherCourseLayout } from "@/features/professor/TeacherCourseLayout";

export default async function Layout({ params, children }: { params: Promise<{ id: string }>, children: React.ReactNode }) {
  const { id } = await params;
  const course = await ApiService.courses.getById(id);

  if (!course) {
    return <div className="p-8 text-center text-slate-500">Disciplina não encontrada.</div>;
  }

  return <TeacherCourseLayout course={course}>{children}</TeacherCourseLayout>;
}
