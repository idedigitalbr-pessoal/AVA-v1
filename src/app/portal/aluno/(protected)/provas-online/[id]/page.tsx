import { ExamDetail } from "@/features/aluno/exams/ExamDetail";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProvaDetalhePage({ params }: Props) {
  const { id } = await params;
  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-4rem)]">
      <ExamDetail id={id} />
    </div>
  );
}
