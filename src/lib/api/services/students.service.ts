import { apiClient } from '../client';
import { endpoints } from '../endpoints';
import { Student, Enrollment } from '@/types';
import { mockStudents, mockEnrollments } from '@/mocks';

export const studentsService = {
  list: async (): Promise<Student[]> => {
    // await apiClient.get(endpoints.students.base);
    return mockStudents;
  },
  
  create: async (data: any): Promise<Student> => {
    // await apiClient.post(endpoints.students.base, data);
    return { ...mockStudents[0], id: Math.random().toString(), ...data } as Student;
  },

  getAll: async (): Promise<Student[]> => {
    // await apiClient.get(endpoints.students.base);
    return mockStudents;
  },

  getById: async (id: string): Promise<Student | undefined> => {
    // await apiClient.get(endpoints.students.byId(id));
    return mockStudents.find(u => u.id === id);
  },

  getEnrollments: async (id: string): Promise<Enrollment[]> => {
    if (id === 'all') {
       return mockEnrollments;
    }
    // await apiClient.get(endpoints.students.enrollments(id));
    return mockEnrollments.filter(e => e.userId === id);
  }
};

export const studentService = studentsService;
