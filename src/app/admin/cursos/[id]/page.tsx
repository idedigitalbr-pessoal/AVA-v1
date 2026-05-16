import { AdminCourseDetails } from "@/features/admin/AdminCourseDetails";

export default async function AdminCursoDetailsPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  return <AdminCourseDetails courseId={id} />;
}
