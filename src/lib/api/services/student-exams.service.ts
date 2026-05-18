import { mockStudentActivities } from '@/mocks/student.mock';

// Exams might be similar to quizzes
export const studentExamsService = {
  getMyExams: async (): Promise<any[]> => {
    return Promise.resolve(mockStudentActivities.filter(a => a.type === 'QUIZ')); // Mock
  }
};
