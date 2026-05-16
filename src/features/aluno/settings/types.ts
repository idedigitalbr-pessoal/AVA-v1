export interface StudentProfile {
  name: string;
  email: string;
  registration: string;
  course: string;
  phone: string;
  avatarUrl?: string;
  notifications: {
    emailAlerts: boolean;
    smsAlerts: boolean;
    pushNotifications: boolean;
  };
}

export const MOCK_PROFILE: StudentProfile = {
  name: "Ana Oliveira Silva",
  email: "ana.oliveira@uniexemplo.edu.br",
  registration: "202400123",
  course: "Análise e Desenvolvimento de Sistemas",
  phone: "(11) 98765-4321",
  notifications: {
    emailAlerts: true,
    smsAlerts: false,
    pushNotifications: true,
  }
};
