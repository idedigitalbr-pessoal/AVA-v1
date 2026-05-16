export type Role = 'ALUNO' | 'PROFESSOR' | 'ADMIN' | 'SECRETARIA';

export type Permission = 
  | 'VIEW_DASHBOARD'
  | 'MANAGE_USERS'
  | 'MANAGE_COURSES'
  | 'MANAGE_GRADES'
  | 'VIEW_COURSES'
  | 'SUBMIT_ASSIGNMENTS'
  | 'VIEW_ALL_USERS'
  | 'VIEW_STUDENT_DASHBOARD'
  | 'VIEW_TEACHER_DASHBOARD'
  | 'VIEW_ADMIN_DASHBOARD'
  | 'MANAGE_SYSTEM'
  | 'CREATE_CONTENT'
  | 'VIEW_GRADES'
  | 'DELETE_USERS'
  | 'DELETE_COURSES';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Student extends User {
  role: 'ALUNO';
  registrationNumber: string; // RA/Matrícula
}

export interface Teacher extends User {
  role: 'PROFESSOR';
  specialization?: string;
}

export type CourseStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
export type CourseModality = 'PRESENCIAL' | 'EAD' | 'HIBRIDO';
export type CourseDegree = 'GRADUACAO' | 'POS_GRADUACAO' | 'LATO_SENSU' | 'STRICTO_SENSU' | 'EXTENSAO' | 'TECNICO' | 'LIVRE';

export interface Course {
  id: string;
  title: string;
  description: string;
  code: string;
  status: CourseStatus;
  modality: CourseModality;
  degree: CourseDegree;
  workload: number; // carga horária em horas
  coordinatorId?: string; // coordenador do curso
  coordinatorName?: string;
  thumbnailUrl?: string;
  instructorId: string; // pode ser o owner ou fallback
  totalModules: number;
  totalStudents: number;
  totalClasses: number;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  description?: string;
  courseId: string; // Course/Curso that this subject belongs to
  workload: number; // Carga horária
}

export interface Class {
  id: string;
  name: string; // e.g. "Turma A - 2026"
  courseId: string;
  academicYear: string;
  startDate: string;
  endDate: string;
}

export interface ClassSubject {
  id: string;
  classId: string;
  subjectId: string;
  teacherId: string;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  classId?: string;
  progress: number;
  status: 'ACTIVE' | 'COMPLETED' | 'DROPPED';
  enrolledAt: string;
}

export interface AvaModule {
  id: string;
  courseId: string;
  subjectId?: string;
  title: string;
  description?: string;
  order: number;
}

// Aliasing for compatibility with existing mocks/services
export type Module = AvaModule;

export interface Lesson {
  id: string;
  moduleId: string;
  courseId: string;
  title: string;
  content?: string;
  videoUrl?: string;
  duration: number; // minutes
  order: number;
  completed: boolean;
  attachments?: { name: string; url: string }[];
}

export interface LessonMaterial {
  id: string;
  lessonId: string;
  title: string;
  type: 'PDF' | 'DOC' | 'LINK' | 'VIDEO';
  url: string;
}

export interface LessonProgress {
  id: string;
  userId: string;
  lessonId: string;
  completed: boolean;
  progressPercentage: number;
  lastAccessedAt: string;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  subjectId: string;
  classId: string;
  dueDate: string;
  maxScore: number;
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  studentId: string;
  submittedAt: string;
  content?: string;
  attachmentUrl?: string;
  score?: number;
  feedback?: string;
  status: 'SUBMITTED' | 'LATE' | 'GRADED';
}

export interface Quiz {
  id: string;
  title: string;
  description?: string;
  subjectId: string;
  classId: string;
  dueDate?: string;
  durationMinutes?: number;
  maxScore: number;
}

export interface Question {
  id: string;
  quizId: string;
  text: string;
  type: 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'OPEN_ENDED';
  points: number;
  order: number;
}

export interface QuestionOption {
  id: string;
  questionId: string;
  text: string;
  isCorrect: boolean;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  studentId: string;
  startedAt: string;
  completedAt?: string;
  score?: number;
  answers: Record<string, string>; // questionId -> optionId or text
}

// Re-using the Activity type broadly required by earlier mock features
export interface Activity {
  id: string;
  title: string;
  type: 'LESSON' | 'QUIZ' | 'ASSIGNMENT';
  courseId: string;
  courseName?: string;
  dueDate?: string;
  status: 'PENDING' | 'SUBMITTED' | 'GRADED';
  score?: number;
  maxScore?: number;
}

export interface Grade {
  id: string;
  studentId: string;
  classSubjectId: string; // Links to specific Subject in a Class
  type: 'P1' | 'P2' | 'PROJECT' | 'FINAL';
  value: number;
  date: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  classSubjectId: string;
  date: string;
  present: boolean;
  justification?: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'INFO' | 'WARNING' | 'SUCCESS';
}

export interface Certificate {
  id: string;
  studentId: string;
  courseId: string;
  issueDate: string;
  code: string;
  url: string;
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
