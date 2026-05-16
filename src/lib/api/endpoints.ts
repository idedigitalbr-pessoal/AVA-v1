export const endpoints = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    me: '/auth/me',
  },
  students: {
    base: '/students',
    byId: (id: string) => `/students/${id}`,
    enrollments: (id: string) => `/students/${id}/enrollments`,
  },
  teachers: {
    base: '/teachers',
    byId: (id: string) => `/teachers/${id}`,
    classes: (id: string) => `/teachers/${id}/classes`,
  },
  courses: {
    base: '/courses',
    byId: (id: string) => `/courses/${id}`,
    modules: (id: string) => `/courses/${id}/modules`,
  },
  classes: {
    base: '/classes',
    byId: (id: string) => `/classes/${id}`,
    students: (id: string) => `/classes/${id}/students`,
  },
  subjects: {
    base: '/subjects',
    byId: (id: string) => `/subjects/${id}`,
  },
  ava: {
    modules: '/ava/modules',
    lessons: (moduleId: string) => `/ava/modules/${moduleId}/lessons`,
    lessonDetail: (lessonId: string) => `/ava/lessons/${lessonId}`,
  },
  assignments: {
    base: '/assignments',
    byId: (id: string) => `/assignments/${id}`,
    submissions: (id: string) => `/assignments/${id}/submissions`,
    submit: (id: string) => `/assignments/${id}/submit`,
  },
  quizzes: {
    base: '/quizzes',
    byId: (id: string) => `/quizzes/${id}`,
    attempts: (id: string) => `/quizzes/${id}/attempts`,
    submit: (id: string) => `/quizzes/${id}/submit`,
  },
  grades: {
    base: '/grades',
    studentGrades: (studentId: string) => `/grades/student/${studentId}`,
    classGrades: (classId: string) => `/grades/class/${classId}`,
  },
  notifications: {
    base: '/notifications',
    markAsRead: (id: string) => `/notifications/${id}/read`,
  }
};
