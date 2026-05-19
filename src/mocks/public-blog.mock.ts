import { BlogPost, BlogCategory } from '@/types';

export const mockBlogCategories: BlogCategory[] = [
  { id: 'cat-1', name: 'Tecnologia', slug: 'tecnologia' },
  { id: 'cat-2', name: 'Carreira', slug: 'carreira' },
  { id: 'cat-3', name: 'Notícias', slug: 'noticias' },
];

export const mockBlogPosts: BlogPost[] = [
  {
    id: 'post-1',
    title: 'Como a Inteligência Artificial está mudando o mercado de trabalho',
    slug: 'ia-mercado-de-trabalho',
    excerpt: 'Descubra as principais habilidades necessárias para não ficar para trás na era da IA.',
    content: '<p>A Inteligência Artificial já é uma realidade em muitas empresas...</p>',
    coverImageUrl: 'https://placehold.co/800x400?text=Blog+Post+1',
    authorName: 'Maria Cunha',
    categoryId: 'cat-1',
    tags: ['ia', 'mercado', 'futuro'],
    publishedAt: new Date().toISOString(),
    status: 'PUBLISHED',
    isFeatured: true,
  },
  {
    id: 'post-2',
    title: 'Dicas para se preparar para o mercado em 2026',
    slug: 'dicas-mercado-2026',
    excerpt: 'Separamos 5 dicas fundamentais para quem quer se destacar neste ano.',
    content: '<p>O mercado em 2026 exige multidisciplinaridade...</p>',
    coverImageUrl: 'https://placehold.co/800x400?text=Blog+Post+2',
    authorName: 'Carlos Souza',
    categoryId: 'cat-2',
    tags: ['dicas', 'carreira'],
    publishedAt: new Date().toISOString(),
    status: 'PUBLISHED',
    isFeatured: false,
  }
];
