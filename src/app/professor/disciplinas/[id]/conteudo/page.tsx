import { ApiService } from "@/lib/api";
import { TeacherCourseContent } from "@/features/professor/TeacherCourseContent";

export default async function ConteudoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // Na versão final do NestJS, deve puxar os módulos da própria turma/disciplina se forem instanciados,
  // ou da disciplina raiz se forem herdados. Por enquanto, usamos um mock para a turma.
  const modulesWithLessons = await ApiService.teachers.getTeacherCourseModules(id);

  return <TeacherCourseContent classSubjectId={id} initialModules={modulesWithLessons} />;
}
