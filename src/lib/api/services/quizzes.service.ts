import { apiClient } from '../api-client';
import { ENDPOINTS } from '../endpoints';
import { Activity } from '@/types';
import { mockActivities } from '@/mocks';

export const quizzesService = {
  list: async (courseId?: string): Promise<Activity[]> => {
    await apiClient.get(ENDPOINTS.quizzes.base, { params: { courseId } });
    let quizzes = mockActivities.filter(a => a.type === 'QUIZ');
    if (courseId) {
      quizzes = quizzes.filter(a => a.courseId === courseId);
    }
    return quizzes;
  },

  create: async (data: any): Promise<Activity> => {
    await apiClient.post(ENDPOINTS.quizzes.base, data);
    return { id: Math.random().toString(), type: 'QUIZ', ...data } as Activity;
  },

  getAll: async (courseId?: string): Promise<Activity[]> => {
    await apiClient.get(ENDPOINTS.quizzes.base, { params: { courseId } });
    let quizzes = mockActivities.filter(a => a.type === 'QUIZ');
    if (courseId) {
      quizzes = quizzes.filter(a => a.courseId === courseId);
    }
    return quizzes;
  },

  getById: async (id: string): Promise<Activity | undefined> => {
    await apiClient.get(ENDPOINTS.quizzes.byId(id));
    return mockActivities.find(a => a.id === id);
  },

  submitAttempt: async (id: string, answers: any): Promise<{ score: number }> => {
    await apiClient.post(ENDPOINTS.quizzes.submit(id), answers);
    return { score: 8.5 }; // Simulação
  }
};

export const quizService = quizzesService;
