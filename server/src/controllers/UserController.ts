import { Request, Response } from 'express';
import { UserModel } from '../models/UserModel';

export class UserController {
  static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const users = await UserModel.findAll();

      res.status(200).json({
        success: true,
        data: users
      });
    } catch (error) {
      console.error('Get users error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = await UserModel.findById(id);

      if (!user) {
        res.status(404).json({
          success: false,
          error: 'User not found'
        });
      }

      res.status(200).json({
        success: true,
        data: user
      });
    } catch (error) {
      console.error('Get user error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const userData = req.body;

      // Check if username or email already exists
      const existingUser = await UserModel.findByUsername(userData.username);
      if (existingUser) {
        res.status(400).json({
          success: false,
          error: 'Username already exists'
        });
      }

      const existingEmail = await UserModel.findByEmail(userData.email);
      if (existingEmail) {
        res.status(400).json({
          success: false,
          error: 'Email already exists'
        });
      }

      const user = await UserModel.create(userData);

      res.status(201).json({
        success: true,
        data: user,
        message: 'User created successfully'
      });
    } catch (error) {
      console.error('Create user error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userData = req.body;

      // Check if username or email already exists (excluding current user)
      if (userData.username) {
        const existingUser = await UserModel.findByUsername(userData.username);
        if (existingUser && existingUser.id !== id) {
          res.status(400).json({
            success: false,
            error: 'Username already exists'
          });
        }
      }

      if (userData.email) {
        const existingEmail = await UserModel.findByEmail(userData.email);
        if (existingEmail && existingEmail.id !== id) {
          res.status(400).json({
            success: false,
            error: 'Email already exists'
          });
        }
      }

      const user = await UserModel.update(id, userData);

      if (!user) {
        res.status(404).json({
          success: false,
          error: 'User not found'
        });
      }

      res.status(200).json({
        success: true,
        data: user,
        message: 'User updated successfully'
      });
    } catch (error) {
      console.error('Update user error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      // Prevent deletion of admin user
      const user = await UserModel.findById(id);
      if (user && user.role === 'admin') {
        res.status(400).json({
          success: false,
          error: 'Cannot delete admin user'
        });
      }

      const deleted = await UserModel.delete(id);

      if (!deleted) {
        res.status(404).json({
          success: false,
          error: 'User not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'User deleted successfully'
      });
    } catch (error) {
      console.error('Delete user error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }
}
