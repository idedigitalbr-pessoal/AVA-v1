import { ApiService } from "@/lib/api";
import { TeacherCourseAttendance } from "@/features/professor/TeacherCourseAttendance";

export default async function FrequenciaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // Fake list of students for this course
  const students = [
    { id: '1', name: 'Ana Souza', email: 'ana@ava.edu.br', present: true },
    { id: '2', name: 'Bruno Mendes', email: 'bruno@ava.edu.br', present: false },
    { id: '3', name: 'Carla Dias', email: 'carla@ava.edu.br', present: true },
    { id: '4', name: 'Daniel Costa', email: 'daniel@ava.edu.br', present: true },
    { id: '5', name: 'Eduarda Lima', email: 'eduarda@ava.edu.br', present: true },
  ];

  return <TeacherCourseAttendance courseId={id} students={students} />;
}
