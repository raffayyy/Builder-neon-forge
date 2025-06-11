// Real Admin API service for handling backend API calls
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Import types from backend
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

// API Response interface
interface ApiResponse<T> {
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

// Auth token management
class AuthManager {
  private static tokenKey = 'admin_token';

  static getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  static setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  static removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  static getAuthHeaders(): Record<string, string> {
    const token = this.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
}

// API client with error handling
class ApiClient {
  static async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const headers = {
      'Content-Type': 'application/json',
      ...AuthManager.getAuthHeaders(),
      ...options.headers,
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  static async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint);
  }

  static async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  static async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  static async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  }
}

// Admin API Service
export class AdminApiService {
  // Authentication
  static async login(username: string, password: string): Promise<{ user: User; token: string }> {
    const response = await ApiClient.post<{ user: User; token: string }>('/auth/login', {
      username,
      password,
    });

    if (response.success && response.data) {
      AuthManager.setToken(response.data.token);
      return response.data;
    }

    throw new Error(response.error || 'Login failed');
  }

  static async logout(): Promise<void> {
    try {
      await ApiClient.post('/auth/logout');
    } finally {
      AuthManager.removeToken();
    }
  }

  static async getProfile(): Promise<User> {
    const response = await ApiClient.get<User>('/auth/profile');
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || 'Failed to get profile');
  }

  static async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    const response = await ApiClient.post('/auth/change-password', {
      currentPassword,
      newPassword,
    });

    if (!response.success) {
      throw new Error(response.error || 'Failed to change password');
    }
  }

  // Projects
  static async getProjects(filters?: {
    status?: string;
    featured?: boolean;
    page?: number;
    limit?: number;
  }): Promise<{ projects: Project[]; pagination: any }> {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.featured !== undefined) params.append('featured', filters.featured.toString());
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());

    const response = await ApiClient.get<Project[]>(`/projects?${params}`);
    if (response.success && response.data) {
      return {
        projects: response.data.map(this.parseProjectDates),
        pagination: response.pagination,
      };
    }
    throw new Error(response.error || 'Failed to get projects');
  }

  static async getProject(id: string): Promise<Project> {
    const response = await ApiClient.get<Project>(`/projects/${id}`);
    if (response.success && response.data) {
      return this.parseProjectDates(response.data);
    }
    throw new Error(response.error || 'Failed to get project');
  }

  static async createProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
    const response = await ApiClient.post<Project>('/projects', project);
    if (response.success && response.data) {
      return this.parseProjectDates(response.data);
    }
    throw new Error(response.error || 'Failed to create project');
  }

  static async updateProject(id: string, project: Partial<Omit<Project, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Project> {
    const response = await ApiClient.put<Project>(`/projects/${id}`, project);
    if (response.success && response.data) {
      return this.parseProjectDates(response.data);
    }
    throw new Error(response.error || 'Failed to update project');
  }

  static async deleteProject(id: string): Promise<void> {
    const response = await ApiClient.delete(`/projects/${id}`);
    if (!response.success) {
      throw new Error(response.error || 'Failed to delete project');
    }
  }

  // Blog Posts
  static async getBlogPosts(filters?: {
    status?: string;
    featured?: boolean;
    page?: number;
    limit?: number;
  }): Promise<{ posts: BlogPost[]; pagination: any }> {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.featured !== undefined) params.append('featured', filters.featured.toString());
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());

    const response = await ApiClient.get<BlogPost[]>(`/blog?${params}`);
    if (response.success && response.data) {
      return {
        posts: response.data.map(this.parseBlogPostDates),
        pagination: response.pagination,
      };
    }
    throw new Error(response.error || 'Failed to get blog posts');
  }

  static async getBlogPost(id: string): Promise<BlogPost> {
    const response = await ApiClient.get<BlogPost>(`/blog/${id}`);
    if (response.success && response.data) {
      return this.parseBlogPostDates(response.data);
    }
    throw new Error(response.error || 'Failed to get blog post');
  }

  static async createBlogPost(post: Omit<BlogPost, 'id' | 'updatedAt'>): Promise<BlogPost> {
    const response = await ApiClient.post<BlogPost>('/blog', post);
    if (response.success && response.data) {
      return this.parseBlogPostDates(response.data);
    }
    throw new Error(response.error || 'Failed to create blog post');
  }

  static async updateBlogPost(id: string, post: Partial<Omit<BlogPost, 'id' | 'updatedAt'>>): Promise<BlogPost> {
    const response = await ApiClient.put<BlogPost>(`/blog/${id}`, post);
    if (response.success && response.data) {
      return this.parseBlogPostDates(response.data);
    }
    throw new Error(response.error || 'Failed to update blog post');
  }

  static async deleteBlogPost(id: string): Promise<void> {
    const response = await ApiClient.delete(`/blog/${id}`);
    if (!response.success) {
      throw new Error(response.error || 'Failed to delete blog post');
    }
  }

  // Testimonials
  static async getTestimonials(filters?: {
    featured?: boolean;
    approved?: boolean;
    page?: number;
    limit?: number;
  }): Promise<{ testimonials: Testimonial[]; pagination: any }> {
    const params = new URLSearchParams();
    if (filters?.featured !== undefined) params.append('featured', filters.featured.toString());
    if (filters?.approved !== undefined) params.append('approved', filters.approved.toString());
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());

    const response = await ApiClient.get<Testimonial[]>(`/testimonials?${params}`);
    if (response.success && response.data) {
      return {
        testimonials: response.data.map(this.parseTestimonialDates),
        pagination: response.pagination,
      };
    }
    throw new Error(response.error || 'Failed to get testimonials');
  }

  static async getTestimonial(id: string): Promise<Testimonial> {
    const response = await ApiClient.get<Testimonial>(`/testimonials/${id}`);
    if (response.success && response.data) {
      return this.parseTestimonialDates(response.data);
    }
    throw new Error(response.error || 'Failed to get testimonial');
  }

  static async createTestimonial(testimonial: Omit<Testimonial, 'id' | 'createdAt'>): Promise<Testimonial> {
    const response = await ApiClient.post<Testimonial>('/testimonials', testimonial);
    if (response.success && response.data) {
      return this.parseTestimonialDates(response.data);
    }
    throw new Error(response.error || 'Failed to create testimonial');
  }

  static async updateTestimonial(id: string, testimonial: Partial<Omit<Testimonial, 'id' | 'createdAt'>>): Promise<Testimonial> {
    const response = await ApiClient.put<Testimonial>(`/testimonials/${id}`, testimonial);
    if (response.success && response.data) {
      return this.parseTestimonialDates(response.data);
    }
    throw new Error(response.error || 'Failed to update testimonial');
  }

  static async deleteTestimonial(id: string): Promise<void> {
    const response = await ApiClient.delete(`/testimonials/${id}`);
    if (!response.success) {
      throw new Error(response.error || 'Failed to delete testimonial');
    }
  }

  // Site Settings
  static async getSiteSettings(): Promise<SiteSettings> {
    const response = await ApiClient.get<SiteSettings>('/settings');
    if (response.success && response.data) {
      return this.parseSiteSettingsDates(response.data);
    }
    throw new Error(response.error || 'Failed to get site settings');
  }

  static async updateSiteSettings(settings: Partial<Omit<SiteSettings, 'id' | 'updatedAt'>>): Promise<SiteSettings> {
    const response = await ApiClient.put<SiteSettings>('/settings', settings);
    if (response.success && response.data) {
      return this.parseSiteSettingsDates(response.data);
    }
    throw new Error(response.error || 'Failed to update site settings');
  }

  // File Upload
  static async uploadImage(file: File): Promise<{ filename: string; url: string }> {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(`${API_BASE_URL}/upload/image`, {
      method: 'POST',
      headers: AuthManager.getAuthHeaders(),
      body: formData,
    });

    const data = await response.json();
    if (response.ok && data.success) {
      return data.data;
    }
    throw new Error(data.error || 'Failed to upload image');
  }

  static async uploadFile(file: File): Promise<{ filename: string; url: string }> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/upload/file`, {
      method: 'POST',
      headers: AuthManager.getAuthHeaders(),
      body: formData,
    });

    const data = await response.json();
    if (response.ok && data.success) {
      return data.data;
    }
    throw new Error(data.error || 'Failed to upload file');
  }

  static async deleteFile(filename: string): Promise<void> {
    const response = await ApiClient.delete(`/upload/${filename}`);
    if (!response.success) {
      throw new Error(response.error || 'Failed to delete file');
    }
  }

  // Date parsing helpers
  private static parseProjectDates(project: any): Project {
    return {
      ...project,
      createdAt: new Date(project.createdAt),
      updatedAt: new Date(project.updatedAt),
    };
  }

  private static parseBlogPostDates(post: any): BlogPost {
    return {
      ...post,
      publishedAt: new Date(post.publishedAt),
      updatedAt: new Date(post.updatedAt),
    };
  }

  private static parseTestimonialDates(testimonial: any): Testimonial {
    return {
      ...testimonial,
      createdAt: new Date(testimonial.createdAt),
    };
  }

  private static parseSiteSettingsDates(settings: any): SiteSettings {
    return {
      ...settings,
      updatedAt: new Date(settings.updatedAt),
    };
  }

  // Analytics and Dashboard
  static async getDashboardStats(): Promise<{
    projects: { total: number; published: number; draft: number; featured: number };
    blog: { total: number; published: number; draft: number; featured: number };
    testimonials: { total: number; approved: number; pending: number; featured: number };
  }> {
    // This would typically be a single endpoint, but we'll aggregate from individual endpoints
    const [projects, blog, testimonials] = await Promise.all([
      this.getProjects(),
      this.getBlogPosts(),
      this.getTestimonials(),
    ]);

    return {
      projects: {
        total: projects.projects.length,
        published: projects.projects.filter(p => p.status === 'published').length,
        draft: projects.projects.filter(p => p.status === 'draft').length,
        featured: projects.projects.filter(p => p.featured).length,
      },
      blog: {
        total: blog.posts.length,
        published: blog.posts.filter(p => p.status === 'published').length,
        draft: blog.posts.filter(p => p.status === 'draft').length,
        featured: blog.posts.filter(p => p.featured).length,
      },
      testimonials: {
        total: testimonials.testimonials.length,
        approved: testimonials.testimonials.filter(t => t.approved).length,
        pending: testimonials.testimonials.filter(t => !t.approved).length,
        featured: testimonials.testimonials.filter(t => t.featured).length,
      },
    };
  }

  // Check if user is authenticated
  static isAuthenticated(): boolean {
    return !!AuthManager.getToken();
  }

  // Get the current auth token
  static getToken(): string | null {
    return AuthManager.getToken();
  }

  // Remove the auth token
  static removeToken(): void {
    AuthManager.removeToken();
  }
}

// Legacy support - keep the old AdminDataService interface for backward compatibility
export const AdminDataService = AdminApiService;
