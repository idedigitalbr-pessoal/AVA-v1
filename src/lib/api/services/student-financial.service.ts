import { StudentFinancialSummary } from '@/types/student';
import { mockStudentFinancial } from '@/mocks/student.mock';
import { apiClient } from '../api-client';
import { ENDPOINTS } from '../endpoints';

export const studentFinancialService = {
  getMyFinancialSummary: async (): Promise<StudentFinancialSummary> => {
    // try { return await apiClient.get<StudentFinancialSummary>(ENDPOINTS.STUDENT_AREA.FINANCIAL_INVOICES); } catch(e) {}
    return Promise.resolve(mockStudentFinancial);
  },
  getInvoices: async (): Promise<any[]> => {
    // try { return await apiClient.get(ENDPOINTS.STUDENT_AREA.FINANCIAL_INVOICES); } catch(e) {}
    return Promise.resolve(mockStudentFinancial.invoices || []);
  },
  getInvoiceDetails: async (invoiceId: string): Promise<any> => {
    // try { return await apiClient.get(ENDPOINTS.STUDENT_AREA.INVOICE_BY_ID(invoiceId)); } catch(e) {}
    const invoice = mockStudentFinancial.invoices?.find(i => i.id === invoiceId);
    return Promise.resolve(invoice);
  },
  simulateDownloadInvoice: async (invoiceId: string): Promise<string> => {
    // try { const res = await apiClient.get(ENDPOINTS.STUDENT_AREA.INVOICE_DOWNLOAD(invoiceId)); return res.url; } catch(e) {}
    return Promise.resolve(`https://mock-bank.com/boleto/${invoiceId}`);
  }
};
