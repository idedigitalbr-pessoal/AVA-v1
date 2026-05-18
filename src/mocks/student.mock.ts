import { 
  StudentDashboardData, 
  StudentCourse, 
  StudentModule, 
  StudentActivityDetail, 
  StudentGradebookEntry,
  StudentCalendarEvent,
  StudentMessageThread,
  StudentNotice,
  StudentFinancialSummary,
  StudentSupportTicket
} from "@/types";

export const mockStudentDashboardData: StudentDashboardData = {
  stats: {
    activeCourses: 3,
    completedCourses: 1,
    pendingActivities: 2,
    averageGrade: 8.5
  },
  lastAccessedLesson: {
    id: "l1",
    title: "Estruturas de Repetição (While, For)",
    subject: "Lógica de Programação",
    courseId: "c1",
    progress: 85,
    duration: "45 min"
  },
  overdueActivities: [
    {
      id: "a1",
      title: "Lista 02 - Normalização",
      subject: "Banco de Dados I",
      courseId: "c2",
      daysOverdue: 2
    }
  ],
  pendingQuizzes: [
    {
      id: "q1",
      title: "Avaliação Parcial 1",
      subject: "Lógica de Programação",
      courseId: "c1",
      dueDate: "Amanhã, 23:59"
    }
  ],
  announcements: [
    { id: "an1", title: "Semana de Provas - 1º Bimestre", date: "15/05", type: "Importante" },
    { id: "an2", title: "Palestra: Carreira em Tech", date: "12/05", type: "Evento" }
  ],
  courseProgress: 35,
  courseName: "Análise e Desenvolvimento de Sistemas",
  campaigns: [
    {
      id: "camp-1",
      title: "Semana Acadêmica 2026",
      description: "Participe das palestras e workshops com profissionais do mercado. Vagas limitadas!",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60",
      link: "/portal/aluno/eventos/semana-academica",
      actionText: "Inscreva-se",
      important: true,
      color: "from-indigo-600 to-purple-700",
      tag: "Evento Especial"
    },
    {
      id: "camp-2",
      title: "Desconto Rematrícula Antecipada",
      description: "Garanta 15% de desconto na rematrícula até dia 30/05.",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&auto=format&fit=crop&q=60",
      link: "/portal/aluno/financeiro",
      actionText: "Acessar Boleto",
      tag: "Financeiro"
    }
  ],
  leftShortcuts: [
    { id: "s1", title: "Minhas Disciplinas", icon: "BookOpen", link: "/portal/aluno/disciplinas", color: "bg-indigo-500" },
    { id: "s2", title: "Calendário", icon: "Calendar", link: "/portal/aluno/calendario", color: "bg-emerald-500" },
    { id: "s3", title: "Financeiro", icon: "Briefcase", link: "/portal/aluno/financeiro", color: "bg-amber-500" },
    { id: "s4", title: "Atendimento", icon: "LifeBuoy", link: "/portal/aluno/atendimento", color: "bg-rose-500" }
  ],
  rightShortcuts: [
    { id: "rs1", title: "Biblioteca Virtual", icon: "BookOpen", link: "/portal/aluno/biblioteca", color: "text-indigo-600", bgColor: "bg-indigo-50" },
    { id: "rs2", title: "Documentos", icon: "FileText", link: "/portal/aluno/documentos", color: "text-slate-600", bgColor: "bg-slate-50" },
    { id: "rs3", title: "Histórico Escolar", icon: "GraduationCap", link: "/portal/aluno/boletim", color: "text-emerald-600", bgColor: "bg-emerald-50" }
  ]
};

