import { BlogPost } from '../types/index';
import { BaseModel } from './BaseModel';

export class BlogPostModel extends BaseModel {
  static async findAll(filters?: {
    status?: string;
    featured?: boolean;
    limit?: number;
    offset?: number;
  }): Promise<BlogPost[]> {
    const db = await this.getDb();
    let query = 'SELECT * FROM blog_posts';
    const params: any[] = [];
    const conditions: string[] = [];

    if (filters?.status) {
      conditions.push('status = ?');
      params.push(filters.status);
    }

    if (filters?.featured !== undefined) {
      conditions.push('featured = ?');
      params.push(filters.featured ? 1 : 0);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY published_at DESC, created_at DESC';

    if (filters?.limit) {
      query += ' LIMIT ?';
      params.push(filters.limit);
      
      if (filters?.offset) {
        query += ' OFFSET ?';
        params.push(filters.offset);
      }
    }

    const rows = await db.all(query, params);
    return rows.map(row => this.mapRowToBlogPost(row));
  }

  static async findById(id: string): Promise<BlogPost | null> {
    const db = await this.getDb();
    const row = await db.get('SELECT * FROM blog_posts WHERE id = ?', [id]);
    return row ? this.mapRowToBlogPost(row) : null;
  }

  static async create(blogData: Omit<BlogPost, 'id' | 'updatedAt'>): Promise<BlogPost> {
    const db = await this.getDb();
    const id = this.generateId();
    const now = new Date().toISOString();

    await db.run(`
      INSERT INTO blog_posts (
        id, title, excerpt, content, author, published_at, updated_at,
        status, featured, tags, read_time, image, seo_data
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      id,
      blogData.title,
      blogData.excerpt,
      blogData.content,
      blogData.author,
      this.formatDateTime(blogData.publishedAt),
      now,
      blogData.status,
      blogData.featured ? 1 : 0,
      this.stringifyJsonField(blogData.tags),
      blogData.readTime,
      blogData.image || '',
      this.stringifyJsonField(blogData.seo)
    ]);

    const newPost = await this.findById(id);
    if (!newPost) throw new Error('Failed to create blog post');
    return newPost;
  }

  static async update(id: string, blogData: Partial<Omit<BlogPost, 'id' | 'updatedAt'>>): Promise<BlogPost | null> {
    const db = await this.getDb();
    const now = new Date().toISOString();

    const fields: string[] = [];
    const params: any[] = [];

    if (blogData.title !== undefined) {
      fields.push('title = ?');
      params.push(blogData.title);
    }
    if (blogData.excerpt !== undefined) {
      fields.push('excerpt = ?');
      params.push(blogData.excerpt);
    }
    if (blogData.content !== undefined) {
      fields.push('content = ?');
      params.push(blogData.content);
    }
    if (blogData.author !== undefined) {
      fields.push('author = ?');
      params.push(blogData.author);
    }
    if (blogData.publishedAt !== undefined) {
      fields.push('published_at = ?');
      params.push(this.formatDateTime(blogData.publishedAt));
    }
    if (blogData.status !== undefined) {
      fields.push('status = ?');
      params.push(blogData.status);
    }
    if (blogData.featured !== undefined) {
      fields.push('featured = ?');
      params.push(blogData.featured ? 1 : 0);
    }
    if (blogData.tags !== undefined) {
      fields.push('tags = ?');
      params.push(this.stringifyJsonField(blogData.tags));
    }
    if (blogData.readTime !== undefined) {
      fields.push('read_time = ?');
      params.push(blogData.readTime);
    }
    if (blogData.image !== undefined) {
      fields.push('image = ?');
      params.push(blogData.image);
    }
    if (blogData.seo !== undefined) {
      fields.push('seo_data = ?');
      params.push(this.stringifyJsonField(blogData.seo));
    }

    if (fields.length === 0) {
      return await this.findById(id);
    }

    fields.push('updated_at = ?');
    params.push(now);
    params.push(id);

    await db.run(
      `UPDATE blog_posts SET ${fields.join(', ')} WHERE id = ?`,
      params
    );

    return await this.findById(id);
  }

  static async delete(id: string): Promise<boolean> {
    const db = await this.getDb();
    const result = await db.run('DELETE FROM blog_posts WHERE id = ?', [id]);
    return (result.changes || 0) > 0;
  }

  static async count(filters?: { status?: string; featured?: boolean }): Promise<number> {
    const db = await this.getDb();
    let query = 'SELECT COUNT(*) as count FROM blog_posts';
    const params: any[] = [];
    const conditions: string[] = [];

    if (filters?.status) {
      conditions.push('status = ?');
      params.push(filters.status);
    }

    if (filters?.featured !== undefined) {
      conditions.push('featured = ?');
      params.push(filters.featured ? 1 : 0);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    const result = await db.get(query, params);
    return result.count;
  }

  private static mapRowToBlogPost(row: any): BlogPost {
    return {
      id: row.id,
      title: row.title,
      excerpt: row.excerpt,
      content: row.content,
      author: row.author,
      publishedAt: this.parseDateTime(row.published_at),
      updatedAt: this.parseDateTime(row.updated_at),
      status: row.status,
      featured: Boolean(row.featured),
      tags: this.parseJsonField(row.tags) || [],
      readTime: row.read_time,
      image: row.image || undefined,
      seo: this.parseJsonField(row.seo_data) || {
        metaTitle: row.title,
        metaDescription: row.excerpt,
        keywords: []
      }
    };
  }
}
