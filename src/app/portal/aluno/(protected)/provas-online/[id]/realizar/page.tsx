import { ExamTaker } from "@/features/aluno/exams/ExamTaker";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function RealizarProvaPage({ params }: Props) {
  const { id } = await params;
  // This page removes normal padding to maximize exam taking space
  return (
    <div className="bg-slate-50 min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-8">
      <ExamTaker id={id} />
    </div>
  );
}
