import { apiClient } from '../client';
import { endpoints } from '../endpoints';
import { Course, Module } from '@/types';
import { mockCourses, mockModules } from '@/mocks';

export const courseService = {
  listCourses: async (): Promise<Course[]> => {
    await apiClient.get(endpoints.courses.base);
    return mockCourses;
  },

  getAll: async (): Promise<Course[]> => {
    // legacy alias
    await apiClient.get(endpoints.courses.base);
    return mockCourses;
  },

  getCourseById: async (id: string): Promise<Course | undefined> => {
    await apiClient.get(endpoints.courses.byId(id));
    return mockCourses.find(c => c.id === id);
  },

  createCourse: async (data: Partial<Course>): Promise<Course> => {
    await apiClient.post(endpoints.courses.base, data);
    const newCourse: Course = { ...mockCourses[0], ...data, id: `c${Date.now()}` } as Course;
    return newCourse;
  },

  updateCourse: async (id: string, data: Partial<Course>): Promise<Course> => {
    await apiClient.put(endpoints.courses.byId(id), data);
    const existing = mockCourses.find(c => c.id === id) || mockCourses[0];
    return { ...existing, ...data };
  },

  deleteCourse: async (id: string): Promise<void> => {
    await apiClient.delete(endpoints.courses.byId(id));
  },

  publishCourse: async (id: string): Promise<Course> => {
    await apiClient.put(endpoints.courses.byId(id), { status: 'PUBLISHED' });
    const existing = mockCourses.find(c => c.id === id) || mockCourses[0];
    return { ...existing, status: 'PUBLISHED' };
  },

  archiveCourse: async (id: string): Promise<Course> => {
    await apiClient.put(endpoints.courses.byId(id), { status: 'ARCHIVED' });
    const existing = mockCourses.find(c => c.id === id) || mockCourses[0];
    return { ...existing, status: 'ARCHIVED' };
  },

  getModules: async (id: string): Promise<Module[]> => {
    await apiClient.get(endpoints.courses.modules(id));
    return mockModules.filter(m => m.courseId === id);
  }
};

export const coursesService = courseService;
