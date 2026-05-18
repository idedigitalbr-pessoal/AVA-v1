import { StudentSupportTicket } from '@/types/student';
import { mockStudentSupport } from '@/mocks/student.mock';
import { apiClient } from '../api-client';
import { ENDPOINTS } from '../endpoints';

export const studentSupportService = {
  getTickets: async (): Promise<StudentSupportTicket[]> => {
    // try { return await apiClient.get<StudentSupportTicket[]>(ENDPOINTS.STUDENT_AREA.SUPPORT_TICKETS); } catch(e) {}
    return Promise.resolve(mockStudentSupport);
  },
  createTicket: async (payload: any): Promise<any> => {
    // try { return await apiClient.post(ENDPOINTS.STUDENT_AREA.SUPPORT_TICKETS, payload); } catch(e) {}
    return Promise.resolve({ id: `ticket_${Date.now()}`, ...payload, status: 'OPEN', createdAt: new Date().toISOString() });
  },
  getTicketDetails: async (ticketId: string): Promise<StudentSupportTicket | undefined> => {
    // try { return await apiClient.get<StudentSupportTicket>(ENDPOINTS.STUDENT_AREA.TICKET_BY_ID(ticketId)); } catch(e) {}
    const ticket = mockStudentSupport.find(t => t.id === ticketId);
    return Promise.resolve(ticket || mockStudentSupport[0]);
  },
  addTicketMessage: async (ticketId: string, payload: any): Promise<any> => {
    // try { return await apiClient.post(ENDPOINTS.STUDENT_AREA.TICKET_MESSAGES(ticketId), payload); } catch(e) {}
    return Promise.resolve({
      id: Date.now().toString(),
      sender: "Aluno Logado",
      content: payload.text,
      createdAt: new Date().toISOString()
    });
  }
};
