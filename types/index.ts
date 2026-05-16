export type Role = 'ALUNO' | 'PROFESSOR' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarUrl?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnailUrl?: string;
  instructorId: string;
  totalModules: number;
  totalStudents: number;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  progress: number;
  status: 'ACTIVE' | 'COMPLETED' | 'DROPPED';
  enrolledAt: string;
}

export interface Activity {
  id: string;
  title: string;
  type: 'LESSON' | 'QUIZ' | 'ASSIGNMENT';
  courseId: string;
  dueDate?: string;
  status: 'PENDING' | 'SUBMITTED' | 'GRADED';
  score?: number;
}

export interface DashboardStats {
  admin: {
    totalStudents: number;
    totalTeachers: number;
    activeCourses: number;
    revenue: number;
  };
  teacher: {
    activeClasses: number;
    pendingGrades: number;
    totalStudents: number;
    upcomingLectures: number;
  };
  student: {
    activeCourses: number;
    completedCourses: number;
    pendingActivities: number;
    averageGrade: number;
  };
}
