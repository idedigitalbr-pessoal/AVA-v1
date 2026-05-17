import { apiClient } from '../api-client';
import { ENDPOINTS } from '../endpoints';
import { Course, Module } from '@/types';
import { mockCourses, mockModules } from '@/mocks';

export const courseService = {
  listCourses: async (): Promise<Course[]> => {
    await apiClient.get(ENDPOINTS.COURSES.BASE);
    return mockCourses;
  },

  getAll: async (): Promise<Course[]> => {
    // legacy alias
    await apiClient.get(ENDPOINTS.COURSES.BASE);
    return mockCourses;
  },

  getCourseById: async (id: string): Promise<Course | undefined> => {
    await apiClient.get(ENDPOINTS.COURSES.BY_ID(id));
    return mockCourses.find(c => c.id === id);
  },

  createCourse: async (data: Partial<Course>): Promise<Course> => {
    await apiClient.post(ENDPOINTS.COURSES.BASE, data);
    const newCourse: Course = { ...mockCourses[0], ...data, id: `c${Date.now()}` } as Course;
    return newCourse;
  },

  updateCourse: async (id: string, data: Partial<Course>): Promise<Course> => {
    await apiClient.put(ENDPOINTS.COURSES.BY_ID(id), data);
    const existing = mockCourses.find(c => c.id === id) || mockCourses[0];
    return { ...existing, ...data };
  },

  deleteCourse: async (id: string): Promise<void> => {
    await apiClient.delete(ENDPOINTS.COURSES.BY_ID(id));
  },

  publishCourse: async (id: string): Promise<Course> => {
    await apiClient.put(ENDPOINTS.COURSES.BY_ID(id), { status: 'PUBLISHED' });
    const existing = mockCourses.find(c => c.id === id) || mockCourses[0];
    return { ...existing, status: 'PUBLISHED' };
  },

  archiveCourse: async (id: string): Promise<Course> => {
    await apiClient.put(ENDPOINTS.COURSES.BY_ID(id), { status: 'ARCHIVED' });
    const existing = mockCourses.find(c => c.id === id) || mockCourses[0];
    return { ...existing, status: 'ARCHIVED' };
  },

  getModules: async (id: string): Promise<Module[]> => {
    await apiClient.get(ENDPOINTS.COURSES.MODULES(id));
    return mockModules.filter(m => m.courseId === id);
  }
};

export const coursesService = courseService;
