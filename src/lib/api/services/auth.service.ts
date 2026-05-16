import { apiClient } from '../client';
import { endpoints } from '../endpoints';
import { User } from '@/types';
import { allMockUsers } from '@/mocks';

export interface LoginDto {
  email?: string;
  password?: string;
  role?: 'ALUNO' | 'PROFESSOR' | 'ADMIN'; // Simulação temporária
}

export interface AuthResponse {
  user: User;
  token: string;
}

export const authService = {
  login: async (dto: LoginDto): Promise<AuthResponse> => {
    await apiClient.post(endpoints.auth.login, dto);
    let user = allMockUsers.find(u => u.role === dto.role);
    if (!user) user = allMockUsers[0]; // fallback
    return {
      user,
      token: 'mock-jwt-token'
    };
  },

  me: async (): Promise<User> => {
    await apiClient.get(endpoints.auth.me);
    return allMockUsers[0];
  }
};
