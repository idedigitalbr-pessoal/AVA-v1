import { apiClient } from '../client';
import { endpoints } from '../endpoints';
import { Activity } from '@/types';
import { mockActivities } from '@/mocks';

export const quizzesService = {
  list: async (courseId?: string): Promise<Activity[]> => {
    await apiClient.get(endpoints.quizzes.base, { params: { courseId } });
    let quizzes = mockActivities.filter(a => a.type === 'QUIZ');
    if (courseId) {
      quizzes = quizzes.filter(a => a.courseId === courseId);
    }
    return quizzes;
  },

  create: async (data: any): Promise<Activity> => {
    await apiClient.post(endpoints.quizzes.base, data);
    return { id: Math.random().toString(), type: 'QUIZ', ...data } as Activity;
  },

  getAll: async (courseId?: string): Promise<Activity[]> => {
    await apiClient.get(endpoints.quizzes.base, { params: { courseId } });
    let quizzes = mockActivities.filter(a => a.type === 'QUIZ');
    if (courseId) {
      quizzes = quizzes.filter(a => a.courseId === courseId);
    }
    return quizzes;
  },

  getById: async (id: string): Promise<Activity | undefined> => {
    await apiClient.get(endpoints.quizzes.byId(id));
    return mockActivities.find(a => a.id === id);
  },

  submitAttempt: async (id: string, answers: any): Promise<{ score: number }> => {
    await apiClient.post(endpoints.quizzes.submit(id), answers);
    return { score: 8.5 }; // Simulação
  }
};

export const quizService = quizzesService;
