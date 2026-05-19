import { PreEnrollment, PublicPreEnrollmentPayload } from '@/types/pre-enrollment';

export const publicPreEnrollmentsService = {
  create: async (data: PublicPreEnrollmentPayload): Promise<{ success: boolean; preEnrollmentId: string }> => {
    return new Promise(resolve => setTimeout(() => resolve({
      success: true,
      preEnrollmentId: `pe-new-${Date.now()}`
    }), 800));
  }
};
