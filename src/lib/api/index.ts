export { apiClient } from './client';
export { endpoints } from './endpoints';

import { authService } from './services/auth.service';
import { studentsService } from './services/students.service';
import { teachersService } from './services/teachers.service';
import { coursesService } from './services/courses.service';
import { classesService } from './services/classes.service';
import { subjectsService } from './services/subjects.service';
import { avaService } from './services/ava.service';
import { assignmentsService } from './services/assignments.service';
import { quizzesService } from './services/quizzes.service';
import { gradesService } from './services/grades.service';
import { notificationsService } from './services/notifications.service';
import { mockStats, mockActivities } from '@/mocks';

// Simula delay de rede para não quebrar compatibilidade
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const ApiService = {
  auth: {
    login: async (role: 'ALUNO' | 'PROFESSOR' | 'ADMIN') => {
      const res = await authService.login({ role });
      return res.user;
    },
    logout: async () => {
      await delay(200);
      return true;
    }
  },
  courses: {
    getAll: async () => {
      return coursesService.getAll();
    },
    getStudentCourses: async (studentId: string) => {
      const allCourses = await coursesService.getAll();
      const enrollments = await studentsService.getEnrollments(studentId);
      const enrolledCourseIds = enrollments.map(e => e.courseId);
      return allCourses.filter(c => enrolledCourseIds.includes(c.id));
    },
    getById: async (id: string) => {
      return coursesService.getCourseById(id);
    }
  },
  enrollments: {
    getByUserAndCourse: async (userId: string, courseId: string) => {
      const enrollments = await studentsService.getEnrollments(userId);
      return enrollments.find(e => e.courseId === courseId);
    }
  },
  content: {
    getCourseModules: async (courseId: string) => {
      return avaService.getModules(courseId);
    },
    getModuleLessons: async (moduleId: string) => {
      return avaService.getLessons(moduleId);
    },
    getLessonById: async (lessonId: string) => {
      return avaService.getLessonDetail(lessonId);
    }
  },
  stats: {
    getStudentStats: async () => {
      await delay(200);
      return mockStats.student;
    },
    getTeacherStats: async () => {
      await delay(200);
      return mockStats.teacher;
    },
    getAdminStats: async () => {
      await delay(200);
      return mockStats.admin;
    }
  },
  activities: {
    getStudentActivities: async (studentId: string) => {
      await delay(300);
      return mockActivities; 
    },
    getPending: async () => {
      await delay(300);
      return mockActivities.filter(a => a.status === 'PENDING');
    }
  },
  notifications: {
    getUserNotifications: async (userId: string) => {
      return notificationsService.getUserNotifications(userId);
    }
  }
};

export * from './services/auth.service';
export * from './services/students.service';
export * from './services/teachers.service';
export * from './services/courses.service';
export * from './services/classes.service';
export * from './services/subjects.service';
export * from './services/ava.service';
export * from './services/assignments.service';
export * from './services/quizzes.service';
export * from './services/assessments.service';
export * from './services/certificates.service';
export * from './services/grades.service';
export * from './services/notifications.service';
export * from './services/enrollments.service';

