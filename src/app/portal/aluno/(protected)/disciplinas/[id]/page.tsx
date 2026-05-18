import { CourseDetails } from "@/features/aluno/CourseDetails";

interface CoursePageProps {
  params: Promise<{ id: string }>;
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { id } = await params;
  return <CourseDetails courseId={id} />;
}
