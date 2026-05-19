import { apiClient } from '../api-client';
import { ENDPOINTS } from '../endpoints';
import { PublicCoursePage } from '@/types';
import { mockPublicCourses } from '@/mocks/public-courses.mock';

export const publicCoursesService = {
  getList: async (): Promise<PublicCoursePage[]> => {
    // return apiClient.get(ENDPOINTS.PUBLIC_COURSES.LIST);
    return new Promise(resolve => setTimeout(() => resolve(mockPublicCourses.filter(c => c.isActive)), 500));
  },

  getFeatured: async (): Promise<PublicCoursePage[]> => {
    // return apiClient.get(ENDPOINTS.PUBLIC_COURSES.FEATURED);
    return new Promise(resolve => setTimeout(() => resolve(mockPublicCourses.filter(c => c.isActive && c.isFeatured)), 500));
  },

  getBySlug: async (slug: string): Promise<PublicCoursePage> => {
    // return apiClient.get(ENDPOINTS.PUBLIC_COURSES.DETAIL(slug));
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const course = mockPublicCourses.find(c => c.slug === slug);
        if (course) resolve(course);
        else reject(new Error('Course not found'));
      }, 500);
    });
  }
};
