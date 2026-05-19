import { Campaign } from '@/types';

export const mockCampaigns: Campaign[] = [
  {
    id: 'camp-1',
    name: 'Black Friday 2026',
    status: 'ACTIVE',
    budget: 5000,
    spent: 1200,
    startDate: new Date().toISOString(),
    utmSource: 'google',
    utmMedium: 'cpc',
    utmCampaign: 'bf2026'
  },
  {
    id: 'camp-2',
    name: 'Lançamento MBA',
    status: 'COMPLETED',
    budget: 2000,
    spent: 2000,
    description: 'Campanha de E-mail para base de leads antigos.'
  }
];
