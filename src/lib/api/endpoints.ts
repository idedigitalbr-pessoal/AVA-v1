export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    ME: '/auth/me',
  },
  USERS: {
    BASE: '/users',
    BY_ID: (id: string) => `/users/${id}`,
  },
  STUDENTS: {
    BASE: '/students',
    BY_ID: (id: string) => `/students/${id}`,
  },
  TEACHERS: {
    BASE: '/teachers',
    BY_ID: (id: string) => `/teachers/${id}`,
  },
  COURSES: {
    BASE: '/courses',
    BY_ID: (id: string) => `/courses/${id}`,
    MODULES: (courseId: string) => `/courses/${courseId}/modules`,
  },
  SUBJECTS: {
    BASE: '/subjects',
    BY_ID: (id: string) => `/subjects/${id}`,
  },
  CLASSES: {
    BASE: '/classes',
    BY_ID: (id: string) => `/classes/${id}`,
  },
  ENROLLMENTS: {
    BASE: '/enrollments',
    BY_ID: (id: string) => `/enrollments/${id}`,
  },
  CURRICULUM: {
    BASE: '/curriculum',
  },
  AVA: {
    MODULES: '/ava/modules',
    LESSONS: '/ava/lessons',
    CONTENT: '/ava/content',
    LESSON_DETAIL: (id: string) => `/ava/lessons/${id}`,
  },
  ASSESSMENTS: {
    BASE: '/assessments',
    BY_ID: (id: string) => `/assessments/${id}`,
  },
  ASSIGNMENTS: {
    BASE: '/assignments',
    BY_ID: (id: string) => `/assignments/${id}`,
    SUBMIT: (id: string) => `/assignments/${id}/submit`,
  },
  QUIZZES: {
    BASE: '/quizzes',
    BY_ID: (id: string) => `/quizzes/${id}`,
    SUBMIT: (id: string) => `/quizzes/${id}/submit`,
  },
  GRADES: {
    BASE: '/grades',
    BY_ID: (id: string) => `/grades/${id}`,
    STUDENT_GRADES: (studentId: string) => `/grades/students/${studentId}`,
    CLASS_GRADES: (classId: string) => `/grades/classes/${classId}`,
  },
  NOTIFICATIONS: {
    BASE: '/notifications',
    BY_ID: (id: string) => `/notifications/${id}`,
    MARK_AS_READ: (id: string) => `/notifications/${id}/read`,
  },
  REPORTS: {
    BASE: '/reports',
    PREVIEW: (id: string) => `/reports/${id}/preview`,
    EXPORT_CSV: (id: string) => `/reports/${id}/export/csv`,
    EXPORT_PDF: (id: string) => `/reports/${id}/export/pdf`,
  },
  CERTIFICATES: {
    BASE: '/certificates',
    ISSUE: '/certificates/issue',
    BY_ID: (id: string) => `/certificates/${id}`,
  },
  PERMISSIONS: {
    ROLES: '/permissions/roles',
    ROLE_BY_ID: (id: string) => `/permissions/roles/${id}`,
  },
  SETTINGS: {
    BASE: '/settings',
  },
};
