import { CurriculumMatrixManager } from "@/features/admin/curriculum/CurriculumMatrixManager";

export default async function AdminCurriculumPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  return <CurriculumMatrixManager courseId={id} />;
}
