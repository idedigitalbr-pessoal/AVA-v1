import { ApiService } from "@/lib/api";
import { CourseDetails } from "@/features/aluno/CourseDetails";

interface CoursePageProps {
  params: Promise<{ id: string }>;
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { id } = await params;
  const course = await ApiService.courses.getById(id);
  const modules = await ApiService.content.getCourseModules(id);
  
  // Para cada módulo, pega as aulas
  const modulesWithLessons = await Promise.all(
    modules.map(async (m) => {
      const lessons = await ApiService.content.getModuleLessons(m.id);
      return { ...m, lessons };
    })
  );

  const enrollment = await ApiService.enrollments.getByUserAndCourse('3', id);

  if (!course) {
    return <div className="p-8 text-center text-slate-500">Disciplina não encontrada.</div>;
  }

  return (
    <CourseDetails 
      course={course} 
      modules={modulesWithLessons} 
      enrollment={enrollment} 
    />
  );
}
