// Admin data service for handling API calls and data persistence
// Connected to the backend API server

// Re-export everything from the real API service
export * from './admin-api-service';
import { AdminDataService as RealAdminDataService } from './admin-api-service';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

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

export interface SiteSettings {
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
}

// Note: All mock data has been removed. The system now uses the real API backend.

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Use the real API service instead of mock data
export const AdminDataService = RealAdminDataService;

// Real authentication service
export class AuthService {
  static async login(username: string, password: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          localStorage.setItem('admin_token', data.data.token);
          localStorage.setItem('admin_user', JSON.stringify(data.data.user));
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  }

  static logout(): void {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
  }

  static isAuthenticated(): boolean {
    const token = localStorage.getItem('admin_token');
    return !!token;
  }

  static getUser() {
    const userData = localStorage.getItem('admin_user');
    return userData ? JSON.parse(userData) : null;
  }
}
