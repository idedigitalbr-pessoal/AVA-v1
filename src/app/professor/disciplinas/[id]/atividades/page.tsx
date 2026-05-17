import { TeacherAssessmentManager } from "@/features/professor/TeacherAssessmentManager";

export default async function AtividadesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <TeacherAssessmentManager classSubjectId={id} />;
}
