import { mockTeacherCommunication } from '@/mocks/teacher.mock';

export const teacherMessagesService = {
  getCommunicationData: async (classSubjectId: string): Promise<any> => {
    return Promise.resolve({ ...mockTeacherCommunication, classSubjectId });
  },
  replyMessage: async (threadId: string, payload: any): Promise<any> => { 
    return Promise.resolve(payload); 
  },
  sendClassMessage: async (classSubjectId: string, payload: any): Promise<any> => { 
    return Promise.resolve(payload); 
  },
  createClassAnnouncement: async (classSubjectId: string, payload: any): Promise<any> => { 
    return Promise.resolve({ id: Date.now().toString(), ...payload }); 
  },
  markMessageAsRead: async (threadId: string): Promise<boolean> => { 
    return Promise.resolve(true); 
  },
  sendMessageToStudent: async (classSubjectId: string, studentId: string, payload: any): Promise<boolean> => {
    return Promise.resolve(true);
  }
};
