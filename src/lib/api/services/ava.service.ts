import { apiClient } from '../client';
import { endpoints } from '../endpoints';
import { Module, Lesson } from '@/types';
import { mockModules, mockLessons } from '@/mocks';

export const avaService = {
  getModules: async (courseId: string): Promise<Module[]> => {
    await apiClient.get(endpoints.ava.modules, { params: { courseId } });
    return mockModules.filter(m => m.courseId === courseId).sort((a, b) => a.order - b.order);
  },

  getLessons: async (moduleId: string): Promise<Lesson[]> => {
    await apiClient.get(endpoints.ava.lessons(moduleId));
    return mockLessons.filter(l => l.moduleId === moduleId).sort((a, b) => a.order - b.order);
  },

  getLessonDetail: async (lessonId: string): Promise<Lesson | undefined> => {
    await apiClient.get(endpoints.ava.lessonDetail(lessonId));
    return mockLessons.find(l => l.id === lessonId);
  },

  createModule: async (data: any): Promise<Module> => {
    await apiClient.post(endpoints.ava.modules, data);
    return { id: Math.random().toString(), ...data } as Module;
  },

  createLesson: async (moduleId: string, data: any): Promise<Lesson> => {
    await apiClient.post(endpoints.ava.lessons(moduleId), data);
    return { id: Math.random().toString(), moduleId, ...data } as Lesson;
  }
};
