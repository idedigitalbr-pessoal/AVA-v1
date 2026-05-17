import { apiClient } from '../api-client';
import { ENDPOINTS } from '../endpoints';
import { Enrollment } from '@/types';
import { mockEnrollments } from '@/mocks';

export const enrollmentService = {
  listEnrollments: async (): Promise<Enrollment[]> => {
    await apiClient.get(ENDPOINTS.ENROLLMENTS.BASE);
    return mockEnrollments;
  },

  getEnrollmentById: async (id: string): Promise<Enrollment | undefined> => {
    await apiClient.get(ENDPOINTS.ENROLLMENTS.BY_ID(id));
    return mockEnrollments.find(e => e.id === id);
  },

  createEnrollment: async (data: Partial<Enrollment>): Promise<Enrollment> => {
    await apiClient.post(ENDPOINTS.ENROLLMENTS.BASE, data);
    const newEnrollment: Enrollment = {
      id: `enr-${Math.random()}`,
      userId: data.userId || '',
      courseId: data.courseId || '',
      classId: data.classId,
      progress: 0,
      status: 'PENDING',
      academicSituation: 'Em análise',
      enrolledAt: new Date().toISOString().split('T')[0],
      ...data
    };
    return newEnrollment;
  },

  confirmEnrollment: async (id: string): Promise<Enrollment> => {
    await apiClient.patch(ENDPOINTS.ENROLLMENTS.BY_ID(id), { status: 'CONFIRMED' });
    return { ...(mockEnrollments.find(e => e.id === id) || mockEnrollments[0]), status: 'CONFIRMED', academicSituation: 'Cursando' };
  },

  cancelEnrollment: async (id: string): Promise<Enrollment> => {
    await apiClient.patch(ENDPOINTS.ENROLLMENTS.BY_ID(id), { status: 'CANCELED' });
    return { ...(mockEnrollments.find(e => e.id === id) || mockEnrollments[0]), status: 'CANCELED', academicSituation: 'Cancelado' };
  },

  transferEnrollment: async (id: string, newClassId: string): Promise<Enrollment> => {
    await apiClient.patch(ENDPOINTS.ENROLLMENTS.BY_ID(id), { classId: newClassId });
    return { ...(mockEnrollments.find(e => e.id === id) || mockEnrollments[0]), classId: newClassId };
  },

  lockEnrollment: async (id: string): Promise<Enrollment> => {
    await apiClient.patch(ENDPOINTS.ENROLLMENTS.BY_ID(id), { status: 'LOCKED' });
    return { ...(mockEnrollments.find(e => e.id === id) || mockEnrollments[0]), status: 'LOCKED', academicSituation: 'Trancado' };
  },

  completeEnrollment: async (id: string): Promise<Enrollment> => {
    await apiClient.patch(ENDPOINTS.ENROLLMENTS.BY_ID(id), { status: 'COMPLETED' });
    return { ...(mockEnrollments.find(e => e.id === id) || mockEnrollments[0]), status: 'COMPLETED', progress: 100, academicSituation: 'Concluído' };
  }
};
