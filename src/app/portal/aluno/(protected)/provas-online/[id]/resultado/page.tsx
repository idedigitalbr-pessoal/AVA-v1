import { ExamResult } from "@/features/aluno/exams/ExamResult";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ResultadoProvaPage({ params }: Props) {
  const { id } = await params;
  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-4rem)]">
      <ExamResult id={id} />
    </div>
  );
}
