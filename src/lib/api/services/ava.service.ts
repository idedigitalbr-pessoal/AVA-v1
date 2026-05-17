import { apiClient } from '../api-client';
import { ENDPOINTS } from '../endpoints';
import { Module, Lesson, LessonMaterial } from '@/types';
import { mockModules, mockLessons } from '@/mocks';

export const avaService = {
  // Aliases for compatibility
  getModules: async (courseId: string): Promise<Module[]> => {
    return avaService.listModulesByCourse(courseId);
  },
  getLessons: async (moduleId: string): Promise<Lesson[]> => {
    return avaService.listLessonsByModule(moduleId);
  },

  // Modules
  listModulesByCourse: async (courseId: string): Promise<Module[]> => {
    await apiClient.get(ENDPOINTS.ava.modules, { params: { courseId } });
    return mockModules.filter(m => m.courseId === courseId).sort((a, b) => a.order - b.order);
  },
  createModule: async (courseId: string, data: Partial<Module>): Promise<Module> => {
    await apiClient.post(ENDPOINTS.ava.modules, data);
    return { id: `mod-${Math.random().toString()}`, courseId, ...data } as Module;
  },
  updateModule: async (id: string, data: Partial<Module>): Promise<Module> => {
    await apiClient.put(`${ENDPOINTS.ava.modules}/${id}`, data);
    const existing = mockModules.find(m => m.id === id) || mockModules[0];
    return { ...existing, ...data } as Module;
  },
  deleteModule: async (id: string): Promise<void> => {
    await apiClient.delete(`${ENDPOINTS.ava.modules}/${id}`);
  },
  reorderModules: async (courseId: string, orderedModuleIds: string[]): Promise<void> => {
    await apiClient.put(`${ENDPOINTS.ava.modules}/reorder`, { courseId, orderedModuleIds });
  },

  // Lessons
  listLessonsByModule: async (moduleId: string): Promise<Lesson[]> => {
    await apiClient.get(ENDPOINTS.ava.lessons(moduleId));
    return mockLessons.filter(l => l.moduleId === moduleId).sort((a, b) => a.order - b.order);
  },
  createLesson: async (moduleId: string, data: Partial<Lesson>): Promise<Lesson> => {
    await apiClient.post(ENDPOINTS.ava.lessons(moduleId), data);
    return { id: `less-${Math.random().toString()}`, moduleId, isPublished: false, isMandatory: false, ...data } as Lesson;
  },
  updateLesson: async (id: string, data: Partial<Lesson>): Promise<Lesson> => {
    const existing = mockLessons.find(l => l.id === id) || mockLessons[0];
    await apiClient.put(ENDPOINTS.ava.lessonDetail(id), data);
    return { ...existing, ...data } as Lesson;
  },
  deleteLesson: async (id: string): Promise<void> => {
    await apiClient.delete(ENDPOINTS.ava.lessonDetail(id));
  },
  publishLesson: async (id: string): Promise<void> => {
    await apiClient.put(`${ENDPOINTS.ava.lessonDetail(id)}/publish`);
  },
  unpublishLesson: async (id: string): Promise<void> => {
    await apiClient.put(`${ENDPOINTS.ava.lessonDetail(id)}/unpublish`);
  },
  getLessonDetail: async (lessonId: string): Promise<Lesson | undefined> => {
    await apiClient.get(ENDPOINTS.ava.lessonDetail(lessonId));
    return mockLessons.find(l => l.id === lessonId);
  },

  // Materials
  addLessonMaterial: async (lessonId: string, data: Partial<LessonMaterial>): Promise<LessonMaterial> => {
    await apiClient.post(`${ENDPOINTS.ava.lessonDetail(lessonId)}/materials`, data);
    return { id: `mat-${Math.random().toString()}`, lessonId, ...data } as LessonMaterial;
  },
  removeLessonMaterial: async (lessonId: string, materialId: string): Promise<void> => {
    await apiClient.delete(`${ENDPOINTS.ava.lessonDetail(lessonId)}/materials/${materialId}`);
  }
};
