import { apiClient } from '../api-client';
import { ENDPOINTS } from '../endpoints';
import { Lead, LeadForm } from '@/types';
import { mockLeadForms } from '@/mocks/public-leads.mock';

export const publicLeadsService = {
  getForm: async (id: string): Promise<LeadForm> => {
    // return apiClient.get(ENDPOINTS.PUBLIC_LEADS.FORMS(id));
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const form = mockLeadForms.find(f => f.id === id);
        if (form) resolve(form);
        else reject(new Error('Form not found'));
      }, 500);
    });
  },

  submitLead: async (data: Partial<Lead>): Promise<{ success: boolean; id?: string }> => {
    // return apiClient.post(ENDPOINTS.PUBLIC_LEADS.SUBMIT, data);
    return new Promise(resolve => setTimeout(() => resolve({ success: true, id: `new-lead-${Date.now()}` }), 800));
  }
};
