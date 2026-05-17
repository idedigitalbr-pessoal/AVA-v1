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
  },
  ASSESSMENTS: {
    BASE: '/assessments',
    BY_ID: (id: string) => `/assessments/${id}`,
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
  // Legacy paths
  ava: { modules: '', lessons: (id: string) => '', lessonDetail: (id: string) => '', content: '' },
  courses: { base: '', byId: (id: string) => '', modules: (id: string) => '' },
  assignments: { base: '', byId: (id: string) => '', submit: (id: string) => '' },
  quizzes: { base: '', byId: (id: string) => '', submit: (id: string) => '' },
  grades: { base: '', byId: (id: string) => '', studentGrades: (id: string) => '', classGrades: (id: string) => '' },
  notifications: { base: '', byId: (id: string) => '', markAsRead: (id: string) => '' }
};
