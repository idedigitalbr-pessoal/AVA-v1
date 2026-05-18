import { ApiService } from "@/lib/api";
import { StudentGrades } from "@/features/aluno/StudentGrades";

export default async function BoletimPage() {
  const gradebook = await ApiService.aluno.grades.getMyGradebook();
  
  return <StudentGrades gradebook={gradebook} />;
}