export const mockStudentCourses: StudentCourse[] = [
  {
    id: "c1",
    name: "Lógica de Programação",
    courseCode: "INFO101",
    period: "2026.1",
    teacherName: "Prof. Carlos Silva",
    progress: 35,
    totalModules: 5,
    completedLessons: 12,
    totalLessons: 40,
    nextLesson: { id: "l1", title: "Estruturas de Repetição (While, For)", type: 'VIDEO' },
    status: 'IN_PROGRESS',
    pendingActivities: 2
  },
  {
    id: "c2",
    name: "Banco de Dados I",
    courseCode: "BDAO202",
    period: "2026.1",
    teacherName: "Prof. Maria Lima",
    progress: 80,
    totalModules: 4,
    completedLessons: 20,
    totalLessons: 25,
    nextLesson: { id: "l2", title: "Modelo Entidade-Relacionamento", type: 'VIDEO' },
    status: 'IN_PROGRESS',
    pendingActivities: 1
  },
  {
    id: "c3",
    name: "Redes de Computadores",
    courseCode: "REDS301",
    period: "2026.1",
    teacherName: "Prof. João Pedro",
    progress: 100,
    totalModules: 3,
    completedLessons: 15,
    totalLessons: 15,
    status: 'COMPLETED',
    pendingActivities: 0
  },
  {
    id: "c4",
    name: "Estrutura de Dados",
    courseCode: "ESTR205",
    period: "2026.1",
    teacherName: "Prof. Roberto Almeida",
    progress: 0,
    totalModules: 5,
    completedLessons: 0,
    totalLessons: 30,
    status: 'NOT_STARTED',
    pendingActivities: 0
  }
];

export const mockStudentModules: StudentModule[] = [
  {
    id: "m1",
    title: "Módulo 1: Introdução",
    order: 1,
    lessons: [
      { id: "l1", moduleId: "m1", title: "O que é Lógica de Programação?", type: "VIDEO", duration: 15, order: 1, isMandatory: true, status: "COMPLETED", progress: 100 },
      { id: "l2", moduleId: "m1", title: "Algoritmos e Fluxogramas", type: "TEXT", order: 2, isMandatory: true, status: "COMPLETED", progress: 100 }
    ]
  },
  {
    id: "m2",
    title: "Módulo 2: Estruturas Condicionais",
    order: 2,
    lessons: [
      { id: "l3", moduleId: "m2", title: "IF / ELSE", type: "VIDEO", duration: 20, order: 1, isMandatory: true, status: "IN_PROGRESS", progress: 60 },
      { id: "l4", moduleId: "m2", title: "Switch Case", type: "VIDEO", duration: 18, order: 2, isMandatory: true, status: "PENDING", progress: 0 },
      { id: "l5", moduleId: "m2", title: "Exercícios de Fixação", type: "QUIZ", order: 3, isMandatory: true, status: "PENDING", progress: 0 }
    ]
  }
];

export const mockStudentActivities: StudentActivityDetail[] = [
  { id: "act1", courseId: "c1", courseName: "Lógica de Programação", title: "Lista 01", description: "Resolver os exercícios de fixação do Módulo 1.", type: "ASSIGNMENT", dueDate: new Date(Date.now() + 86400000 * 5).toISOString(), maxScore: 10, status: "PENDING" },
  { id: "act2", courseId: "c2", courseName: "Banco de Dados I", title: "Projeto Conceitual", description: "Criar o modelo ER de uma biblioteca.", type: "ASSIGNMENT", dueDate: new Date(Date.now() - 86400000 * 2).toISOString(), maxScore: 20, status: "OVERDUE" },
  { id: "act3", courseId: "c1", courseName: "Lógica de Programação", title: "Quiz de Condicionais", description: "Questionário automático de IF/ELSE", type: "QUIZ", dueDate: new Date(Date.now() + 86400000 * 3).toISOString(), maxScore: 10, status: "PENDING" },
  { id: "act4", courseId: "c2", courseName: "Banco de Dados I", title: "Prova N1", description: "Prova online.", type: "QUIZ", dueDate: new Date(Date.now() - 86400000 * 10).toISOString(), maxScore: 100, status: "GRADED", score: 85 }
];

