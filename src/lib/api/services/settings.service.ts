import { apiClient } from '../api-client';
import { ENDPOINTS } from '../endpoints';

export interface SystemSettings {
  id: string;
  maintenanceMode: boolean;
  allowRegistration: boolean;
  systemName: string;
}

export const settingsService = {
  getSettings: async (): Promise<SystemSettings> => {
    // await apiClient.get(ENDPOINTS.SETTINGS.BASE);
    return {
      id: "settings_1",
      maintenanceMode: false,
      allowRegistration: true,
      systemName: "Plataforma AVA"
    };
  },

  updateSettings: async (data: Partial<SystemSettings>): Promise<SystemSettings> => {
    // await apiClient.patch(ENDPOINTS.SETTINGS.BASE, data);
    return {
      id: "settings_1",
      maintenanceMode: false,
      allowRegistration: true,
      systemName: "Plataforma AVA",
      ...data
    };
  }
};
