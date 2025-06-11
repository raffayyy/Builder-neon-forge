import { Request, Response } from 'express';
import { TestimonialModel } from '../models/TestimonialModel';

export class TestimonialController {
  static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const featured = req.query.featured === 'true' ? true : req.query.featured === 'false' ? false : undefined;
      const approved = req.query.approved === 'true' ? true : req.query.approved === 'false' ? false : undefined;
      const offset = (page - 1) * limit;

      const filters = {
        featured,
        approved,
        limit,
        offset
      };

      const [testimonials, total] = await Promise.all([
        TestimonialModel.findAll(filters),
        TestimonialModel.count({ featured, approved })
      ]);

      const totalPages = Math.ceil(total / limit);

      res.status(200).json({
        success: true,
        data: testimonials,
        pagination: {
          page,
          limit,
          total,
          totalPages
        }
      });
    } catch (error) {
      console.error('Get testimonials error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const testimonial = await TestimonialModel.findById(id);

      if (!testimonial) {
        res.status(404).json({
          success: false,
          error: 'Testimonial not found'
        });
      }

      res.status(200).json({
        success: true,
        data: testimonial
      });
    } catch (error) {
      console.error('Get testimonial error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const testimonialData = req.body;
      const testimonial = await TestimonialModel.create(testimonialData);

      res.status(201).json({
        success: true,
        data: testimonial,
        message: 'Testimonial created successfully'
      });
    } catch (error) {
      console.error('Create testimonial error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const testimonialData = req.body;

      const testimonial = await TestimonialModel.update(id, testimonialData);

      if (!testimonial) {
        res.status(404).json({
          success: false,
          error: 'Testimonial not found'
        });
      }

      res.status(200).json({
        success: true,
        data: testimonial,
        message: 'Testimonial updated successfully'
      });
    } catch (error) {
      console.error('Update testimonial error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await TestimonialModel.delete(id);

      if (!deleted) {
        res.status(404).json({
          success: false,
          error: 'Testimonial not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Testimonial deleted successfully'
      });
    } catch (error) {
      console.error('Delete testimonial error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  static async getFeatured(req: Request, res: Response): Promise<void> {
    try {
      const testimonials = await TestimonialModel.findAll({
        featured: true,
        approved: true,
        limit: 6
      });

      res.status(200).json({
        success: true,
        data: testimonials
      });
    } catch (error) {
      console.error('Get featured testimonials error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  static async getApproved(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 12;
      const offset = (page - 1) * limit;

      const [testimonials, total] = await Promise.all([
        TestimonialModel.findAll({
          approved: true,
          limit,
          offset
        }),
        TestimonialModel.count({ approved: true })
      ]);

      const totalPages = Math.ceil(total / limit);

      res.status(200).json({
        success: true,
        data: testimonials,
        pagination: {
          page,
          limit,
          total,
          totalPages
        }
      });
    } catch (error) {
      console.error('Get approved testimonials error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }
}
