import { ApiService } from "@/lib/api";
import { StudentActivityManager } from "@/features/activities/StudentActivityManager";

export default async function AtividadesPage() {
  const activities = await ApiService.activities.getStudentActivities('3');
  
  // Transform to ActivityDetail
  const mappedActivities = activities.map((a: any) => ({
    id: a.id,
    courseId: a.courseId,
    title: a.title,
    description: a.description || "Por favor, leia as instruções e entregue o material solicitado.",
    type: (a.type === 'QUIZ' ? 'QUIZ' : 'UPLOAD') as 'QUIZ' | 'UPLOAD',
    dueDate: a.dueDate || "",
    maxScore: a.maxScore || 100,
    status: 'PUBLISHED' as const,
    attachments: []
  }));
  
  return <StudentActivityManager initialActivities={mappedActivities} />;
}
