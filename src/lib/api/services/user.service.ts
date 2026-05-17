import { User, Role } from '@/types';
import { apiClient } from '../api-client';
import { ENDPOINTS } from '../endpoints';
import { PaginatedQuery } from '../api.types';

export const mockPlatformUsers: User[] = [
  { id: '1', name: 'Admin Master', email: 'admin@escola.com', role: 'SUPER_ADMIN', createdAt: '2025-01-01T00:00:00Z', updatedAt: '2025-01-01T00:00:00Z' },
  { id: '2', name: 'João Secretaria', email: 'joao.sec@escola.com', role: 'SECRETARIA', createdAt: '2025-01-02T00:00:00Z', updatedAt: '2025-01-02T00:00:00Z' },
  { id: '3', name: 'Maria Finanças', email: 'maria.fin@escola.com', role: 'FINANCEIRO', createdAt: '2025-01-03T00:00:00Z', updatedAt: '2025-01-03T00:00:00Z' },
  { id: '4', name: 'Prof. Pedro', email: 'pedro@escola.com', role: 'PROFESSOR', createdAt: '2025-01-04T00:00:00Z', updatedAt: '2025-01-04T00:00:00Z' },
  { id: '5', name: 'Carlos Coordenador', email: 'carlos.coord@escola.com', role: 'COORDENADOR', createdAt: '2025-01-05T00:00:00Z', updatedAt: '2025-01-05T00:00:00Z' },
  { id: '6', name: 'Ana Aluna', email: 'ana.aluna@email.com', role: 'ALUNO', createdAt: '2025-01-06T00:00:00Z', updatedAt: '2025-01-06T00:00:00Z' },
];

export const userService = {
  listUsers: async (query?: PaginatedQuery): Promise<User[]> => {
    await apiClient.get(ENDPOINTS.USERS.BASE, query);
    return mockPlatformUsers;
  },

  updateUserRole: async (userId: string, role: Role): Promise<User> => {
    await apiClient.patch(ENDPOINTS.USERS.BY_ID(userId), { role });
    const user = mockPlatformUsers.find(u => u.id === userId);
    if (!user) throw new Error("Usuário não encontrado");
    return { ...user, role };
  }
};
