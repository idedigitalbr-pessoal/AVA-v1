import { apiClient } from '../client';
import { endpoints } from '../endpoints';
import { Class } from '@/types';
import { mockClasses } from '@/mocks';

export const classesService = {
  list: async (): Promise<Class[]> => {
    await apiClient.get(endpoints.classes.base);
    return mockClasses;
  },

  getAll: async (): Promise<Class[]> => {
    await apiClient.get(endpoints.classes.base);
    return mockClasses;
  },

  getById: async (id: string): Promise<Class | undefined> => {
    await apiClient.get(endpoints.classes.byId(id));
    return mockClasses.find(c => c.id === id);
  }
};

export const classService = classesService;
