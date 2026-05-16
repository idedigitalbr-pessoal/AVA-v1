import { apiClient } from '../client';
import { endpoints } from '../endpoints';
import { User, Enrollment } from '@/types';
import { allMockUsers, mockEnrollments } from '@/mocks';

export const studentsService = {
  list: async (): Promise<User[]> => {
    await apiClient.get(endpoints.students.base);
    return allMockUsers.filter(u => u.role === 'ALUNO');
  },
  
  create: async (data: any): Promise<User> => {
    await apiClient.post(endpoints.students.base, data);
    return { ...allMockUsers[0], id: Math.random().toString(), ...data } as User;
  },

  getAll: async (): Promise<User[]> => {
    await apiClient.get(endpoints.students.base);
    return allMockUsers.filter(u => u.role === 'ALUNO');
  },

  getById: async (id: string): Promise<User | undefined> => {
    await apiClient.get(endpoints.students.byId(id));
    return allMockUsers.find(u => u.id === id && u.role === 'ALUNO');
  },

  getEnrollments: async (id: string): Promise<Enrollment[]> => {
    await apiClient.get(endpoints.students.enrollments(id));
    return mockEnrollments.filter(e => e.userId === id);
  }
};

export const studentService = studentsService;
