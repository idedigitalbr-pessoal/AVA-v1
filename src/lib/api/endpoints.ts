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
  PUBLIC_SITE: {
    SETTINGS: '/public/site/settings',
    MENU: '/public/site/menu',
    BANNERS: '/public/site/banners',
    FAQS: '/public/site/faqs',
    TESTIMONIALS: '/public/site/testimonials',
  },
  PUBLIC_COURSES: {
    LIST: '/public/courses',
    DETAIL: (slug: string) => `/public/courses/${slug}`,
    FEATURED: '/public/courses/featured',
  },
  PUBLIC_BLOG: {
    POSTS: '/public/blog/posts',
    POST_DETAIL: (slug: string) => `/public/blog/posts/${slug}`,
    CATEGORIES: '/public/blog/categories',
  },
  PUBLIC_LEADS: {
    SUBMIT: '/public/leads/submit',
    FORMS: (id: string) => `/public/leads/forms/${id}`,
  },
  PUBLIC_PRE_ENROLLMENTS: {
    START: '/public/pre-enrollments/start',
    UPDATE: (id: string) => `/public/pre-enrollments/${id}`,
    UPLOAD_DOC: (id: string, docId: string) => `/public/pre-enrollments/${id}/documents/${docId}`,
    STATUS: (id: string) => `/public/pre-enrollments/${id}/status`,
  },
  ADMIN_SITE: {
    SETTINGS: '/admin/site/settings',
    MENU: '/admin/site/menu',
    BANNERS: '/admin/site/banners',
    FAQS: '/admin/site/faqs',
    TESTIMONIALS: '/admin/site/testimonials',
  },
  ADMIN_LEADS: {
    LIST: '/admin/leads',
    DETAIL: (id: string) => `/admin/leads/${id}`,
    UPDATE_STAGE: (id: string) => `/admin/leads/${id}/stage`,
    ADD_NOTE: (id: string) => `/admin/leads/${id}/notes`,
    TASKS: (id: string) => `/admin/leads/${id}/tasks`,
    FORMS: '/admin/leads/forms',
  },
  ADMIN_PRE_ENROLLMENTS: {
    LIST: '/admin/pre-enrollments',
    DETAIL: (id: string) => `/admin/pre-enrollments/${id}`,
    REVIEW_DOC: (id: string, docId: string) => `/admin/pre-enrollments/${id}/documents/${docId}/review`,
    APPROVE: (id: string) => `/admin/pre-enrollments/${id}/approve`,
    REJECT: (id: string) => `/admin/pre-enrollments/${id}/reject`,
  },
  ADMIN_CAMPAIGNS: {
    LIST: '/admin/campaigns',
    DETAIL: (id: string) => `/admin/campaigns/${id}`,
  },
  STUDENT_AREA: {
    DASHBOARD: '/student/dashboard',
    SUMMARY: '/student/dashboard/summary',
    LAST_ACCESSED_LESSON: '/student/dashboard/last-accessed',
    ANNOUNCEMENTS: '/student/dashboard/announcements',
    CAMPAIGNS: '/student/dashboard/campaigns',
    SHORTCUTS: '/student/dashboard/shortcuts',
    
    COURSES: '/student/courses',
    COURSE_BY_ID: (id: string) => `/student/courses/${id}`,
    COURSE_MODULES: (id: string) => `/student/courses/${id}/modules`,
    COURSE_LESSONS: (id: string) => `/student/courses/${id}/lessons`,
    COURSE_PROGRESS: (id: string) => `/student/courses/${id}/progress`,
    
    LESSON_BY_ID: (courseId: string, lessonId: string) => `/student/courses/${courseId}/lessons/${lessonId}`,
    LESSON_COMPLETE: (lessonId: string) => `/student/lessons/${lessonId}/complete`,
    LESSON_UNCOMPLETE: (lessonId: string) => `/student/lessons/${lessonId}/uncomplete`,
    LESSON_COMMENTS: (lessonId: string) => `/student/lessons/${lessonId}/comments`,
    LESSON_ATTACHMENTS: (lessonId: string) => `/student/lessons/${lessonId}/attachments`,
    
    ACTIVITIES: '/student/activities',
    ACTIVITY_BY_ID: (id: string) => `/student/activities/${id}`,
    ACTIVITY_SUBMIT: (id: string) => `/student/activities/${id}/submit`,
    ACTIVITY_FEEDBACK: (id: string) => `/student/activities/${id}/feedback`,
    
    GRADEBOOK: '/student/grades',
    SUBJECT_GRADES: (subjectId: string) => `/student/grades/${subjectId}`,
    ATTENDANCE: '/student/attendance',
    ACADEMIC_HISTORY: '/student/history',
    
    FINANCIAL_INVOICES: '/student/financial/invoices',
    INVOICE_BY_ID: (id: string) => `/student/financial/invoices/${id}`,
    INVOICE_DOWNLOAD: (id: string) => `/student/financial/invoices/${id}/download`,
    
    SUPPORT_TICKETS: '/student/support/tickets',
    TICKET_BY_ID: (id: string) => `/student/support/tickets/${id}`,
    TICKET_MESSAGES: (id: string) => `/student/support/tickets/${id}/messages`,
  },
};
