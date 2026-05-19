import { apiClient } from '../api-client';
import { ENDPOINTS } from '../endpoints';
import { PublicSiteSettings } from '@/types';
import { mockSiteSettings } from '@/mocks/public-site.mock';

export const adminSiteService = {
  getSettings: async (): Promise<PublicSiteSettings> => {
    // return apiClient.get(ENDPOINTS.ADMIN_SITE.SETTINGS);
    return new Promise(resolve => setTimeout(() => resolve(mockSiteSettings), 500));
  },
  
  updateSettings: async (settings: Partial<PublicSiteSettings>): Promise<{ success: boolean }> => {
    // return apiClient.put(ENDPOINTS.ADMIN_SITE.SETTINGS, settings);
    return new Promise(resolve => setTimeout(() => resolve({ success: true }), 800));
  }
};
