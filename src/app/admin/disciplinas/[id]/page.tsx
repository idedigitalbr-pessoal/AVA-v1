import { AdminSubjectDetails } from "@/features/admin/subjects/AdminSubjectDetails";

export default async function AdminSubjectDetailsPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  return <AdminSubjectDetails subjectId={id} />;
}
