import { apiClient } from '../api-client';
import { ENDPOINTS } from '../endpoints';
import { Campaign } from '@/types';
import { mockCampaigns } from '@/mocks/public-campaigns.mock';

export const adminCampaignsService = {
  getCampaigns: async (): Promise<Campaign[]> => {
    // return apiClient.get(ENDPOINTS.ADMIN_CAMPAIGNS.LIST);
    return new Promise(resolve => setTimeout(() => resolve(mockCampaigns), 500));
  },

  getById: async (id: string): Promise<Campaign> => {
    // return apiClient.get(ENDPOINTS.ADMIN_CAMPAIGNS.DETAIL(id));
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const campaign = mockCampaigns.find(c => c.id === id);
        if (campaign) resolve(campaign);
        else reject(new Error('Campaign not found'));
      }, 500);
    });
  },

  create: async (data: Partial<Campaign>): Promise<Campaign> => {
    // return apiClient.post(ENDPOINTS.ADMIN_CAMPAIGNS.LIST, data);
    return new Promise(resolve => setTimeout(() => resolve({ ...data, id: `camp-new-${Date.now()}` } as Campaign), 800));
  },

  update: async (id: string, data: Partial<Campaign>): Promise<Campaign> => {
    // return apiClient.put(ENDPOINTS.ADMIN_CAMPAIGNS.DETAIL(id), data);
    return new Promise(resolve => setTimeout(() => resolve({ ...data, id } as Campaign), 800));
  }
};
