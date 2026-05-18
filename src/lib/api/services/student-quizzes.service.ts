import { mockStudentActivities } from '@/mocks/student.mock';

export const studentQuizzesService = {
  getMyQuizzes: async (): Promise<any[]> => {
    return Promise.resolve(mockStudentActivities.filter(a => a.type === 'QUIZ'));
  },
  startQuiz: async (quizId: string): Promise<any> => {
    return Promise.resolve({ id: `att_${Date.now()}`, quizId, startedAt: new Date().toISOString() });
  },
  submitQuiz: async (attemptId: string, payload: any): Promise<any> => {
    return Promise.resolve({ success: true, score: 90 });
  }
};
