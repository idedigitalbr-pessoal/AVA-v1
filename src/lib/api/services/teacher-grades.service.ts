import { mockTeacherGradebook } from '@/mocks/teacher.mock';

export const teacherGradesService = {
  getGradebook: async (classSubjectId: string): Promise<any> => {
    return Promise.resolve({ ...mockTeacherGradebook, classSubjectId });
  },
  updateStudentGrade: async (classSubjectId: string, studentId: string, assessmentId: string, payload: any): Promise<boolean> => { 
    return Promise.resolve(true); 
  },
  saveGradebook: async (classSubjectId: string, payload: any): Promise<boolean> => { 
    return Promise.resolve(true); 
  },
  exportGradebook: async (classSubjectId: string): Promise<string> => { 
    return Promise.resolve("export_url"); 
  }
};
