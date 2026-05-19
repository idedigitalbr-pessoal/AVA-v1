import { AdminPreEnrollmentDetailView } from '@/features/admin/pre-matriculas/AdminPreEnrollmentDetailView';

export default async function AdminPreEnrollmentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const p = await params;
  return <AdminPreEnrollmentDetailView preEnrollmentId={p.id} />;
}