export const mockStudentGradebook: StudentGradebookEntry[] = [
  {
    subjectId: "c1",
    subjectName: "Lógica de Programação",
    teacherName: "Prof. Carlos Silva",
    grades: [
      { assessmentId: "1", assessmentName: "Bimestre 1", type: "B1", score: 80, maxScore: 100, weight: 1, feedback: "Muito bom, atenção aos laços" },
      { assessmentId: "2", assessmentName: "Bimestre 2", type: "B2", score: 90, maxScore: 100, weight: 1 }
    ],
    totalAbsences: 4,
    finalGrade: 85.0,
    status: 'EM_ANDAMENTO',
    attendancePercentage: 90
  },
  {
    subjectId: "c2",
    subjectName: "Banco de Dados I",
    teacherName: "Prof. Maria Lima",
    grades: [
      { assessmentId: "3", assessmentName: "Bimestre 1", type: "B1", score: 50, maxScore: 100, weight: 1, feedback: "Estudar álgebra relacional" },
      { assessmentId: "4", assessmentName: "Bimestre 2", type: "B2", score: 65, maxScore: 100, weight: 1 },
      { assessmentId: "5", assessmentName: "Recuperação B1", type: "REC", score: 70, maxScore: 100, weight: 1 }
    ],
    totalAbsences: 12,
    finalGrade: 67.5,
    status: 'RECUPERACAO',
    attendancePercentage: 75
  },
  {
    subjectId: "c3",
    subjectName: "Engenharia de Software",
    teacherName: "Profa. Mariana Costa",
    grades: [
      { assessmentId: "6", assessmentName: "Bimestre 1", type: "B1", score: 100, maxScore: 100, weight: 1 },
      { assessmentId: "7", assessmentName: "Bimestre 2", type: "B2", score: 95, maxScore: 100, weight: 1 }
    ],
    totalAbsences: 0,
    finalGrade: 97.5,
    status: 'APROVADO',
    attendancePercentage: 100
  }
];

export const mockStudentCalendar: StudentCalendarEvent[] = [
  { id: "cal1", title: "Aula: Estruturas de Dados", date: new Date().toISOString(), type: "AULA", courseName: "Lógica de Programação" },
  { id: "cal2", title: "Entrega do Projeto", date: new Date(Date.now() + 86400000 * 2).toISOString(), type: "ATIVIDADE", courseName: "Banco de Dados I" },
  { id: "cal3", title: "Prova N2", date: new Date(Date.now() + 86400000 * 7).toISOString(), type: "PROVA", courseName: "Banco de Dados I" }
];

export const mockStudentMessages: StudentMessageThread[] = [
  {
    id: "msg1",
    subject: "Dúvida na Lista de Exercícios",
    teacherName: "Prof. Carlos Silva",
    lastMessageDate: new Date(Date.now() - 86400000).toISOString(),
    status: "REPLIED",
    messages: [
      { id: "m1", senderId: "stu", senderName: "Você", senderRole: "STUDENT", content: "Professor, como faço o for dentro do while?", date: new Date(Date.now() - 172800000).toISOString() },
      { id: "m2", senderId: "prof", senderName: "Prof. Carlos", senderRole: "TEACHER", content: "Você precisa inicializar a variável interna...", date: new Date(Date.now() - 86400000).toISOString() }
    ]
  }
];

export const mockStudentNotices: StudentNotice[] = [
  { id: "nt1", title: "Semana de Provas!", content: "As provas N1 começarão dia 20/05.", authorName: "Coordenação", date: new Date().toISOString(), isRead: false },
  { id: "nt2", title: "Material extra", courseName: "Lógica de Programação", content: "Postei exercícios no módulo.", authorName: "Carlos Silva", date: new Date(Date.now() - 86400000).toISOString(), isRead: true }
];

