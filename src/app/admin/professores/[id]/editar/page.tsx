import { AdminTeacherForm } from "@/features/admin/teachers/AdminTeacherForm";

export default async function EditarProfessorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <AdminTeacherForm isEdit={true} teacherId={id} />;
}
