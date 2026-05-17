export { apiClient } from './api-client';
export { ENDPOINTS as endpoints } from './endpoints';
export * from './error-handler';
export * from './api.types';

import { authService } from './services/auth.service';
import { studentService as studentsService } from './services/student.service';
import { teachersService } from './services/teacher.service';
import { coursesService } from './services/course.service';
import { classesService } from './services/class.service';
import { subjectsService } from './services/subject.service';
import { avaService } from './services/ava.service';
import { assignmentsService } from './services/assignments.service';
import { quizzesService } from './services/quizzes.service';
import { gradesService } from './services/grades.service';
import { notificationsService } from './services/notifications.service';
import { mockStats, mockActivities, mockCourseStudents, mockCourseMessages } from '@/mocks';

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
    },
    getCourseStudents: async (courseId: string) => {
      await delay(200);
      return mockCourseStudents;
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
    getCourseActivities: async (courseId: string) => {
      return assignmentsService.list(courseId);
    },
    getStudentActivities: async (studentId: string) => {
      await delay(300);
      return mockActivities; 
    },
    getPending: async () => {
      await delay(300);
      return mockActivities.filter(a => a.status === 'PENDING');
    }
  },
  messages: {
    getCourseMessages: async (courseId: string) => {
      await delay(200);
      return mockCourseMessages;
    }
  },
  notifications: {
    getUserNotifications: async (userId: string) => {
      return notificationsService.getUserNotifications(userId);
    }
  },
  teachers: {
    getTeacherDashboard: async () => {
      await delay(300);
      return teachersService.getTeacherDashboard();
    },
    getMyClassSubjects: async () => {
      await delay(300);
      return teachersService.getMyClassSubjects();
    },
    getClassSubjectById: async (id: string) => {
      await delay(200);
      return teachersService.getClassSubjectById(id);
    },
    getClassSubjectOverview: async (id: string) => {
      await delay(200);
      return teachersService.getClassSubjectOverview(id);
    },
    getTeacherCourseModules: async (id: string) => {
      await delay(200);
      return teachersService.getTeacherCourseModules(id);
    },
    createTeacherModule: async (id: string, payload: any) => teachersService.createTeacherModule(id, payload),
    updateTeacherModule: async (id: string, payload: any) => teachersService.updateTeacherModule(id, payload),
    deleteTeacherModule: async (id: string) => teachersService.deleteTeacherModule(id),
    reorderTeacherModules: async (id: string, payload: any) => teachersService.reorderTeacherModules(id, payload),
    createTeacherLesson: async (id: string, payload: any) => teachersService.createTeacherLesson(id, payload),
    updateTeacherLesson: async (id: string, payload: any) => teachersService.updateTeacherLesson(id, payload),
    deleteTeacherLesson: async (id: string) => teachersService.deleteTeacherLesson(id),
    publishTeacherLesson: async (id: string) => teachersService.publishTeacherLesson(id),
    unpublishTeacherLesson: async (id: string) => teachersService.unpublishTeacherLesson(id),
    addTeacherLessonMaterial: async (id: string, payload: any) => teachersService.addTeacherLessonMaterial(id, payload),
    removeTeacherLessonMaterial: async (id: string) => teachersService.removeTeacherLessonMaterial(id),
    getGradebook: async (classSubjectId: string) => {
      await delay(200);
      return teachersService.getGradebook(classSubjectId);
    },
    updateStudentGrade: async (classSubjectId: string, studentId: string, assessmentId: string, payload: any) => teachersService.updateStudentGrade(classSubjectId, studentId, assessmentId, payload),
    saveGradebook: async (classSubjectId: string, payload: any) => teachersService.saveGradebook(classSubjectId, payload),
    exportGradebook: async (classSubjectId: string) => teachersService.exportGradebook(classSubjectId),
    getAttendanceSessions: async (classSubjectId: string) => {
      await delay(200);
      return teachersService.getAttendanceSessions(classSubjectId);
    },
    createAttendanceSession: async (classSubjectId: string, payload: any) => teachersService.createAttendanceSession(classSubjectId, payload),
    updateAttendanceRecord: async (sessionId: string, studentId: string, payload: any) => teachersService.updateAttendanceRecord(sessionId, studentId, payload),
    saveAttendanceSession: async (sessionId: string, payload: any) => teachersService.saveAttendanceSession(sessionId, payload),
    exportAttendance: async (classSubjectId: string) => teachersService.exportAttendance(classSubjectId),
    getCommunicationData: async (classSubjectId: string) => {
      await delay(200);
      return teachersService.getCommunicationData(classSubjectId);
    },
    replyMessage: async (threadId: string, payload: any) => teachersService.replyMessage(threadId, payload),
    sendClassMessage: async (classSubjectId: string, payload: any) => teachersService.sendClassMessage(classSubjectId, payload),
    createClassAnnouncement: async (classSubjectId: string, payload: any) => teachersService.createClassAnnouncement(classSubjectId, payload),
    markMessageAsRead: async (threadId: string) => teachersService.markMessageAsRead(threadId),
  }
};

export * from './services/auth.service';
export * from './services/student.service';
export * from './services/teacher.service';
export * from './services/course.service';
export * from './services/class.service';
export * from './services/subject.service';
export * from './services/ava.service';
export * from './services/assignments.service';
export * from './services/quizzes.service';
export * from './services/assessment.service';
export * from './services/certificate.service';
export * from './services/grades.service';
export * from './services/notifications.service';
export * from './services/enrollment.service';
export * from './services/report.service';
export * from './services/permission.service';
export * from './services/user.service';
export * from './services/curriculum.service';
export * from './services/settings.service';

