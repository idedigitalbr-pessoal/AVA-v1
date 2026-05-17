import { Report, ReportResult } from '@/types';
// import api from '../config'; // Example for NestJS integration

export const mockReports: Report[] = [
  { id: 'performance', title: 'Desempenho Acadêmico', description: 'Relatório geral de notas, médias e aprovações', category: 'Acadêmico' },
  { id: 'attendance', title: 'Frequência e Evasão', description: 'Dados sobre presenças, faltas e alunos que deixaram os cursos', category: 'Acadêmico' },
  { id: 'engagement', title: 'Engajamento no AVA', description: 'Acessos, consumo de módulos e participação nos conteúdos', category: 'Acadêmico' },
  { id: 'enrollments', title: 'Matrículas', description: 'Quantidade de novos alunos, turmas e cursos por período', category: 'Administrativo' },
  { id: 'certificates', title: 'Certificados', description: 'Histórico de documentações geradas e alunos elegíveis', category: 'Administrativo' },
  { id: 'teachers', title: 'Professores', description: 'Carga horária, turmas alocadas e avaliações dos docentes', category: 'Administrativo' },
  { id: 'financial', title: 'Financeiro Básico', description: 'Receitas, pagamentos e inadimplência', category: 'Financeiro' },
];

export const reportsService = {
  listReports: async (): Promise<Report[]> => {
    // Para backend NestJS: return await api.get('/admin/reports');
    return mockReports;
  },

  previewReport: async (id: string, filters: any): Promise<ReportResult> => {
    // Para backend NestJS: return await api.get(`/admin/reports/${id}/preview`, { params: filters });
    
    // Return custom mock data based on report id
    if (id === 'attendance') {
      return {
        headers: ['ID', 'Aluno', 'Curso', 'Presença (%)', 'Faltas', 'Risco de Evasão'],
        rows: [
          ['101', 'João Silva', 'Engenharia', '85%', '4', 'Baixo'],
          ['102', 'Maria Souza', 'Design', '45%', '18', 'Alto'],
          ['103', 'Carlos Pereira', 'Ciência da Computação', '95%', '1', 'Baixo'],
        ]
      };
    }
    
    if (id === 'engagement') {
      return {
        headers: ['Turma', 'Disciplina', 'Média Acessos/Semana', 'Fóruns', 'Conclusão Módulos'],
        rows: [
          ['Turma A - 2026', 'Lógica de Prog', '3.5', '12', '80%'],
          ['Turma B - 2026', 'Design UI', '1.2', '2', '25%'],
        ]
      };
    }

    if (id === 'certificates') {
      return {
        headers: ['Código', 'Aluno', 'Curso', 'Data Emissão', 'Situação'],
        rows: [
          ['CERT-001', 'Ana Clara', 'Design', '10/05/2026', 'Válido'],
          ['CERT-002', 'Paulo Costa', 'Engenharia', '01/05/2026', 'Válido'],
        ]
      };
    }

    // Default Preview
    return {
      headers: ['ID', 'Nome', 'Curso', 'Métrica', 'Status'],
      rows: [
        ['101', 'Dado Genérico', 'Engenharia de Software', '8.5', 'Ativo'],
        ['102', 'Dado Genérico', 'Design Gráfico', '9.0', 'Ativo'],
        ['103', 'Dado Genérico', 'Ciência da Computação', '6.5', 'Pendente'],
      ]
    };
  },

  exportReportCsv: async (id: string, filters: any): Promise<string> => {
    // Para backend NestJS: return await api.get(`/admin/reports/${id}/export`, { params: filters, responseType: 'blob' });
    return "url_para_download_do_csv";
  }
};
