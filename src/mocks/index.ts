import { User, Student, Teacher, Course, Subject, Class, ClassSubject, Enrollment, AvaModule, Lesson, LessonMaterial, LessonProgress, Assignment, AssignmentSubmission, Quiz, Question, QuestionOption, QuizAttempt, Activity, Grade, AttendanceRecord, Notification, Certificate, DashboardStats } from '@/types';

// USERS
export const mockUsers: User[] = [
  { id: 'admin1', name: 'Admin da Silva', email: 'admin@ava.edu.br', role: 'ADMIN', createdAt: '2025-01-01', updatedAt: '2026-05-01' },
  { id: 'sec1', name: 'Mariana Costa', email: 'mariana@ava.edu.br', role: 'SECRETARIA', createdAt: '2025-04-01', updatedAt: '2026-05-01' },
];

export const mockTeachers: Teacher[] = [
  { id: 't1', name: 'Prof. Carlos Mendes', email: 'carlos@ava.edu.br', role: 'PROFESSOR', specialization: 'Engenharia de Software', createdAt: '2025-02-01', updatedAt: '2026-05-01' },
  { id: 't2', name: 'Prof. Julia Rocha', email: 'julia@ava.edu.br', role: 'PROFESSOR', specialization: 'Design e UX', createdAt: '2025-02-15', updatedAt: '2026-05-01' },
  { id: 't3', name: 'Prof. Roberto Nogueira', email: 'roberto@ava.edu.br', role: 'PROFESSOR', specialization: 'Banco de Dados', createdAt: '2025-03-01', updatedAt: '2026-05-01' },
];

export const mockStudents: Student[] = [
  { id: 's1', name: 'Ana Souza', email: 'ana@ava.edu.br', role: 'ALUNO', registrationNumber: '2026001', avatarUrl: 'https://i.pravatar.cc/150?u=s1', createdAt: '2025-03-01', updatedAt: '2026-05-01' },
  { id: 's2', name: 'Bruno Mendes', email: 'bruno@ava.edu.br', role: 'ALUNO', registrationNumber: '2026002', avatarUrl: 'https://i.pravatar.cc/150?u=s2', createdAt: '2025-03-02', updatedAt: '2026-05-01' },
  { id: 's3', name: 'Carla Dias', email: 'carla@ava.edu.br', role: 'ALUNO', registrationNumber: '2026003', avatarUrl: 'https://i.pravatar.cc/150?u=s3', createdAt: '2025-03-03', updatedAt: '2026-05-01' },
  { id: 's4', name: 'Daniel Costa', email: 'daniel@ava.edu.br', role: 'ALUNO', registrationNumber: '2026004', avatarUrl: 'https://i.pravatar.cc/150?u=s4', createdAt: '2025-03-04', updatedAt: '2026-05-01' },
  { id: 's5', name: 'Eduarda Lima', email: 'eduarda@ava.edu.br', role: 'ALUNO', registrationNumber: '2026005', avatarUrl: 'https://i.pravatar.cc/150?u=s5', createdAt: '2025-03-05', updatedAt: '2026-05-01' },
];

export const allMockUsers: User[] = [...mockUsers, ...mockTeachers, ...mockStudents];

// COURSES
export const mockCourses: Course[] = [
  { id: 'c1', title: 'Engenharia de Software', description: 'Bacharelado em Eng. de Software', instructorId: 't1', totalModules: 10, totalStudents: 154, thumbnailUrl: 'https://picsum.photos/seed/web/400/225' },
  { id: 'c2', title: 'Design Gráfico', description: 'Tecnólogo em Design Gráfico e Interfaces', instructorId: 't2', totalModules: 8, totalStudents: 89, thumbnailUrl: 'https://picsum.photos/seed/ui/400/225' },
  { id: 'c3', title: 'Sistemas de Informação', description: 'Bacharelado com foco em gestão de TI', instructorId: 't3', totalModules: 12, totalStudents: 120, thumbnailUrl: 'https://picsum.photos/seed/soft/400/225' },
  { id: 'c4', title: 'Ciência da Computação', description: 'Bacharelado em Ciência da Computação', instructorId: 't1', totalModules: 12, totalStudents: 200, thumbnailUrl: 'https://picsum.photos/seed/comp/400/225' },
];

