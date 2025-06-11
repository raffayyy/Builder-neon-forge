import { ProjectModel } from '../models/ProjectModel';
import { Project } from '../types/index';

export class ProjectService {
  static async getAllProjects(filters: {
    status?: string;
    featured?: boolean;
    page?: number;
    limit?: number;
  }) {
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const offset = (page - 1) * limit;

    const queryFilters = {
      status: filters.status,
      featured: filters.featured,
      limit,
      offset
    };

    const [projects, total] = await Promise.all([
      ProjectModel.findAll(queryFilters),
      ProjectModel.count({ status: filters.status, featured: filters.featured })
    ]);

    return {
      projects,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  static async getFeaturedProjects() {
    return await ProjectModel.findAll({
      featured: true,
      status: 'published',
      limit: 6
    });
  }

  static async getPublishedProjects(page: number = 1, limit: number = 12) {
    const offset = (page - 1) * limit;
    
    const [projects, total] = await Promise.all([
      ProjectModel.findAll({
        status: 'published',
        limit,
        offset
      }),
      ProjectModel.count({ status: 'published' })
    ]);

    return {
      projects,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  static async getProjectById(id: string) {
    return await ProjectModel.findById(id);
  }

  static async createProject(projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) {
    // Validate required fields
    if (!projectData.title || !projectData.description) {
      throw new Error('Title and description are required');
    }

    if (!projectData.technologies || projectData.technologies.length === 0) {
      throw new Error('At least one technology is required');
    }

    return await ProjectModel.create(projectData);
  }

  static async updateProject(id: string, projectData: Partial<Omit<Project, 'id' | 'createdAt' | 'updatedAt'>>) {
    const existingProject = await ProjectModel.findById(id);
    if (!existingProject) {
      throw new Error('Project not found');
    }

    return await ProjectModel.update(id, projectData);
  }

  static async deleteProject(id: string) {
    const existingProject = await ProjectModel.findById(id);
    if (!existingProject) {
      throw new Error('Project not found');
    }

    return await ProjectModel.delete(id);
  }

  static async getProjectStats() {
    const [total, published, draft, featured] = await Promise.all([
      ProjectModel.count(),
      ProjectModel.count({ status: 'published' }),
      ProjectModel.count({ status: 'draft' }),
      ProjectModel.count({ featured: true })
    ]);

    return {
      total,
      published,
      draft,
      featured
    };
  }
}
