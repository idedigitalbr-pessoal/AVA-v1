import { ApiService } from "@/lib/api";
import { TeacherCourses } from "@/features/professor/TeacherCourses";

export default async function TeacherCoursesPage() {
  const courses = await ApiService.courses.getAll(); // Em um app real, buscaria apenas os do professor logado

  return <TeacherCourses courses={courses} />;
}
