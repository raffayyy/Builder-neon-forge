import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { UserModel } from "../models/UserModel";
import { AuthRequest } from "../types/index";

export class AuthController {
  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;

      // Find user
      const user = await UserModel.findByUsername(username);
      if (!user || !user.isActive) {
        res.status(401).json({
          success: false,
          error: "Invalid credentials",
        });
        return;
      }

      // Validate password
      const isValidPassword = await UserModel.validatePassword(
        password,
        user.password,
      );
      if (!isValidPassword) {
        res.status(401).json({
          success: false,
          error: "Invalid credentials",
        });
        return;
      }

      // Update last login
      await UserModel.updateLastLogin(user.id);

      // Generate JWT token
      const secret = process.env.JWT_SECRET || "fallback-secret";
      const token = jwt.sign(
        { userId: user.id } as any,
        secret,
        { expiresIn: process.env.TOKEN_EXPIRY || "24h" } as any
      );

      // Remove password from response
      const { password: _, ...userWithoutPassword } = user;

      res.json({
        success: true,
        data: {
          user: userWithoutPassword,
          token,
        },
        message: "Login successful",
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  }

  static async logout(req: AuthRequest, res: Response): Promise<void> {
    try {
      res.json({
        success: true,
        message: "Logout successful",
      });
    } catch (error) {
      console.error("Logout error:", error);
      res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  }

  static async profile(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          error: "User not authenticated",
        });
        return;
      }

      res.json({
        success: true,
        data: req.user,
      });
    } catch (error) {
      console.error("Profile error:", error);
      res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  }

  static async changePassword(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { currentPassword, newPassword } = req.body;

      if (!req.user) {
        res.status(401).json({
          success: false,
          error: "User not authenticated",
        });
        return;
      }

      // Get user with password
      const userWithPassword = await UserModel.findByUsername(
        req.user.username,
      );
      if (!userWithPassword) {
        res.status(404).json({
          success: false,
          error: "User not found",
        });
        return;
      }

      // Validate current password
      const isValidPassword = await UserModel.validatePassword(
        currentPassword,
        userWithPassword.password,
      );
      if (!isValidPassword) {
        res.status(400).json({
          success: false,
          error: "Current password is incorrect",
        });
        return;
      }

      // Update password
      await UserModel.update(req.user.id, { password: newPassword });

      res.json({
        success: true,
        message: "Password changed successfully",
      });
    } catch (error) {
      console.error("Change password error:", error);
      res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  }
}
