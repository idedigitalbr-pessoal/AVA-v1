export interface StudentCourse {
  id: string;
  name: string;
  courseCode?: string;
  teacherName: string;
  period?: string;
  progress: number;
  thumbnailUrl?: string;
  nextLesson?: {
    id: string;
    title: string;
    type: 'VIDEO' | 'PDF' | 'QUIZ' | 'TEXT';
  };
  totalModules: number;
  completedLessons: number;
  totalLessons: number;
  pendingActivities?: number;
  status?: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
}

export interface StudentDashboardData {
  stats: {
    activeCourses: number;
    completedCourses: number;
    pendingActivities: number;
    averageGrade: number;
  };
  lastAccessedLesson: {
    id: string;
    title: string;
    subject: string;
    courseId: string;
    progress: number;
    duration?: string;
  } | null;
  overdueActivities: {
    id: string;
    title: string;
    subject: string;
    courseId: string;
    daysOverdue: number;
  }[];
  pendingQuizzes: {
    id: string;
    title: string;
    subject: string;
    courseId: string;
    dueDate: string;
  }[];
  announcements: {
    id: string;
    title: string;
    date: string;
    type: 'Importante' | 'Evento' | 'Informativo';
  }[];
  courseProgress: number; // overall or main course
  courseName: string; 
  campaigns?: any[];
  leftShortcuts?: any[];
  rightShortcuts?: any[];
}

export interface StudentModule {
  id: string;
  title: string;
  order: number;
  lessons: StudentLesson[];
}

export interface StudentLesson {
  id: string;
  moduleId: string;
  title: string;
  type: 'VIDEO' | 'PDF' | 'QUIZ' | 'TEXT';
  content?: string;
  videoUrl?: string;
  duration?: number; // in minutes
  order: number;
  isMandatory: boolean;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  progress?: number;
  attachments?: {
    id: string;
    name: string;
    url: string;
    type: string;
  }[];
}

export interface StudentActivityDetail {
  id: string;
  courseId: string;
  courseName: string;
  title: string;
  description: string;
  type: 'ASSIGNMENT' | 'QUIZ' | 'EXAM';
  dueDate: string;
  maxScore: number;
  status: 'PENDING' | 'SUBMITTED' | 'GRADED' | 'OVERDUE';
  score?: number;
  feedback?: string;
  attachments?: { id: string; name: string; url: string; }[];
  teacherName?: string;
}

export interface StudentGradebookEntry {
  subjectId: string;
  subjectName: string;
  teacherName: string;
  grades: {
    assessmentId: string;
    type?: 'B1' | 'B2' | 'P3' | 'REC' | 'OUTRO';
    assessmentName: string;
    score: number;
    maxScore: number;
    weight: number;
    feedback?: string;
  }[];
  totalAbsences?: number;
  finalGrade: number;
  status: 'APROVADO' | 'REPROVADO' | 'RECUPERACAO' | 'EM_ANDAMENTO';
  attendancePercentage: number;
}

export interface StudentCalendarEvent {
  id: string;
  title: string;
  date: string; // ISO date
  type: 'AULA' | 'PROVA' | 'ATIVIDADE' | 'EVENTO';
  courseName?: string;
  description?: string;
}

export interface StudentMessageThread {
  id: string;
  subject: string;
  teacherName: string;
  lastMessageDate: string;
  status: 'UNREAD' | 'READ' | 'REPLIED';
  messages: {
    id: string;
    senderId: string;
    senderName: string;
    senderRole: 'TEACHER' | 'STUDENT';
    content: string;
    date: string;
  }[];
}

export interface StudentNotice {
  id: string;
  title: string;
  content: string;
  date: string;
  authorName: string;
  courseName?: string;
  isRead: boolean;
}

export interface StudentFinancialSummary {
  status: 'REGULAR' | 'LATE' | 'NEGOTIATED';
  nextBill?: {
    id: string;
    amount: number;
    dueDate: string;
    description: string;
  };
  invoices: {
    id: string;
    description: string;
    competency: string;
    amount: number;
    dueDate: string;
    status: 'PAID' | 'PENDING' | 'LATE' | 'NEGOTIATED';
    paidAt?: string;
    paymentMethod?: string;
    invoiceUrl?: string; // boleto url
  }[];
}

export interface StudentSupportTicket {
  id: string;
  subject: string;
  category: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  createdAt: string;
  lastUpdateAt: string;
}
