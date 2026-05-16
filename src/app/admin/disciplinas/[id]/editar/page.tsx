import { AdminSubjectForm } from "@/features/admin/subjects/AdminSubjectForm";

export default async function AdminEditSubjectPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  return <AdminSubjectForm isEdit={true} subjectId={id} />;
}
