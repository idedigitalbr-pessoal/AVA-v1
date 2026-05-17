import { ApiService } from "@/lib/api";
import { TeacherCourseLayout } from "@/features/professor/TeacherCourseLayout";

export default async function Layout({ params, children }: { params: Promise<{ id: string }>, children: React.ReactNode }) {
  const { id } = await params;
  const classSubject = await ApiService.teachers.getClassSubjectById(id);

  if (!classSubject) {
    return <div className="p-8 text-center text-slate-500">Disciplina não encontrada.</div>;
  }

  return <TeacherCourseLayout classSubject={classSubject}>{children}</TeacherCourseLayout>;
}
