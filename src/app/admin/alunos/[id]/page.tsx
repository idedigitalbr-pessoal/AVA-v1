import { AdminStudentDetails } from "@/features/admin/students/AdminStudentDetails";

export default async function AdminStudentDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <AdminStudentDetails studentId={id} />;
}
