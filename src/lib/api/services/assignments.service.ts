import { apiClient } from '../api-client';
import { ENDPOINTS } from '../endpoints';
import { Activity } from '@/types';
import { mockActivities } from '@/mocks';

export const assignmentsService = {
  list: async (courseId?: string): Promise<Activity[]> => {
    await apiClient.get(ENDPOINTS.ASSIGNMENTS.BASE, { params: { courseId } });
    let assignments = mockActivities.filter(a => a.type === 'ASSIGNMENT');
    if (courseId) {
      assignments = assignments.filter(a => a.courseId === courseId);
    }
    return assignments;
  },

  create: async (data: any): Promise<Activity> => {
    await apiClient.post(ENDPOINTS.ASSIGNMENTS.BASE, data);
    return { id: Math.random().toString(), type: 'ASSIGNMENT', ...data } as Activity;
  },

  getAll: async (courseId?: string): Promise<Activity[]> => {
    await apiClient.get(ENDPOINTS.ASSIGNMENTS.BASE, { params: { courseId } });
    let assignments = mockActivities.filter(a => a.type === 'ASSIGNMENT');
    if (courseId) {
      assignments = assignments.filter(a => a.courseId === courseId);
    }
    return assignments;
  },

  getById: async (id: string): Promise<Activity | undefined> => {
    await apiClient.get(ENDPOINTS.ASSIGNMENTS.BY_ID(id));
    return mockActivities.find(a => a.id === id);
  },

  submit: async (id: string, payload: any): Promise<boolean> => {
    await apiClient.post(ENDPOINTS.ASSIGNMENTS.SUBMIT(id), payload);
    return true;
  }
};

export const assignmentService = assignmentsService;
