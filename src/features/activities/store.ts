import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ActivityDetail, ActivitySubmission } from './types';
import { mockActivities } from '@/mocks';

interface ActivityStore {
  activities: ActivityDetail[];
  submissions: ActivitySubmission[];
  
  // Actions
  addActivity: (activity: ActivityDetail) => void;
  updateActivity: (activity: ActivityDetail) => void;
  deleteActivity: (id: string) => void;
  
  addSubmission: (submission: ActivitySubmission) => void;
  updateSubmission: (submission: ActivitySubmission) => void;
}

// Initial default activities from mock
const initialActivities: ActivityDetail[] = mockActivities.map((a: any) => ({
  id: a.id,
  courseId: a.courseId,
  title: a.title,
  description: a.description || "Por favor, leia as instruções e entregue o material solicitado.",
  type: (a.type === 'QUIZ' ? 'QUIZ' : 'UPLOAD') as 'QUIZ' | 'UPLOAD',
  dueDate: a.dueDate || "",
  maxScore: a.maxScore || 10,
  status: 'PUBLISHED' as const,
  attachments: []
}));

export const useActivityStore = create<ActivityStore>()(
  persist(
    (set) => ({
      activities: initialActivities,
      submissions: [
        {
          id: "sub_1",
          activityId: initialActivities[0]?.id || '1',
          studentId: "s1",
          studentName: "Ana Souza",
          submittedAt: "2026-05-14T10:00:00Z",
          content: "Minha resposta mockada",
          status: "GRADED",
          grade: 8,
          feedback: "Bom trabalho."
        },
        {
          id: "sub_2",
          activityId: initialActivities[0]?.id || '1',
          studentId: "s2",
          studentName: "Bruno Mendes",
          submittedAt: "2026-05-15T09:30:00Z",
          content: "Segue em anexo",
          fileUrl: "https://mock.com/file.pdf",
          status: "SUBMITTED"
        }
      ],
      addActivity: (activity) => 
        set((state) => ({ activities: [...state.activities, activity] })),
      updateActivity: (activity) =>
        set((state) => ({
          activities: state.activities.map((a) => (a.id === activity.id ? activity : a))
        })),
      deleteActivity: (id) =>
        set((state) => ({
          activities: state.activities.filter((a) => a.id !== id),
          submissions: state.submissions.filter((s) => s.activityId !== id)
        })),
      addSubmission: (submission) =>
        set((state) => ({ submissions: [...state.submissions, submission] })),
      updateSubmission: (submission) =>
        set((state) => ({
          submissions: state.submissions.map((s) => (s.id === submission.id ? submission : s))
        }))
    }),
    {
      name: 'ava-activity-storage'
    }
  )
);
