import { apiClient } from '../api-client';
import { ENDPOINTS } from '../endpoints';
import { PublicSiteSettings, PublicMenuItem, PublicBanner, FAQItem, Testimonial } from '@/types';
import { mockSiteSettings, mockMenuItems, mockBanners, mockFaqs, mockTestimonials } from '@/mocks/public-site.mock';

export const publicSiteService = {
  getSettings: async (): Promise<PublicSiteSettings> => {
    // return apiClient.get(ENDPOINTS.PUBLIC_SITE.SETTINGS);
    return new Promise(resolve => setTimeout(() => resolve(mockSiteSettings), 500));
  },
  
  getMenu: async (): Promise<PublicMenuItem[]> => {
    // return apiClient.get(ENDPOINTS.PUBLIC_SITE.MENU);
    return new Promise(resolve => setTimeout(() => resolve(mockMenuItems), 500));
  },

  getBanners: async (): Promise<PublicBanner[]> => {
    // return apiClient.get(ENDPOINTS.PUBLIC_SITE.BANNERS);
    return new Promise(resolve => setTimeout(() => resolve(mockBanners.filter(b => b.isActive)), 500));
  },

  getFaqs: async (): Promise<FAQItem[]> => {
    // return apiClient.get(ENDPOINTS.PUBLIC_SITE.FAQS);
    return new Promise(resolve => setTimeout(() => resolve(mockFaqs), 500));
  },

  getTestimonials: async (): Promise<Testimonial[]> => {
    // return apiClient.get(ENDPOINTS.PUBLIC_SITE.TESTIMONIALS);
    return new Promise(resolve => setTimeout(() => resolve(mockTestimonials.filter(t => t.isActive)), 500));
  }
};
