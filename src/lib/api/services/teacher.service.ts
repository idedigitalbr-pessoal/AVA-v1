import { TeacherDashboardData } from '@/types';
import { mockTeacherDashboard } from '@/mocks/teacher.mock';
import { mockTeachers } from '@/mocks';

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
