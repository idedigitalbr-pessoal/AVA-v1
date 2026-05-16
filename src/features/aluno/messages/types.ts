export type MessageCategory = "DISCIPLINA" | "INSTITUCIONAL";

export interface MessageParticipant {
  id: string;
  name: string;
  role: "PROFESSOR" | "ALUNO" | "COORDENACAO" | "SECRETARIA";
  avatarUrl?: string;
}

export interface ThreadMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

export interface MessageThread {
  id: string;
  subject: string;
  category: MessageCategory;
  discipline?: string;
  unreadCount: number;
  updatedAt: string;
  participants: MessageParticipant[];
  messages: ThreadMessage[];
}

export const MOCK_THREADS: MessageThread[] = [
  {
    id: "thread-1",
    subject: "Dúvida sobre Listas Encadeadas",
    category: "DISCIPLINA",
    discipline: "Estrutura de Dados",
    unreadCount: 1,
    updatedAt: "10:30",
    participants: [
      { id: "st-12345", name: "Ana Oliveira Silva", role: "ALUNO" },
      { id: "prof-1", name: "Prof. Marcos", role: "PROFESSOR" }
    ],
    messages: [
      {
        id: "m-1",
        senderId: "st-12345",
        text: "Professor, não entendi como fazer a remoção de um nó no meio da lista duplamente encadeada. Pode dar uma dica?",
        timestamp: "09:15"
      },
      {
        id: "m-2",
        senderId: "prof-1",
        text: "Olá Ana! Claro. Você precisa primeiro encontrar o nó e então ajustar os ponteiros 'ant' do próximo nó e 'prox' do nó anterior. Vou postar um diagrama no material complementar para ajudar.",
        timestamp: "10:30"
      }
    ]
  },
  {
    id: "thread-2",
    subject: "Prazos Documentação Estágio",
    category: "INSTITUCIONAL",
    unreadCount: 0,
    updatedAt: "Ontem",
    participants: [
      { id: "st-12345", name: "Ana Oliveira Silva", role: "ALUNO" },
      { id: "coord-1", name: "Coordenação de Estágios", role: "COORDENACAO" }
    ],
    messages: [
      {
        id: "m-3",
        senderId: "coord-1",
        text: "Lembramos que o prazo limite para o envio do TCE assinado pelas partes é dia 30/05.",
        timestamp: "Ontem 14:00"
      },
      {
        id: "m-4",
        senderId: "st-12345",
        text: "Certo, já enviei na plataforma ontem. Muito obrigada!",
        timestamp: "Ontem 15:20"
      }
    ]
  },
  {
    id: "thread-3",
    subject: "Revisão de Nota - P1",
    category: "DISCIPLINA",
    discipline: "Banco de Dados I",
    unreadCount: 2,
    updatedAt: "Terça-feira",
    participants: [
      { id: "st-12345", name: "Ana Oliveira Silva", role: "ALUNO" },
      { id: "prof-2", name: "Profa. Juliana", role: "PROFESSOR" }
    ],
    messages: [
      {
        id: "m-5",
        senderId: "st-12345",
        text: "Professora, acredito que houve um erro na soma da minha nota da questão 3.",
        timestamp: "Terça-feira 08:00"
      },
      {
        id: "m-6",
        senderId: "prof-2",
        text: "Vou verificar, Ana. Retorno em breve.",
        timestamp: "Terça-feira 09:12"
      },
      {
        id: "m-7",
        senderId: "prof-2",
        text: "Você tem razão. Corrigi no portal, sua nota passou para 8.5.",
        timestamp: "Terça-feira 16:45"
      }
    ]
  }
];
