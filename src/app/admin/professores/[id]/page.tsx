import { AdminTeacherDetails } from "@/features/admin/teachers/AdminTeacherDetails";

export default async function AdminTeacherDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <AdminTeacherDetails teacherId={id} />;
}
