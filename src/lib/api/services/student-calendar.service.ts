import { StudentCalendarEvent } from '@/types/student';
import { mockStudentCalendar } from '@/mocks/student.mock';

export const studentCalendarService = {
  getMyEvents: async (): Promise<StudentCalendarEvent[]> => {
    return Promise.resolve(mockStudentCalendar);
  }
};
