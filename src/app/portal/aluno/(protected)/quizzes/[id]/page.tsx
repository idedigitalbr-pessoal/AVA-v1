import { ApiService } from "@/lib/api";
import { QuizDetails } from "@/features/aluno/QuizDetails";
import { redirect } from "next/navigation";

interface QuizPageProps {
  params: Promise<{ id: string }>;
}

export default async function QuizDetailsPage({ params }: QuizPageProps) {
  const { id } = await params;
  const activity = await ApiService.aluno.activities.getActivityDetails(id);

  if (!activity) {
    redirect("/portal/aluno/quizzes");
  }

  return <QuizDetails activity={activity} onBack="/portal/aluno/atividades" isExam={false} />;
}
