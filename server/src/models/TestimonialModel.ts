import { Testimonial } from '../types/index';
import { BaseModel } from './BaseModel';

export class TestimonialModel extends BaseModel {
  static async findAll(filters?: {
    featured?: boolean;
    approved?: boolean;
    limit?: number;
    offset?: number;
  }): Promise<Testimonial[]> {
    const db = await this.getDb();
    let query = 'SELECT * FROM testimonials';
    const params: any[] = [];
    const conditions: string[] = [];

    if (filters?.featured !== undefined) {
      conditions.push('featured = ?');
      params.push(filters.featured ? 1 : 0);
    }

    if (filters?.approved !== undefined) {
      conditions.push('approved = ?');
      params.push(filters.approved ? 1 : 0);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY created_at DESC';

    if (filters?.limit) {
      query += ' LIMIT ?';
      params.push(filters.limit);
      
      if (filters?.offset) {
        query += ' OFFSET ?';
        params.push(filters.offset);
      }
    }

    const rows = await db.all(query, params);
    return rows.map(row => this.mapRowToTestimonial(row));
  }

  static async findById(id: string): Promise<Testimonial | null> {
    const db = await this.getDb();
    const row = await db.get('SELECT * FROM testimonials WHERE id = ?', [id]);
    return row ? this.mapRowToTestimonial(row) : null;
  }

  static async create(testimonialData: Omit<Testimonial, 'id' | 'createdAt'>): Promise<Testimonial> {
    const db = await this.getDb();
    const id = this.generateId();
    const now = new Date().toISOString();

    await db.run(`
      INSERT INTO testimonials (
        id, name, role, company, content, rating, avatar,
        featured, created_at, approved
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      id,
      testimonialData.name,
      testimonialData.role,
      testimonialData.company,
      testimonialData.content,
      testimonialData.rating,
      testimonialData.avatar || '',
      testimonialData.featured ? 1 : 0,
      now,
      testimonialData.approved ? 1 : 0
    ]);

    const newTestimonial = await this.findById(id);
    if (!newTestimonial) throw new Error('Failed to create testimonial');
    return newTestimonial;
  }

  static async update(id: string, testimonialData: Partial<Omit<Testimonial, 'id' | 'createdAt'>>): Promise<Testimonial | null> {
    const db = await this.getDb();

    const fields: string[] = [];
    const params: any[] = [];

    if (testimonialData.name !== undefined) {
      fields.push('name = ?');
      params.push(testimonialData.name);
    }
    if (testimonialData.role !== undefined) {
      fields.push('role = ?');
      params.push(testimonialData.role);
    }
    if (testimonialData.company !== undefined) {
      fields.push('company = ?');
      params.push(testimonialData.company);
    }
    if (testimonialData.content !== undefined) {
      fields.push('content = ?');
      params.push(testimonialData.content);
    }
    if (testimonialData.rating !== undefined) {
      fields.push('rating = ?');
      params.push(testimonialData.rating);
    }
    if (testimonialData.avatar !== undefined) {
      fields.push('avatar = ?');
      params.push(testimonialData.avatar);
    }
    if (testimonialData.featured !== undefined) {
      fields.push('featured = ?');
      params.push(testimonialData.featured ? 1 : 0);
    }
    if (testimonialData.approved !== undefined) {
      fields.push('approved = ?');
      params.push(testimonialData.approved ? 1 : 0);
    }

    if (fields.length === 0) {
      return await this.findById(id);
    }

    params.push(id);

    await db.run(
      `UPDATE testimonials SET ${fields.join(', ')} WHERE id = ?`,
      params
    );

    return await this.findById(id);
  }

  static async delete(id: string): Promise<boolean> {
    const db = await this.getDb();
    const result = await db.run('DELETE FROM testimonials WHERE id = ?', [id]);
    return (result.changes || 0) > 0;
  }

  static async count(filters?: { featured?: boolean; approved?: boolean }): Promise<number> {
    const db = await this.getDb();
    let query = 'SELECT COUNT(*) as count FROM testimonials';
    const params: any[] = [];
    const conditions: string[] = [];

    if (filters?.featured !== undefined) {
      conditions.push('featured = ?');
      params.push(filters.featured ? 1 : 0);
    }

    if (filters?.approved !== undefined) {
      conditions.push('approved = ?');
      params.push(filters.approved ? 1 : 0);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    const result = await db.get(query, params);
    return result.count;
  }

  private static mapRowToTestimonial(row: any): Testimonial {
    return {
      id: row.id,
      name: row.name,
      role: row.role,
      company: row.company,
      content: row.content,
      rating: row.rating,
      avatar: row.avatar || undefined,
      featured: Boolean(row.featured),
      createdAt: this.parseDateTime(row.created_at),
      approved: Boolean(row.approved)
    };
  }
}
