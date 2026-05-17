export type Role = 'SUPER_ADMIN' | 'ADMIN' | 'SECRETARIA' | 'COORDENADOR' | 'PROFESSOR' | 'ALUNO' | 'FINANCEIRO' | 'SUPORTE';

export type Permission = 
  // Old permissions
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
  | 'DELETE_COURSES'
  // New permissions
  | 'students.read'
  | 'students.create'
  | 'students.update'
  | 'students.delete'
  | 'teachers.read'
  | 'courses.manage'
  | 'classes.manage'
  | 'subjects.manage'
  | 'enrollments.manage'
  | 'ava.manage'
  | 'assessments.manage'
  | 'grades.manage'
  | 'reports.read'
  | 'certificates.manage'
  | 'settings.manage';

export interface RoleProfile {
  id: string;
  name: Role;
  label: string;
  description: string;
  permissions: Permission[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarUrl?: string;
  phone?: string;
  birthDate?: string;
  address?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Student extends User {
  role: 'ALUNO';
  registrationNumber: string; // RA/Matrícula
  cpf?: string;
  status?: 'ACTIVE' | 'INACTIVE' | 'BLOCKED';
  lastAccessAt?: string;
}

export interface Teacher extends User {
  role: 'PROFESSOR';
  specialization?: string;
  department?: string;
  area?: string;
  status?: 'ACTIVE' | 'INACTIVE' | 'BLOCKED';
  lastAccessAt?: string;
}

export type CourseStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
export type CourseModality = 'PRESENCIAL' | 'EAD' | 'HIBRIDO';
export type CourseDegree = 'GRADUACAO' | 'POS_GRADUACAO' | 'LATO_SENSU' | 'STRICTO_SENSU' | 'EXTENSAO' | 'TECNICO' | 'LIVRE';

export interface GradebookAssessment {
  id: string;
  name: string;
  type: 'EXAM' | 'QUIZ' | 'PROJECT' | 'ACTIVITY';
  weight: number;
  maxGrade: number;
  status: 'PENDING' | 'GRADED' | 'PUBLISHED';
}

export interface StudentGrade {
  studentId: string;
  studentName: string;
  email: string;
  grades: {
    [assessmentId: string]: number | null;
  };
  finalGrade: number;
  situation: 'APROVADO' | 'RECUPERACAO' | 'REPROVADO' | 'EM_ANDAMENTO';
}

export type AttendanceStatus = 'PRESENT' | 'ABSENT' | 'LATE' | 'JUSTIFIED';

export interface AttendanceRecord {
  studentId: string;
  studentName: string;
  status: AttendanceStatus;
  justification?: string;
  attendancePercentage: number;
}

export interface AttendanceSession {
  id: string;
  classSubjectId: string;
  date: string;
  topic: string;
  isSaved: boolean;
  records: AttendanceRecord[];
}

export type MessageThreadStatus = 'UNREAD' | 'REPLIED' | 'WAITING_STUDENT' | 'ARCHIVED';

export interface TeacherMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: 'TEACHER' | 'STUDENT';
  content: string;
  date: string;
}

export interface TeacherMessageThread {
  id: string;
  studentId: string;
  studentName: string;
  subject: string;
  lastMessageDate: string;
  status: MessageThreadStatus;
  messages: TeacherMessage[];
}

export interface ClassAnnouncement {
  id: string;
  title: string;
  content: string;
  date: string;
  authorName: string;
}

export interface TeacherCommunicationData {
  classSubjectId: string;
  threads: TeacherMessageThread[];
  announcements: ClassAnnouncement[];
}

export type QuestionType = 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'ESSAY';
export type QuestionDifficulty = 'EASY' | 'MEDIUM' | 'HARD';
export type QuestionStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export interface TeacherBankQuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
  feedback?: string;
}

export interface TeacherBankQuestion {
  id: string;
  subjectId: string;
  subjectName?: string;
  text: string;
  type: QuestionType;
  difficulty: QuestionDifficulty;
  status: QuestionStatus;
  tags: string[];
  options?: TeacherBankQuestionOption[]; // For MULTIPLE_CHOICE
  correctAnswer?: boolean; // For TRUE_FALSE
  trueFalseFeedback?: string; // For TRUE_FALSE
  expectedAnswer?: string; // For ESSAY
  rubric?: string; // For ESSAY
}

