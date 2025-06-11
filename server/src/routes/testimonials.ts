import { Router } from 'express';
import { TestimonialController } from '../controllers/TestimonialController';
import { authenticateToken, requireEditor } from '../middleware/auth';
import { validateTestimonial, validateTestimonialUpdate, validateId, validatePagination } from '../middleware/validation';

const router = Router();

// Public routes
router.get('/featured', TestimonialController.getFeatured);
router.get('/approved', validatePagination, TestimonialController.getApproved);

// Protected routes (require authentication)
router.get('/', authenticateToken, validatePagination, TestimonialController.getAll);
router.get('/:id', authenticateToken, validateId, TestimonialController.getById);
router.post('/', authenticateToken, requireEditor, validateTestimonial, TestimonialController.create);
router.put('/:id', authenticateToken, requireEditor, validateId, validateTestimonialUpdate, TestimonialController.update);
router.delete('/:id', authenticateToken, requireEditor, validateId, TestimonialController.delete);

export default router;
