import { ApiService } from "@/lib/api";
import { TeacherCourseAttendance } from "@/features/professor/TeacherCourseAttendance";

export default async function FrequenciaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const attendanceData = await ApiService.teachers.getAttendanceSessions(id);

  return <TeacherCourseAttendance classSubjectId={id} initialData={attendanceData} />;
}
