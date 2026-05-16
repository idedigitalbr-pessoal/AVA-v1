import { ApiService } from "@/lib/api";
import { TeacherCourseContent } from "@/features/professor/TeacherCourseContent";

export default async function ConteudoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const modules = await ApiService.content.getCourseModules(id);
  
  const modulesWithLessons = await Promise.all(
    modules.map(async (m) => {
      const lessons = await ApiService.content.getModuleLessons(m.id);
      return { ...m, lessons };
    })
  );

  return <TeacherCourseContent courseId={id} modules={modulesWithLessons} />;
}
