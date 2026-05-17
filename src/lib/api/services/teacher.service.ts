import { apiClient } from '../api-client';
import { ENDPOINTS } from '../endpoints';
import { User, Teacher, Course, Subject, Class } from '@/types';
import { mockTeachers, mockCourses, mockSubjects, mockClasses, mockClassSubjects } from '@/mocks';

export const teachersService = {
  list: async (): Promise<Teacher[]> => {
    return mockTeachers;
  },

  create: async (data: any): Promise<Teacher> => {
    return { ...mockTeachers[0], id: Math.random().toString(), ...data } as Teacher;
  },

  getAll: async (): Promise<any[]> => {
    return mockTeachers.map(t => {
      const teacherSubjects = mockSubjects.filter(sub => sub.linkedTeachers?.some(lt => lt.id === t.id));
      const teacherClassIds = mockClassSubjects.filter(cs => cs.teacherId === t.id).map(cs => cs.classId);
      const teacherClasses = mockClasses.filter(c => teacherClassIds.includes(c.id));
      const workload = teacherSubjects.reduce((acc, sub) => acc + (sub.workload || 0), 0);
      return { 
        ...t, 
        subjectsCount: teacherSubjects.length, 
        classesCount: teacherClasses.length,
        workload
      };
    });
  },

  getById: async (id: string): Promise<Teacher | undefined> => {
    return mockTeachers.find(u => u.id === id);
  },

  update: async (id: string, data: Partial<Teacher>): Promise<Teacher> => {
    const teacher = mockTeachers.find(u => u.id === id);
    return { ...teacher, ...data } as Teacher;
  },

  blockAccess: async (id: string): Promise<Teacher> => {
    const teacher = mockTeachers.find(u => u.id === id);
    return { ...teacher, status: 'BLOCKED' } as Teacher;
  },

  activeAccess: async (id: string): Promise<Teacher> => {
    const teacher = mockTeachers.find(u => u.id === id);
    return { ...teacher, status: 'ACTIVE' } as Teacher;
  },

  resetPassword: async (id: string): Promise<boolean> => {
    return true; // sucesso
  },

  assignSubject: async (teacherId: string, subjectId: string): Promise<boolean> => {
    return true;
  },

  assignClass: async (teacherId: string, classId: string): Promise<boolean> => {
    return true;
  },

  getClasses: async (id: string): Promise<Course[]> => {
    // legacy, returns courses the teacher is instructor of.
    return mockCourses.filter(c => c.instructorId === id);
  },

  getSubjects: async (id: string): Promise<Subject[]> => {
    return mockSubjects.filter(sub => sub.linkedTeachers?.some(t => t.id === id));
  },

  getClassesTurmas: async (id: string): Promise<Class[]> => {
    // returns actual "Turmas" (Classes) the teacher is linked to via ClassSubjects
    const classIds = mockClassSubjects.filter(cs => cs.teacherId === id).map(cs => cs.classId);
    return mockClasses.filter(c => classIds.includes(c.id));
  }
};
