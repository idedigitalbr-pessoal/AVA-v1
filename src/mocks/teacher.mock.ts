import { 
  TeacherDashboardData, TeacherClassSubject, TeacherClassOverviewData, 
  TeacherClassStudent, TeacherClassStudentDetail, TeacherAssessment, TeacherAssessmentAttempt, 
  TeacherBankQuestion, TeacherClassPerformanceReport, TeacherClassAttendanceReport, 
  TeacherClassEngagementReport, TeacherAtRiskReport 
} from '@/types';

// Dashboard Mocks
export const mockTeacherDashboard: TeacherDashboardData = {
  stats: {
    activeClasses: 5,
    totalStudents: 285,
    pendingGrades: 12,
    pendingQuizzes: 8,
    unreadMessages: 14,
    publishedClasses: 42,
    draftClasses: 3,
    pendingAttendance: 2,
    upcomingLectures: 3,
  },
  nextClass: {
    id: 'lc1',
    title: 'Estrutura de Dados em C',
    courseName: 'Engenharia de Software',
    className: 'Turma A - 2026',
    time: '19:00',
    type: 'ONLINE'
  },
  todaySchedule: [
    { id: 'ls1', title: 'Estrutura de Dados em C', courseName: 'Engenharia de Software', className: 'Turma A - 2026', time: '19:00 - 20:40', type: 'ONLINE' },
    { id: 'ls2', title: 'Lógica Básica', courseName: 'Sistemas de Informação', className: 'Turma C - 2026', time: '21:00 - 22:40', type: 'PRESENCIAL' }
  ],
  pendingTasks: [
    { id: 'pt1', title: 'Corrigir Prova P1', type: 'GRADE', courseName: 'Engenharia de Software', dueDate: 'Hoje' },
    { id: 'pt2', title: 'Frequência não lançada', type: 'ATTENDANCE', courseName: 'Sistemas de Informação', dueDate: 'Ontem' },
    { id: 'pt3', title: 'Mensagem de Carlos Silva', type: 'MESSAGE', courseName: 'Engenharia de Software', dueDate: '2 horas atrás' },
    { id: 'pt4', title: 'Aula 4: Árvores Binárias (Revisar)', type: 'DRAFT', courseName: 'Engenharia de Software' },
  ],
  coursesProgress: [
    { id: 'c1', courseName: 'Engenharia de Software', className: 'Turma A', totalStudents: 30, publishedClasses: 12, totalClasses: 20, pendingSubmissions: 5, averageGrade: 7.8 },
    { id: 'c2', courseName: 'Sistemas de Informação', className: 'Turma C', totalStudents: 40, publishedClasses: 5, totalClasses: 25, pendingSubmissions: 0, averageGrade: 8.1 },
  ],
  alerts: [
    { id: 'al1', title: 'Alunos em Risco de Reprovação', description: '3 alunos na Turma A estão com média abaixo de 5.0.', type: 'DANGER' },
    { id: 'al2', title: 'Baixo Engajamento', description: 'A Turma C teve apenas 40% de presença na última aula.', type: 'WARNING' },
    { id: 'al3', title: 'Módulo Sem Conteúdo', description: 'O Módulo 3 de "Estrutura de Dados" ainda não possui aulas publicadas.', type: 'INFO' }
  ]
};

// Class Subjects
export const mockTeacherClassSubjects: TeacherClassSubject[] = [
  {
    id: 'cs1',
    subjectName: 'Estrutura de Dados em C',
    courseName: 'Engenharia de Software',
    className: 'Turma A',
    academicYear: '2026.1',
    totalStudents: 30,
    totalModules: 4,
    publishedClasses: 12,
    draftClasses: 3,
    pendingActivities: 5,
    averageGrade: 7.8,
    progressPercentage: 60,
    status: 'ACTIVE'
  },
  {
    id: 'cs2',
    subjectName: 'Lógica de Programação',
    courseName: 'Sistemas de Informação',
    className: 'Turma C',
    academicYear: '2026.1',
    totalStudents: 40,
    totalModules: 5,
    publishedClasses: 5,
    draftClasses: 0,
    pendingActivities: 2,
    averageGrade: 8.1,
    progressPercentage: 20,
    status: 'ACTIVE'
  }
];

