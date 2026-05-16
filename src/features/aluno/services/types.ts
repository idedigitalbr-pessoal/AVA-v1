export type ProtocolStatus = 
  | "ABERTO" 
  | "AGUARDANDO_ANALISE" 
  | "EM_ANDAMENTO" 
  | "DEFERIDO" 
  | "INDEFERIDO" 
  | "CANCELADO";

export interface AvailableService {
  id: string;
  name: string;
  description: string;
  category: "DOCUMENTOS" | "ACADEMICO" | "FINANCEIRO" | "DIVERSOS";
  estimatedDays: number;
}

export interface ProtocolHistoryItem {
  id: string;
  date: string;
  status: ProtocolStatus;
  comment: string;
  actor: string;
}

export interface Protocol {
  id: string;
  number: string;
  serviceId: string;
  serviceName: string;
  openedAt: string;
  updatedAt: string;
  status: ProtocolStatus;
  description: string;
  history: ProtocolHistoryItem[];
}

export const MOCK_AVAILABLE_SERVICES: AvailableService[] = [
  { id: "svc-1", name: "Declaração de Matrícula", description: "Emissão de documento comprovando vínculo ativo com a instituição.", category: "DOCUMENTOS", estimatedDays: 1 },
  { id: "svc-2", name: "Histórico Acadêmico", description: "Emissão do histórico escolar detalhado com notas e frequências.", category: "DOCUMENTOS", estimatedDays: 2 },
  { id: "svc-3", name: "Regime Tutorial", description: "Solicitação de acompanhamento tutorial especial justificado.", category: "ACADEMICO", estimatedDays: 5 },
  { id: "svc-4", name: "Segunda Via de Documento", description: "Solicitação de 2ª via de documentos institucionais.", category: "DOCUMENTOS", estimatedDays: 7 },
  { id: "svc-5", name: "Revisão de Nota", description: "Solicitação de revisão de avaliação após divulgação do resultado.", category: "ACADEMICO", estimatedDays: 5 },
  { id: "svc-6", name: "Solicitação de Certificado", description: "Pedido de emissão de certificado de conclusão de curso ou atividade.", category: "DOCUMENTOS", estimatedDays: 15 },
  { id: "svc-7", name: "Alteração Cadastral", description: "Atualização de dados pessoais incompatíveis pelo portal.", category: "DIVERSOS", estimatedDays: 3 },
];

export const MOCK_PROTOCOLS: Protocol[] = [
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
