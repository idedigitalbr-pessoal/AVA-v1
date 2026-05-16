import { apiClient } from '../client';
import { endpoints } from '../endpoints';
import { Subject } from '@/types';
import { mockSubjects } from '@/mocks';

export const subjectsService = {
  getAll: async (): Promise<Subject[]> => {
    await apiClient.get(endpoints.subjects.base);
    return mockSubjects;
  },

  getById: async (id: string): Promise<Subject | undefined> => {
    await apiClient.get(endpoints.subjects.byId(id));
    return mockSubjects.find(c => c.id === id);
  }
};