// SUBJECTS
export const mockSubjects: Subject[] = [
  { id: 'sub1', name: 'Lógica de Programação', code: 'LP001', description: 'Introdução aos algoritmos.', courseId: 'c1', workload: 60 },
  { id: 'sub2', name: 'Estrutura de Dados', code: 'ED002', description: 'Listas, pilhas, filas e árvores.', courseId: 'c1', workload: 80 },
  { id: 'sub3', name: 'Interface Humano Computador', code: 'IHC003', description: 'Usabilidade e design.', courseId: 'c2', workload: 60 },
  { id: 'sub4', name: 'Identidade Visual', code: 'IV004', description: 'Criação de marcas.', courseId: 'c2', workload: 40 },
  { id: 'sub5', name: 'Banco de Dados', code: 'BD005', description: 'Modelagem relacional.', courseId: 'c3', workload: 80 },
  { id: 'sub6', name: 'Redes de Computadores', code: 'RC006', description: 'Protocolos e arquitetura web.', courseId: 'c4', workload: 60 },
];

// CLASSES (Turmas)
export const mockClasses: Class[] = [
  { id: 'class1', name: 'Turma A - 2026', courseId: 'c1', academicYear: '2026', startDate: '2026-02-01', endDate: '2026-12-15' },
  { id: 'class2', name: 'Turma B - 2026', courseId: 'c2', academicYear: '2026', startDate: '2026-02-01', endDate: '2026-12-15' },
  { id: 'class3', name: 'Turma C - 2026', courseId: 'c3', academicYear: '2026', startDate: '2026-02-01', endDate: '2026-12-15' },
];

export const mockClassSubjects: ClassSubject[] = [
  { id: 'cs1', classId: 'class1', subjectId: 'sub1', teacherId: 't1' },
  { id: 'cs2', classId: 'class1', subjectId: 'sub2', teacherId: 't1' },
  { id: 'cs3', classId: 'class2', subjectId: 'sub3', teacherId: 't2' },
  { id: 'cs4', classId: 'class3', subjectId: 'sub5', teacherId: 't3' },
];

// ENROLLMENTS
export const mockEnrollments: Enrollment[] = [
  { id: 'e1', userId: 's1', courseId: 'c1', classId: 'class1', progress: 45, status: 'ACTIVE', enrolledAt: '2026-02-15' },
  { id: 'e2', userId: 's2', courseId: 'c1', classId: 'class1', progress: 12, status: 'ACTIVE', enrolledAt: '2026-02-15' },
  { id: 'e3', userId: 's3', courseId: 'c2', classId: 'class2', progress: 100, status: 'COMPLETED', enrolledAt: '2025-08-01' },
  { id: 'e4', userId: 's4', courseId: 'c3', classId: 'class3', progress: 30, status: 'ACTIVE', enrolledAt: '2026-03-01' },
  { id: 'e5', userId: 's5', courseId: 'c1', classId: 'class1', progress: 80, status: 'ACTIVE', enrolledAt: '2026-02-15' },
];

// AVA MODULES
export const mockModules: AvaModule[] = [
  { id: 'm1', courseId: 'c1', subjectId: 'sub1', title: 'Módulo 1: Lógica Básica', description: 'Variáveis e tipos.', order: 1 },
  { id: 'm2', courseId: 'c1', subjectId: 'sub1', title: 'Módulo 2: Estruturas de Controle', description: 'If, else, loops.', order: 2 },
  { id: 'm3', courseId: 'c1', subjectId: 'sub2', title: 'Módulo 3: Arrays e Listas', description: 'Armazenamento de coleções.', order: 3 },
  { id: 'm4', courseId: 'c2', subjectId: 'sub3', title: 'Módulo 1: Fundamentos de UX', description: 'Psicologia das cores e formas.', order: 1 },
];

// LESSONS
export const mockLessons: Lesson[] = [
  { id: 'l1', moduleId: 'm1', courseId: 'c1', title: 'Aula de Boas Vindas', duration: 15, order: 1, completed: true, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 'l2', moduleId: 'm1', courseId: 'c1', title: 'Tipos de Variáveis', duration: 25, order: 2, completed: true, content: 'Variáveis são espaços na memória...' },
  { id: 'l3', moduleId: 'm1', courseId: 'c1', title: 'Operadores Matemáticos', duration: 30, order: 3, completed: false, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 'l4', moduleId: 'm2', courseId: 'c1', title: 'Decisões com IF', duration: 20, order: 1, completed: false },
];

// LESSON PROGRESS
export const mockLessonProgress: LessonProgress[] = [
  { id: 'lp1', userId: 's1', lessonId: 'l1', completed: true, progressPercentage: 100, lastAccessedAt: '2026-05-10' },
  { id: 'lp2', userId: 's1', lessonId: 'l2', completed: true, progressPercentage: 100, lastAccessedAt: '2026-05-12' },
  { id: 'lp3', userId: 's1', lessonId: 'l3', completed: false, progressPercentage: 40, lastAccessedAt: '2026-05-15' },
];

