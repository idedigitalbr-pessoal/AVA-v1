import { apiClient } from '../api-client';
import { ENDPOINTS } from '../endpoints';
import { Subject } from '@/types';
import { mockSubjects } from '@/mocks';

export const subjectsService = {
  getAll: async (): Promise<Subject[]> => {
    // await apiClient.get(ENDPOINTS.subjects.base);
    return mockSubjects;
  },

  getById: async (id: string): Promise<Subject | undefined> => {
    // await apiClient.get(ENDPOINTS.subjects.byId(id));
    return mockSubjects.find(c => c.id === id);
  },

  listSubjects: async (): Promise<Subject[]> => {
    return mockSubjects;
  },

  getSubjectById: async (id: string): Promise<Subject | undefined> => {
    return mockSubjects.find(s => s.id === id);
  },

  createSubject: async (data: Partial<Subject>): Promise<Subject> => {
    const newSubject: Subject = {
      id: `sub-${Math.random()}`,
      name: data.name || '',
      code: data.code || '',
      description: data.description || '',
      courseId: data.courseId || '',
      workload: data.workload || 0,
      area: data.area || '',
      status: data.status || 'DRAFT',
      ...data
    };
    return newSubject;
  },

  updateSubject: async (id: string, data: Partial<Subject>): Promise<Subject> => {
    const existing = mockSubjects.find(s => s.id === id) || mockSubjects[0];
    return { ...existing, ...data };
  },

  deleteSubject: async (id: string): Promise<void> => {
    // await apiClient.delete(ENDPOINTS.subjects.byId(id));
  },

  linkSubjectToCourse: async (subjectId: string, courseId: string): Promise<void> => {
    // API Call
  },

  linkTeacherToSubject: async (subjectId: string, teacherId: string): Promise<void> => {
    // API Call
  }
};
