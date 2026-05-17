import { mockTeacherAttendance } from '@/mocks/teacher.mock';

export const teacherAttendanceService = {
  getAttendanceSessions: async (classSubjectId: string): Promise<any> => {
    return Promise.resolve({ ...mockTeacherAttendance, classSubjectId });
  },
  createAttendanceSession: async (classSubjectId: string, payload: any): Promise<any> => { 
    return Promise.resolve({ id: Date.now().toString(), ...payload }); 
  },
  updateAttendanceRecord: async (sessionId: string, studentId: string, payload: any): Promise<boolean> => { 
    return Promise.resolve(true); 
  },
  saveAttendanceSession: async (sessionId: string, payload: any): Promise<boolean> => { 
    return Promise.resolve(true); 
  },
  exportAttendance: async (classSubjectId: string): Promise<string> => { 
    return Promise.resolve("export_url"); 
  }
};
