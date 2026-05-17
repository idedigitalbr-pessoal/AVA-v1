export { apiClient } from './api-client';
export { ENDPOINTS as endpoints } from './endpoints';
export * from './error-handler';
export * from './api.types';

import { authService } from './services/auth.service';
import { studentService as studentsService } from './services/student.service';
import { teacherService } from './services/teacher.service';
import { teacherCoursesService } from './services/teacher-courses.service';
import { teacherContentService } from './services/teacher-content.service';
import { teacherActivitiesService } from './services/teacher-activities.service';
import { teacherGradesService } from './services/teacher-grades.service';
import { teacherAttendanceService } from './services/teacher-attendance.service';
import { teacherMessagesService } from './services/teacher-messages.service';
import { teacherQuestionsService } from './services/teacher-questions.service';
import { teacherReportsService } from './services/teacher-reports.service';
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
      return teacherService.getTeacherDashboard();
    },
    getMyClassSubjects: async () => {
      await delay(300);
      return teacherCoursesService.getMyClassSubjects();
    },
    getClassSubjectById: async (id: string) => {
      await delay(200);
      return teacherCoursesService.getClassSubjectById(id);
    },
    getClassSubjectOverview: async (id: string) => {
      await delay(200);
      return teacherCoursesService.getClassSubjectOverview(id);
    },
    getTeacherCourseModules: async (id: string) => {
      await delay(200);
      return teacherContentService.getTeacherCourseModules(id);
    },
    createTeacherModule: async (id: string, payload: any) => teacherContentService.createTeacherModule(id, payload),
    updateTeacherModule: async (id: string, payload: any) => teacherContentService.updateTeacherModule(id, payload),
    deleteTeacherModule: async (id: string) => teacherContentService.deleteTeacherModule(id),
    reorderTeacherModules: async (id: string, payload: any) => teacherContentService.reorderTeacherModules(id, payload),
    createTeacherLesson: async (id: string, payload: any) => teacherContentService.createTeacherLesson(id, payload),
    updateTeacherLesson: async (id: string, payload: any) => teacherContentService.updateTeacherLesson(id, payload),
    deleteTeacherLesson: async (id: string) => teacherContentService.deleteTeacherLesson(id),
    publishTeacherLesson: async (id: string) => teacherContentService.publishTeacherLesson(id),
    unpublishTeacherLesson: async (id: string) => teacherContentService.unpublishTeacherLesson(id),
    addTeacherLessonMaterial: async (id: string, payload: any) => teacherContentService.addTeacherLessonMaterial(id, payload),
    removeTeacherLessonMaterial: async (id: string) => teacherContentService.removeTeacherLessonMaterial(id),
    getGradebook: async (classSubjectId: string) => {
      await delay(200);
      return teacherGradesService.getGradebook(classSubjectId);
    },
    updateStudentGrade: async (classSubjectId: string, studentId: string, assessmentId: string, payload: any) => teacherGradesService.updateStudentGrade(classSubjectId, studentId, assessmentId, payload),
    saveGradebook: async (classSubjectId: string, payload: any) => teacherGradesService.saveGradebook(classSubjectId, payload),
    exportGradebook: async (classSubjectId: string) => teacherGradesService.exportGradebook(classSubjectId),
    getAttendanceSessions: async (classSubjectId: string) => {
      await delay(200);
      return teacherAttendanceService.getAttendanceSessions(classSubjectId);
    },
    createAttendanceSession: async (classSubjectId: string, payload: any) => teacherAttendanceService.createAttendanceSession(classSubjectId, payload),
    updateAttendanceRecord: async (sessionId: string, studentId: string, payload: any) => teacherAttendanceService.updateAttendanceRecord(sessionId, studentId, payload),
    saveAttendanceSession: async (sessionId: string, payload: any) => teacherAttendanceService.saveAttendanceSession(sessionId, payload),
    exportAttendance: async (classSubjectId: string) => teacherAttendanceService.exportAttendance(classSubjectId),
    getCommunicationData: async (classSubjectId: string) => {
      await delay(200);
      return teacherMessagesService.getCommunicationData(classSubjectId);
    },
    replyMessage: async (threadId: string, payload: any) => teacherMessagesService.replyMessage(threadId, payload),
    sendClassMessage: async (classSubjectId: string, payload: any) => teacherMessagesService.sendClassMessage(classSubjectId, payload),
    createClassAnnouncement: async (classSubjectId: string, payload: any) => teacherMessagesService.createClassAnnouncement(classSubjectId, payload),
    markMessageAsRead: async (threadId: string) => teacherMessagesService.markMessageAsRead(threadId),
    getQuestions: async (filters?: any) => teacherQuestionsService.getQuestions(filters),
    getQuestionById: async (id: string) => teacherQuestionsService.getQuestionById(id),
    createQuestion: async (payload: any) => teacherQuestionsService.createQuestion(payload),
    updateQuestion: async (id: string, payload: any) => teacherQuestionsService.updateQuestion(id, payload),
    deleteQuestion: async (id: string) => teacherQuestionsService.deleteQuestion(id),
    duplicateQuestion: async (id: string) => teacherQuestionsService.duplicateQuestion(id),
    
    getAssessments: async (classSubjectId: string) => teacherActivitiesService.getAssessments(classSubjectId),
    createAssessment: async (classSubjectId: string, payload: any) => teacherActivitiesService.createAssessment(classSubjectId, payload),
    updateAssessment: async (id: string, payload: any) => teacherActivitiesService.updateAssessment(id, payload),
    publishAssessment: async (id: string) => teacherActivitiesService.publishAssessment(id),
    duplicateAssessment: async (id: string) => teacherActivitiesService.duplicateAssessment(id),
    archiveAssessment: async (id: string) => teacherActivitiesService.archiveAssessment(id),
    getAssessmentAttempts: async (assessmentId: string) => teacherActivitiesService.getAssessmentAttempts(assessmentId),

    getClassStudents: async (classSubjectId: string) => teacherCoursesService.getClassStudents(classSubjectId),
    getClassStudentDetail: async (classSubjectId: string, studentId: string) => teacherCoursesService.getClassStudentDetail(classSubjectId, studentId),
    sendMessageToStudent: async (classSubjectId: string, studentId: string, payload: any) => teacherMessagesService.sendMessageToStudent(classSubjectId, studentId, payload),

    getClassPerformance: async (classSubjectId: string) => teacherReportsService.getClassPerformance(classSubjectId),
    getClassAttendanceReport: async (classSubjectId: string) => teacherReportsService.getClassAttendanceReport(classSubjectId),
    getClassEngagementReport: async (classSubjectId: string) => teacherReportsService.getClassEngagementReport(classSubjectId),
    getAtRiskStudentsReport: async (classSubjectId: string) => teacherReportsService.getAtRiskStudentsReport(classSubjectId),
    exportTeacherReport: async (type: string, filters: any) => teacherReportsService.exportTeacherReport(type, filters),
  },
  subjects: {
    getAll: async () => subjectsService.getAll(),
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