export interface TeacherAttendanceData {
  classSubjectId: string;
  sessions: AttendanceSession[];
  students: { studentId: string; studentName: string; attendancePercentage: number }[];
}

export interface TeacherGradebook {
  classSubjectId: string;
  assessments: GradebookAssessment[];
  students: StudentGrade[];
}

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

export interface CurriculumPeriod {
  id: string;
  courseId: string;
  name: string;
  order: number;
}

export interface CurriculumSubject {
  id: string;
  courseId: string;
  subjectId: string;
  subjectName: string;
  subjectCode: string;
  periodId: string;
  order: number;
  workload: number;
  isMandatory: boolean;
  prerequisites: string[]; // array of CurriculumSubject IDs
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  description?: string;
  courseId: string; // Course/Curso that this subject belongs to
  workload: number; // Carga horária
  area?: string;
  status?: 'ACTIVE' | 'ARCHIVED' | 'DRAFT';
  syllabus?: string;
  objectives?: string;
  programmaticContent?: string;
  methodology?: string;
  evaluationCriteria?: string;
  basicBibliography?: string;
  complementaryBibliography?: string;
  linkedCourses?: { id: string; name: string }[];
  linkedTeachers?: { id: string; name: string }[];
}

export interface Class {
  id: string;
  name: string; // e.g. "Turma A - 2026"
  courseId: string;
  academicYear: string;
  startDate: string;
  endDate: string;
  status?: 'ACTIVE' | 'ARCHIVED' | 'FINISHED';
  studentsCount?: number;
  subjectsCount?: number;
}

export interface ClassSubject {
  id: string;
  classId: string;
  subjectId: string;
  teacherId: string;
}

export interface TeacherClassSubject {
  id: string; // The classSubjectId
  subjectName: string;
  courseName: string;
  className: string;
  academicYear: string;
  totalStudents: number;
  totalModules: number;
  publishedClasses: number;
  draftClasses: number;
  pendingActivities: number;
  averageGrade: number;
  progressPercentage: number;
  status: 'ACTIVE' | 'ARCHIVED' | 'DRAFT';
}

