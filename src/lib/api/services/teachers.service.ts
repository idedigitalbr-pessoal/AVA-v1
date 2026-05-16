import { apiClient } from '../client';
import { endpoints } from '../endpoints';
import { Teacher, Course } from '@/types';
import { mockTeachers, mockCourses } from '@/mocks';

export const teachersService = {
  getAll: async (): Promise<Teacher[]> => {
    // await apiClient.get(endpoints.teachers.base);
    return mockTeachers;
  },

  getById: async (id: string): Promise<Teacher | undefined> => {
    // await apiClient.get(endpoints.teachers.byId(id));
    return mockTeachers.find(u => u.id === id);
  },

  getClasses: async (id: string): Promise<Course[]> => {
    // await apiClient.get(endpoints.teachers.classes(id));
    return mockCourses.filter(c => c.instructorId === id);
  }
};
