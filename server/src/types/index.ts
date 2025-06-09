export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  image: string;
  gallery?: string[];
  githubUrl?: string;
  liveUrl?: string;
  status: "draft" | "published" | "archived";
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
  collaborators?: Array<{
    name: string;
    role: string;
    avatar?: string;
  }>;
  metrics?: {
    views: number;
    likes: number;
    shares: number;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: Date;
  updatedAt: Date;
  status: "draft" | "published" | "archived";
  featured: boolean;
  tags: string[];
  readTime: number;
  image?: string;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar?: string;
  featured: boolean;
  createdAt: Date;
  approved: boolean;
}

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  role: "admin" | "editor" | "viewer";
  createdAt: Date;
  lastLogin?: Date;
  isActive: boolean;
}

export interface SiteSettings {
  id: string;
  general: {
    siteName: string;
    tagline: string;
    description: string;
    logo?: string;
    favicon?: string;
  };
  contact: {
    email: string;
    phone?: string;
    location?: string;
    socialLinks: Record<string, string>;
  };
  theme: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    darkMode: boolean;
  };
  layout: {
    sections: Array<{
      id: string;
      name: string;
      enabled: boolean;
      order: number;
    }>;
    containerWidth: "narrow" | "normal" | "wide";
    spacing: "compact" | "normal" | "relaxed";
    borderRadius: "none" | "small" | "medium" | "large";
  };
  seo: {
    defaultTitle: string;
    defaultDescription: string;
    defaultKeywords: string[];
    ogImage?: string;
    twitterCard: "summary" | "summary_large_image";
    structuredData: Record<string, any>;
  };
  updatedAt: Date;
}

export interface AuthRequest extends Request {
  user?: User;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
