import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { validateLogin } from '../middleware/validation';
import { authenticateToken } from '../middleware/auth';
import { body } from 'express-validator';

const router = Router();

// Login
router.post('/login', validateLogin, AuthController.login);

// Logout
router.post('/logout', authenticateToken, AuthController.logout);

// Get current user profile
router.get('/profile', authenticateToken, AuthController.profile);

// Change password
router.post('/change-password', 
  authenticateToken,
  [
    body('currentPassword').isLength({ min: 1 }).withMessage('Current password is required'),
    body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters')
  ],
  AuthController.changePassword
);

export default router;
