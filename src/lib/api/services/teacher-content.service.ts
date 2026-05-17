import { mockTeacherModules } from '@/mocks/teacher.mock';

export const teacherContentService = {
  getTeacherCourseModules: async (classSubjectId: string): Promise<any[]> => {
    return Promise.resolve(mockTeacherModules);
  },
  createTeacherModule: async (classSubjectId: string, payload: any): Promise<any> => { return Promise.resolve(payload); },
  updateTeacherModule: async (moduleId: string, payload: any): Promise<any> => { return Promise.resolve(payload); },
  deleteTeacherModule: async (moduleId: string): Promise<boolean> => { return Promise.resolve(true); },
  reorderTeacherModules: async (classSubjectId: string, payload: any): Promise<boolean> => { return Promise.resolve(true); },
  
  createTeacherLesson: async (moduleId: string, payload: any): Promise<any> => { return Promise.resolve(payload); },
  updateTeacherLesson: async (lessonId: string, payload: any): Promise<any> => { return Promise.resolve(payload); },
  deleteTeacherLesson: async (lessonId: string): Promise<boolean> => { return Promise.resolve(true); },
  publishTeacherLesson: async (lessonId: string): Promise<boolean> => { return Promise.resolve(true); },
  unpublishTeacherLesson: async (lessonId: string): Promise<boolean> => { return Promise.resolve(true); },
  
  addTeacherLessonMaterial: async (lessonId: string, payload: any): Promise<any> => { return Promise.resolve(payload); },
  removeTeacherLessonMaterial: async (materialId: string): Promise<boolean> => { return Promise.resolve(true); },
};
