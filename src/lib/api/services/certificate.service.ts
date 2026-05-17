import { Certificate, CertificateTemplate } from '@/types';
import { mockCertificates, mockCertificateTemplates } from '@/mocks';
import { apiClient } from '../api-client';
import { ENDPOINTS } from '../endpoints';

export const certificatesService = {
  listCertificates: async (): Promise<Certificate[]> => {
    await apiClient.get(ENDPOINTS.CERTIFICATES.BASE);
    return mockCertificates;
  },

  getCertificateById: async (id: string): Promise<Certificate | undefined> => {
    await apiClient.get(ENDPOINTS.CERTIFICATES.BY_ID(id));
    return mockCertificates.find(c => c.id === id);
  },

  issueCertificate: async (data: Partial<Certificate>): Promise<Certificate> => {
    await apiClient.post(ENDPOINTS.CERTIFICATES.ISSUE, data);
    const newCert: Certificate = {
      ...data,
      id: Math.random().toString(),
      issueDate: new Date().toISOString(),
      code: `CERT-${Math.random().toString().substring(2, 6)}-NEW`,
      url: 'https://exemplo.com/cert/new',
      status: 'ISSUED'
    } as Certificate;
    return newCert;
  },

  revokeCertificate: async (id: string): Promise<Certificate> => {
    await apiClient.patch(ENDPOINTS.CERTIFICATES.BY_ID(id), { status: 'REVOKED' });
    const cert = mockCertificates.find(c => c.id === id);
    if (!cert) throw new Error("Certificate not found");
    return { ...cert, status: 'REVOKED' };
  },

  listCertificateTemplates: async (): Promise<CertificateTemplate[]> => {
    await apiClient.get(`${ENDPOINTS.CERTIFICATES.BASE}/templates`);
    return mockCertificateTemplates;
  },

  createCertificateTemplate: async (data: Partial<CertificateTemplate>): Promise<CertificateTemplate> => {
    await apiClient.post(`${ENDPOINTS.CERTIFICATES.BASE}/templates`, data);
    const newTemplate: CertificateTemplate = {
      ...data,
      id: Math.random().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    } as CertificateTemplate;
    return newTemplate;
  },

  updateCertificateTemplate: async (id: string, data: Partial<CertificateTemplate>): Promise<CertificateTemplate> => {
    await apiClient.put(`${ENDPOINTS.CERTIFICATES.BASE}/templates/${id}`, data);
    const tpl = mockCertificateTemplates.find(t => t.id === id);
    if (!tpl) throw new Error("Template not found");
    return { ...tpl, ...data, updatedAt: new Date().toISOString() };
  }
};
