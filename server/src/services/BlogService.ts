import { BlogPostModel } from '../models/BlogPostModel';
import { BlogPost } from '../types/index';

export class BlogService {
  static async getAllBlogPosts(filters: {
    status?: string;
    featured?: boolean;
    page?: number;
    limit?: number;
  }) {
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const offset = (page - 1) * limit;

    const queryFilters = {
      status: filters.status,
      featured: filters.featured,
      limit,
      offset
    };

    const [posts, total] = await Promise.all([
      BlogPostModel.findAll(queryFilters),
      BlogPostModel.count({ status: filters.status, featured: filters.featured })
    ]);

    return {
      posts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  static async getFeaturedPosts() {
    return await BlogPostModel.findAll({
      featured: true,
      status: 'published',
      limit: 3
    });
  }

  static async getPublishedPosts(page: number = 1, limit: number = 10) {
    const offset = (page - 1) * limit;
    
    const [posts, total] = await Promise.all([
      BlogPostModel.findAll({
        status: 'published',
        limit,
        offset
      }),
      BlogPostModel.count({ status: 'published' })
    ]);

    return {
      posts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  static async getBlogPostById(id: string) {
    return await BlogPostModel.findById(id);
  }

  static async createBlogPost(postData: Omit<BlogPost, 'id' | 'updatedAt'>) {
    // Validate required fields
    if (!postData.title || !postData.excerpt || !postData.content) {
      throw new Error('Title, excerpt, and content are required');
    }

    if (!postData.author) {
      throw new Error('Author is required');
    }

    if (!postData.seo || !postData.seo.metaTitle || !postData.seo.metaDescription) {
      throw new Error('SEO meta title and description are required');
    }

    // Calculate read time if not provided
    if (!postData.readTime) {
      const wordsPerMinute = 200;
      const wordCount = postData.content.split(/\s+/).length;
      postData.readTime = Math.ceil(wordCount / wordsPerMinute);
    }

    return await BlogPostModel.create(postData);
  }

  static async updateBlogPost(id: string, postData: Partial<Omit<BlogPost, 'id' | 'updatedAt'>>) {
    const existingPost = await BlogPostModel.findById(id);
    if (!existingPost) {
      throw new Error('Blog post not found');
    }

    // Recalculate read time if content is updated
    if (postData.content) {
      const wordsPerMinute = 200;
      const wordCount = postData.content.split(/\s+/).length;
      postData.readTime = Math.ceil(wordCount / wordsPerMinute);
    }

    return await BlogPostModel.update(id, postData);
  }

  static async deleteBlogPost(id: string) {
    const existingPost = await BlogPostModel.findById(id);
    if (!existingPost) {
      throw new Error('Blog post not found');
    }

    return await BlogPostModel.delete(id);
  }

  static async getBlogStats() {
    const [total, published, draft, featured] = await Promise.all([
      BlogPostModel.count(),
      BlogPostModel.count({ status: 'published' }),
      BlogPostModel.count({ status: 'draft' }),
      BlogPostModel.count({ featured: true })
    ]);

    return {
      total,
      published,
      draft,
      featured
    };
  }

  static calculateReadTime(content: string): number {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  }
}
