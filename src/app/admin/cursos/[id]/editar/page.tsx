import { AdminCourseForm } from "@/features/admin/AdminCourseForm";

export default async function AdminEditarCursoPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  return <AdminCourseForm courseId={id} />;
}
