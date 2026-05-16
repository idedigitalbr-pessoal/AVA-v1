export type NotificationType = "ATIVIDADE" | "QUIZ" | "PROVA" | "FINANCEIRO" | "AVISO" | "MENSAGEM" | "CERTIFICADO" | "SISTEMA";

export interface StudentNotification {
  id: string;
  title: string;
  description: string;
  type: NotificationType;
  date: string; // ISO string or relative time placeholder just for display mock
  isRead: boolean;
  link?: string;
}

export const MOCK_NOTIFICATIONS: StudentNotification[] = [
  {
    id: "notif-1",
    title: "Nova Atividade Disponível",
    description: "A lista de exercícios 'Comandos DML' já está disponível na disciplina de Banco de Dados I.",
    type: "ATIVIDADE",
    date: "Hoje, 10:30",
    isRead: false,
    link: "/portal/aluno/cursos/1",
  },
  {
    id: "notif-2",
    title: "Vencimento Próximo",
    description: "Sua mensalidade de Maio vence em 3 dias.",
    type: "FINANCEIRO",
    date: "Hoje, 08:00",
    isRead: false,
    link: "/portal/aluno/financeiro",
  },
  {
    id: "notif-3",
    title: "Quiz Avaliativo Aberto",
    description: "O Quiz 2 de Lógica de Programação foi liberado para acesso.",
    type: "QUIZ",
    date: "Ontem, 19:45",
    isRead: false,
    link: "/portal/aluno/cursos/2",
  },
  {
    id: "notif-4",
    title: "Novo Aviso da Coordenação",
    description: "Confira o novo comunicado sobre o período de provas parciais.",
    type: "AVISO",
    date: "Ontem, 14:20",
    isRead: true,
    link: "/portal/aluno/avisos",
  },
  {
    id: "notif-5",
    title: "Nota Lançada",
    description: "A nota do seu 'Trabalho Bimestral' de Sistemas Web já está no sistema.",
    type: "PROVA",
    date: "14 de Maio",
    isRead: true,
    link: "/portal/aluno/boletim",
  },
  {
    id: "notif-6",
    title: "Nova Mensagem",
    description: "O Prof. Carlos Silva respondeu a sua dúvida no fórum.",
    type: "MENSAGEM",
    date: "13 de Maio",
    isRead: true,
  },
  {
    id: "notif-7",
    title: "Certificado Disponível",
    description: "Seu certificado de conclusão do curso 'Introdução ao Git' já pode ser emitido.",
    type: "CERTIFICADO",
    date: "10 de Maio",
    isRead: true,
  },
  {
    id: "notif-8",
    title: "Atualização no Sistema",
    description: "O AVA foi atualizado para a versão 2.4 com novas funcionalidades.",
    type: "SISTEMA",
    date: "05 de Maio",
    isRead: true,
  }
];
