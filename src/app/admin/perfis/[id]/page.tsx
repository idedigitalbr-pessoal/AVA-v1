import { AdminRoleForm } from "@/features/admin/permissions/AdminRoleForm";

export default async function EditRolePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <AdminRoleForm id={id} />;
}
