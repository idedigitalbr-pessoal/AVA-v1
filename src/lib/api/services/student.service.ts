import { apiClient } from '../api-client';
import { ENDPOINTS } from '../endpoints';
import { User, Student, Enrollment } from '@/types';
import { allMockUsers, mockStudents, mockEnrollments } from '@/mocks';

export const studentsService = {
  list: async (): Promise<Student[]> => {
    await apiClient.get(ENDPOINTS.STUDENTS.BASE);
    return mockStudents;
  },
  
  create: async (data: any): Promise<Student> => {
    await apiClient.post(ENDPOINTS.STUDENTS.BASE, data);
    return { ...mockStudents[0], id: Math.random().toString(), ...data } as Student;
  },

  getAll: async (): Promise<Student[]> => {
    await apiClient.get(ENDPOINTS.STUDENTS.BASE);
    return mockStudents;
  },

  getById: async (id: string): Promise<Student | undefined> => {
    await apiClient.get(ENDPOINTS.STUDENTS.BY_ID(id));
    return mockStudents.find(u => u.id === id);
  },

  update: async (id: string, data: Partial<Student>): Promise<Student> => {
    await apiClient.put(ENDPOINTS.STUDENTS.BY_ID(id), data);
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

  impersonateStudent: async (id: string): Promise<boolean> => {
    return true; // sucesso
  },

  getEnrollments: async (id: string): Promise<Enrollment[]> => {
    await apiClient.get(`${ENDPOINTS.STUDENTS.BY_ID(id)}/enrollments`);
    // For 'all' param workaround mentioned earlier
    if (id === 'all') return mockEnrollments;
    return mockEnrollments.filter(e => e.userId === id);
  }
};

export const studentService = studentsService;
