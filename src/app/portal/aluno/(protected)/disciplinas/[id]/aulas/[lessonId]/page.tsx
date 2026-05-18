import { LessonDetails } from "@/features/aluno/LessonDetails";

interface LessonPageProps {
  params: Promise<{ id: string; lessonId: string }>;
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { id, lessonId } = await params;
  return <LessonDetails courseId={id} lessonId={lessonId} />;
}
