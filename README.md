# AVA Acadêmica - Frontend

Este é o repositório frontend da plataforma de Ambiente Virtual de Aprendizagem (AVA) acadêmica, construída com foco modular, escalabilidade e design moderno, responsivo e centrado no usuário.

## Visão Geral do Projeto
Esta aplicação simula a interface completa de um sistema de gestão educacional e aprendizagem. Toda a lógica de negócios e estado foi construída com dados simulados (mocks), mas a arquitetura já está totalmente preparada para consumir uma API real no futuro, delegando chamadas HTTP para services isolados.

## Stack Técnica

- **Framework:** Next.js 15+ (App Router)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS v4
- **Ícones:** Lucide React
- **Componentes:** Baseados nos padrões do shadcn/ui.

## Estrutura de Pastas

```
src/
├── app/                  # Rotas do Next.js (App Router)
│   ├── (auth)/           # Rotas de acesso (Login Administrativo)
│   ├── (public)/         # Páginas públicas (Landing Page)
│   ├── admin/            # Área logada da Secretaria/Admin
│   ├── portal/aluno/     # Área logada do Aluno
│   └── professor/        # Área logada do Professor
├── components/           # Componentes globais e reutilizáveis
│   ├── layout/           # Sidebar, Header, etc.
│   └── ui/               # Componentes base (Button, Input, Table, etc)
├── features/             # Componentes agrupados por domínio/regras de negócios
│   ├── admin/
│   ├── aluno/
│   ├── auth/
│   └── professor/
├── lib/                  # Código utilitário e integrações
│   ├── api/              # Ponto de acesso à API e camada de Services
│   ├── auth/             # Contexto de Autenticação React
│   └── utils.ts          # Helpers (ex: classnames)
├── mocks/                # Dados e entidades simuladas
└── types/                # Definições de tipos TS globais
```

## Rotas Principais

A aplicação é dividida por áreas baseadas em papéis de acesso:

- `/` (Home Pública)
- `/portal/aluno/login` (Acesso do Aluno)
- `/login` (Acesso dos Professores e Administração)
- `/portal/aluno/(protected)/*` (Dashboard, Disciplinas, Salas de Aula, Boletim - restrito ao aluno)
- `/professor/*` (Dashboard, Gestão de Conteúdos, Notas - restrito ao professor)
- `/admin/*` (Dashboard, Gestão de Alunos, Turmas, Relatórios - restrito a administradores)

## Perfis de Acesso

O sistema suporta três tipos principais de usuários através do `Role`:

1. **ALUNO:** Consome o conteúdo de aulas, responde quizzes, envia trabalhos e visualiza o próprio boletim e calendário.
2. **PROFESSOR:** Visualiza turmas onde leciona, gerencia módulos/aulas das disciplinas, acompanha alunos e lança as notas e frequências.
3. **ADMIN / SECRETARIA:** Gerencia de forma global as entidades do sistema: Cadastra novos alunos, professores, cria novos cursos, disciplinas e turmas.

## Como Rodar Localmente

1. Certifique-se de estar utilizando Node.js (v18 ou superior).
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
4. A aplicação estará disponível em `http://localhost:3000`.

## Como Trocar Mocks por API Real

O sistema inteiro passa por uma camada de serviços (`src/lib/api/services/*`). Atualmente, esses serviços utilizam a instância do Axios/Fetch mas retornam dados do diretório `src/mocks`. 

Para integrar com o seu backend real (ex: um backend NestJS):

1. **Ajuste o Base URL:** Em `src/lib/api/client.ts`, configure a baseURL para coincidir com a URL do seu backend.
2. **Ajuste os Interceptors:** O `client.ts` permite adicionar Interceptors para injetar o JWT automaticamente do `localStorage` ou Cookies nas chamadas HTTP.
3. **Mude os Retornos dos Services:** Abra qualquer arquivo em `src/lib/api/services/` (ex: `students.service.ts`). Remova a dependência dos mocks e utilize o retorno real do Axios.
   
   **De:**
   ```typescript
   await apiClient.get(endpoints.students.base);
   return mockUsers.filter(u => u.role === 'ALUNO');
   ```

   **Para:**
   ```typescript
   const { data } = await apiClient.get<User[]>(endpoints.students.base);
   return data;
   ```

## Convenções de Componentes

- Separação estrita de componentes visuais (`components/ui`) e lógicas de visualização de entidades de negócio (`features/`).
- Componentes pesados de negócio NÃO SÃO reutilizáveis cruzando domínios (Ex: um componente que lida com as respostas de um Quiz fica confinado na visualização daquele Quiz).
- Componentes visuais não acessam API diretamente; isso é uma responsabilidade da página ou de hooks especializados.

## Convenções de Services

- Todo serviço deve ter seu endpoint mapeado no `src/lib/api/endpoints.ts`.
- Os retornos dos métodos de services sempre devem retornar Promises fortemente tipadas com um dos tipos exportados na pasta `src/types`.
- Todas as exportações para o componente Next.js são feitas unicamente através de `src/lib/api/index.ts`.

## Próximos Passos (Evolução Contínua)
- [x] **Componentes Utilitários e Tratamentos**: `EmptyState`, `ErrorState` e `ConfirmDialog` adicionados.
- [x] **Tipagem Forte e Centralizada**: `src/types` mapeados corretamente, `types/index.ts`.
- [x] **Tratamento de Estado Remoto**: Integramos e preparamos `QueryProvider` do `@tanstack/react-query` para os hooks em `src/hooks/use-queries.ts`.
- [x] **Guards por permissão**: Criação de `PermissionGuard` para ocultamento condicional de blocos de interface baseado em `role`.
- [x] **Schemas de Formulário Prontos**: Integração com `Zod` implementada em `src/lib/validations/index.ts`.
- [x] **Portal do Aluno Enriquecido**: Dashboard completo em `/portal/aluno/dashboard` reunindo métricas acadêmicas com dados mockados em alto grau de fidelidade.
- [x] **Sala de Aula Virtual (Lesson View)**: Interface de `LessonDetails.tsx` recriada com progresso local, simulação de travas em aulas (locked states), Q&A de comentários, player estilizado e barra de progressão por módulo e geral.
- [ ] Conectar efetivamente os serviços no backend NestJS.
- [ ] Implementar as verificações JWT reais no Server Side do Middleware (App Router).
- [ ] Abstrair validação de componentes visuais integrando explicitamente ao `react-hook-form` e `zod`.
- [ ] Mapear todos os schemas de interface a partir da documentação OpenAPI/Swagger (quando disponível do backend).
