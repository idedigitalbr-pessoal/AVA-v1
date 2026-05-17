import { TeacherReportsManager } from "@/features/professor/TeacherReportsManager";

export default function RelatoriosPage({ params }: { params: { id: string } }) {
  return <TeacherReportsManager classSubjectId={params.id} />;
}
