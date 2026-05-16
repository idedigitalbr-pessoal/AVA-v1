import { apiClient } from '../client';
import { endpoints } from '../endpoints';
import { Course, Module } from '@/types';
import { mockCourses, mockModules } from '@/mocks';

export const coursesService = {
  list: async (): Promise<Course[]> => {
    await apiClient.get(endpoints.courses.base);
    return mockCourses;
  },

  getAll: async (): Promise<Course[]> => {
    await apiClient.get(endpoints.courses.base);
    return mockCourses;
  },

  getById: async (id: string): Promise<Course | undefined> => {
    await apiClient.get(endpoints.courses.byId(id));
    return mockCourses.find(c => c.id === id);
  },

  getModules: async (id: string): Promise<Module[]> => {
    await apiClient.get(endpoints.courses.modules(id));
    return mockModules.filter(m => m.courseId === id);
  }
};

export const courseService = coursesService;
