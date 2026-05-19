import { apiClient } from '../api-client';
import { ENDPOINTS } from '../endpoints';
import { Lead } from '@/types';
import { mockLeads } from '@/mocks/public-leads.mock';

export const adminLeadsService = {
  getLeads: async (): Promise<Lead[]> => {
    // return apiClient.get(ENDPOINTS.ADMIN_LEADS.LIST);
    return new Promise(resolve => setTimeout(() => resolve(mockLeads), 500));
  },

  getLeadById: async (id: string): Promise<Lead> => {
    // return apiClient.get(ENDPOINTS.ADMIN_LEADS.DETAIL(id));
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const lead = mockLeads.find(l => l.id === id);
        if (lead) resolve(lead);
        else reject(new Error('Lead not found'));
      }, 500);
    });
  },

  updateLeadStage: async (id: string, stage: string): Promise<{ success: boolean }> => {
    // return apiClient.patch(ENDPOINTS.ADMIN_LEADS.UPDATE_STAGE(id), { stage });
    return new Promise(resolve => setTimeout(() => resolve({ success: true }), 500));
  },

  addNote: async (id: string, content: string): Promise<{ success: boolean; noteId: string }> => {
    // return apiClient.post(ENDPOINTS.ADMIN_LEADS.ADD_NOTE(id), { content });
    return new Promise(resolve => setTimeout(() => resolve({ success: true, noteId: `note-${Date.now()}` }), 500));
  },

  addTask: async (id: string, task: object): Promise<{ success: boolean }> => {
    return new Promise(resolve => setTimeout(() => resolve({ success: true }), 500));
  },

  convertToPreEnrollment: async (id: string): Promise<{ success: boolean; preEnrollmentId: string }> => {
    return new Promise(resolve => setTimeout(() => resolve({ success: true, preEnrollmentId: `pe-${Date.now()}` }), 500));
  }
};
