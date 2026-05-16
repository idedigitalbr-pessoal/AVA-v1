export interface StudyStep {
  id: string;
  title: string;
  description: string;
  iconType: "laptop" | "book" | "video" | "file" | "check" | "chart" | "calendar" | "headset" | "brain";
  durationMinutes: number;
  tips: string[];
}

export const MOCK_STEPS: StudyStep[] = [
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
    tips: ["O progresso é salvo automaticamente a cada minuto.", "Use o modo PiP para fazer anotações enquanto assiste.", "As aulas ao vivo ficam gravadas e sobem em até 24h."]
  },
  {
    id: "step-4",
    title: "Envio de atividades",
    description: "Veja como funciona o painel de submissão, formatos aceitos e como ler a correção enviada pelo professor.",
    iconType: "file",
    durationMinutes: 6,
    tips: ["Sempre confira se o arquivo anexado é o correto.", "Respeite as datas de entrega (evite atrasos).", "Após submeter, aguarde a mensagem de confirmação."]
  },
  {
    id: "step-5",
    title: "Respondendo aos Quizzes",
    description: "Entenda a mecânica dos questionários de fixação, tempo de prova e como funciona o número de tentativas.",
    iconType: "check",
    durationMinutes: 4,
    tips: ["Leia atentamente o enunciado de cada questão.", "Só clique em 'Finalizar' quando tiver certeza.", "As notas saem automaticamente caso sejam questões objetivas."]
  },
  {
    id: "step-6",
    title: "Acompanhando notas (Boletim)",
    description: "Onde consultar suas avaliações, visualizar a média calculada e checar os feedbacks individuais da mentoria.",
    iconType: "chart",
    durationMinutes: 3,
    tips: ["Acesse Menu > Meu Desempenho ou Boletim.", "Fique de olho na evolução ao longo dos semestres.", "A média geral precisa ser superior a 7,0."]
  },
  {
    id: "step-7",
    title: "Uso do Calendário",
    description: "Mantenha-se organizado! O calendário vai te lembrar das datas de provas, férias, eventos e vencimentos.",
    iconType: "calendar",
    durationMinutes: 5,
    tips: ["Sincronize o calendário do portal com o do seu celular.", "Dê prioridade vermelha para eventos importantes.", "Filtre os eventos para focar no que importa."]
  },
  {
    id: "step-8",
    title: "Falar com Atendimento",
    description: "Precisa de ajuda? Mostramos como abrir um chamado para a secretaria, setor financeiro ou suporte técnico.",
    iconType: "headset",
    durationMinutes: 3,
    tips: ["Descreva o problema com riqueza de detalhes na mensagem inicial.", "Selecione o departamento correto para agilizar.", "O envio de anexos ajuda a equipe de TI a corrigir erros."]
  },
  {
    id: "step-9",
    title: "Organização Semanal",
    description: "Recomendações finais para organizar seus horários, fazer anotações eficientes e evitar a procrastinação.",
    iconType: "brain",
    durationMinutes: 8,
    tips: ["Defina um horário fixo de estudos diariamente.", "Utilize a técnica Pomodoro (25 minutos de estudo / 5 de descanso).", "Beba água e arrume um local limpo, sem distrações."]
  }
];
