"use client";

import { Module, Lesson } from "@/types";
import { ContentManager } from "@/features/ava-management/ContentManager";
import { ExtendedModule, ExtendedLesson } from "@/features/ava-management/types";

interface ModuleWithLessons extends Module {
  lessons: Lesson[];
}

export function TeacherCourseContent({ courseId, modules }: { courseId: string, modules: ModuleWithLessons[] }) {
  // Translate from existing Module/Lesson types to the extended types used by ContentManager
  const initialModules: ExtendedModule[] = modules.map(m => ({
    id: m.id,
    title: m.title,
    order: m.order,
    lessons: m.lessons.map(l => ({
      id: l.id,
      moduleId: m.id,
      title: l.title,
      content: l.content || "",
      videoUrl: l.videoUrl || "",
      duration: l.duration,
      order: l.order,
      status: 'PUBLISHED', // Mocking status for existing records
      attachments: l.attachments?.map((a, index) => ({
        id: `attach_${index}`,
        name: a.name,
        url: a.url,
        type: 'LINK' // Fallback
      })) || []
    } as ExtendedLesson))
  }));

  return (
    <ContentManager courseId={courseId} initialModules={initialModules} />
  );
}

