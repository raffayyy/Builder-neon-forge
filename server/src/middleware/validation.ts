import { body, param, query, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const handleValidationErrors = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: errors.array()
    });
    return;
  }
  next();
};

// Project validation
export const validateProject = [
  body('title').trim().isLength({ min: 1, max: 200 }).withMessage('Title is required and must be less than 200 characters'),
  body('description').trim().isLength({ min: 1, max: 500 }).withMessage('Description is required and must be less than 500 characters'),
  body('longDescription').optional().trim().isLength({ max: 5000 }).withMessage('Long description must be less than 5000 characters'),
  body('technologies').isArray({ min: 1 }).withMessage('At least one technology is required'),
  body('technologies.*').trim().isLength({ min: 1 }).withMessage('Technology names cannot be empty'),
  body('image').trim().isLength({ min: 1 }).withMessage('Image is required'),
  body('gallery').optional().isArray().withMessage('Gallery must be an array'),
  body('githubUrl').optional().isURL().withMessage('GitHub URL must be valid'),
  body('liveUrl').optional().isURL().withMessage('Live URL must be valid'),
  body('status').isIn(['draft', 'published', 'archived']).withMessage('Status must be draft, published, or archived'),
  body('featured').isBoolean().withMessage('Featured must be boolean'),
  body('collaborators').optional().isArray().withMessage('Collaborators must be an array'),
  body('metrics').optional().isObject().withMessage('Metrics must be an object'),
  handleValidationErrors
];

export const validateProjectUpdate = [
  body('title').optional().trim().isLength({ min: 1, max: 200 }).withMessage('Title must be less than 200 characters'),
  body('description').optional().trim().isLength({ min: 1, max: 500 }).withMessage('Description must be less than 500 characters'),
  body('longDescription').optional().trim().isLength({ max: 5000 }).withMessage('Long description must be less than 5000 characters'),
  body('technologies').optional().isArray({ min: 1 }).withMessage('At least one technology is required'),
  body('technologies.*').optional().trim().isLength({ min: 1 }).withMessage('Technology names cannot be empty'),
  body('image').optional().trim().isLength({ min: 1 }).withMessage('Image cannot be empty'),
  body('gallery').optional().isArray().withMessage('Gallery must be an array'),
  body('githubUrl').optional().isURL().withMessage('GitHub URL must be valid'),
  body('liveUrl').optional().isURL().withMessage('Live URL must be valid'),
  body('status').optional().isIn(['draft', 'published', 'archived']).withMessage('Status must be draft, published, or archived'),
  body('featured').optional().isBoolean().withMessage('Featured must be boolean'),
  body('collaborators').optional().isArray().withMessage('Collaborators must be an array'),
  body('metrics').optional().isObject().withMessage('Metrics must be an object'),
  handleValidationErrors
];

// Blog post validation
export const validateBlogPost = [
  body('title').trim().isLength({ min: 1, max: 200 }).withMessage('Title is required and must be less than 200 characters'),
  body('excerpt').trim().isLength({ min: 1, max: 500 }).withMessage('Excerpt is required and must be less than 500 characters'),
  body('content').trim().isLength({ min: 1 }).withMessage('Content is required'),
  body('author').trim().isLength({ min: 1, max: 100 }).withMessage('Author is required and must be less than 100 characters'),
  body('publishedAt').isISO8601().withMessage('Published date must be valid ISO8601 date'),
  body('status').isIn(['draft', 'published', 'archived']).withMessage('Status must be draft, published, or archived'),
  body('featured').isBoolean().withMessage('Featured must be boolean'),
  body('tags').isArray().withMessage('Tags must be an array'),
  body('tags.*').trim().isLength({ min: 1 }).withMessage('Tag names cannot be empty'),
  body('readTime').isInt({ min: 1, max: 120 }).withMessage('Read time must be between 1 and 120 minutes'),
  body('image').optional().trim().isLength({ min: 1 }).withMessage('Image URL cannot be empty'),
  body('seo').isObject().withMessage('SEO data must be an object'),
  body('seo.metaTitle').trim().isLength({ min: 1, max: 100 }).withMessage('Meta title is required and must be less than 100 characters'),
  body('seo.metaDescription').trim().isLength({ min: 1, max: 200 }).withMessage('Meta description is required and must be less than 200 characters'),
  body('seo.keywords').isArray().withMessage('Keywords must be an array'),
  handleValidationErrors
];

