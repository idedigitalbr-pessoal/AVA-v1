export type NoticeCategory = "INSTITUCIONAL" | "CURSO" | "DISCIPLINA";
export type NoticePriority = "ALTA" | "NORMAL" | "BAIXA";

export interface Notice {
  id: string;
  title: string;
  description: string; // short summary
  content: string; // full content, could be HTML/Markdown
  category: NoticeCategory;
  subject?: string; // used when category is DISCIPLINA
  date: string;
  author: string;
  priority: NoticePriority;
  isRead: boolean;
}

export const MOCK_NOTICES: Notice[] = [
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
