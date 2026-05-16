export type EventCategory = 
  | "AULA" 
  | "ATIVIDADE" 
  | "PROVA" 
  | "FINANCEIRO" 
  | "SERVICO" 
  | "LIVE_EVENT" 
  | "FERIADO" 
  | "ACADEMICO";

export type EventPriority = "ALTA" | "NORMAL" | "BAIXA";

export interface AcademicEvent {
  id: string;
  title: string;
  description?: string;
  startDate: string; // ISO String (e.g. "2026-05-15T10:00:00")
  endDate?: string;
  category: EventCategory;
  discipline?: string;
  priority: EventPriority;
}

// Current date in context is 2026-05-16
export const MOCK_EVENTS: AcademicEvent[] = [
  {
    id: "evt-1",
    title: "Prova P1",
    description: "Prova presencial no polo.",
    startDate: "2026-05-20T08:00:00",
    endDate: "2026-05-20T10:00:00",
    category: "PROVA",
    discipline: "Banco de Dados I",
    priority: "ALTA",
  },
  {
    id: "evt-2",
    title: "Entrega do Trabalho Conclusivo",
    description: "Prazo final para envio pelo portal.",
    startDate: "2026-05-25T23:59:00",
    category: "ATIVIDADE",
    discipline: "Engenharia de Software",
    priority: "ALTA",
  },
  {
    id: "evt-3",
    title: "Vencimento da Mensalidade",
    description: "Mensalidade referente a Maio/2026",
    startDate: "2026-05-10T23:59:00",
    category: "FINANCEIRO",
    priority: "ALTA",
  },
  {
    id: "evt-4",
    title: "Feriado de Corpus Christi",
    startDate: "2026-06-04T00:00:00",
    category: "FERIADO",
    priority: "NORMAL",
  },
  {
    id: "evt-5",
    title: "Live de Tira-dúvidas",
    description: "Webinar com o coordenador do curso",
    startDate: "2026-05-18T19:00:00",
    endDate: "2026-05-18T20:30:00",
    category: "LIVE_EVENT",
    priority: "BAIXA",
  },
  {
    id: "evt-6",
    title: "Prazo para Renovação de Bolsa",
    description: "Envio de documentação socioeconômica.",
    startDate: "2026-05-28T23:59:00",
    category: "SERVICO",
    priority: "NORMAL",
  },
  {
    id: "evt-7",
    title: "Fórum de Discussão Disponível",
    startDate: "2026-05-12T08:00:00",
    category: "AULA",
    discipline: "Estrutura de Dados",
    priority: "NORMAL",
  },
  {
    id: "evt-8",
    title: "Semana de Avaliações Substitutivas",
    startDate: "2026-06-15T00:00:00",
    endDate: "2026-06-19T23:59:00",
    category: "ACADEMICO",
    priority: "NORMAL",
  }
];
