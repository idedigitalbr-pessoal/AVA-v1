"use client";

import { ActivityDetail } from "@/features/activities/types";
import { TeacherActivityManager } from "@/features/activities/TeacherActivityManager";

export function TeacherCourseActivities({ courseId, activities }: { courseId: string, activities: any[] }) {
  // Convert API activity to ActivityDetail format
  const initialActivities: ActivityDetail[] = activities.map(a => ({
    id: a.id,
    courseId: a.courseId,
    title: a.title,
    description: a.description || "",
    type: a.type as 'QUIZ' | 'UPLOAD',
    dueDate: a.dueDate || "",
    maxScore: a.maxScore || 10,
    status: 'PUBLISHED',
    attachments: []
  }));

  return (
    <TeacherActivityManager courseId={courseId} initialActivities={initialActivities} />
  );
}
