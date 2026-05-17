import { ApiService } from "@/lib/api";
import { TeacherCourses } from "@/features/professor/TeacherCourses";

export default async function TeacherCoursesPage() {
  const classSubjects = await ApiService.teachers.getMyClassSubjects();

  return <TeacherCourses classSubjects={classSubjects} />;
}