export const mockTeacherClassOverview: TeacherClassOverviewData = {
  classSubject: mockTeacherClassSubjects[0],
  metrics: {
    averageAttendance: 85,
    unreadMessages: 3,
    studentsAtRisk: 2,
    completedLessonsByStudents: 245,
    nextRecommendedAction: 'Publicar Aula 5 do Módulo 2',
  },
  studentsAtRiskList: [
    { studentId: 'stu1', studentName: 'João Pedro', reason: 'Baixa Frequência (60%)', actionType: 'MESSAGE' },
    { studentId: 'stu2', studentName: 'Maria Silva', reason: 'Média abaixo de 5.0 nas atividades', actionType: 'GRADE' },
  ],
  recentActivities: [
    { id: 'act1', title: 'Prova P1 - Entrega de Maria', type: 'SUBMISSION', date: 'Há 1 hora', description: 'Nota pendente' },
    { id: 'act2', title: 'Dúvida: Ponteiros em C', type: 'MESSAGE', date: 'Há 3 horas', description: 'João Pedro enviou uma dúvida na Aula 3' },
    { id: 'act3', title: 'Aula 4: Alocação Dinâmica', type: 'CONTENT', date: 'Ontem', description: 'Conteúdo programado foi publicado' },
  ],
  notices: [
    { id: 'not1', title: 'Data da Prova P1', content: 'A nossa Prova 1 será no dia 25/05. O conteúdo inclui até o módulo 3.', date: '10/05/2026', author: 'Prof. Carlos Mendes' }
  ]
};

// Students
export const mockTeacherClassStudents: TeacherClassStudent[] = [
  { id: 'e1', studentId: 's1', name: 'João Silva', registration: '2023001', email: 'joao.silva@aluno.edu.br', status: 'ACTIVE', riskStatus: 'NONE', contentProgress: 85, currentAverage: 8.5, attendancePct: 90, lastAccess: new Date(Date.now() - 86400000).toISOString(), pendingActivitiesCount: 1 },
  { id: 'e2', studentId: 's2', name: 'Maria Oliveira', registration: '2023002', email: 'maria.oliveira@aluno.edu.br', status: 'ACTIVE', riskStatus: 'LOW', contentProgress: 70, currentAverage: 7.0, attendancePct: 80, lastAccess: new Date(Date.now() - 86400000 * 3).toISOString(), pendingActivitiesCount: 2 },
  { id: 'e3', studentId: 's3', name: 'Pedro Costa', registration: '2023003', email: 'pedro.costa@aluno.edu.br', status: 'ACTIVE', riskStatus: 'HIGH', contentProgress: 40, currentAverage: 4.5, attendancePct: 60, lastAccess: new Date(Date.now() - 86400000 * 10).toISOString(), pendingActivitiesCount: 5 }
];

export const mockTeacherStudentDetail: TeacherClassStudentDetail = {
  ...mockTeacherClassStudents[0],
  grades: [ { title: 'Prova 1', score: 8.5, maxScore: 10, date: new Date().toISOString() } ],
  attendanceDates: [ { date: new Date().toISOString(), present: true } ],
  activities: [ { title: 'Trabalho de Pesquisa', status: 'GRADED', score: 9, maxScore: 10, dueDate: new Date().toISOString() } ],
  messages: [ { id: 'm1', sender: 'TEACHER', text: 'Bom trabalho na prova.', date: new Date().toISOString() } ],
  accessHistory: [ { date: new Date().toISOString(), action: 'Visualizou conteúdo X' } ]
};

// Modules
export const mockTeacherModules = [
  {
    id: 'mod1', title: 'Módulo 1: Introdução ao C', order: 1,
    lessons: [
      { id: 'less1', moduleId: 'mod1', title: 'Estrutura Básica de um Programa', content: 'Nesta aula...', videoUrl: 'https://youtube.com', duration: 15, order: 1, status: 'PUBLISHED', isMandatory: true, attachments: [{ id: 'att1', name: 'Slides da Aula', url: '#', type: 'PDF' }] }
    ]
  }
];

