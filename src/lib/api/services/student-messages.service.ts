import { StudentMessageThread } from '@/types/student';
import { mockStudentMessages } from '@/mocks/student.mock';

export const studentMessagesService = {
  getMyMessages: async (): Promise<StudentMessageThread[]> => {
    return Promise.resolve(mockStudentMessages);
  },
  sendMessage: async (payload: any): Promise<boolean> => {
    return Promise.resolve(true);
  },
  replyMessage: async (threadId: string, payload: any): Promise<boolean> => {
    return Promise.resolve(true);
  }
};
