import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Quiz, QuizQuestion, QuizAttempt, QuizOption } from './types';

// Mock initial data
const initialQuestions: QuizQuestion[] = [
  {
    id: "q1",
    title: "O que é React?",
    text: "Qual a principal vantagem de usar React para criar interfaces?",
    type: "OBJECTIVE",
    subject: "Frontend",
    level: "Fácil",
    category: "Conceitos",
    options: [
      { id: "o1", text: "DOM Virtual e renderização eficiente", isCorrect: true },
      { id: "o2", text: "Ser uma linguagem de programação nova", isCorrect: false },
      { id: "o3", text: "Acesso direto a banco de dados", isCorrect: false },
    ]
  },
  {
    id: "q2",
    title: "Componentes no React",
    text: "Componentes funcionais não podem ter estado interno. (Verdadeiro ou Falso)",
    type: "TRUE_FALSE",
    subject: "Frontend",
    level: "Médio",
    category: "Conceitos",
    options: [
      { id: "o1_tf", text: "Verdadeiro", isCorrect: false },
      { id: "o2_tf", text: "Falso", isCorrect: true }
    ]
  }
];

const initialQuizzes: Quiz[] = [
  {
    id: "quiz_1",
    courseId: "course_react",
    title: "Avaliação de React Básico",
    description: "Teste seus conhecimentos básicos em React.",
    durationMinutes: 30,
    maxAttempts: 2,
    questions: initialQuestions,
    status: 'PUBLISHED'
  }
];

interface QuizStore {
  questions: QuizQuestion[];
  quizzes: Quiz[];
  attempts: QuizAttempt[];
  
  // Question Bank
  addQuestion: (question: QuizQuestion) => void;
  updateQuestion: (question: QuizQuestion) => void;
  deleteQuestion: (id: string) => void;

  // Quizzes
  addQuiz: (quiz: Quiz) => void;
  updateQuiz: (quiz: Quiz) => void;
  deleteQuiz: (id: string) => void;

  // Attempts
  startAttempt: (quizId: string, studentId: string) => string; // returns attemptId
  submitAttempt: (attemptId: string, answers: Record<string, string>, score: number) => void;
}

export const useQuizStore = create<QuizStore>()(
  persist(
    (set) => ({
      questions: initialQuestions,
      quizzes: initialQuizzes,
      attempts: [],

      addQuestion: (q) => set((state) => ({ questions: [...state.questions, q] })),
      updateQuestion: (q) => set((state) => ({
        questions: state.questions.map((item) => (item.id === q.id ? q : item))
      })),
      deleteQuestion: (id) => set((state) => ({
        questions: state.questions.filter((item) => item.id !== id)
      })),

      addQuiz: (quiz) => set((state) => ({ quizzes: [...state.quizzes, quiz] })),
      updateQuiz: (quiz) => set((state) => ({
        quizzes: state.quizzes.map((item) => (item.id === quiz.id ? quiz : item))
      })),
      deleteQuiz: (id) => set((state) => ({
        quizzes: state.quizzes.filter((item) => item.id !== id)
      })),

      startAttempt: (quizId, studentId) => {
        const id = `attempt_${Date.now()}`;
        const newAttempt: QuizAttempt = {
          id,
          quizId,
          studentId,
          startedAt: new Date().toISOString(),
          answers: {},
          isFinished: false
        };
        set((state) => ({ attempts: [...state.attempts, newAttempt] }));
        return id;
      },
      submitAttempt: (attemptId, answers, score) => set((state) => ({
        attempts: state.attempts.map((item) => {
          if (item.id === attemptId) {
            return {
              ...item,
              answers,
              score,
              completedAt: new Date().toISOString(),
              isFinished: true
            };
          }
          return item;
        })
      }))
    }),
    {
      name: 'ava-quiz-storage'
    }
  )
);
