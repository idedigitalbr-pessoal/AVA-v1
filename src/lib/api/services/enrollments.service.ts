import { apiClient } from '../client';
import { endpoints } from '../endpoints';
import { Enrollment } from '@/types';
import { mockEnrollments } from '@/mocks';

export const enrollmentService = {
  listEnrollments: async (): Promise<Enrollment[]> => {
    // await apiClient.get(endpoints.enrollments.base);
    return mockEnrollments;
  },

  getEnrollmentById: async (id: string): Promise<Enrollment | undefined> => {
    // await apiClient.get(endpoints.enrollments.byId(id));
    return mockEnrollments.find(e => e.id === id);
  },

  createEnrollment: async (data: Partial<Enrollment>): Promise<Enrollment> => {
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
    return { ...(mockEnrollments.find(e => e.id === id) || mockEnrollments[0]), status: 'CONFIRMED', academicSituation: 'Cursando' };
  },

  cancelEnrollment: async (id: string): Promise<Enrollment> => {
    return { ...(mockEnrollments.find(e => e.id === id) || mockEnrollments[0]), status: 'CANCELED', academicSituation: 'Cancelado' };
  },

  transferEnrollment: async (id: string, newClassId: string): Promise<Enrollment> => {
    return { ...(mockEnrollments.find(e => e.id === id) || mockEnrollments[0]), classId: newClassId };
  },

  lockEnrollment: async (id: string): Promise<Enrollment> => {
    return { ...(mockEnrollments.find(e => e.id === id) || mockEnrollments[0]), status: 'LOCKED', academicSituation: 'Trancado' };
  },

  completeEnrollment: async (id: string): Promise<Enrollment> => {
    return { ...(mockEnrollments.find(e => e.id === id) || mockEnrollments[0]), status: 'COMPLETED', progress: 100, academicSituation: 'Concluído' };
  }
};
