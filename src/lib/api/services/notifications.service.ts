import { apiClient } from '../client';
import { endpoints } from '../endpoints';
import { Notification } from '@/types';
import { mockNotifications } from '@/mocks';

export const notificationsService = {
  getUserNotifications: async (userId: string): Promise<Notification[]> => {
    await apiClient.get(endpoints.notifications.base, { params: { userId } });
    return mockNotifications.filter(n => n.userId === userId);
  },

  markAsRead: async (notificationId: string): Promise<boolean> => {
    await apiClient.patch(endpoints.notifications.markAsRead(notificationId));
    return true;
  }
};
