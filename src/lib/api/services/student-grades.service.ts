import { StudentGradebookEntry } from '@/types/student';
import { mockStudentGradebook, mockPerformance } from '@/mocks/student.mock';
import { apiClient } from '../api-client';
import { ENDPOINTS } from '../endpoints';

export const studentGradesService = {
  getMyGradebook: async (): Promise<StudentGradebookEntry[]> => {
    // try { return await apiClient.get<StudentGradebookEntry[]>(ENDPOINTS.STUDENT_AREA.GRADEBOOK); } catch(e) {}
    return Promise.resolve(mockStudentGradebook);
  },
  getSubjectGrades: async (subjectId: string): Promise<any> => {
    // try { return await apiClient.get(ENDPOINTS.STUDENT_AREA.SUBJECT_GRADES(subjectId)); } catch(e) {}
    const subject = mockPerformance.disciplines.find(d => d.id === subjectId);
    return Promise.resolve(subject);
  },
  getAttendanceSummary: async (): Promise<any> => {
    // try { return await apiClient.get(ENDPOINTS.STUDENT_AREA.ATTENDANCE); } catch(e) {}
    return Promise.resolve({
      generalAttendance: mockPerformance.attendance,
      disciplines: mockPerformance.disciplines.map(d => ({
        id: d.id,
        name: d.name,
        attendance: d.attendance
      }))
    });
  },
  getAcademicHistory: async (): Promise<any> => {
    // try { return await apiClient.get(ENDPOINTS.STUDENT_AREA.ACADEMIC_HISTORY); } catch(e) {}
    return Promise.resolve({
      gpa: mockPerformance.gpa,
      recentGrades: mockPerformance.recentGrades
    });
  }
};
