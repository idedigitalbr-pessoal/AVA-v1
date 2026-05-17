import { TeacherAssessmentManager } from "@/features/professor/TeacherAssessmentManager";

export default function AvaliacoesPage({ params }: { params: { id: string } }) {
  return <TeacherAssessmentManager classSubjectId={params.id} />;
}
