import { AdminLeadDetailView } from '@/features/admin/leads/AdminLeadDetailView';

export default async function AdminLeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const p = await params;
  return <AdminLeadDetailView leadId={p.id} />;
}
