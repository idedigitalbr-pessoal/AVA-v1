import { ApiService } from "@/lib/api";
import { StudentCourses } from "@/features/aluno/StudentCourses";

export default async function StudentCoursesPage() {
  // O id do estudante seria pego da sessão (mockado para '3' da Ana Souza)
  const studentId = '3';
  const courses = await ApiService.courses.getStudentCourses(studentId);
  const enrollments = await Promise.all(
    courses.map(course => ApiService.enrollments.getByUserAndCourse(studentId, course.id))
  );

  return <StudentCourses courses={courses} enrollments={enrollments} />;
}
