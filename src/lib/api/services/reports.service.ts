import { Report, ReportResult } from '@/types';

export const mockReports: Report[] = [
  { id: '1', title: 'Desempenho de alunos', description: 'Relatório geral de notas e médias', category: 'Acadêmico' },
  { id: '2', title: 'Frequência e evasão', description: 'Dados sobre presenças e alunos que deixaram cursos', category: 'Acadêmico' },
  { id: '3', title: 'Engajamento em disciplinas', description: 'Acessos e participação nos conteúdos', category: 'Acadêmico' },
  { id: '4', title: 'Receitas e inadimplência', description: 'Pagamentos atrasados e recebimentos do mês', category: 'Financeiro' },
  { id: '5', title: 'Matrículas por período', description: 'Quantidade de novos alunos por semestre', category: 'Administrativo' },
  { id: '6', title: 'Progresso AVA', description: 'Andamento de consumo de módulos no AVA', category: 'Acadêmico' },
  { id: '7', title: 'Atividades pendentes', description: 'Alunos com trabalhos ou provas em atraso', category: 'Acadêmico' },
  { id: '8', title: 'Certificados emitidos', description: 'Histórico de documentações geradas', category: 'Administrativo' },
];

export const reportsService = {
  listReports: async (): Promise<Report[]> => {
    return mockReports;
  },

  previewReport: async (id: string, filters: any): Promise<ReportResult> => {
    // Return mock data
    return {
      headers: ['ID', 'Nome', 'Curso', 'Valor/Nota', 'Status'],
      rows: [
        ['101', 'João Silva', 'Engenharia de Software', '8.5', 'Ativo'],
        ['102', 'Maria Souza', 'Design Gráfico', '9.0', 'Ativo'],
        ['103', 'Carlos Pereira', 'Ciência da Computação', '6.5', 'Pendente'],
        ['104', 'Ana Costa', 'Engenharia de Software', '10.0', 'Concluído'],
        ['105', 'Pedro Santos', 'Design Gráfico', '7.0', 'Ativo'],
      ]
    };
  },

  exportReportCsv: async (id: string, filters: any): Promise<string> => {
    return "url_para_download_do_csv";
  },

  exportReportPdf: async (id: string, filters: any): Promise<string> => {
    return "url_para_download_do_pdf";
  }
};
