import { StudentNotice } from '@/types/student';
import { mockStudentNotices } from '@/mocks/student.mock';

export const studentNotificationsService = {
  getMyNotifications: async (): Promise<StudentNotice[]> => {
    return Promise.resolve(mockStudentNotices);
  },
  markAsRead: async (noticeId: string): Promise<boolean> => {
    return Promise.resolve(true);
  }
};
