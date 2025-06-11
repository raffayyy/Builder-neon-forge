import { Router } from 'express';
import { SiteSettingsController } from '../controllers/SiteSettingsController';
import { authenticateToken, requireEditor } from '../middleware/auth';
import { body } from 'express-validator';
import { handleValidationErrors } from '../middleware/validation';

const router = Router();

// Public route to get settings (for frontend display)
router.get('/', SiteSettingsController.get);

// Protected routes (require authentication)
router.put('/', 
  authenticateToken, 
  requireEditor,
  [
    body('general').optional().isObject().withMessage('General settings must be an object'),
    body('contact').optional().isObject().withMessage('Contact settings must be an object'),
    body('theme').optional().isObject().withMessage('Theme settings must be an object'),
    body('layout').optional().isObject().withMessage('Layout settings must be an object'),
    body('seo').optional().isObject().withMessage('SEO settings must be an object'),
    handleValidationErrors
  ],
  SiteSettingsController.update
);

router.put('/general', 
  authenticateToken, 
  requireEditor,
  [
    body('siteName').optional().trim().isLength({ min: 1, max: 100 }).withMessage('Site name must be between 1 and 100 characters'),
    body('tagline').optional().trim().isLength({ max: 200 }).withMessage('Tagline must be less than 200 characters'),
    body('description').optional().trim().isLength({ max: 500 }).withMessage('Description must be less than 500 characters'),
    handleValidationErrors
  ],
  SiteSettingsController.updateGeneral
);

router.put('/contact', 
  authenticateToken, 
  requireEditor,
  [
    body('email').optional().isEmail().withMessage('Valid email is required'),
    body('phone').optional().trim().isLength({ max: 20 }).withMessage('Phone must be less than 20 characters'),
    body('location').optional().trim().isLength({ max: 200 }).withMessage('Location must be less than 200 characters'),
    body('socialLinks').optional().isObject().withMessage('Social links must be an object'),
    handleValidationErrors
  ],
  SiteSettingsController.updateContact
);

router.put('/theme', 
  authenticateToken, 
  requireEditor,
  [
    body('primaryColor').optional().isHexColor().withMessage('Primary color must be a valid hex color'),
    body('secondaryColor').optional().isHexColor().withMessage('Secondary color must be a valid hex color'),
    body('accentColor').optional().isHexColor().withMessage('Accent color must be a valid hex color'),
    body('darkMode').optional().isBoolean().withMessage('Dark mode must be boolean'),
    handleValidationErrors
  ],
  SiteSettingsController.updateTheme
);

router.put('/layout', 
  authenticateToken, 
  requireEditor,
  [
    body('sections').optional().isArray().withMessage('Sections must be an array'),
    body('containerWidth').optional().isIn(['narrow', 'normal', 'wide']).withMessage('Container width must be narrow, normal, or wide'),
    body('spacing').optional().isIn(['compact', 'normal', 'relaxed']).withMessage('Spacing must be compact, normal, or relaxed'),
    body('borderRadius').optional().isIn(['none', 'small', 'medium', 'large']).withMessage('Border radius must be none, small, medium, or large'),
    handleValidationErrors
  ],
  SiteSettingsController.updateLayout
);

router.put('/seo', 
  authenticateToken, 
  requireEditor,
  [
    body('defaultTitle').optional().trim().isLength({ min: 1, max: 100 }).withMessage('Default title must be between 1 and 100 characters'),
    body('defaultDescription').optional().trim().isLength({ min: 1, max: 200 }).withMessage('Default description must be between 1 and 200 characters'),
    body('defaultKeywords').optional().isArray().withMessage('Default keywords must be an array'),
    body('twitterCard').optional().isIn(['summary', 'summary_large_image']).withMessage('Twitter card must be summary or summary_large_image'),
    handleValidationErrors
  ],
  SiteSettingsController.updateSEO
);

export default router;
