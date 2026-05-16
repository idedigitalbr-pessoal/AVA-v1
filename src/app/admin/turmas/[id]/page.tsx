import { AdminClassDetails } from "@/features/admin/classes/AdminClassDetails";

export default async function AdminTurmaDetailsPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  return <AdminClassDetails classId={id} />;
}
