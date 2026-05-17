import { apiClient } from '../api-client';
import { ENDPOINTS } from '../endpoints';
import { Class, ClassSubject } from '@/types';
import { mockClasses, mockClassSubjects } from '@/mocks';

export const classesService = {
  listClasses: async (): Promise<Class[]> => {
    // await apiClient.get(ENDPOINTS.classes.base);
    return mockClasses;
  },

  list: async (): Promise<Class[]> => { // alias for listClasses for backward compatibility
    return mockClasses;
  },

  getAll: async (): Promise<Class[]> => { // alias
    return mockClasses;
  },

  getClassById: async (id: string): Promise<Class | undefined> => {
    // await apiClient.get(ENDPOINTS.classes.byId(id));
    return mockClasses.find(c => c.id === id);
  },

  getById: async (id: string): Promise<Class | undefined> => { // alias
    return mockClasses.find(c => c.id === id);
  },

  createClass: async (data: Partial<Class>): Promise<Class> => {
    const newClass: Class = {
      id: `class-${Math.random()}`,
      name: data.name || '',
      courseId: data.courseId || '',
      academicYear: data.academicYear || '',
      startDate: data.startDate || '',
      endDate: data.endDate || '',
      status: 'ACTIVE',
      studentsCount: 0,
      subjectsCount: 0,
    };
    return newClass;
  },

  updateClass: async (id: string, data: Partial<Class>): Promise<Class> => {
    const existing = mockClasses.find(c => c.id === id) || mockClasses[0];
    return { ...existing, ...data };
  },

  archiveClass: async (id: string): Promise<void> => {
    // API logic to archive class
  },

  linkSubjectToClass: async (classId: string, subjectId: string): Promise<ClassSubject> => {
    return {
      id: `cs-${Math.random()}`,
      classId,
      subjectId,
      teacherId: '',
    };
  },

  unlinkSubjectFromClass: async (classSubjectId: string): Promise<void> => {
    // API logic to unlink subject
  },

  linkTeacherToClassSubject: async (classSubjectId: string, teacherId: string): Promise<void> => {
    // API logic to assign teacher
  }
};

export const classService = classesService;

