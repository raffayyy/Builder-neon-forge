import { Request, Response } from 'express';
import { ProjectModel } from '../models/ProjectModel';

export class ProjectController {
  static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const status = req.query.status as string;
      const featured = req.query.featured === 'true' ? true : req.query.featured === 'false' ? false : undefined;
      const offset = (page - 1) * limit;

      const filters = {
        status,
        featured,
        limit,
        offset
      };

      const [projects, total] = await Promise.all([
        ProjectModel.findAll(filters),
        ProjectModel.count({ status, featured })
      ]);

      const totalPages = Math.ceil(total / limit);

      res.status(200).json({
        success: true,
        data: projects,
        pagination: {
          page,
          limit,
          total,
          totalPages
        }
      });
    } catch (error) {
      console.error('Get projects error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const project = await ProjectModel.findById(id);

      if (!project) {
        res.status(404).json({
          success: false,
          error: 'Project not found'
        });
      }

      res.status(200).json({
        success: true,
        data: project
      });
    } catch (error) {
      console.error('Get project error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const projectData = req.body;
      const project = await ProjectModel.create(projectData);

      res.status(201).json({
        success: true,
        data: project,
        message: 'Project created successfully'
      });
    } catch (error) {
      console.error('Create project error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const projectData = req.body;

      const project = await ProjectModel.update(id, projectData);

      if (!project) {
        res.status(404).json({
          success: false,
          error: 'Project not found'
        });
      }

      res.status(200).json({
        success: true,
        data: project,
        message: 'Project updated successfully'
      });
    } catch (error) {
      console.error('Update project error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await ProjectModel.delete(id);

      if (!deleted) {
        res.status(404).json({
          success: false,
          error: 'Project not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Project deleted successfully'
      });
    } catch (error) {
      console.error('Delete project error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  static async getFeatured(req: Request, res: Response): Promise<void> {
    try {
      const projects = await ProjectModel.findAll({
        featured: true,
        status: 'published',
        limit: 6
      });

      res.status(200).json({
        success: true,
        data: projects
      });
    } catch (error) {
      console.error('Get featured projects error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  static async getPublished(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 12;
      const offset = (page - 1) * limit;

      const [projects, total] = await Promise.all([
        ProjectModel.findAll({
          status: 'published',
          limit,
          offset
        }),
        ProjectModel.count({ status: 'published' })
      ]);

      const totalPages = Math.ceil(total / limit);

      res.status(200).json({
        success: true,
        data: projects,
        pagination: {
          page,
          limit,
          total,
          totalPages
        }
      });
    } catch (error) {
      console.error('Get published projects error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }
}
