import { TeacherCourseMessages } from "@/features/professor/TeacherCourseMessages";

export default async function MensagensPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // Mock messages
  const messages = [
    { id: '1', studentName: 'Ana Souza', date: '15/05/2026', subject: 'Dúvida sobre a P1', content: 'Professor, o conteúdo abordará o módulo 3 completo?' },
    { id: '2', studentName: 'Bruno Mendes', date: '14/05/2026', subject: 'Atestado Médico', content: 'Bom dia, faltei ontem. Segue o atestado em anexo.' },
  ];

  return <TeacherCourseMessages courseId={id} messages={messages} />;
}
