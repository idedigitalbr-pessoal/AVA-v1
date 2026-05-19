import { PreEnrollment, PreEnrollmentStage } from '@/types/pre-enrollment';
import { mockPreEnrollments } from '@/mocks/public-pre-enrollments.mock';

export const adminPreEnrollmentsService = {
  getPreEnrollments: async (): Promise<PreEnrollment[]> => {
    return new Promise(resolve => setTimeout(() => resolve(mockPreEnrollments), 500));
  },

  getById: async (id: string): Promise<PreEnrollment> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const pe = mockPreEnrollments.find(p => p.id === id);
        if (pe) resolve(pe);
        else reject(new Error('PreEnrollment not found'));
      }, 500);
    });
  },

  updateStage: async (id: string, stage: PreEnrollmentStage): Promise<{ success: boolean }> => {
    return new Promise(resolve => setTimeout(() => resolve({ success: true }), 500));
  },

  convertToEnrollment: async (id: string): Promise<{ success: boolean; studentId: string; enrollmentId: string }> => {
    return new Promise(resolve => setTimeout(() => resolve({ success: true, studentId: `stu-${Date.now()}`, enrollmentId: `mat-${Date.now()}` }), 500));
  }
};
