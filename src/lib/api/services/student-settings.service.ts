import { Student } from '@/types';

export const studentSettingsService = {
  getMyProfile: async (): Promise<Partial<Student>> => {
    return Promise.resolve({
      id: "s1",
      name: "João Aluno",
      email: "joao@aluno.com",
      registrationNumber: "2026001",
      phone: "(11) 99999-9999",
      cpf: "123.456.789-00",
      status: "ACTIVE"
    });
  },
  updateMyProfile: async (payload: any): Promise<boolean> => {
    return Promise.resolve(true);
  }
};