export const mockStudentFinancial: StudentFinancialSummary = {
  status: 'LATE',
  nextBill: { id: "b1", amount: 850.00, dueDate: new Date(Date.now() + 86400000 * 5).toISOString(), description: "Mensalidade Maio/2026" },
  invoices: [
    { id: "i1", description: "Mensalidade Janeiro/2026", competency: "Jan/2026", amount: 850.00, dueDate: new Date(new Date().getFullYear(), 0, 10).toISOString(), status: "PAID", paidAt: new Date(new Date().getFullYear(), 0, 9).toISOString(), paymentMethod: "CARTÃO", invoiceUrl: "#" },
    { id: "i2", description: "Mensalidade Fevereiro/2026", competency: "Fev/2026", amount: 850.00, dueDate: new Date(new Date().getFullYear(), 1, 10).toISOString(), status: "PAID", paidAt: new Date(new Date().getFullYear(), 1, 10).toISOString(), paymentMethod: "PIX", invoiceUrl: "#" },
    { id: "i3", description: "Mensalidade Março/2026", competency: "Mar/2026", amount: 850.00, dueDate: new Date(new Date().getFullYear(), 2, 10).toISOString(), status: "LATE", invoiceUrl: "#" },
    { id: "i4", description: "Mensalidade Abril/2026", competency: "Abr/2026", amount: 850.00, dueDate: new Date(new Date().getFullYear(), 3, 10).toISOString(), status: "NEGOTIATED", invoiceUrl: "#" },
    { id: "i5", description: "Mensalidade Maio/2026", competency: "Mai/2026", amount: 850.00, dueDate: new Date(new Date().getFullYear(), 4, 10).toISOString(), status: "PENDING", invoiceUrl: "#" },
    { id: "i6", description: "Mensalidade Junho/2026", competency: "Jun/2026", amount: 850.00, dueDate: new Date(new Date().getFullYear(), 5, 10).toISOString(), status: "PENDING", invoiceUrl: "#" }
  ]
};

export const mockStudentSupport: StudentSupportTicket[] = [
  { id: "t1", subject: "Problema no acesso à aula gravada", category: "TI", status: "RESOLVED", createdAt: new Date(Date.now() - 86400000 * 5).toISOString(), lastUpdateAt: new Date(Date.now() - 86400000 * 4).toISOString() },
  { id: "t2", subject: "Dúvida sobre boleto", category: "Financeiro", status: "OPEN", createdAt: new Date(Date.now() - 86400000 * 1).toISOString(), lastUpdateAt: new Date(Date.now() - 86400000 * 1).toISOString() }
];

import { AvailableService, Protocol } from "@/features/aluno/services/types";

import { StudyStep } from "@/features/aluno/study-guide/types";
import { AcademicPerformance } from "@/features/aluno/performance/types";
import { ExamStatus, Exam, ExamQuestion } from "@/features/aluno/exams/types";

