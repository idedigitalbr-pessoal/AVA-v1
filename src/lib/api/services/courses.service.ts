import { apiClient } from '../client';
import { endpoints } from '../endpoints';
import { Course, Module } from '@/types';
import { mockCourses, mockModules } from '@/mocks';

export const coursesService = {
  list: async (): Promise<Course[]> => {
    // await apiClient.get(endpoints.courses.base);
    return Promise.resolve(mockCourses);
  },

  getAll: async (): Promise<Course[]> => {
    // await apiClient.get(endpoints.courses.base);
    return Promise.resolve(mockCourses);
  },

  getById: async (id: string): Promise<Course | undefined> => {
    // await apiClient.get(endpoints.courses.byId(id));
    return Promise.resolve(mockCourses.find(c => c.id === id));
  },

  getModules: async (id: string): Promise<Module[]> => {
    // await apiClient.get(endpoints.courses.modules(id));
    return Promise.resolve(mockModules.filter(m => m.courseId === id));
  },

  createCourse: async (data: Partial<Course>): Promise<Course> => {
    const newCourse = { ...data, id: `c-${Date.now()}` } as Course;
    return Promise.resolve(newCourse);
  },

  updateCourse: async (id: string, data: Partial<Course>): Promise<Course> => {
    const course = mockCourses.find(c => c.id === id);
    if (!course) throw new Error("Course not found");
    return Promise.resolve({ ...course, ...data });
  },

  deleteCourse: async (id: string): Promise<void> => {
    return Promise.resolve();
  },

  publishCourse: async (id: string): Promise<Course> => {
    const course = mockCourses.find(c => c.id === id);
    if (!course) throw new Error("Course not found");
    return Promise.resolve({ ...course, status: 'PUBLISHED' });
  },

  archiveCourse: async (id: string): Promise<Course> => {
    const course = mockCourses.find(c => c.id === id);
    if (!course) throw new Error("Course not found");
    return Promise.resolve({ ...course, status: 'ARCHIVED' });
  }
};

export const courseService = coursesService;
