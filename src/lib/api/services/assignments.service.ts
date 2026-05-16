import { apiClient } from '../client';
import { endpoints } from '../endpoints';
import { Activity } from '@/types';
import { mockActivities } from '@/mocks';

export const assignmentsService = {
  list: async (courseId?: string): Promise<Activity[]> => {
    await apiClient.get(endpoints.assignments.base, { params: { courseId } });
    let assignments = mockActivities.filter(a => a.type === 'ASSIGNMENT');
    if (courseId) {
      assignments = assignments.filter(a => a.courseId === courseId);
    }
    return assignments;
  },

  create: async (data: any): Promise<Activity> => {
    await apiClient.post(endpoints.assignments.base, data);
    return { id: Math.random().toString(), type: 'ASSIGNMENT', ...data } as Activity;
  },

  getAll: async (courseId?: string): Promise<Activity[]> => {
    await apiClient.get(endpoints.assignments.base, { params: { courseId } });
    let assignments = mockActivities.filter(a => a.type === 'ASSIGNMENT');
    if (courseId) {
      assignments = assignments.filter(a => a.courseId === courseId);
    }
    return assignments;
  },

  getById: async (id: string): Promise<Activity | undefined> => {
    await apiClient.get(endpoints.assignments.byId(id));
    return mockActivities.find(a => a.id === id);
  },

  submit: async (id: string, payload: any): Promise<boolean> => {
    await apiClient.post(endpoints.assignments.submit(id), payload);
    return true;
  }
};

export const assignmentService = assignmentsService;
