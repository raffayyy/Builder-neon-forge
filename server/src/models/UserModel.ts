import { User } from '../types/index';
import { BaseModel } from './BaseModel';
import bcrypt from 'bcryptjs';

export class UserModel extends BaseModel {
  static async findAll(): Promise<Omit<User, 'password'>[]> {
    const db = await this.getDb();
    const rows = await db.all('SELECT id, username, email, role, created_at, last_login, is_active FROM users ORDER BY created_at DESC');
    return rows.map(row => this.mapRowToUser(row));
  }

  static async findById(id: string): Promise<Omit<User, 'password'> | null> {
    const db = await this.getDb();
    const row = await db.get('SELECT id, username, email, role, created_at, last_login, is_active FROM users WHERE id = ?', [id]);
    return row ? this.mapRowToUser(row) : null;
  }

  static async findByUsername(username: string): Promise<User | null> {
    const db = await this.getDb();
    const row = await db.get('SELECT * FROM users WHERE username = ?', [username]);
    return row ? this.mapRowToUserWithPassword(row) : null;
  }

  static async findByEmail(email: string): Promise<User | null> {
    const db = await this.getDb();
    const row = await db.get('SELECT * FROM users WHERE email = ?', [email]);
    return row ? this.mapRowToUserWithPassword(row) : null;
  }

  static async create(userData: Omit<User, 'id' | 'createdAt' | 'lastLogin' | 'isActive'>): Promise<Omit<User, 'password'>> {
    const db = await this.getDb();
    const id = this.generateId();
    const now = new Date().toISOString();
    const hashedPassword = await bcrypt.hash(userData.password, 12);

    await db.run(`
      INSERT INTO users (id, username, email, password, role, created_at, is_active)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [
      id,
      userData.username,
      userData.email,
      hashedPassword,
      userData.role,
      now,
      1
    ]);

    const newUser = await this.findById(id);
    if (!newUser) throw new Error('Failed to create user');
    return newUser;
  }

  static async update(id: string, userData: Partial<Omit<User, 'id' | 'createdAt'>>): Promise<Omit<User, 'password'> | null> {
    const db = await this.getDb();

    const fields: string[] = [];
    const params: any[] = [];

    if (userData.username !== undefined) {
      fields.push('username = ?');
      params.push(userData.username);
    }
    if (userData.email !== undefined) {
      fields.push('email = ?');
      params.push(userData.email);
    }
    if (userData.password !== undefined) {
      fields.push('password = ?');
      params.push(await bcrypt.hash(userData.password, 12));
    }
    if (userData.role !== undefined) {
      fields.push('role = ?');
      params.push(userData.role);
    }
    if (userData.lastLogin !== undefined) {
      fields.push('last_login = ?');
      params.push(this.formatDateTime(userData.lastLogin));
    }
    if (userData.isActive !== undefined) {
      fields.push('is_active = ?');
      params.push(userData.isActive ? 1 : 0);
    }

    if (fields.length === 0) {
      return await this.findById(id);
    }

    params.push(id);

    await db.run(
      `UPDATE users SET ${fields.join(', ')} WHERE id = ?`,
      params
    );

    return await this.findById(id);
  }

  static async updateLastLogin(id: string): Promise<void> {
    const db = await this.getDb();
    const now = new Date().toISOString();
    await db.run('UPDATE users SET last_login = ? WHERE id = ?', [now, id]);
  }

  static async delete(id: string): Promise<boolean> {
    const db = await this.getDb();
    const result = await db.run('DELETE FROM users WHERE id = ?', [id]);
    return (result.changes || 0) > 0;
  }

  static async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  static async count(): Promise<number> {
    const db = await this.getDb();
    const result = await db.get('SELECT COUNT(*) as count FROM users');
    return result.count;
  }

  private static mapRowToUser(row: any): Omit<User, 'password'> {
    return {
      id: row.id,
      username: row.username,
      email: row.email,
      role: row.role,
      createdAt: this.parseDateTime(row.created_at),
      lastLogin: row.last_login ? this.parseDateTime(row.last_login) : undefined,
      isActive: Boolean(row.is_active)
    };
  }

  private static mapRowToUserWithPassword(row: any): User {
    return {
      id: row.id,
      username: row.username,
      email: row.email,
      password: row.password,
      role: row.role,
      createdAt: this.parseDateTime(row.created_at),
      lastLogin: row.last_login ? this.parseDateTime(row.last_login) : undefined,
      isActive: Boolean(row.is_active)
    };
  }
}