// Gradebook
export const mockTeacherGradebook = {
  classSubjectId: 'cs1',
  assessments: [
    { id: 'a1', name: 'Atividade 1', type: 'ACTIVITY', weight: 1, maxGrade: 10, status: 'PUBLISHED' },
    { id: 'a3', name: 'Prova P1', type: 'EXAM', weight: 4, maxGrade: 10, status: 'PUBLISHED' },
  ],
  students: [
    { studentId: 's1', studentName: 'João Silva', email: 'joao@aluno.edu.br', grades: { 'a1': 8, 'a3': 7.5 }, finalGrade: 8.0, situation: 'EM_ANDAMENTO' }
  ]
};

// Attendance
export const mockTeacherAttendance = {
  classSubjectId: 'cs1',
  sessions: [
    {
      id: 'sess1', classSubjectId: 'cs1', date: new Date().toISOString().split('T')[0], topic: 'Estrutura Básica de um Programa', isSaved: true,
      records: [ { studentId: 's1', studentName: 'João Silva', status: 'PRESENT', attendancePercentage: 90 } ]
    }
  ],
  students: [ { studentId: 's1', studentName: 'João Silva', attendancePercentage: 90 } ]
};

// Messages
export const mockTeacherCommunication = {
  classSubjectId: 'cs1',
  threads: [
    {
      id: 'th1', studentId: 's1', studentName: 'João Silva', subject: 'Dúvida sobre a lista de exercícios', lastMessageDate: new Date().toISOString(), status: 'UNREAD',
      messages: [ { id: 'msg1', senderId: 's1', senderName: 'João Silva', senderRole: 'STUDENT', content: 'Professor, não consegui entender a questão 3.', date: new Date().toISOString() } ]
    }
  ],
  announcements: [
    { id: 'ann1', title: 'Bem-vindos!', content: 'Olá turma...', date: new Date(Date.now() - 86400000 * 5).toISOString(), authorName: 'Prof. Mendes' }
  ]
};

// Questions
export const mockTeacherQuestions: TeacherBankQuestion[] = [
  { id: 'q1', subjectId: 'sub1', subjectName: 'Estrutura de Dados', text: 'O que é um ponteiro?', type: 'ESSAY', difficulty: 'EASY', status: 'PUBLISHED', tags: ['Ponteiros'], expectedAnswer: 'É uma variável que guarda endereço de memória.' }
];

// Assessments
export const mockTeacherAssessments: TeacherAssessment[] = [
  { id: 'asm1', classSubjectId: 'cs1', title: 'Prova Bimestral 1', type: 'EXAM', description: 'Primeira prova do bimestre.', dueDate: new Date(Date.now() + 86400000 * 10).toISOString(), timeLimit: 90, maxAttempts: 1, weight: 3, maxScore: 100, status: 'PUBLISHED', shuffleQuestions: false, questionIds: ['q1'], createdAt: new Date().toISOString() }
];

// Reports
export const mockTeacherPerformanceReport: TeacherClassPerformanceReport = {
  averageGrade: 7.8, highestGrade: 10, lowestGrade: 3.5, passingRate: 85, studentsCount: 35,
  gradeDistribution: [ { range: '9-10', count: 8 }, { range: '7-8.9', count: 18 }, { range: '5-6.9', count: 6 }, { range: '0-4.9', count: 3 } ],
  recentAssessments: [ { title: 'Prova Bimestral', average: 7.2, maxScore: 10, date: new Date().toISOString() } ]
};

export const mockTeacherAttendanceReport: TeacherClassAttendanceReport = {
  averageAttendancePct: 88, perfectAttendanceCount: 12, lowAttendanceCount: 4, totalSessions: 20,
  attendanceByDate: [ { date: new Date().toISOString(), presentCount: 32, absentCount: 3 } ]
};

export const mockTeacherEngagementReport: TeacherClassEngagementReport = {
  averageAccessPerWeek: 4.5, activeStudents: 32, inactiveStudents: 3, totalInteractions: 450,
  topActiveStudents: [ { name: 'Ana Souza', accesses: 28 }, { name: 'Roberto Carlos', accesses: 25 } ]
};

export const mockTeacherAtRiskReport: TeacherAtRiskReport = {
  totalAtRisk: 5, highRisk: 2, mediumRisk: 2, lowRisk: 1,
  students: [ { id: 's3', name: 'Pedro Costa', registration: '2023003', riskLevel: 'HIGH', reason: 'Frequência abaixo de 75%' } ]
};
