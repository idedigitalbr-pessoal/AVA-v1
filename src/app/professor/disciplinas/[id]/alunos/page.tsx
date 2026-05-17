import { TeacherStudentsManager } from "@/features/professor/TeacherStudentsManager";

export default function AlunosPage({ params }: { params: { id: string } }) {
  return <TeacherStudentsManager classSubjectId={params.id} />;
}
