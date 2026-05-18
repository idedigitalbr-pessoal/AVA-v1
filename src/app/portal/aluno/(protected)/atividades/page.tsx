import { ApiService } from "@/lib/api";
import { StudentActivities } from "@/features/aluno/StudentActivities";

export default async function AtividadesPage() {
  const activities = await ApiService.aluno.activities.getMyActivities();
  
  return <StudentActivities activities={activities} />;
}
