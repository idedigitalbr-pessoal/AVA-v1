# Relatório de Auditoria: Área Administrativa (AVA-v1)

## Problemas Encontrados e Inconsistências
1. **Navegação de "Ações Rápidas" na Dashboard:**
   - No `AdminDashboard.tsx`, os botões de "Novo Cadastro", "Criar Novo Curso", "Gerenciar Relatórios" e "Configurações do Sistema" não possuíam links/navegação mapeados para a rota correspondente.
2. **Duplicidade Lógica de AdminActionMenu:**
   - Em certos arquivos listando dados (`AdminCourses.tsx`), o componente `AdminActionMenu` estava sendo inserido duplamente no DOM (um envolto no link de exclusão e outro isolado), o que funciona visualmente, mas fere um pouco a coesão do componente único de ação. Atualmente ele renderiza adequadamente, porém convém revisar para manter as *props* centralizadas.
3. **Componentização e Estados:**
   - As tabelas e gerenciamentos estão majoritariamente corretos (com `LoadingState`, `EmptyState` e paginação/uso adequado de queries via `react-query`). Os erros de requisições são segurados via `ErrorState`.
   - Houve uma ótima abstração em `src/features/admin/components` que centralizou visualização, mas as páginas que exibem "Listas" e chamam formulários (`AdminStudents.tsx`, `AdminSubject.tsx`...) delegam bastante lógica de roteamento (`router.push()`) repetitiva para o componente.
4. **Falta de Edição para Entidade 'Matrícula':**
   - Não existe rota nem tela de formulário contendo funcionalidade equivalente a `editar matrícula`, apenas "Criar nova", Visualizar detalhes, confirmar ou cancelar (Ações na lista de dashboard em `AdminEnrollments.tsx`). Isso pode ser uma inconsistência de negócio se a edição for pretendida (ex: transferir aluno de turma), mas pelas ações do design, transferência foi colocada num item de menu em breve.
5. **Typescript e Mocks:**
   - Todos os Mocks e Entidades Typescript parecem consistentes e possuem a cobertura inicial solicitada e coerente entre o `Student`, `Course`, `Class` e `Enrollment`. Os mocks cobrem perfeitamente os formulários sem dados do servidor.
   - Rotas de páginas nos diretórios `/src/app/admin/.../` todas exportam uma função primária chamando o pacote `features` relativo ao escopo.

## Alterações Realizadas
1. **Correção de Ações na Dashboard (`AdminDashboard.tsx`)**
   - Importado `useRouter` do `next/navigation`.
   - Aplicada a função `onClick` para os respectivos botões de ação rápida.
     - '*Novo Cadastro*' -> `router.push('/admin/alunos/novo')`
     - '*Criar Novo Curso*' -> `router.push('/admin/cursos/novo')`
     - '*Gerenciar Relatórios*' -> `router.push('/admin/relatorios')`
     - '*Configurações do Sistema*' -> `router.push('/admin/configuracoes')`

## Arquivos Alterados
- `src/features/admin/AdminDashboard.tsx`: Correção de rotas pendentes em links.
- `audit_report.md` (Este relatório gerado).

## Próximos Passos Recomendados
1. **Refinamento do Menu de Ação `AdminActionMenu`:** Integrar caixas de confirmações (ex: dialog de Exclusão) diretamente no prop de exclusão deste componente para não ter que fragmentá-lo em chamadas da UI de nível superior.
2. **Transferência de Contexto (Matrículas):** Continuar preenchendo as ações (em breve) que transferem e impersonam alunos (`AdminEnrollments.tsx`) quando os requisitos da secretaria forem fixados.
3. **Rotas e API:** Preservar a estrutura em `/lib/api` sem a necessidade de implementar chamadas remotas (`fetch`) antes que o backend (NestJS) esteja totalmente definido com seus contratus *(Swagger/OpenAPI).* Continuar dependente do Mock até o Sprint de Integração.
