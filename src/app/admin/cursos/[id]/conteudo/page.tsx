import { AdminCourseContentManager } from "@/features/admin/ava/AdminCourseContentManager";

export default async function AdminCursoConteudoPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  return <AdminCourseContentManager courseId={id} />;
}
