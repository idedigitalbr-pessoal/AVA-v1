import { ApiService } from "@/lib/api";
import { ActivityDetails } from "@/features/aluno/ActivityDetails";
import { redirect } from "next/navigation";

interface ActivityPageProps {
  params: Promise<{ id: string }>;
}

export default async function ActivityDetailsPage({ params }: ActivityPageProps) {
  const { id } = await params;
  const activity = await ApiService.aluno.activities.getActivityDetails(id);

  if (!activity) {
    redirect("/portal/aluno/atividades");
  }

  return <ActivityDetails activity={activity} onBack="/portal/aluno/atividades" />;
}
