import { TeacherDashboardData, User, Teacher } from '@/types';
import { mockTeacherDashboard } from '@/mocks/teacher.mock';
import { mockTeachers } from '@/mocks';

export const teachersService = {
  list: async (): Promise<Teacher[]> => {
    return Promise.resolve(mockTeachers as unknown as Teacher[]);
  },
  
  create: async (data: any): Promise<Teacher> => {
    return Promise.resolve({ ...mockTeachers[0], id: Math.random().toString(), ...data } as unknown as Teacher);
  },

  getAll: async (): Promise<Teacher[]> => {
    return Promise.resolve(mockTeachers as unknown as Teacher[]);
  },

  getById: async (id: string): Promise<Teacher | undefined> => {
    return Promise.resolve(mockTeachers.find(u => u.id === id) as unknown as Teacher | undefined);
  },

  update: async (id: string, data: Partial<Teacher>): Promise<Teacher> => {
    const teacher = mockTeachers.find(u => u.id === id);
    return Promise.resolve({ ...teacher, ...data } as unknown as Teacher);
  },

  blockAccess: async (id: string): Promise<Teacher> => {
    const teacher = mockTeachers.find(u => u.id === id);
    return Promise.resolve({ ...teacher, status: 'BLOCKED' } as unknown as Teacher);
  },

  activeAccess: async (id: string): Promise<Teacher> => {
    const teacher = mockTeachers.find(u => u.id === id);
    return Promise.resolve({ ...teacher, status: 'ACTIVE' } as unknown as Teacher);
  },

  resetPassword: async (id: string): Promise<boolean> => {
    return Promise.resolve(true); // sucesso
  }
};

export const teacherService = {
  getTeacherDashboard: async (): Promise<TeacherDashboardData> => {
    return Promise.resolve(mockTeacherDashboard);
  },

  getProfile: async (id: string): Promise<any> => {
    const teacher = mockTeachers.find((u) => u.id === id);
    return Promise.resolve(teacher);
  },

  updateProfile: async (id: string, data: any): Promise<any> => {
    const teacher = mockTeachers.find((u) => u.id === id);
    return Promise.resolve({ ...teacher, ...data });
  }
};
