import { SiteSettings } from '../types/index';
import { BaseModel } from './BaseModel';

export class SiteSettingsModel extends BaseModel {
  static async get(): Promise<SiteSettings | null> {
    const db = await this.getDb();
    const row = await db.get('SELECT * FROM site_settings WHERE id = ?', ['main']);
    return row ? this.mapRowToSiteSettings(row) : null;
  }

  static async update(settings: Partial<Omit<SiteSettings, 'id' | 'updatedAt'>>): Promise<SiteSettings | null> {
    const db = await this.getDb();
    const now = new Date().toISOString();

    const fields: string[] = [];
    const params: any[] = [];

    if (settings.general !== undefined) {
      fields.push('general_settings = ?');
      params.push(this.stringifyJsonField(settings.general));
    }
    if (settings.contact !== undefined) {
      fields.push('contact_settings = ?');
      params.push(this.stringifyJsonField(settings.contact));
    }
    if (settings.theme !== undefined) {
      fields.push('theme_settings = ?');
      params.push(this.stringifyJsonField(settings.theme));
    }
    if (settings.layout !== undefined) {
      fields.push('layout_settings = ?');
      params.push(this.stringifyJsonField(settings.layout));
    }
    if (settings.seo !== undefined) {
      fields.push('seo_settings = ?');
      params.push(this.stringifyJsonField(settings.seo));
    }

    if (fields.length === 0) {
      return await this.get();
    }

    fields.push('updated_at = ?');
    params.push(now);
    params.push('main');

    await db.run(
      `UPDATE site_settings SET ${fields.join(', ')} WHERE id = ?`,
      params
    );

    return await this.get();
  }

  static async create(settings: Omit<SiteSettings, 'id' | 'updatedAt'>): Promise<SiteSettings> {
    const db = await this.getDb();
    const now = new Date().toISOString();

    await db.run(`
      INSERT INTO site_settings (
        id, general_settings, contact_settings, theme_settings,
        layout_settings, seo_settings, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [
      'main',
      this.stringifyJsonField(settings.general),
      this.stringifyJsonField(settings.contact),
      this.stringifyJsonField(settings.theme),
      this.stringifyJsonField(settings.layout),
      this.stringifyJsonField(settings.seo),
      now
    ]);

    const newSettings = await this.get();
    if (!newSettings) throw new Error('Failed to create site settings');
    return newSettings;
  }

  private static mapRowToSiteSettings(row: any): SiteSettings {
    return {
      id: row.id,
      general: this.parseJsonField(row.general_settings) || {},
      contact: this.parseJsonField(row.contact_settings) || {},
      theme: this.parseJsonField(row.theme_settings) || {},
      layout: this.parseJsonField(row.layout_settings) || {},
      seo: this.parseJsonField(row.seo_settings) || {},
      updatedAt: this.parseDateTime(row.updated_at)
    };
  }
}
