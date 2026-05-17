import { ApiService } from "@/lib/api";
import { TeacherCourseMessages } from "@/features/professor/TeacherCourseMessages";

export default async function MensagensPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const communicationData = await ApiService.teachers.getCommunicationData(id);

  return <TeacherCourseMessages classSubjectId={id} initialData={communicationData} />;
}