export const mockPerformance: AcademicPerformance = {
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

export const mockStudySteps: StudyStep[] = [
  {
    id: "step-1",
    title: "Primeiros passos na plataforma",
    description: "Entenda a estrutura do seu painel principal e como navegar pelos atalhos mais importantes do AVA.",
    iconType: "laptop",
    durationMinutes: 5,
    tips: ["Verifique as notificações no canto superior direito.", "Personalize seu perfil para facilitar a comunicação.", "Use os atalhos rápidos da Home."]
  },
  {
    id: "step-2",
    title: "Como acessar disciplinas",
    description: "Saiba como encontrar os materiais, plano de ensino e a bibliografia das matérias em que você está matriculado(a).",
    iconType: "book",
    durationMinutes: 3,
    tips: ["Acesse Menu > Minhas Disciplinas.", "Fique atento ao progresso de cada disciplina.", "Sempre leia o Plano de Ensino antes de começar."]
  },
  {
    id: "step-3",
    title: "Assistindo às aulas",
    description: "Aprenda a reproduzir as videoaulas, ativar legendas, mudar a velocidade e acompanhar seu progresso no player.",
    iconType: "video",
    durationMinutes: 4,
    tips: ["O progresso é salvo automatically a cada minuto.", "Use o modo PiP para fazer anotações.", "Aulas ao vivo ficam gravadas."]
  },
  {
    id: "step-4",
    title: "Envio de atividades",
    description: "Veja como funciona o painel de submissão, formatos aceitos e como ler a correção enviada pelo professor.",
    iconType: "file",
    durationMinutes: 6,
    tips: ["Sempre confira se o arquivo anexado é o correto.", "Respeite as datas de entrega (evite atrasos)."]
  },
  {
    id: "step-5",
    title: "Respondendo aos Quizzes",
    description: "Entenda a mecânica dos questionários de fixação, tempo de prova e como funciona o número de tentativas.",
    iconType: "check",
    durationMinutes: 4,
    tips: ["Leia atentamente o enunciado de cada questão.", "Só clique em 'Finalizar' quando tiver certeza."]
  },
  {
    id: "step-6",
    title: "Acompanhando notas (Boletim)",
    description: "Onde consultar suas avaliações, visualizar a média calculada e checar os feedbacks individuais da mentoria.",
    iconType: "chart",
    durationMinutes: 3,
    tips: ["Acesse Menu > Meu Desempenho ou Boletim.", "A média geral precisa ser superior a 7,0."]
  },
  {
    id: "step-7",
    title: "Uso do Calendário",
    description: "Mantenha-se organizado! O calendário vai te lembrar das datas de provas, férias, eventos e vencimentos.",
    iconType: "calendar",
    durationMinutes: 5,
    tips: ["Sincronize o calendário do portal com o do seu celular.", "Filtre os eventos para focar no que importa."]
  },
  {
    id: "step-8",
    title: "Falar com Atendimento",
    description: "Precisa de ajuda? Mostramos como abrir um chamado para a secretaria, setor financeiro ou suporte técnico.",
    iconType: "headset",
    durationMinutes: 3,
    tips: ["Descreva o problema com detalhes.", "Selecione o departamento correto para agilizar."]
  },
  {
    id: "step-9",
    title: "Organização Semanal",
    description: "Recomendações finais para organizar seus horários, fazer anotações eficientes e evitar a procrastinação.",
    iconType: "brain",
    durationMinutes: 8,
    tips: ["Defina um horário fixo de estudos diariamente.", "Utilize a técnica Pomodoro (25/5)."]
  }
];

export const mockExams: Exam[] = [
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

import { Notice } from "@/features/aluno/notices/types";

export const mockNotices: Notice[] = [
  {
    id: "notice-1",
    title: "Período de Rematrícula 2024.2",
    description: "Fique atento aos prazos para rematrícula do próximo semestre.",
    content: "Prezados alunos,\n\nInformamos que o período de rematrícula para o semestre 2024.2 começará no dia 10 de junho e se encerrará no dia 30 de junho. Garanta sua vaga pagando a taxa com 10% de desconto até o dia 20 de junho.\n\nAtenciosamente,\nSecretaria Acadêmica",
    category: "INSTITUCIONAL",
    date: "15/05/2024",
    author: "Secretaria Acadêmica",
    priority: "ALTA",
    isRead: false,
  },
  {
    id: "notice-2",
    title: "Alteração no Calendário de Provas",
    description: "As provas parciais foram reagendadas para a próxima semana.",
    content: "Prezados,\n\nDevido ao feriado surpresa da cidade, as provas de Lógica de Programação e Banco de Dados que aconteceriam nesta sexta-feira foram movidas para a próxima quarta-feira, dia 22/05.\n\nBons estudos!",
    category: "CURSO",
    date: "12/05/2024",
    author: "Coordenação de ADS",
    priority: "ALTA",
    isRead: false,
  },
  {
    id: "notice-3",
    title: "Material Complementar Disponibilizado",
    description: "Lista de exercícios extras para a Próxima Avaliação.",
    content: "Olá turma, disponibilizei na plataforma uma nova lista de exercícios focada em JOINs e Subqueries para vocês treinarem para a prova. Confiram no módulo 4 da disciplina.\n\nAbraço,\nProf. Carlos",
    category: "DISCIPLINA",
    subject: "Banco de Dados I",
    date: "10/05/2024",
    author: "Prof. Carlos Silva",
    priority: "NORMAL",
    isRead: true,
  },
  {
    id: "notice-4",
    title: "Convite: Palestra Carreiras em Tech",
    description: "Participem da palestra com profissionais do mercado.",
    content: "Temos o prazer de convidá-los para a palestra 'O mercado de Tech em 2024', com participação de diretores do Google e Microsoft. O evento acontecerá online via meet na quinta-feira às 19h. Horas complementares: 4h.",
    category: "INSTITUCIONAL",
    date: "08/05/2024",
    author: "Central de Carreiras",
    priority: "NORMAL",
    isRead: true,
  },
  {
    id: "notice-5",
    title: "Manutenção do Ambiente Virtual",
    description: "O portal ficará instável durante a madrugada.",
    content: "Aviso: Nosso time de TI realizará uma manutenção programada de nossos servidores no próximo domingo da 00:00 às 04:00. O acesso ao AVA poderá apresentar instabilidades neste período.",
    category: "INSTITUCIONAL",
    date: "05/05/2024",
    author: "Suporte TI",
    priority: "BAIXA",
    isRead: true,
  }
];

export const mockAvailableServices: AvailableService[] = [
  { id: "svc-1", name: "Declaração de Matrícula", description: "Emissão de documento comprovando vínculo ativo com a instituição.", category: "DOCUMENTOS", estimatedDays: 1 },
  { id: "svc-2", name: "Histórico Acadêmico", description: "Emissão do histórico escolar detalhado com notas e frequências.", category: "DOCUMENTOS", estimatedDays: 2 },
  { id: "svc-3", name: "Regime Tutorial", description: "Solicitação de acompanhamento tutorial especial justificado.", category: "ACADEMICO", estimatedDays: 5 },
  { id: "svc-4", name: "Segunda Via de Documento", description: "Solicitação de 2ª via de documentos institucionais.", category: "DOCUMENTOS", estimatedDays: 7 },
  { id: "svc-5", name: "Revisão de Nota", description: "Solicitação de revisão de avaliação após divulgação do resultado.", category: "ACADEMICO", estimatedDays: 5 },
  { id: "svc-6", name: "Solicitação de Certificado", description: "Pedido de emissão de certificado de conclusão de curso ou atividade.", category: "DOCUMENTOS", estimatedDays: 15 },
  { id: "svc-7", name: "Alteração Cadastral", description: "Atualização de dados pessoais incompatíveis pelo portal.", category: "DIVERSOS", estimatedDays: 3 },
];

export const mockProtocols: Protocol[] = [
  {
    id: "prot-1",
    number: "2026105432",
    serviceId: "svc-1",
    serviceName: "Declaração de Matrícula",
    openedAt: "10/05/2026 14:30",
    updatedAt: "11/05/2026 09:15",
    status: "DEFERIDO",
    description: "Preciso da declaração para apresentar na empresa onde faço estágio.",
    history: [
      { id: "h1", date: "10/05/2026 14:30", status: "ABERTO", comment: "Solicitação recebida pelo sistema.", actor: "Sistema" },
      { id: "h2", date: "10/05/2026 15:00", status: "AGUARDANDO_ANALISE", comment: "Encaminhado para o setor de Registros Acadêmicos.", actor: "Sistema" },
      { id: "h3", date: "11/05/2026 09:15", status: "DEFERIDO", comment: "Declaração emitida e enviada para o e-mail do aluno.", actor: "Secretaria" }
    ]
  },
  {
    id: "prot-2",
    number: "2026105499",
    serviceId: "svc-5",
    serviceName: "Revisão de Nota",
    openedAt: "14/05/2026 10:00",
    updatedAt: "15/05/2026 11:20",
    status: "EM_ANDAMENTO",
    description: "Gostaria de solicitar a revisão da nota da Prova P1 de Banco de Dados, pois acredito que a questão 4 foi corrigida incorretamente.",
    history: [
      { id: "h1", date: "14/05/2026 10:00", status: "ABERTO", comment: "Solicitação recebida.", actor: "Sistema" },
      { id: "h2", date: "14/05/2026 16:30", status: "AGUARDANDO_ANALISE", comment: "Em análise preliminar pela coordenação.", actor: "Coordenação" },
      { id: "h3", date: "15/05/2026 11:20", status: "EM_ANDAMENTO", comment: "Encaminhado para o professor responsável (Carlos Silva).", actor: "Coordenação" }
    ]
  }
];

export const mockLessonQuestions = [
  { id: 1, user: "Carlos Silva", avatar: "CS", text: "Professora, como eu aplico esse conceito num banco NoSQL?", time: "2 dias atrás", isTeacher: false, replies: [
    { id: 101, user: "Profa. Angela", avatar: "AN", text: "Boa pergunta, Carlos! No NoSQL a modelagem muda bastante. Geralmente usamos documentos aninhados ao invés de relações. Dê uma olhada no material extra que anexei nesta aula.", time: "1 dia atrás", isTeacher: true }
  ]},
  { id: 2, user: "Mariana Costa", avatar: "MC", text: "O áudio do vídeo cortou no minuto 12:40, podem verificar?", time: "5 horas atrás", isTeacher: false, replies: [] }
];
