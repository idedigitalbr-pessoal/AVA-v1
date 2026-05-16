import { ApiService } from "@/lib/api";
import { StudentGrades } from "@/features/aluno/StudentGrades";

export default async function BoletimPage() {
  const courses = await ApiService.courses.getStudentCourses('3');
  
  // Vamos buscar atividades avaliadas e simular notas extras baseadas nos cursos matriculados
  const activities = await ApiService.activities.getStudentActivities('3');
  const gradedActivities = activities.filter(a => a.status === 'GRADED');
  
  return <StudentGrades courses={courses} activities={gradedActivities} />;
}
