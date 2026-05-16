# Mapeamento de Rotas do Frontend - AVA Acadêmica

Este documento detalha as rotas implementadas no projeto frontend, divididas por módulo de acesso. O objetivo é fornecer visibilidade de onde cada feature está alocada, qual perfil a acessa, e quais as responsabilidades de integração de dados e componentes.

## 1. Público

### `/` (Landing Page)
- **Objetivo:** Página de apresentação principal, atração de matrículas e portfólio institucional do AVA Acadêmica.
- **Perfil Restrito:** Nenhum (Público).
- **Dados API Futura:** 
  - Catálogo de cursos em destaque.
  - Testemunhos de alunos e indicadores para atração.
- **Componentes Principais:** Interface estática focada em conversão, cabeçalho de navegação público.

---

## 2. Autenticação

### `/portal/aluno/login`
- **Objetivo:** Tela de login focada exclusivamente na experiência do estudante.
- **Perfil Restrito:** Nenhum (Acesso Deslogado).
- **Dados API Futura:**
  - Autenticação via Email/Matrícula + Senha (`POST /auth/login`).
  - Tokens JWT de resposta.
- **Componentes Principais:** Formulário de Login simulado, Validação de Schema (Zod).

### `/login`
- **Objetivo:** Acesso restrito centralizado para colaboradores institucionais (Professores e Administração).
- **Perfil Restrito:** Nenhum (Acesso Deslogado).
- **Dados API Futura:**
  - Autenticação de colaborador (`POST /auth/login`).
- **Componentes Principais:** Formulário de Login de Colaboradores.

### `/forgot-password` e `/reset-password` (Sub-rotas na auth)
- **Objetivo:** Fluxo de recuperação e redefinição de senha da plataforma.
- **Perfil Restrito:** Nenhum (Público).
- **Dados API Futura:** Serviço de disparo de email com token de reset, e endpoint de confirmação via Token.
- **Componentes Principais:** Formulário em Card central, validação Zod.

---

## 3. Aluno

As rotas logadas da área do aluno partem do agrupamento protegido `/portal/aluno/(protected)/*`.

### `/portal/aluno/dashboard`
- **Objetivo:** Visão panorâmica inicial do progresso acadêmico e atalhos de atividades iminentes do estudante logado.
- **Perfil Restrito:** `ALUNO`
- **Dados API Futura:** Resumo numérico do estudante logado, timeline de próximos prazos (`GET /students/me/dashboard`).
- **Componentes Principais:** `StudentDashboard` na pasta features, Cartões Analíticos e Listas rápidas.

### `/portal/aluno/disciplinas`
- **Objetivo:** Listagem das disciplinas em que o aluno se encontra ativamente matriculado, provendo entrada individual para as salas de aula formativas e conteúdo em vídeo/EAD.
- **Perfil Restrito:** `ALUNO`
- **Dados API Futura:** Matrículas relativas ao semestre atual, informações curtas sobre o professor responsável, grade horária (`GET /students/me/enrollments`).
- **Componentes Principais:** Grid Layout, Progress bar da disciplina.

### `/portal/aluno/atividades`
- **Objetivo:** Central global de entrega de tarefas baseadas em arquivos ou caixa de texto da resposta à atividade requisitada pelo professor.
- **Perfil Restrito:** `ALUNO`
- **Dados API Futura:** Consulta consolidada e ordenada temporalmente das atividades em aberto (`GET /students/me/activities`).
- **Componentes Principais:** Renderizador de Lista, status em badges para Entregue / Atrasado / Pendente.

### `/portal/aluno/quizzes`
- **Objetivo:** Interação via prova digital padronizada (múltipla escolha/verdadeiro e falso) com contador de tempo limitante.
- **Perfil Restrito:** `ALUNO`
- **Dados API Futura:** Recebimento e envio assíncrono dos formulários de questionário da API.
- **Componentes Principais:** `RadioGroup`, Paginador entre questões e Botão Flutuante de finalização de Quiz.

### `/portal/aluno/boletim`
- **Objetivo:** Folha descritiva em formato de histórico escolar contendo o painel numérico de aprovação da jornada acadêmica completa.
- **Perfil Restrito:** `ALUNO`
- **Dados API Futura:** Notas parciais, Notas por prova e porcentagem de Faltas consolidadas (`GET /students/me/grades`).
- **Componentes Principais:** Tabela Simples/Estruturada e Barra de Progresso visual por unidade curricular.

### `/portal/aluno/calendario`
- **Objetivo:** Painel focado na alocação temporal e marcos do colégio que são críticos para o sucesso da turma logada.
- **Perfil Restrito:** `ALUNO`
- **Dados API Futura:** Agrupamento de agendas de datas.
- **Componentes Principais:** Biblioteca de montagem de calendário, visualização diária/mensal.

