import { Router } from 'express';
import { ProjectController } from '../controllers/ProjectController';
import { authenticateToken, requireEditor } from '../middleware/auth';
import { validateProject, validateProjectUpdate, validateId, validatePagination } from '../middleware/validation';

const router = Router();

// Public routes
router.get('/featured', ProjectController.getFeatured);
router.get('/published', validatePagination, ProjectController.getPublished);
router.get('/published/:id', validateId, ProjectController.getById);

// Protected routes (require authentication)
router.get('/', authenticateToken, validatePagination, ProjectController.getAll);
router.get('/:id', authenticateToken, validateId, ProjectController.getById);
router.post('/', authenticateToken, requireEditor, validateProject, ProjectController.create);
router.put('/:id', authenticateToken, requireEditor, validateId, validateProjectUpdate, ProjectController.update);
router.delete('/:id', authenticateToken, requireEditor, validateId, ProjectController.delete);

export default router;
