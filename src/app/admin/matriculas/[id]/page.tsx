import { AdminEnrollmentDetails } from "@/features/admin/enrollments/AdminEnrollmentDetails";

export default async function EnrollmentDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <AdminEnrollmentDetails enrollmentId={id} />;
}
