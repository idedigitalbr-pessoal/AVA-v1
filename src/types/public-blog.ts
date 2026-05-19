export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl?: string;
  authorName: string;
  authorId?: string;
  categoryId: string;
  category?: BlogCategory;
  tags: string[];
  publishedAt: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  isFeatured: boolean;
  seoTitle?: string;
  seoDescription?: string;
}
