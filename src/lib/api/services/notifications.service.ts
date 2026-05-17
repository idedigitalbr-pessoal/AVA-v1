import { apiClient } from '../api-client';
import { ENDPOINTS } from '../endpoints';
import { Notification } from '@/types';
import { mockNotifications } from '@/mocks';

export const notificationsService = {
  getUserNotifications: async (userId: string): Promise<Notification[]> => {
    await apiClient.get(ENDPOINTS.NOTIFICATIONS.BASE, { params: { userId } });
    return mockNotifications.filter(n => n.userId === userId);
  },

  markAsRead: async (notificationId: string): Promise<boolean> => {
    await apiClient.patch(ENDPOINTS.NOTIFICATIONS.MARK_AS_READ(notificationId));
    return true;
  }
};
