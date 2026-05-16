export type SupportDepartment = "SECRETARIA" | "FINANCEIRO" | "TI" | "COORDENACAO";
export type TicketStatus = "OPEN" | "IN_PROGRESS" | "CLOSED";

export interface SupportMessage {
  id: string;
  sender: "STUDENT" | "ATTENDANT" | "SYSTEM";
  text: string;
  timestamp: string;
  attendantName?: string;
  avatarUrl?: string;
}

export interface SupportTicket {
  id: string;
  subject: string;
  department: SupportDepartment;
  status: TicketStatus;
  createdAt: string;
  updatedAt: string;
  messages: SupportMessage[];
}

export const MOCK_TICKETS: SupportTicket[] = [
  {
    id: "tk-2024-001",
    subject: "Dúvida sobre renegociação de mensalidade",
    department: "FINANCEIRO",
    status: "IN_PROGRESS",
    createdAt: "15/05/2024",
    updatedAt: "16/05/2024",
    messages: [
      {
        id: "msg-1",
        sender: "STUDENT",
        text: "Olá, gostaria de saber se é possível parcelar a mensalidade deste mês em 2x no cartão, pois tive um imprevisto financeiro.",
        timestamp: "15/05/2024 14:30",
      },
      {
        id: "msg-2",
        sender: "ATTENDANT",
        text: "Olá Ana, tudo bem? Sim, podemos realizar o parcelamento em até 3x com acréscimo, ou 2x sem juros. Você prefere qual opção?",
        timestamp: "15/05/2024 15:45",
        attendantName: "Marcos (Financeiro)",
      },
      {
        id: "msg-3",
        sender: "STUDENT",
        text: "Pode ser em 2x sem juros. Como faço o pagamento?",
        timestamp: "16/05/2024 09:10",
      }
    ]
  },
  {
    id: "tk-2024-002",
    subject: "Erro ao acessar o módulo de atividades",
    department: "TI",
    status: "CLOSED",
    createdAt: "10/05/2024",
    updatedAt: "11/05/2024",
    messages: [
      {
        id: "msg-1",
        sender: "STUDENT",
        text: "Boa tarde, sempre que tento abrir a atividade 2 de Banco de Dados, a tela fica em branco.",
        timestamp: "10/05/2024 16:20",
      },
      {
        id: "msg-2",
        sender: "ATTENDANT",
        text: "Boa tarde! Verificamos aqui e houve uma instabilidade pontual. Pode tentar limpar o cache do navegador e tentar novamente?",
        timestamp: "11/05/2024 08:30",
        attendantName: "Lucas (Suporte TI)",
      },
      {
        id: "msg-3",
        sender: "STUDENT",
        text: "Deu certo! Muito obrigada.",
        timestamp: "11/05/2024 09:00",
      },
      {
        id: "msg-4",
        sender: "SYSTEM",
        text: "Ticket encerrado pelo usuário.",
        timestamp: "11/05/2024 09:05",
      }
    ]
  }
];
