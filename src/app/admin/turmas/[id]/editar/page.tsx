import { AdminClassForm } from "@/features/admin/classes/AdminClassForm";

export default async function AdminEditTurmaPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  return <AdminClassForm isEdit={true} classId={id} />;
}
