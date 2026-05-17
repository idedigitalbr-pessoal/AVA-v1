import { 
  TeacherClassPerformanceReport, TeacherClassAttendanceReport, 
  TeacherClassEngagementReport, TeacherAtRiskReport 
} from '@/types';
import { 
  mockTeacherPerformanceReport, mockTeacherAttendanceReport, 
  mockTeacherEngagementReport, mockTeacherAtRiskReport 
} from '@/mocks/teacher.mock';

export const teacherReportsService = {
  getClassPerformance: async (classSubjectId: string): Promise<TeacherClassPerformanceReport> => {
    return Promise.resolve(mockTeacherPerformanceReport);
  },
  getClassAttendanceReport: async (classSubjectId: string): Promise<TeacherClassAttendanceReport> => {
    return Promise.resolve(mockTeacherAttendanceReport);
  },
  getClassEngagementReport: async (classSubjectId: string): Promise<TeacherClassEngagementReport> => {
    return Promise.resolve(mockTeacherEngagementReport);
  },
  getAtRiskStudentsReport: async (classSubjectId: string): Promise<TeacherAtRiskReport> => {
    return Promise.resolve(mockTeacherAtRiskReport);
  },
  exportTeacherReport: async (type: string, filters: any): Promise<boolean> => {
    return Promise.resolve(true);
  }
};
