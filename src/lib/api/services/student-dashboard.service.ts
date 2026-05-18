import { StudentDashboardData } from '@/types/student';
import { mockStudentDashboardData } from '@/mocks/student.mock';
import { apiClient } from '../api-client';
import { ENDPOINTS } from '../endpoints';

export const studentDashboardService = {
  getStudentDashboard: async (): Promise<StudentDashboardData> => {
    // try {
    //   return await apiClient.get<StudentDashboardData>(ENDPOINTS.STUDENT_AREA.DASHBOARD);
    // } catch (e) {
    return Promise.resolve(mockStudentDashboardData);
    // }
  },
  
  getStudentSummary: async (): Promise<any> => {
    return Promise.resolve(mockStudentDashboardData.stats);
  },

  getLastAccessedLesson: async (): Promise<any> => {
    return Promise.resolve(mockStudentDashboardData.lastAccessedLesson);
  },

  getStudentAnnouncements: async (): Promise<any> => {
    return Promise.resolve([]);
  },

  getStudentCampaigns: async (): Promise<any> => {
    return Promise.resolve(mockStudentDashboardData.campaigns || []);
  },

  getStudentShortcuts: async (): Promise<any> => {
    return Promise.resolve({
      left: mockStudentDashboardData.leftShortcuts || [],
      right: mockStudentDashboardData.rightShortcuts || []
    });
  }
};
