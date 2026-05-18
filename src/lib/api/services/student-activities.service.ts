import { StudentActivityDetail } from '@/types/student';
import { mockStudentActivities } from '@/mocks/student.mock';
import { apiClient } from '../api-client';
import { ENDPOINTS } from '../endpoints';

export const studentActivitiesService = {
  getMyActivities: async (filters?: any): Promise<StudentActivityDetail[]> => {
    // try { return await apiClient.get<StudentActivityDetail[]>(ENDPOINTS.STUDENT_AREA.ACTIVITIES, { params: filters }); } catch(e) {}
    return Promise.resolve(mockStudentActivities);
  },
  getActivityDetails: async (activityId: string): Promise<StudentActivityDetail | undefined> => {
    // try { return await apiClient.get<StudentActivityDetail>(ENDPOINTS.STUDENT_AREA.ACTIVITY_BY_ID(activityId)); } catch(e) {}
    const activity = mockStudentActivities.find(a => a.id === activityId);
    return Promise.resolve(activity || mockStudentActivities[0]);
  },
  submitActivity: async (activityId: string, payload: any): Promise<boolean> => {
    // try { await apiClient.post(ENDPOINTS.STUDENT_AREA.ACTIVITY_SUBMIT(activityId), payload); return true; } catch(e) {}
    return Promise.resolve(true);
  },
  getActivityFeedback: async (activityId: string): Promise<any> => {
    // try { return await apiClient.get(ENDPOINTS.STUDENT_AREA.ACTIVITY_FEEDBACK(activityId)); } catch(e) {}
    const activity = mockStudentActivities.find(a => a.id === activityId);
    return Promise.resolve(activity?.feedback);
  }
};
