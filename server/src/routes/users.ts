import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { authenticateToken, requireAdmin } from '../middleware/auth';
import { validateUser, validateUserUpdate, validateId } from '../middleware/validation';

const router = Router();

// All user routes require admin authentication
router.use(authenticateToken, requireAdmin);

router.get('/', UserController.getAll);
router.get('/:id', validateId, UserController.getById);
router.post('/', validateUser, UserController.create);
router.put('/:id', validateId, validateUserUpdate, UserController.update);
router.delete('/:id', validateId, UserController.delete);

export default router;
