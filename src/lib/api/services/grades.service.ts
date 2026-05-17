import { apiClient } from '../api-client';
import { ENDPOINTS } from '../endpoints';

export interface GradeRecord {
  id: string;
  studentId: string;
  courseId: string;
  subject: string;
  p1: number;
  p2: number;
  proj: number;
  final: number;
  status: 'APROVADO' | 'REPROVADO' | 'EXAME' | 'EM ANDAMENTO';
}

const mockGrades: GradeRecord[] = [
  { id: '1', studentId: '3', courseId: '1', subject: 'Lógica de Programação', p1: 8.5, p2: 7.0, proj: 9.0, final: 8.3, status: 'APROVADO' },
  { id: '2', studentId: '3', courseId: '2', subject: 'Banco de Dados', p1: 6.0, p2: 5.5, proj: 7.5, final: 6.5, status: 'EXAME' }
];

export const gradesService = {
  list: async (studentId?: string, classId?: string): Promise<GradeRecord[]> => {
    // If studentId, filter by student. If classId, filter by class. Otherwise return all.
    await apiClient.get('/grades', { params: { studentId, classId } });
    if (studentId) return mockGrades.filter(g => g.studentId === studentId);
    if (classId) return mockGrades.filter(g => g.courseId === classId);
    return mockGrades;
  },

  getStudentGrades: async (studentId: string): Promise<GradeRecord[]> => {
    await apiClient.get(ENDPOINTS.grades.studentGrades(studentId));
    return mockGrades.filter(g => g.studentId === studentId); // simulando filtro real
  },

  getClassGrades: async (classId: string): Promise<GradeRecord[]> => {
    await apiClient.get(ENDPOINTS.grades.classGrades(classId));
    return mockGrades; // mock retorna tudo
  }
};

export const gradeService = gradesService;
