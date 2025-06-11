import { Project } from '../types/index';
import { BaseModel } from './BaseModel';

export class ProjectModel extends BaseModel {
  static async findAll(filters?: {
    status?: string;
    featured?: boolean;
    limit?: number;
    offset?: number;
  }): Promise<Project[]> {
    const db = await this.getDb();
    let query = 'SELECT * FROM projects';
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
    return rows.map(row => this.mapRowToProject(row));
  }

  static async findById(id: string): Promise<Project | null> {
    const db = await this.getDb();
    const row = await db.get('SELECT * FROM projects WHERE id = ?', [id]);
    return row ? this.mapRowToProject(row) : null;
  }

  static async create(projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
    const db = await this.getDb();
    const id = this.generateId();
    const now = new Date().toISOString();

    await db.run(`
      INSERT INTO projects (
        id, title, description, long_description, technologies, image, gallery,
        github_url, live_url, status, featured, created_at, updated_at,
        collaborators, metrics
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      id,
      projectData.title,
      projectData.description,
      projectData.longDescription || '',
      this.stringifyJsonField(projectData.technologies),
      projectData.image,
      this.stringifyJsonField(projectData.gallery || []),
      projectData.githubUrl || '',
      projectData.liveUrl || '',
      projectData.status,
      projectData.featured ? 1 : 0,
      now,
      now,
      this.stringifyJsonField(projectData.collaborators || []),
      this.stringifyJsonField(projectData.metrics || { views: 0, likes: 0, shares: 0 })
    ]);

    const newProject = await this.findById(id);
    if (!newProject) throw new Error('Failed to create project');
    return newProject;
  }

  static async update(id: string, projectData: Partial<Omit<Project, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Project | null> {
    const db = await this.getDb();
    const now = new Date().toISOString();

    const fields: string[] = [];
    const params: any[] = [];

    if (projectData.title !== undefined) {
      fields.push('title = ?');
      params.push(projectData.title);
    }
    if (projectData.description !== undefined) {
      fields.push('description = ?');
      params.push(projectData.description);
    }
    if (projectData.longDescription !== undefined) {
      fields.push('long_description = ?');
      params.push(projectData.longDescription);
    }
    if (projectData.technologies !== undefined) {
      fields.push('technologies = ?');
      params.push(this.stringifyJsonField(projectData.technologies));
    }
    if (projectData.image !== undefined) {
      fields.push('image = ?');
      params.push(projectData.image);
    }
    if (projectData.gallery !== undefined) {
      fields.push('gallery = ?');
      params.push(this.stringifyJsonField(projectData.gallery));
    }
    if (projectData.githubUrl !== undefined) {
      fields.push('github_url = ?');
      params.push(projectData.githubUrl);
    }
    if (projectData.liveUrl !== undefined) {
      fields.push('live_url = ?');
      params.push(projectData.liveUrl);
    }
    if (projectData.status !== undefined) {
      fields.push('status = ?');
      params.push(projectData.status);
    }
    if (projectData.featured !== undefined) {
      fields.push('featured = ?');
      params.push(projectData.featured ? 1 : 0);
    }
    if (projectData.collaborators !== undefined) {
      fields.push('collaborators = ?');
      params.push(this.stringifyJsonField(projectData.collaborators));
    }
    if (projectData.metrics !== undefined) {
      fields.push('metrics = ?');
      params.push(this.stringifyJsonField(projectData.metrics));
    }

    if (fields.length === 0) {
      return await this.findById(id);
    }

    fields.push('updated_at = ?');
    params.push(now);
    params.push(id);

    await db.run(
      `UPDATE projects SET ${fields.join(', ')} WHERE id = ?`,
      params
    );

    return await this.findById(id);
  }

  static async delete(id: string): Promise<boolean> {
    const db = await this.getDb();
    const result = await db.run('DELETE FROM projects WHERE id = ?', [id]);
    return (result.changes || 0) > 0;
  }

  static async count(filters?: { status?: string; featured?: boolean }): Promise<number> {
    const db = await this.getDb();
    let query = 'SELECT COUNT(*) as count FROM projects';
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

  private static mapRowToProject(row: any): Project {
    return {
      id: row.id,
      title: row.title,
      description: row.description,
      longDescription: row.long_description || undefined,
      technologies: this.parseJsonField(row.technologies) || [],
      image: row.image,
      gallery: this.parseJsonField(row.gallery) || undefined,
      githubUrl: row.github_url || undefined,
      liveUrl: row.live_url || undefined,
      status: row.status,
      featured: Boolean(row.featured),
      createdAt: this.parseDateTime(row.created_at),
      updatedAt: this.parseDateTime(row.updated_at),
      collaborators: this.parseJsonField(row.collaborators) || undefined,
      metrics: this.parseJsonField(row.metrics) || undefined
    };
  }
}
