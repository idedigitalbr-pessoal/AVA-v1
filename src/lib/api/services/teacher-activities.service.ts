import { TeacherAssessment, TeacherAssessmentAttempt } from '@/types';
import { mockTeacherAssessments } from '@/mocks/teacher.mock';

export const teacherActivitiesService = {
  getAssessments: async (classSubjectId: string): Promise<TeacherAssessment[]> => {
    return Promise.resolve(mockTeacherAssessments.map(a => ({ ...a, classSubjectId })));
  },
  createAssessment: async (classSubjectId: string, payload: any): Promise<any> => {
    return Promise.resolve({ id: `a_${Date.now()}`, classSubjectId, ...payload, createdAt: new Date().toISOString() });
  },
  updateAssessment: async (id: string, payload: any): Promise<any> => {
    return Promise.resolve({ id, ...payload });
  },
  publishAssessment: async (id: string): Promise<{ success: boolean; status: string }> => {
    return Promise.resolve({ success: true, status: 'PUBLISHED' });
  },
  duplicateAssessment: async (id: string): Promise<any> => {
    return Promise.resolve({ id: `a_dup_${Date.now()}` });
  },
  archiveAssessment: async (id: string): Promise<boolean> => {
    return Promise.resolve(true);
  },
  getAssessmentAttempts: async (assessmentId: string): Promise<TeacherAssessmentAttempt[]> => {
    return Promise.resolve([
      {
        id: 'att1',
        assessmentId,
        studentId: 's1',
        studentName: 'João Silva',
        startedAt: new Date(Date.now() - 3600000).toISOString(),
        completedAt: new Date(Date.now() - 1800000).toISOString(),
        score: 8.5,
      }
    ]);
  }
};
