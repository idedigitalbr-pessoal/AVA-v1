import { AdminStudentForm } from "@/features/admin/students/AdminStudentForm";

export default async function EditarAlunoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <AdminStudentForm isEdit={true} studentId={id} />;
}
