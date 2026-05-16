import { ApiService } from "@/lib/api";
import { TeacherCourseGrades } from "@/features/professor/TeacherCourseGrades";

export default async function NotasPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // Fake list of students for this course
  const students = [
    { id: '1', name: 'Ana Souza', email: 'ana@ava.edu.br', p1: 8.5, p2: 7.0, proj: 9.0 },
    { id: '2', name: 'Bruno Mendes', email: 'bruno@ava.edu.br', p1: 6.0, p2: 5.5, proj: 7.5 },
    { id: '3', name: 'Carla Dias', email: 'carla@ava.edu.br', p1: 9.5, p2: 10.0, proj: 10.0 },
    { id: '4', name: 'Daniel Costa', email: 'daniel@ava.edu.br', p1: 4.5, p2: null, proj: 6.0 },
    { id: '5', name: 'Eduarda Lima', email: 'eduarda@ava.edu.br', p1: 7.5, p2: 8.0, proj: 8.5 },
  ];

  return <TeacherCourseGrades courseId={id} students={students} />;
}
