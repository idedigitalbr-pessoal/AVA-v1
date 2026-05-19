export interface PublicCoursePage {
  id: string;
  courseId: string; // Ref to actual course limit backend
  slug: string;
  title: string; // Optional override
  headline: string;
  description: string; // Long HTML/Markdown content
  thumbnailUrl: string;
  coverImageUrl?: string;
  videoUrl?: string;
  workload: number;
  duration?: string;
  format: 'ONLINE' | 'HYBRID' | 'IN_PERSON';
  level: string; // 'Graduação', 'Pós-Graduação', 'Extensão', etc.
  targetAudience: string;
  prerequisites?: string;
  marketOpportunities?: string;
  modulesBriefInfo?: { name: string; description: string }[];
  instructorsInfo?: { name: string; miniBio: string; photoUrl: string }[];
  price?: number;
  installmentOptions?: string;
  isActive: boolean;
  isFeatured: boolean;
  seoTitle?: string;
  seoDescription?: string;
  tags?: string[];
  enrollmentLink?: string; // Pre-enrollment redirect or direct link
}
