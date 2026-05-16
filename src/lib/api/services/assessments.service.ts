import { Assessment } from '@/types';
import { mockAssessments } from '@/mocks';

export const assessmentsService = {
  listAssignments: async (): Promise<Assessment[]> => {
    return mockAssessments.filter(a => a.type === 'ASSIGNMENT');
  },

  listQuizzes: async (): Promise<Assessment[]> => {
    return mockAssessments.filter(a => a.type === 'QUIZ');
  },

  listExams: async (): Promise<Assessment[]> => {
    return mockAssessments.filter(a => a.type === 'EXAM');
  },

  getAssessmentById: async (id: string): Promise<Assessment | undefined> => {
    return mockAssessments.find(a => a.id === id);
  },

  createAssessment: async (data: any): Promise<Assessment> => {
    const newAss: Assessment = {
      ...data,
      id: Math.random().toString(),
      createdAt: new Date().toISOString(),
      status: 'DRAFT'
    };
    return newAss;
  },

  updateAssessment: async (id: string, data: Partial<Assessment>): Promise<Assessment> => {
    const ass = mockAssessments.find(a => a.id === id);
    return { ...ass, ...data } as Assessment;
  },

  publishAssessment: async (id: string): Promise<Assessment> => {
    const ass = mockAssessments.find(a => a.id === id);
    return { ...ass, status: 'PUBLISHED' } as Assessment;
  },

  unpublishAssessment: async (id: string): Promise<Assessment> => {
    const ass = mockAssessments.find(a => a.id === id);
    return { ...ass, status: 'DRAFT' } as Assessment;
  }
};
