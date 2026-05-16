import { AdminSettings } from "@/features/admin/AdminSettings";
import { RoleGuard } from "@/lib/auth/RoleGuard";

export default function AdminConfiguracoesPage() {
  return (
    <RoleGuard requirePermission="MANAGE_SYSTEM">
      <AdminSettings />
    </RoleGuard>
  );
}
