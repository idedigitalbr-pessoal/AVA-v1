import { StudentCourse, StudentModule, StudentLesson } from '@/types/student';
import { mockStudentCourses, mockStudentModules } from '@/mocks/student.mock';
import { apiClient } from '../api-client';
import { ENDPOINTS } from '../endpoints';

export const studentCoursesService = {
  getMyCourses: async (): Promise<StudentCourse[]> => {
    // try { return await apiClient.get<StudentCourse[]>(ENDPOINTS.STUDENT_AREA.COURSES); } catch(e) {}
    return Promise.resolve(mockStudentCourses);
  },
  getCourseDetails: async (courseId: string): Promise<StudentCourse | undefined> => {
    // try { return await apiClient.get<StudentCourse>(ENDPOINTS.STUDENT_AREA.COURSE_BY_ID(courseId)); } catch(e) {}
    const course = mockStudentCourses.find(c => c.id === courseId);
    return Promise.resolve(course || mockStudentCourses[0]);
  },
  getCourseModules: async (courseId: string): Promise<StudentModule[]> => {
    // try { return await apiClient.get<StudentModule[]>(ENDPOINTS.STUDENT_AREA.COURSE_MODULES(courseId)); } catch(e) {}
    return Promise.resolve(mockStudentModules);
  },
  getCourseLessons: async (courseId: string): Promise<StudentLesson[]> => {
    // try { return await apiClient.get<StudentLesson[]>(ENDPOINTS.STUDENT_AREA.COURSE_LESSONS(courseId)); } catch(e) {}
    return Promise.resolve(mockStudentModules.flatMap(m => m.lessons));
  },
  getCourseProgress: async (courseId: string): Promise<number> => {
    // try { return await apiClient.get<number>(ENDPOINTS.STUDENT_AREA.COURSE_PROGRESS(courseId)); } catch(e) {}
    const course = mockStudentCourses.find(c => c.id === courseId);
    return Promise.resolve(course?.progress || 0);
  }
};
