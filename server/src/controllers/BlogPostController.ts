import { Request, Response } from 'express';
import { BlogPostModel } from '../models/BlogPostModel';

export class BlogPostController {
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

      const [posts, total] = await Promise.all([
        BlogPostModel.findAll(filters),
        BlogPostModel.count({ status, featured })
      ]);

      const totalPages = Math.ceil(total / limit);

      res.json({
        success: true,
        data: posts,
        pagination: {
          page,
          limit,
          total,
          totalPages
        }
      });
    } catch (error) {
      console.error('Get blog posts error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const post = await BlogPostModel.findById(id);

      if (!post) {
        res.status(404).json({
          success: false,
          error: 'Blog post not found'
        });
        return;
      }

      res.json({
        success: true,
        data: post
      });
    } catch (error) {
      console.error('Get blog post error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const postData = req.body;
      const post = await BlogPostModel.create(postData);

      res.status(201).json({
        success: true,
        data: post,
        message: 'Blog post created successfully'
      });
    } catch (error) {
      console.error('Create blog post error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const postData = req.body;

      const post = await BlogPostModel.update(id, postData);

      if (!post) {
        res.status(404).json({
          success: false,
          error: 'Blog post not found'
        });
        return;
      }

      res.json({
        success: true,
        data: post,
        message: 'Blog post updated successfully'
      });
    } catch (error) {
      console.error('Update blog post error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await BlogPostModel.delete(id);

      if (!deleted) {
        res.status(404).json({
          success: false,
          error: 'Blog post not found'
        });
        return;
      }

      res.json({
        success: true,
        message: 'Blog post deleted successfully'
      });
    } catch (error) {
      console.error('Delete blog post error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  static async getFeatured(req: Request, res: Response): Promise<void> {
    try {
      const posts = await BlogPostModel.findAll({
        featured: true,
        status: 'published',
        limit: 3
      });

      res.json({
        success: true,
        data: posts
      });
    } catch (error) {
      console.error('Get featured blog posts error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  static async getPublished(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const offset = (page - 1) * limit;

      const [posts, total] = await Promise.all([
        BlogPostModel.findAll({
          status: 'published',
          limit,
          offset
        }),
        BlogPostModel.count({ status: 'published' })
      ]);

      const totalPages = Math.ceil(total / limit);

      res.json({
        success: true,
        data: posts,
        pagination: {
          page,
          limit,
          total,
          totalPages
        }
      });
    } catch (error) {
      console.error('Get published blog posts error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }
}
