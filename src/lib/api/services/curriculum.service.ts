import { apiClient } from '../api-client';
import { ENDPOINTS } from '../endpoints';
import { CurriculumPeriod, CurriculumSubject, Subject } from '@/types';

export interface Curriculum {
  id: string;
  courseId: string;
  name: string;
  description: string;
}

export const curriculumService = {
  getCurriculum: async (courseId: string): Promise<Curriculum> => {
    return { id: "curriculum_1", courseId, name: "Currículo", description: "" };
  },
  updateCurriculum: async (id: string, data: Partial<Curriculum>): Promise<Curriculum> => {
    return { id, courseId: data.courseId || "1", name: data.name || "", description: data.description || "" };
  },
  getPeriodsByCourse: async (courseId: string): Promise<CurriculumPeriod[]> => {
    return [
      { id: '1', courseId, name: '1º Semestre', order: 1 },
      { id: '2', courseId, name: '2º Semestre', order: 2 },
    ];
  },
  getSubjectsByCourse: async (courseId: string): Promise<CurriculumSubject[]> => {
    return [
       { id: 's1', periodId: '1', subjectId: 'subj1', isMandatory: true, order: 1 } as any
    ];
  },
  getAvailableSubjects: async (courseId: string): Promise<Subject[]> => {
    return [
       { id: 'subj1', name: 'Disciplina 1', code: 'D1' } as any
    ];
  },
  createPeriod: async (courseId: string, data: Partial<CurriculumPeriod>) => data,
  updatePeriod: async (id: string, data: Partial<CurriculumPeriod>) => data,
  deletePeriod: async (id: string) => true,
  updateCurriculumSubject: async (id: string, data: any) => data,
  addSubjectToCurriculum: async (data: any) => data,
  removeSubjectFromCurriculum: async (id: string) => true,
  reorderCurriculumSubjects: async (periodId: string, items: any[]) => true,
};
