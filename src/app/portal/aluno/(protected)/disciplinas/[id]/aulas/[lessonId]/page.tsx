import { ApiService } from "@/lib/api";
import { LessonDetails } from "@/features/aluno/LessonDetails";

interface LessonPageProps {
  params: Promise<{ id: string; lessonId: string }>;
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { id, lessonId } = await params;
  const course = await ApiService.courses.getById(id);
  const lesson = await ApiService.content.getLessonById(lessonId);
  const modules = await ApiService.content.getCourseModules(id);
  
  const modulesWithLessons = await Promise.all(
    modules.map(async (m) => {
      const lessons = await ApiService.content.getModuleLessons(m.id);
      return { ...m, lessons };
    })
  );

  if (!course || !lesson) {
    return <div className="p-8 text-center text-slate-500">Aula não encontrada.</div>;
  }

  return (
    <LessonDetails 
      course={course} 
      lesson={lesson} 
      modules={modulesWithLessons} 
    />
  );
}