export const validateBlogPostUpdate = [
  body('title').optional().trim().isLength({ min: 1, max: 200 }).withMessage('Title must be less than 200 characters'),
  body('excerpt').optional().trim().isLength({ min: 1, max: 500 }).withMessage('Excerpt must be less than 500 characters'),
  body('content').optional().trim().isLength({ min: 1 }).withMessage('Content cannot be empty'),
  body('author').optional().trim().isLength({ min: 1, max: 100 }).withMessage('Author must be less than 100 characters'),
  body('publishedAt').optional().isISO8601().withMessage('Published date must be valid ISO8601 date'),
  body('status').optional().isIn(['draft', 'published', 'archived']).withMessage('Status must be draft, published, or archived'),
  body('featured').optional().isBoolean().withMessage('Featured must be boolean'),
  body('tags').optional().isArray().withMessage('Tags must be an array'),
  body('tags.*').optional().trim().isLength({ min: 1 }).withMessage('Tag names cannot be empty'),
  body('readTime').optional().isInt({ min: 1, max: 120 }).withMessage('Read time must be between 1 and 120 minutes'),
  body('image').optional().trim().isLength({ min: 1 }).withMessage('Image URL cannot be empty'),
  body('seo').optional().isObject().withMessage('SEO data must be an object'),
  body('seo.metaTitle').optional().trim().isLength({ min: 1, max: 100 }).withMessage('Meta title must be less than 100 characters'),
  body('seo.metaDescription').optional().trim().isLength({ min: 1, max: 200 }).withMessage('Meta description must be less than 200 characters'),
  body('seo.keywords').optional().isArray().withMessage('Keywords must be an array'),
  handleValidationErrors
];

// Testimonial validation
export const validateTestimonial = [
  body('name').trim().isLength({ min: 1, max: 100 }).withMessage('Name is required and must be less than 100 characters'),
  body('role').trim().isLength({ min: 1, max: 100 }).withMessage('Role is required and must be less than 100 characters'),
  body('company').trim().isLength({ min: 1, max: 100 }).withMessage('Company is required and must be less than 100 characters'),
  body('content').trim().isLength({ min: 1, max: 1000 }).withMessage('Content is required and must be less than 1000 characters'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('avatar').optional().trim().isLength({ min: 1 }).withMessage('Avatar URL cannot be empty'),
  body('featured').isBoolean().withMessage('Featured must be boolean'),
  body('approved').isBoolean().withMessage('Approved must be boolean'),
  handleValidationErrors
];

export const validateTestimonialUpdate = [
  body('name').optional().trim().isLength({ min: 1, max: 100 }).withMessage('Name must be less than 100 characters'),
  body('role').optional().trim().isLength({ min: 1, max: 100 }).withMessage('Role must be less than 100 characters'),
  body('company').optional().trim().isLength({ min: 1, max: 100 }).withMessage('Company must be less than 100 characters'),
  body('content').optional().trim().isLength({ min: 1, max: 1000 }).withMessage('Content must be less than 1000 characters'),
  body('rating').optional().isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('avatar').optional().trim().isLength({ min: 1 }).withMessage('Avatar URL cannot be empty'),
  body('featured').optional().isBoolean().withMessage('Featured must be boolean'),
  body('approved').optional().isBoolean().withMessage('Approved must be boolean'),
  handleValidationErrors
];

// User validation
export const validateUser = [
  body('username').trim().isLength({ min: 3, max: 50 }).withMessage('Username must be between 3 and 50 characters'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').isIn(['admin', 'editor', 'viewer']).withMessage('Role must be admin, editor, or viewer'),
  handleValidationErrors
];

export const validateUserUpdate = [
  body('username').optional().trim().isLength({ min: 3, max: 50 }).withMessage('Username must be between 3 and 50 characters'),
  body('email').optional().isEmail().withMessage('Valid email is required'),
  body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').optional().isIn(['admin', 'editor', 'viewer']).withMessage('Role must be admin, editor, or viewer'),
  body('isActive').optional().isBoolean().withMessage('IsActive must be boolean'),
  handleValidationErrors
];

// Login validation
export const validateLogin = [
  body('username').trim().isLength({ min: 1 }).withMessage('Username is required'),
  body('password').isLength({ min: 1 }).withMessage('Password is required'),
  handleValidationErrors
];

// ID parameter validation
export const validateId = [
  param('id').trim().isLength({ min: 1 }).withMessage('ID is required'),
  handleValidationErrors
];

// Pagination validation
export const validatePagination = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('status').optional().isIn(['draft', 'published', 'archived']).withMessage('Status must be draft, published, or archived'),
  query('featured').optional().isBoolean().withMessage('Featured must be boolean'),
  handleValidationErrors
];
