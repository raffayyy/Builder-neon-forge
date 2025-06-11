import { Router } from 'express';
import { BlogPostController } from '../controllers/BlogPostController';
import { authenticateToken, requireEditor } from '../middleware/auth';
import { validateBlogPost, validateBlogPostUpdate, validateId, validatePagination } from '../middleware/validation';

const router = Router();

// Public routes
router.get('/featured', BlogPostController.getFeatured);
router.get('/published', validatePagination, BlogPostController.getPublished);
router.get('/published/:id', validateId, BlogPostController.getById);

// Protected routes (require authentication)
router.get('/', authenticateToken, validatePagination, BlogPostController.getAll);
router.get('/:id', authenticateToken, validateId, BlogPostController.getById);
router.post('/', authenticateToken, requireEditor, validateBlogPost, BlogPostController.create);
router.put('/:id', authenticateToken, requireEditor, validateId, validateBlogPostUpdate, BlogPostController.update);
router.delete('/:id', authenticateToken, requireEditor, validateId, BlogPostController.delete);

export default router;
