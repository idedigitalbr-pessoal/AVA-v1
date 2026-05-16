export type ExamStatus = 
  | "DISPONIVEL" 
  | "AGENDADA" 
  | "EM_ANDAMENTO" 
  | "CONCLUIDA" 
  | "EXPIRADA" 
  | "BLOQUEADA";

export interface ExamQuestion {
  id: string;
  text: string;
  options: string[];
  correctAnswerIndex?: number;
}

export interface Exam {
  id: string;
  title: string;
  discipline: string;
  durationMinutes: number;
  totalQuestions: number;
  startDate: string;
  endDate: string;
  status: ExamStatus;
  score?: number;
  maxScore: number;
  scheduledDate?: string;
  questions?: ExamQuestion[];
  instructions: string[];
}

export const MOCK_EXAMS: Exam[] = [
  {
    id: "exam-1",
    title: "Prova P1",
    discipline: "Banco de Dados I",
    durationMinutes: 90,
    totalQuestions: 10,
    startDate: "10/05/2026 08:00",
    endDate: "20/05/2026 23:59",
    status: "DISPONIVEL",
    maxScore: 10,
    instructions: [
      "Você tem 90 minutos para concluir a prova.",
      "A prova contém 10 questões de múltipla escolha.",
      "Você não poderá pausar o tempo após iniciar.",
      "Certifique-se de ter uma conexão estável à internet."
    ],
    questions: [
      {
        id: "q1",
        text: "Qual a função do comando SELECT no SQL?",
        options: ["Inserir dados", "Deletar dados", "Consultar dados", "Atualizar tabelas"],
        correctAnswerIndex: 2
      },
      {
        id: "q2",
        text: "O que é uma chave primária (Primary Key)?",
        options: [
          "Uma chave que codifica todos os dados da tabela",
          "Um campo criptografado",
          "Um identificador único para cada registro na tabela",
          "Uma chave estrangeira que vem de outra tabela"
        ],
        correctAnswerIndex: 2
      },
      {
        id: "q3",
        text: "O que o acrônimo SGBD significa?",
        options: [
          "Sistema Global de Bancos Diretos",
          "Sistema Gerenciador de Banco de Dados",
          "Serviço de Gestão de Bases Dinâmicas",
          "Sistema Gráfico de Banco de Dados"
        ],
        correctAnswerIndex: 1
      }
    ]
  },
  {
    id: "exam-2",
    title: "Prova P2",
    discipline: "Engenharia de Software",
    durationMinutes: 120,
    totalQuestions: 15,
    startDate: "18/05/2026 08:00",
    endDate: "25/05/2026 23:59",
    status: "AGENDADA",
    scheduledDate: "20/05/2026 14:00",
    maxScore: 10,
    instructions: [
      "Esta prova será monitorada (ambiente online).",
      "Qualquer tentativa de fraude resultará em bloqueio."
    ]
  },
  {
    id: "exam-3",
    title: "Avaliação Final",
    discipline: "Redes de Computadores",
    durationMinutes: 60,
    totalQuestions: 10,
    startDate: "01/05/2026 08:00",
    endDate: "05/05/2026 23:59",
    status: "CONCLUIDA",
    score: 8.5,
    maxScore: 10,
    instructions: []
  },
  {
    id: "exam-4",
    title: "Avaliação P1",
    discipline: "Estrutura de Dados",
    durationMinutes: 90,
    totalQuestions: 10,
    startDate: "01/04/2026 08:00",
    endDate: "10/04/2026 23:59",
    status: "EXPIRADA",
    maxScore: 10,
    instructions: []
  },
  {
    id: "exam-5",
    title: "Prova P1",
    discipline: "Programação Orientada a Objetos",
    durationMinutes: 120,
    totalQuestions: 15,
    startDate: "20/05/2026 08:00",
    endDate: "30/05/2026 23:59",
    status: "BLOQUEADA",
    maxScore: 10,
    instructions: [
      "Acesso bloqueado por inadimplência. Procure o financeiro."
    ]
  }
];
