export interface PublicMenuItem {
  id: string;
  label: string;
  url: string;
  parentId?: string | null;
  order: number;
  isOpenInNewTab?: boolean;
}

export interface PublicBanner {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  mobileImageUrl?: string;
  linkUrl?: string;
  linkText?: string;
  buttonVariant?: 'primary' | 'secondary' | 'outline';
  order: number;
  isActive: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
  order: number;
}

export interface Testimonial {
  id: string;
  authorName: string;
  authorRole?: string;
  authorCompany?: string;
  authorImageUrl?: string;
  content: string;
  rating?: number;
  isActive: boolean;
  order: number;
}

export interface PublicSiteSettings {
  contactEmail: string;
  contactPhone?: string;
  contactAddress?: string;
  contactWhatsapp?: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
    twitter?: string;
  };
  logoUrl: string;
  faviconUrl?: string;
  primaryColor?: string;
  secondaryColor?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  aboutText?: string;
  aboutImageUrl?: string;
  footerText?: string;
}
