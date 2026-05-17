import { apiClient } from '../api-client';
import { ENDPOINTS } from '../endpoints';
import { User } from '@/types';
import { allMockUsers } from '@/mocks';
import { ApiResponse } from '../api.types';

export interface LoginDto {
  email?: string;
  password?: string;
  role?: 'ALUNO' | 'PROFESSOR' | 'ADMIN'; 
}

export interface AuthResponse {
  user: User;
  token: string;
}

export const authService = {
  login: async (dto: LoginDto): Promise<AuthResponse> => {
    // mock behavior
    await apiClient.post(ENDPOINTS.AUTH.LOGIN, dto);
    let user = allMockUsers.find(u => u.role === dto.role);
    if (!user) user = allMockUsers[0]; 
    return {
      user,
      token: 'mock-jwt-token'
    };
  },

  me: async (): Promise<User> => {
    await apiClient.get(ENDPOINTS.AUTH.ME);
    return allMockUsers[0];
  }
};
