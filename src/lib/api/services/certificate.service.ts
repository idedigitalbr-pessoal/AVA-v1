import { Certificate, CertificateTemplate } from '@/types';
import { mockCertificates, mockCertificateTemplates } from '@/mocks';

export const certificatesService = {
  listCertificates: async (): Promise<Certificate[]> => {
    return mockCertificates;
  },

  getCertificateById: async (id: string): Promise<Certificate | undefined> => {
    return mockCertificates.find(c => c.id === id);
  },

  issueCertificate: async (data: Partial<Certificate>): Promise<Certificate> => {
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
    const cert = mockCertificates.find(c => c.id === id);
    if (!cert) throw new Error("Certificate not found");
    return { ...cert, status: 'REVOKED' };
  },

  listCertificateTemplates: async (): Promise<CertificateTemplate[]> => {
    return mockCertificateTemplates;
  },

  createCertificateTemplate: async (data: Partial<CertificateTemplate>): Promise<CertificateTemplate> => {
    const newTemplate: CertificateTemplate = {
      ...data,
      id: Math.random().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    } as CertificateTemplate;
    return newTemplate;
  },

  updateCertificateTemplate: async (id: string, data: Partial<CertificateTemplate>): Promise<CertificateTemplate> => {
    const tpl = mockCertificateTemplates.find(t => t.id === id);
    if (!tpl) throw new Error("Template not found");
    return { ...tpl, ...data, updatedAt: new Date().toISOString() };
  }
};
