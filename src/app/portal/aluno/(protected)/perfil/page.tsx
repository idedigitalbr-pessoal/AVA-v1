import { ApiService } from "@/lib/api";
import { StudentProfile } from "@/features/aluno/StudentProfile";

export default async function PerfilPage() {
  const user = await ApiService.auth.login('ALUNO'); // Simulando pegar do mock
  const stats = await ApiService.stats.getStudentStats();

  if (!user) {
    return <div>Carregando...</div>;
  }
  
  return <StudentProfile user={user} stats={stats} />;
}
