export type PerformanceStatus = "EXCELENTE" | "BOM" | "ATENCAO" | "CRITICO";

export interface DisciplinePerformance {
  id: string;
  name: string;
  professor: string;
  progress: number;
  grade: number;
  attendance: number;
  status: PerformanceStatus;
  completedActivities: number;
  totalActivities: number;
  pendingActivities: number;
}

export interface RecentGrade {
  id: string;
  discipline: string;
  activityName: string;
  grade: number;
  date: string;
}

export interface AcademicPerformance {
  gpa: number;
  attendance: number;
  courseProgress: number;
  totalCompletedActivities: number;
  totalPendingActivities: number;
  totalQuizzes: number;
  disciplines: DisciplinePerformance[];
  recentGrades: RecentGrade[];
  recommendations: string[];
}

export const MOCK_PERFORMANCE: AcademicPerformance = {
  gpa: 8.2,
  attendance: 86,
  courseProgress: 45,
  totalCompletedActivities: 34,
  totalPendingActivities: 5,
  totalQuizzes: 12,
  disciplines: [
    {
      id: "disc-1",
      name: "Banco de Dados I",
      professor: "Prof. Carlos Silva",
      progress: 80,
      grade: 8.5,
      attendance: 95,
      status: "EXCELENTE",
      completedActivities: 10,
      totalActivities: 12,
      pendingActivities: 2,
    },
    {
      id: "disc-2",
      name: "Engenharia de Software",
      professor: "Profa. Mariana Costa",
      progress: 60,
      grade: 6.5,
      attendance: 80,
      status: "ATENCAO",
      completedActivities: 6,
      totalActivities: 10,
      pendingActivities: 2,
    },
    {
      id: "disc-3",
      name: "Estrutura de Dados",
      professor: "Prof. Roberto Almeida",
      progress: 90,
      grade: 9.0,
      attendance: 100,
      status: "EXCELENTE",
      completedActivities: 11,
      totalActivities: 12,
      pendingActivities: 1,
    },
    {
      id: "disc-4",
      name: "Redes de Computadores",
      professor: "Prof. João Pedro",
      progress: 30,
      grade: 4.5,
      attendance: 72,
      status: "CRITICO",
      completedActivities: 5,
      totalActivities: 10,
      pendingActivities: 5,
    }
  ],
  recentGrades: [
    { id: "rg-1", discipline: "Banco de Dados I", activityName: "Projeto 1", grade: 8.5, date: "12/05/2026" },
    { id: "rg-2", discipline: "Estrutura de Dados", activityName: "Lista 3", grade: 10.0, date: "10/05/2026" },
    { id: "rg-3", discipline: "Redes de Computadores", activityName: "Prova P1", grade: 4.5, date: "05/05/2026" },
    { id: "rg-4", discipline: "Engenharia de Software", activityName: "Seminário", grade: 6.5, date: "02/05/2026" },
  ],
  recommendations: [
    "Atenção urgente em Redes de Computadores: sua média está abaixo da média e as faltas estão se acumulando. Sugerimos agendar mentoria.",
    "Engenharia de Software: Tente focar mais nas próximas duas atividades para elevar sua nota.",
    "Ótimo trabalho em Estrutura de Dados e Banco de Dados! Continue assim."
  ]
};
