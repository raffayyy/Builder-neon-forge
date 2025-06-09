// Admin data service for handling API calls and data persistence
// In a real application, this would connect to your backend API

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

// Mock data storage (replace with actual API calls)
let mockData = {
  projects: [
    {
      id: "1",
      title: "Portfolio Website",
      description: "A modern, responsive portfolio website built with React and TypeScript",
      longDescription: "This portfolio website showcases my skills and projects with a modern design, smooth animations, and responsive layout. Built with React, TypeScript, and Tailwind CSS.",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
      image: "/api/placeholder/600/400",
      gallery: ["/api/placeholder/600/400", "/api/placeholder/600/400"],
      githubUrl: "https://github.com/username/portfolio",
      liveUrl: "https://portfolio.example.com",
      status: "published" as const,
      featured: true,
      createdAt: new Date("2024-01-15"),
      updatedAt: new Date("2024-02-01"),
      collaborators: [
        { name: "John Doe", role: "Lead Developer", avatar: "/api/placeholder/40/40" }
      ],
      metrics: { views: 1250, likes: 89, shares: 23 }
    },
    {
      id: "2",
      title: "E-commerce Platform",
      description: "Full-stack e-commerce solution with payment integration",
      technologies: ["Next.js", "Node.js", "PostgreSQL", "Stripe"],
      image: "/api/placeholder/600/400",
      githubUrl: "https://github.com/username/ecommerce",
      status: "published" as const,
      featured: false,
      createdAt: new Date("2024-02-10"),
      updatedAt: new Date("2024-02-15"),
      metrics: { views: 892, likes: 45, shares: 12 }
    }
  ] as Project[],
  
  blogPosts: [
    {
      id: "1",
      title: "Getting Started with React 18",
      excerpt: "Learn about the new features and improvements in React 18",
      content: "# Getting Started with React 18\n\nReact 18 introduces several new features...",
      author: "John Doe",
      publishedAt: new Date("2024-01-20"),
      updatedAt: new Date("2024-01-22"),
      status: "published" as const,
      featured: true,
      tags: ["React", "JavaScript", "Frontend"],
      readTime: 5,
      image: "/api/placeholder/600/300",
      seo: {
        metaTitle: "Getting Started with React 18 - Complete Guide",
        metaDescription: "Learn about React 18 new features, concurrent rendering, and how to upgrade your applications.",
        keywords: ["React 18", "JavaScript", "Frontend Development"]
      }
    }
  ] as BlogPost[],
  
  testimonials: [
    {
      id: "1",
      name: "Sarah Johnson",
      role: "Product Manager",
      company: "Tech Corp",
      content: "John delivered exceptional work on our project. His attention to detail and technical expertise made all the difference.",
      rating: 5,
      avatar: "/api/placeholder/60/60",
      featured: true,
      createdAt: new Date("2024-01-10"),
      approved: true
    }
  ] as Testimonial[],
  
  settings: {
    general: {
      siteName: "John Doe Portfolio",
      tagline: "Full Stack Developer & UI/UX Designer",
      description: "Passionate developer creating amazing digital experiences",
      logo: "/api/placeholder/120/40",
      favicon: "/favicon.ico"
    },
    contact: {
      email: "john@example.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      socialLinks: {
        github: "https://github.com/johndoe",
        linkedin: "https://linkedin.com/in/johndoe",
        twitter: "https://twitter.com/johndoe"
      }
    },
    theme: {
      primaryColor: "#3b82f6",
      secondaryColor: "#1e293b",
      accentColor: "#f59e0b",
      darkMode: true
    },
    layout: {
      sections: [
        { id: "hero", name: "Hero", enabled: true, order: 1 },
        { id: "about", name: "About", enabled: true, order: 2 },
        { id: "projects", name: "Projects", enabled: true, order: 3 },
        { id: "experience", name: "Experience", enabled: true, order: 4 },
        { id: "testimonials", name: "Testimonials", enabled: true, order: 5 },
        { id: "contact", name: "Contact", enabled: true, order: 6 }
      ],
      containerWidth: "normal" as const,
      spacing: "normal" as const,
      borderRadius: "medium" as const
    },
    seo: {
      defaultTitle: "John Doe - Full Stack Developer",
      defaultDescription: "Experienced full stack developer specializing in React, Node.js, and modern web technologies.",
      defaultKeywords: ["Full Stack Developer", "React", "Node.js", "JavaScript", "TypeScript"],
      ogImage: "/api/placeholder/1200/630",
      twitterCard: "summary_large_image" as const,
      structuredData: {
        "@type": "Person",
        "name": "John Doe",
        "jobTitle": "Full Stack Developer",
        "url": "https://johndoe.dev"
      }
    }
  } as SiteSettings
};

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class AdminDataService {
  // Projects
  static async getProjects(): Promise<Project[]> {
    await delay(500);
    return mockData.projects;
  }

  static async getProject(id: string): Promise<Project | null> {
    await delay(300);
    return mockData.projects.find(p => p.id === id) || null;
  }

  static async createProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
    await delay(800);
    const newProject: Project = {
      ...project,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    mockData.projects.push(newProject);
    return newProject;
  }

  static async updateProject(id: string, updates: Partial<Project>): Promise<Project> {
    await delay(600);
    const index = mockData.projects.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Project not found');
    
    mockData.projects[index] = {
      ...mockData.projects[index],
      ...updates,
      updatedAt: new Date()
    };
    return mockData.projects[index];
  }

  static async deleteProject(id: string): Promise<void> {
    await delay(400);
    mockData.projects = mockData.projects.filter(p => p.id !== id);
  }

  // Blog Posts
  static async getBlogPosts(): Promise<BlogPost[]> {
    await delay(500);
    return mockData.blogPosts;
  }

  static async getBlogPost(id: string): Promise<BlogPost | null> {
    await delay(300);
    return mockData.blogPosts.find(p => p.id === id) || null;
  }

  static async createBlogPost(post: Omit<BlogPost, 'id' | 'publishedAt' | 'updatedAt'>): Promise<BlogPost> {
    await delay(800);
    const newPost: BlogPost = {
      ...post,
      id: Date.now().toString(),
      publishedAt: new Date(),
      updatedAt: new Date()
    };
    mockData.blogPosts.push(newPost);
    return newPost;
  }

  static async updateBlogPost(id: string, updates: Partial<BlogPost>): Promise<BlogPost> {
    await delay(600);
    const index = mockData.blogPosts.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Blog post not found');
    
    mockData.blogPosts[index] = {
      ...mockData.blogPosts[index],
      ...updates,
      updatedAt: new Date()
    };
    return mockData.blogPosts[index];
  }

  static async deleteBlogPost(id: string): Promise<void> {
    await delay(400);
    mockData.blogPosts = mockData.blogPosts.filter(p => p.id !== id);
  }

  // Testimonials
  static async getTestimonials(): Promise<Testimonial[]> {
    await delay(500);
    return mockData.testimonials;
  }

  static async createTestimonial(testimonial: Omit<Testimonial, 'id' | 'createdAt'>): Promise<Testimonial> {
    await delay(600);
    const newTestimonial: Testimonial = {
      ...testimonial,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    mockData.testimonials.push(newTestimonial);
    return newTestimonial;
  }

  static async updateTestimonial(id: string, updates: Partial<Testimonial>): Promise<Testimonial> {
    await delay(400);
    const index = mockData.testimonials.findIndex(t => t.id === id);
    if (index === -1) throw new Error('Testimonial not found');
    
    mockData.testimonials[index] = { ...mockData.testimonials[index], ...updates };
    return mockData.testimonials[index];
  }

  static async deleteTestimonial(id: string): Promise<void> {
    await delay(300);
    mockData.testimonials = mockData.testimonials.filter(t => t.id !== id);
  }

  // Settings
  static async getSettings(): Promise<SiteSettings> {
    await delay(400);
    return mockData.settings;
  }

  static async updateSettings(updates: Partial<SiteSettings>): Promise<SiteSettings> {
    await delay(600);
    mockData.settings = { ...mockData.settings, ...updates };
    return mockData.settings;
  }

  // Bulk operations
  static async reorderSections(sections: Array<{ id: string; order: number }>): Promise<void> {
    await delay(400);
    sections.forEach(({ id, order }) => {
      const section = mockData.settings.layout.sections.find(s => s.id === id);
      if (section) section.order = order;
    });
    mockData.settings.layout.sections.sort((a, b) => a.order - b.order);
  }

  static async toggleSectionVisibility(sectionId: string, enabled: boolean): Promise<void> {
    await delay(300);
    const section = mockData.settings.layout.sections.find(s => s.id === sectionId);
    if (section) section.enabled = enabled;
  }

  // Import/Export
  static async exportData(): Promise<string> {
    await delay(1000);
    return JSON.stringify(mockData, null, 2);
  }

  static async importData(data: string): Promise<void> {
    await delay(1500);
    try {
      const parsed = JSON.parse(data);
      mockData = { ...mockData, ...parsed };
    } catch (error) {
      throw new Error('Invalid data format');
    }
  }

  // Analytics (mock data)
  static async getAnalytics(timeRange: string) {
    await delay(800);
    return {
      visitors: Math.floor(Math.random() * 10000) + 5000,
      pageViews: Math.floor(Math.random() * 25000) + 15000,
      bounceRate: Math.floor(Math.random() * 40) + 20,
      avgSessionDuration: `${Math.floor(Math.random() * 3) + 2}m ${Math.floor(Math.random() * 60)}s`,
      topPages: [
        { page: "/", views: Math.floor(Math.random() * 5000) + 3000 },
        { page: "/projects", views: Math.floor(Math.random() * 3000) + 2000 },
        { page: "/about", views: Math.floor(Math.random() * 2000) + 1000 }
      ]
    };
  }
}

// Authentication helpers
export class AuthService {
  private static readonly ADMIN_CREDENTIALS = {
    username: "admin",
    password: "admin123"
  };

  private static readonly SESSION_KEY = "admin_session";

  static async login(username: string, password: string): Promise<boolean> {
    await delay(1000);
    const isValid = username === this.ADMIN_CREDENTIALS.username && 
                   password === this.ADMIN_CREDENTIALS.password;
    
    if (isValid) {
      const session = {
        user: { name: "Admin User", role: "admin" },
        timestamp: Date.now(),
        expires: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
      };
      localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
    }
    
    return isValid;
  }

  static logout(): void {
    localStorage.removeItem(this.SESSION_KEY);
  }

  static isAuthenticated(): boolean {
    const session = localStorage.getItem(this.SESSION_KEY);
    if (!session) return false;
    
    try {
      const parsed = JSON.parse(session);
      return parsed.expires > Date.now();
    } catch {
      return false;
    }
  }

  static getUser() {
    const session = localStorage.getItem(this.SESSION_KEY);
    if (!session) return null;
    
    try {
      const parsed = JSON.parse(session);
      return parsed.expires > Date.now() ? parsed.user : null;
    } catch {
      return null;
    }
  }
}