export interface TeacherClassOverviewData {
  classSubject: TeacherClassSubject;
  metrics: {
    averageAttendance: number;
    unreadMessages: number;
    studentsAtRisk: number;
    completedLessonsByStudents: number;
    nextRecommendedAction: string;
  };
  studentsAtRiskList: {
    studentId: string;
    studentName: string;
    reason: string;
    actionType: 'MESSAGE' | 'ATTENDANCE' | 'GRADE';
  }[];
  recentActivities: {
    id: string;
    title: string;
    type: 'SUBMISSION' | 'QUIZ' | 'MESSAGE' | 'CONTENT';
    date: string;
    description: string;
  }[];
  notices: {
    id: string;
    title: string;
    content: string;
    date: string;
    author: string;
  }[];
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  classId?: string;
  progress: number;
  status: 'PENDING' | 'CONFIRMED' | 'LOCKED' | 'CANCELED' | 'COMPLETED';
  academicSituation?: string;
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
  isMandatory?: boolean;
  isPublished?: boolean;
  releaseDate?: string;
  materials?: LessonMaterial[];
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

export interface TeacherAssessment {
  id: string;
  classSubjectId: string;
  title: string;
  type: 'QUIZ' | 'EXAM';
  description?: string;
  dueDate?: string;
  timeLimit?: number; // in minutes
  maxAttempts?: number;
  weight?: number;
  maxScore: number;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  shuffleQuestions?: boolean;
  questionIds: string[];
  createdAt?: string;
}

export interface TeacherClassStudent {
  id: string; // enrollmentId or student userId
  studentId: string;
  name: string;
  registration: string; // RA
  email: string;
  status: 'ACTIVE' | 'DROPPED';
  riskStatus: 'NONE' | 'LOW' | 'MEDIUM' | 'HIGH';
  contentProgress: number; // percentage
  currentAverage: number;
  attendancePct: number;
  lastAccess?: string;
  pendingActivitiesCount: number;
}

export interface TeacherClassStudentDetail extends TeacherClassStudent {
  grades: { title: string; score: number; maxScore: number; date: string }[];
  attendanceDates: { date: string; present: boolean }[];
  activities: { title: string; status: 'PENDING' | 'SUBMITTED' | 'GRADED'; score?: number; maxScore: number; dueDate: string }[];
  messages: { id: string; sender: 'TEACHER' | 'STUDENT'; text: string; date: string }[];
  accessHistory: { date: string; action: string }[];
}

export interface TeacherClassPerformanceReport {
  averageGrade: number;
  highestGrade: number;
  lowestGrade: number;
  passingRate: number;
  studentsCount: number;
  gradeDistribution: { range: string; count: number }[];
  recentAssessments: { title: string; average: number; maxScore: number; date: string }[];
}

export interface TeacherClassAttendanceReport {
  averageAttendancePct: number;
  perfectAttendanceCount: number;
  lowAttendanceCount: number;
  totalSessions: number;
  attendanceByDate: { date: string; presentCount: number; absentCount: number }[];
}

export interface TeacherClassEngagementReport {
  averageAccessPerWeek: number;
  activeStudents: number;
  inactiveStudents: number;
  totalInteractions: number;
  topActiveStudents: { name: string; accesses: number }[];
}

export interface TeacherAtRiskReport {
  totalAtRisk: number;
  highRisk: number;
  mediumRisk: number;
  lowRisk: number;
  students: { id: string; name: string; registration: string; riskLevel: 'HIGH' | 'MEDIUM' | 'LOW'; reason: string }[];
}

export interface TeacherAssessmentAttempt {
  id: string;
  assessmentId: string;
  studentId: string;
  studentName: string;
  startedAt: string;
  completedAt?: string;
  score?: number;
}

export interface Assessment {
  id: string;
  title: string;
  type: 'ASSIGNMENT' | 'QUIZ' | 'EXAM';
  description?: string;
  courseId?: string;
  subjectId?: string;
  classId?: string;
  teacherId?: string;
  dueDate?: string;
  maxScore: number;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  createdAt?: string;
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

export interface CertificateTemplate {
  id: string;
  name: string;
  description?: string;
  courseId?: string; // If undefined, applies to all courses, or maybe we just want general templates
  backgroundUrl?: string; // URL for the background image
  htmlContent?: string; // HTML template with placeholders
  createdAt: string;
  updatedAt: string;
}

export interface Certificate {
  id: string;
  studentId: string;
  courseId: string;
  templateId?: string;
  issueDate: string;
  code: string;
  url: string;
  status: 'ISSUED' | 'REVOKED' | 'EXPIRED';
}

export interface Report {
  id: string;
  title: string;
  description: string;
  category: string;
  icon?: string;
}

export interface ReportResult {
  headers: string[];
  rows: any[][];
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
    totalStudents: number;
    pendingGrades: number;
    pendingQuizzes: number;
    unreadMessages: number;
    publishedClasses: number;
    draftClasses: number;
    pendingAttendance: number;
    upcomingLectures: number;
  };
  student: {
    activeCourses: number;
    completedCourses: number;
    pendingActivities: number;
    averageGrade: number;
  };
}

export interface TeacherDashboardData {
  stats: DashboardStats['teacher'];
  nextClass: {
    id: string;
    title: string;
    courseName: string;
    className: string;
    time: string;
    type: 'PRESENCIAL' | 'ONLINE' | 'GRAVADA';
  } | null;
  todaySchedule: {
    id: string;
    title: string;
    courseName: string;
    className: string;
    time: string;
    type: 'PRESENCIAL' | 'ONLINE' | 'GRAVADA';
  }[];
  pendingTasks: {
    id: string;
    title: string;
    type: 'GRADE' | 'ATTENDANCE' | 'MESSAGE' | 'DRAFT';
    courseName: string;
    dueDate?: string;
  }[];
  coursesProgress: {
    id: string;
    courseName: string;
    className: string;
    totalStudents: number;
    publishedClasses: number;
    totalClasses: number;
    pendingSubmissions: number;
    averageGrade: number;
  }[];
  alerts: {
    id: string;
    title: string;
    description: string;
    type: 'DANGER' | 'WARNING' | 'INFO';
  }[];
}
