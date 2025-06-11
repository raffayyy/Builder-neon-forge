import { Database } from 'sqlite';
import sqlite3 from 'sqlite3';
import { getDatabase } from '../config/database';

export abstract class BaseModel {
  protected static async getDb(): Promise<Database<sqlite3.Database, sqlite3.Statement>> {
    return await getDatabase();
  }

  protected static generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
  }

  protected static parseJsonField(field: string | null): any {
    if (!field) return null;
    try {
      return JSON.parse(field);
    } catch {
      return null;
    }
  }

  protected static stringifyJsonField(data: any): string {
    return JSON.stringify(data || {});
  }

  protected static formatDateTime(date: Date): string {
    return date.toISOString();
  }

  protected static parseDateTime(dateString: string): Date {
    return new Date(dateString);
  }
}
