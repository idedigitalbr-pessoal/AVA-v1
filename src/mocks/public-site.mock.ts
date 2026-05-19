import { PublicBanner, PublicMenuItem, PublicSiteSettings, FAQItem, Testimonial } from '@/types';

export const mockSiteSettings: PublicSiteSettings = {
  contactEmail: 'contato@instituicao.edu.br',
  contactPhone: '(11) 9999-9999',
  contactWhatsapp: '5511999999999',
  contactAddress: 'Rua das Flores, 123 - Centro, São Paulo/SP',
  socialLinks: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    linkedin: 'https://linkedin.com',
  },
  logoUrl: 'https://placehold.co/200x60?text=Logo',
  primaryColor: '#3b82f6',
  secondaryColor: '#1e40af',
  heroTitle: 'Transforme seu Futuro',
  heroSubtitle: 'Conheça nossos cursos de Graduação e Pós-graduação com metodologia exclusiva.',
  footerText: '© 2026 Instituição de Ensino. Todos os direitos reservados.',
};

export const mockMenuItems: PublicMenuItem[] = [
  { id: '1', label: 'Início', url: '/', order: 1 },
  { id: '2', label: 'Cursos', url: '/cursos', order: 2 },
  { id: '3', label: 'Sobre', url: '/sobre', order: 3 },
  { id: '4', label: 'Blog', url: '/blog', order: 4 },
  { id: '5', label: 'Contato', url: '/contato', order: 5 },
];

export const mockBanners: PublicBanner[] = [
  {
    id: '1',
    title: 'Pós-Graduação 2026',
    subtitle: 'Matrículas abertas com 50% de desconto.',
    imageUrl: 'https://placehold.co/1200x400/3b82f6/white?text=Banner+01',
    linkUrl: '/cursos',
    linkText: 'Ver Cursos',
    isActive: true,
    order: 1,
  },
  {
    id: '2',
    title: 'Transforme sua carreira',
    subtitle: 'Aprenda com professores que atuam no mercado mercado.',
    imageUrl: 'https://placehold.co/1200x400/1e40af/white?text=Banner+02',
    linkUrl: '/sobre',
    linkText: 'Conheça a Metodologia',
    isActive: true,
    order: 2,
  },
];

export const mockFaqs: FAQItem[] = [
  {
    id: '1',
    question: 'Como funciona a matrícula?',
    answer: 'A matrícula é feita 100% online. Basta escolher o curso e preencher o formulário.',
    order: 1,
  },
  {
    id: '2',
    question: 'Os cursos são reconhecidos pelo MEC?',
    answer: 'Sim, todos os nossos cursos de graduação e pós têm reconhecimento do MEC.',
    order: 2,
  },
];

export const mockTestimonials: Testimonial[] = [
  {
    id: '1',
    authorName: 'João Silva',
    authorRole: 'Analista Sênior',
    content: 'O curso de pós superou minhas expectativas e me ajudou na promoção.',
    rating: 5,
    isActive: true,
    order: 1,
  },
];
