import { TeacherBankQuestion } from '@/types';
import { mockTeacherQuestions } from '@/mocks/teacher.mock';

export const teacherQuestionsService = {
  getQuestions: async (filters?: any): Promise<TeacherBankQuestion[]> => {
    return Promise.resolve(mockTeacherQuestions);
  },
  getQuestionById: async (id: string): Promise<any> => { 
    return Promise.resolve(mockTeacherQuestions.find(q => q.id === id) || { id }); 
  },
  createQuestion: async (payload: any): Promise<any> => { 
    return Promise.resolve({ id: Date.now().toString(), ...payload }); 
  },
  updateQuestion: async (id: string, payload: any): Promise<any> => { 
    return Promise.resolve({ id, ...payload }); 
  },
  deleteQuestion: async (id: string): Promise<boolean> => { 
    return Promise.resolve(true); 
  },
  duplicateQuestion: async (id: string): Promise<any> => { 
    return Promise.resolve({ id: Date.now().toString() }); 
  }
};
