import { TeacherClassSubject, TeacherClassOverviewData, TeacherClassStudent, TeacherClassStudentDetail } from '@/types';
import { mockTeacherClassSubjects, mockTeacherClassOverview, mockTeacherClassStudents, mockTeacherStudentDetail } from '@/mocks/teacher.mock';

export const teacherCoursesService = {
  getMyClassSubjects: async (): Promise<TeacherClassSubject[]> => {
    return Promise.resolve(mockTeacherClassSubjects);
  },

  getClassSubjectById: async (id: string): Promise<TeacherClassSubject | undefined> => {
    return Promise.resolve(mockTeacherClassSubjects.find(c => c.id === id) || mockTeacherClassSubjects[0]);
  },

  getClassSubjectOverview: async (id: string): Promise<TeacherClassOverviewData> => {
    return Promise.resolve(mockTeacherClassOverview);
  },

  getClassStudents: async (classSubjectId: string): Promise<TeacherClassStudent[]> => {
    return Promise.resolve(mockTeacherClassStudents);
  },

  getClassStudentDetail: async (classSubjectId: string, studentId: string): Promise<TeacherClassStudentDetail> => {
    return Promise.resolve(mockTeacherStudentDetail);
  }
};
