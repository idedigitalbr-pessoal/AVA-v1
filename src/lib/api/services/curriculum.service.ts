import { apiClient } from '../client';
import { CurriculumPeriod, CurriculumSubject, Subject } from '@/types';

// Mock data
export const mockCurriculumPeriods: CurriculumPeriod[] = [
  { id: 'p1', courseId: '1', name: '1º Semestre', order: 0 },
  { id: 'p2', courseId: '1', name: '2º Semestre', order: 1 },
];

export const mockCurriculumSubjects: CurriculumSubject[] = [
  {
    id: 'cs1',
    courseId: '1',
    subjectId: 'sub1',
    subjectName: 'Lógica de Programação',
    subjectCode: 'SI101',
    periodId: 'p1',
    order: 0,
    workload: 80,
    isMandatory: true,
    prerequisites: []
  },
  {
    id: 'cs2',
    courseId: '1',
    subjectId: 'sub2',
    subjectName: 'Sistemas Operacionais',
    subjectCode: 'SI102',
    periodId: 'p2',
    order: 0,
    workload: 60,
    isMandatory: true,
    prerequisites: ['cs1']
  }
];

export const mockSubjectsPool: Subject[] = [
  { id: 'sub1', courseId: '1', name: 'Lógica de Programação', code: 'SI101', workload: 80 },
  { id: 'sub2', courseId: '1', name: 'Sistemas Operacionais', code: 'SI102', workload: 60 },
  { id: 'sub3', courseId: '1', name: 'Banco de Dados', code: 'SI103', workload: 80 },
  { id: 'sub4', courseId: '1', name: 'Engenharia de Software', code: 'SI104', workload: 60 },
];

export const curriculumService = {
  getPeriodsByCourse: async (courseId: string): Promise<CurriculumPeriod[]> => {
    // await apiClient.get('/curriculum/periods', { params: { courseId } });
    return mockCurriculumPeriods.filter(p => p.courseId === courseId).sort((a, b) => a.order - b.order);
  },
  getSubjectsByCourse: async (courseId: string): Promise<CurriculumSubject[]> => {
    // await apiClient.get('/curriculum/subjects', { params: { courseId } });
    return mockCurriculumSubjects.filter(p => p.courseId === courseId);
  },
  addSubjectToCurriculum: async (data: Partial<CurriculumSubject>): Promise<CurriculumSubject> => {
    // await apiClient.post('/curriculum/subjects', data);
    return { id: `cs-${Math.random()}`, ...data } as CurriculumSubject;
  },
  updateCurriculumSubject: async (id: string, data: Partial<CurriculumSubject>): Promise<CurriculumSubject> => {
    // await apiClient.put(`/curriculum/subjects/${id}`, data);
    const existing = mockCurriculumSubjects.find(s => s.id === id) || mockCurriculumSubjects[0];
    return { ...existing, ...data } as CurriculumSubject;
  },
  removeSubjectFromCurriculum: async (id: string): Promise<void> => {
    // await apiClient.delete(`/curriculum/subjects/${id}`);
  },
  reorderCurriculumSubjects: async (periodId: string, orderedIds: string[]): Promise<void> => {
    // await apiClient.put(`/curriculum/periods/${periodId}/reorder`, { orderedIds });
  },
  
  createPeriod: async (courseId: string, data: Partial<CurriculumPeriod>): Promise<CurriculumPeriod> => {
    return { id: `p-${Math.random()}`, courseId, ...data } as CurriculumPeriod;
  },

  updatePeriod: async (id: string, data: Partial<CurriculumPeriod>): Promise<CurriculumPeriod> => {
    return { id, ...data } as CurriculumPeriod;
  },

  deletePeriod: async (id: string): Promise<void> => {
  },

  getAvailableSubjects: async (courseId: string): Promise<Subject[]> => {
    // API should return subjects available to be mapped to this course
    return mockSubjectsPool.filter(s => s.courseId === courseId);
  }
};
