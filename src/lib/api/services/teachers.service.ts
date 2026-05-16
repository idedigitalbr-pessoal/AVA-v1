import { apiClient } from '../client';
import { endpoints } from '../endpoints';
import { User, Course } from '@/types';
import { allMockUsers, mockCourses } from '@/mocks';

export const teachersService = {
  getAll: async (): Promise<User[]> => {
    await apiClient.get(endpoints.teachers.base);
    return allMockUsers.filter(u => u.role === 'PROFESSOR');
  },

  getById: async (id: string): Promise<User | undefined> => {
    await apiClient.get(endpoints.teachers.byId(id));
    return allMockUsers.find(u => u.id === id && u.role === 'PROFESSOR');
  },

  getClasses: async (id: string): Promise<Course[]> => {
    await apiClient.get(endpoints.teachers.classes(id));
    return mockCourses.filter(c => c.instructorId === id);
  }
};