// MATERIALS
export const mockLessonMaterials: LessonMaterial[] = [
  { id: 'mat1', lessonId: 'l1', title: 'Apostila Completa (PDF)', type: 'PDF', url: '#' },
  { id: 'mat2', lessonId: 'l2', title: 'Exemplos de Código (RAR)', type: 'DOC', url: '#' },
  { id: 'mat3', lessonId: 'l3', title: 'Artigo sobre Operadores', type: 'LINK', url: '#' },
];

// ACTIVITIES (Assignments, Quizzes)
export const mockActivities: Activity[] = [
  { id: 'a1', title: 'Quiz: Lógica Básica', type: 'QUIZ', courseId: 'c1', courseName: 'Engenharia de Software', dueDate: '2026-05-20', status: 'PENDING', maxScore: 10 },
  { id: 'a2', title: 'Trabalho Prático - Calculadora', type: 'ASSIGNMENT', courseId: 'c1', courseName: 'Engenharia de Software', dueDate: '2026-05-22', status: 'PENDING', maxScore: 10 },
  { id: 'a3', title: 'Prova Final de IHC', type: 'QUIZ', courseId: 'c2', courseName: 'Design Gráfico', dueDate: '2026-05-25', status: 'PENDING', maxScore: 10 },
  { id: 'a4', title: 'Fórum Temático', type: 'ASSIGNMENT', courseId: 'c1', courseName: 'Engenharia de Software', status: 'GRADED', score: 8.5, maxScore: 10 },
];

// GRADES
export const mockGrades: Grade[] = [
  { id: 'g1', studentId: 's1', classSubjectId: 'cs1', type: 'P1', value: 8.5, date: '2026-04-10' },
  { id: 'g2', studentId: 's1', classSubjectId: 'cs1', type: 'P2', value: 7.0, date: '2026-05-10' },
  { id: 'g3', studentId: 's2', classSubjectId: 'cs1', type: 'P1', value: 6.0, date: '2026-04-10' },
  { id: 'g4', studentId: 's3', classSubjectId: 'cs3', type: 'FINAL', value: 9.5, date: '2026-05-12' },
  { id: 'g5', studentId: 's4', classSubjectId: 'cs4', type: 'P1', value: 4.5, date: '2026-04-10' },
  { id: 'g6', studentId: 's5', classSubjectId: 'cs2', type: 'P1', value: 8.0, date: '2026-04-12' },
];

// ATTENDANCE
export const mockAttendance: AttendanceRecord[] = [
  // Ana Souza (s1)
  { id: 'att1', studentId: 's1', classSubjectId: 'cs1', date: '2026-02-15', present: true },
  { id: 'att2', studentId: 's1', classSubjectId: 'cs1', date: '2026-02-22', present: true },
  { id: 'att3', studentId: 's1', classSubjectId: 'cs1', date: '2026-03-01', present: false, justification: 'Atestado Médico' },
  // Outros...
  { id: 'att4', studentId: 's2', classSubjectId: 'cs1', date: '2026-02-15', present: true },
  { id: 'att5', studentId: 's2', classSubjectId: 'cs1', date: '2026-02-22', present: false },
];

// NOTIFICATIONS
export const mockNotifications: Notification[] = [
  { id: 'n1', userId: 's1', title: 'Nova nota disponível', message: 'Sua nota na disciplina Lógica de Programação foi publicada.', date: '2026-05-15T10:00:00Z', read: false, type: 'SUCCESS' },
  { id: 'n2', userId: 's1', title: 'Atividade próxima do prazo', message: 'O Quiz: Lógica Básica vence em 5 dias.', date: '2026-05-14T15:30:00Z', read: false, type: 'WARNING' },
  { id: 'n3', userId: 's1', title: 'Nova aula liberada', message: 'A aula Operadores Matemáticos já está disponível.', date: '2026-05-10T08:00:00Z', read: true, type: 'INFO' },
];

// DASHBOARD STATS
export const mockStats: DashboardStats = {
  admin: {
    totalStudents: 1254,
    totalTeachers: 45,
    activeCourses: 32,
    revenue: 45000,
  },
  teacher: {
    activeClasses: 5,
    pendingGrades: 12,
    totalStudents: 285,
    upcomingLectures: 3,
  },
  student: {
    activeCourses: 2,
    completedCourses: 1,
    pendingActivities: 3,
    averageGrade: 8.75,
  }
};
