import { Lead, LeadForm } from '@/types';

export const mockLeadForms: LeadForm[] = [
  {
    id: 'form-1',
    title: 'Tenho Interesse',
    description: 'Preencha seus dados para receber mais informações.',
    submitButtonText: 'Quero Receber Informações',
    successMessage: 'Obrigado! Entraremos em contato em breve.',
    isActive: true,
    fields: [
      { id: 'f1', name: 'name', label: 'Nome Completo', type: 'TEXT', required: true, order: 1 },
      { id: 'f2', name: 'email', label: 'E-mail', type: 'EMAIL', required: true, order: 2 },
      { id: 'f3', name: 'phone', label: 'Telefone/WhatsApp', type: 'PHONE', required: true, order: 3 },
    ]
  }
];

export const mockLeads: Lead[] = [
  {
    id: 'lead-1',
    name: 'Ana Neri',
    email: 'ana@example.com',
    phone: '11999999999',
    source: 'Landing Page Campanha Alpha',
    stage: 'NEW',
    interestedCourseId: 'course-1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'lead-2',
    name: 'Roberto Diniz',
    email: 'roberto@example.com',
    phone: '11888888888',
    source: 'Organic Search',
    stage: 'CONTACT_ATTEMPT',
    interestedCourseId: 'course-2',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    notes: [
      {
        id: 'note-1',
        leadId: 'lead-2',
        content: 'Cliente tem interesse para o próximo semestre.',
        authorId: 'admin',
        authorName: 'Admin',
        createdAt: new Date().toISOString()
      }
    ]
  }
];
