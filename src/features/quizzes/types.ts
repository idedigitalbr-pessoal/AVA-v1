export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: string;
  title: string;
  text: string;
  type: 'OBJECTIVE' | 'ESSAY' | 'TRUE_FALSE';
  options: QuizOption[];
  subject?: string;
  category?: string;
  level?: 'Fácil' | 'Médio' | 'Difícil' | string;
}

export interface Quiz {
  id: string;
  courseId: string;
  title: string;
  description: string;
  durationMinutes: number;
  maxAttempts: number;
  questions: QuizQuestion[];
  status: 'DRAFT' | 'PUBLISHED';
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  studentId: string;
  startedAt: string;
  completedAt?: string;
  answers: Record<string, string>; // questionId -> optionId
  score?: number; // percentage or points
  isFinished: boolean;
}
