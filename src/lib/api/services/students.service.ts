import { apiClient } from '../client';
import { endpoints } from '../endpoints';
import { User, Student, Enrollment } from '@/types';
import { allMockUsers, mockStudents, mockEnrollments } from '@/mocks';

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

  update: async (id: string, data: Partial<Student>): Promise<Student> => {
    // await apiClient.put(endpoints.students.byId(id), data);
    const stud = mockStudents.find(u => u.id === id);
    return { ...stud, ...data } as Student;
  },

  blockAccess: async (id: string): Promise<Student> => {
    const stud = mockStudents.find(u => u.id === id);
    return { ...stud, status: 'BLOCKED' } as Student;
  },

  activeAccess: async (id: string): Promise<Student> => {
    const stud = mockStudents.find(u => u.id === id);
    return { ...stud, status: 'ACTIVE' } as Student;
  },

  resetPassword: async (id: string): Promise<boolean> => {
    return true; // sucesso
  },

  sendNotification: async (id: string, subject: string, message: string): Promise<boolean> => {
    return true; // sucesso
  },

  getEnrollments: async (id: string): Promise<Enrollment[]> => {
    // await apiClient.get(endpoints.students.enrollments(id));
    // For 'all' param workaround mentioned earlier
    if (id === 'all') return mockEnrollments;
    return mockEnrollments.filter(e => e.userId === id);
  }
};

export const studentService = studentsService;
