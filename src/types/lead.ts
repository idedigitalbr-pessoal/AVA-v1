export interface LeadForm {
  id: string;
  title: string;
  description?: string;
  campaignId?: string;
  fields: LeadFormField[];
  submitButtonText: string;
  successMessage: string;
  redirectUrl?: string;
  isActive: boolean;
}

export interface LeadFormField {
  id: string;
  name: string; // field key like 'name', 'email', 'phone'
  label: string;
  type: 'TEXT' | 'EMAIL' | 'PHONE' | 'SELECT' | 'TEXTAREA' | 'CHECKBOX';
  required: boolean;
  options?: string[]; // for SELECT
  placeholder?: string;
  order: number;
}

export type LeadStage = 'NEW' | 'CONTACT_ATTEMPT' | 'IN_SERVICE' | 'INTERESTED' | 'NO_REPLY' | 'CONVERTED' | 'LOST';

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  source: string; // 'Organic', 'Facebook Ads', 'Google Ads', 'Direct', etc.
  campaignId?: string;
  campaign?: Campaign;
  formId?: string;
  stage: LeadStage;
  interestedCourseId?: string;
  score?: number; // Lead scoring
  createdAt: string;
  updatedAt: string;
  lastContactAt?: string;
  notes?: LeadNote[];
  tasks?: LeadTask[];
  customFields?: Record<string, any>;
}

export interface LeadNote {
  id: string;
  leadId: string;
  content: string;
  authorId: string; // Attendant/Admin ID
  authorName: string;
  createdAt: string;
}

export interface LeadTask {
  id: string;
  leadId: string;
  title: string;
  description?: string;
  dueDate: string;
  isCompleted: boolean;
  assignedToId?: string; // Attendant ID
  createdAt: string;
}

export interface Campaign {
  id: string;
  name: string;
  startDate?: string;
  endDate?: string;
  budget?: number;
  spent?: number;
  status: 'ACTIVE' | 'PAUSED' | 'COMPLETED';
  description?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}
