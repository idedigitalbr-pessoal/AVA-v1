export type CampaignType = 
  | "EVENTO_AO_VIVO"
  | "AVISO_INSTITUCIONAL"
  | "CAMPANHA_INDICACAO"
  | "PRAZO_ACADEMICO"
  | "NOVIDADE_PORTAL";

export interface Campaign {
  id: string;
  type: CampaignType;
  title: string;
  description: string;
  actionText: string;
  actionUrl: string;
  imageUrl?: string;
  colorClass?: string;
  iconType?: string;
  important?: boolean;
}

export const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: "camp-1",
    type: "AVISO_INSTITUCIONAL",
    title: "Rematrícula Aberta 2024.2",
    description: "Garanta descontos especiais até 30/06. Não perca o prazo!",
    actionText: "Fazer Rematrícula",
    actionUrl: "/portal/aluno/financeiro",
    colorClass: "from-purple-600 to-indigo-600",
    important: true
  },
  {
    id: "camp-2",
    type: "EVENTO_AO_VIVO",
    title: "Masterclass: IA no Mercado de Trabalho",
    description: "Participe da aula ao vivo hoje às 19h com especialistas convidados.",
    actionText: "Acessar Transmissão",
    actionUrl: "#",
    colorClass: "from-emerald-500 to-teal-600"
  },
  {
    id: "camp-3",
    type: "CAMPANHA_INDICACAO",
    title: "Indique e Ganhe",
    description: "Indique um amigo e ganhe 50% de desconto na próxima mensalidade.",
    actionText: "Pegar meu Link",
    actionUrl: "#",
    colorClass: "from-amber-500 to-orange-500"
  }
];