### `/portal/aluno/notificacoes` e `/portal/aluno/perfil`
- **Objetivo:** Leitura de e-mails sistêmicos na caixa de mensagens do AVA e a atualização estrita dos dados pessoais não alteráveis via Secretaria (foto ou bios pessoal).
- **Perfil Restrito:** `ALUNO`
- **Dados API Futura:** Push System e CRUD User Context.
- **Componentes Principais:** Interface de Mensageria e Formulário de Perfil básico.

---

## 4. Professor

As rotas da coordenação pedagógica ou de docência concentram-se no namespace raiz agrupado em `app/professor/*`.

### `/professor` (Dashboard Principal)
- **Objetivo:** Boas-vindas para o docente acompanhando pendências urgentes como as turmas que não receberam a pauta do dia ou cadernos de avaliação aguardando correção oficial.
- **Perfil Restrito:** `PROFESSOR`
- **Dados API Futura:** Resumo de Turmas, Lembrete de Tarefas Pendentes e Lançamentos de Diários de Classe (`GET /teachers/me/dashboard`).
- **Componentes Principais:** Dashboard, Box informacional destacada por alertas (Pendências).

### `/professor/disciplinas`
- **Objetivo:** O painel "Criador de Conteúdo" e diário do professor atrelado por matéria (Aulas EAD, Material Complementar, Envio de links/GMeet).
- **Perfil Restrito:** `PROFESSOR`
- **Dados API Futura:** Gerenciador de módulos da disciplina com as opções de upload para o AWS S3 / anexos via Backend.
- **Componentes Principais:** Cards de Gerenciamento. Tree View e Editor de Texto (WYSIWYG futuro).

### `/professor/banco-questoes`
- **Objetivo:** Armazenamento, reuso e revisão do acervo do professor nas avaliações. Permite compor provas randômicas usando os níveis de dificuldades.
- **Perfil Restrito:** `PROFESSOR`
- **Dados API Futura:** CRUD Questões atreladas a uma Disciplina ou Tag/Tema (`GET`, `POST`, `PUT`, `DELETE` /questions).
- **Componentes Principais:** Formulários de múltipla entrada, tags gerenciáveis visualmente na UI.

---

## 5. Administração

Área focada nas mantenedoras, secretárias e coordenadorias pedagógicas (gestão ampla massiva de dados).
Ficam contidas na pasta `/admin/*`.

### `/admin` (Visão Geral - Dashboard)
- **Objetivo:** Gráficos interativos e blocos de sumarização global. Controla crescimento do uso, evasões e quantitativos totais na saúde do sistema.
- **Perfil Restrito:** `ADMIN`
- **Dados API Futura:** API Analítica com cruzamentos de dados temporais e financeiros do sistema todo.
- **Componentes Principais:** Blocos Numéricos (Visão Macro).

### `/admin/alunos` e `/admin/professores`
- **Objetivo:** Manipulação do CRUD Institucional restrito às pessoas vinculadas legalmente ao ambiente de estudos.
- **Perfil Restrito:** `ADMIN`
- **Dados API Futura:** Pontos de acesso GET paginados e ações globais de Inativar Status Logico.
- **Componentes Principais:** Data Table, Filtros Reactivos por texto/status (useQueries e Zustand/Contextos para Sync de Buscas). Tratativas de loading inclusas.

### `/admin/cursos`, `/admin/disciplinas` e `/admin/turmas`
- **Objetivo:** Elaborar o catálogo completo e a relação do portfólio acadêmico, associar professores efetivos frente à disciplina na grade de horário.
- **Perfil Restrito:** `ADMIN`
- **Dados API Futura:** Multi-selects encadeados com dependências estritas (Um curso engloba várias disciplinas e possui muitas turmas em aberto).
- **Componentes Principais:** Menus suspensos avançados atrelados à APIs relacionadas de Cursos e Disciplinas combinadas (useQueries em paralelo).

### `/admin/matriculas`
- **Objetivo:** Associação manual ou revisional do Aluno às Turmas de Cursos elegíveis. Liberação de status PENDENTE para CONFIRMADO.
- **Perfil Restrito:** `ADMIN`
- **Dados API Futura:** PATCH ou POST Massivos para validar status burocrático e gerador de faturamento das parcelas do semestre.
- **Componentes Principais:** Tabela com identificadores, Componente de Ações rápidas unificadas e Labels de Severidades.

### `/admin/relatorios` e `/admin/configuracoes`
- **Objetivo:** Funcionalidade transacional para a Secretaria da Geração dos papéis via PDF/Excel sobre engajamento, bem como setar variações da instituição na aplicação inteira (Logo/Permissões).
- **Perfil Restrito:** `ADMIN`
- **Dados API Futura:** Rotas blob ou text/csv e edição do Tenant root.
- **Componentes Principais:** Toggles de permissões Boolean e Formulário Global.
