import { PublicCoursePage } from '@/types';

export const mockPublicCourses: PublicCoursePage[] = [
  {
    id: 'course-page-1',
    courseId: 'course-1',
    slug: 'pos-graduacao-em-tecnologia',
    title: 'Pós-Graduação em Tecnologia e Inovação',
    headline: 'Domine as tecnologias do futuro e lidere a transformação digital nas empresas.',
    description: '<p>Este curso prepara o profissional para atuar com as mais novas tecnologias do mercado, como IA, Cloud Computing e Big Data.</p>',
    thumbnailUrl: 'https://placehold.co/600x400/3b82f6/white?text=Tech+Course',
    format: 'ONLINE',
    level: 'Pós-Graduação',
    targetAudience: 'Profissionais de TI, Desenvolvedores e Gestores de Projetos.',
    workload: 360,
    duration: '12 meses',
    price: 3500.00,
    installmentOptions: '12x de R$ 291,66',
    isActive: true,
    isFeatured: true,
    tags: ['tecnologia', 'inovação', 'liderança'],
    modulesBriefInfo: [
      { name: 'Módulo 1: Introdução a IA', description: 'Conceitos fundamentais.' },
      { name: 'Módulo 2: Big Data Analytics', description: 'Extraindo valor de grandes volumes de dados.' },
    ],
  },
  {
    id: 'course-page-2',
    courseId: 'course-2',
    slug: 'mba-em-gestao-estrategica',
    title: 'MBA em Gestão Estratégica',
    headline: 'Seja o líder que o mercado busca.',
    description: '<p>Desenvolva habilidades de liderança e gestão para alavancar sua carreira.</p>',
    thumbnailUrl: 'https://placehold.co/600x400/10b981/white?text=MBA',
    format: 'HYBRID',
    level: 'MBA',
    targetAudience: 'Gestores, Empreendedores e Líderes.',
    workload: 420,
    duration: '18 meses',
    price: 5200.00,
    isActive: true,
    isFeatured: false,
  }
];
