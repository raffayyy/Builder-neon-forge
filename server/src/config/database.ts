import sqlite3 from 'sqlite3';
import { Database, open } from 'sqlite';
import path from 'path';
import fs from 'fs';

let db: Database<sqlite3.Database, sqlite3.Statement> | null = null;

export async function initializeDatabase(): Promise<Database<sqlite3.Database, sqlite3.Statement>> {
  if (db) return db;

  // Ensure data directory exists
  const dataDir = path.dirname(process.env.DB_PATH || './data/portfolio.db');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  db = await open({
    filename: process.env.DB_PATH || './data/portfolio.db',
    driver: sqlite3.Database
  });

  await createTables();
  await seedDatabase();
  
  return db;
}

async function createTables() {
  if (!db) throw new Error('Database not initialized');

  // Users table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT DEFAULT 'editor',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      last_login DATETIME,
      is_active BOOLEAN DEFAULT 1
    )
  `);

  // Projects table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      long_description TEXT,
      technologies TEXT NOT NULL,
      image TEXT,
      gallery TEXT,
      github_url TEXT,
      live_url TEXT,
      status TEXT DEFAULT 'draft',
      featured BOOLEAN DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      collaborators TEXT,
      metrics TEXT
    )
  `);

  // Blog posts table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS blog_posts (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      excerpt TEXT NOT NULL,
      content TEXT NOT NULL,
      author TEXT NOT NULL,
      published_at DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      status TEXT DEFAULT 'draft',
      featured BOOLEAN DEFAULT 0,
      tags TEXT,
      read_time INTEGER DEFAULT 5,
      image TEXT,
      seo_data TEXT
    )
  `);

  // Testimonials table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS testimonials (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      role TEXT NOT NULL,
      company TEXT NOT NULL,
      content TEXT NOT NULL,
      rating INTEGER DEFAULT 5,
      avatar TEXT,
      featured BOOLEAN DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      approved BOOLEAN DEFAULT 0
    )
  `);

  // Site settings table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS site_settings (
      id TEXT PRIMARY KEY DEFAULT 'main',
      general_settings TEXT,
      contact_settings TEXT,
      theme_settings TEXT,
      layout_settings TEXT,
      seo_settings TEXT,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  console.log('✅ Database tables created successfully');
}

async function seedDatabase() {
  if (!db) throw new Error('Database not initialized');

  // Check if admin user exists
  const adminUsername = process.env.ADMIN_USERNAME || 'raffayyy';
  const adminExists = await db.get('SELECT id FROM users WHERE username = ?', [adminUsername]);
  
  if (!adminExists) {
    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'dev235358', 12);
    
    await db.run(`
      INSERT INTO users (id, username, email, password, role, is_active)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [
      'user-raffayyy',
      adminUsername,
      'raffayyy@portfolio.com',
      hashedPassword,
      'admin',
      1
    ]);

    console.log(`✅ Admin user "${adminUsername}" created`);
  } else {
    console.log(`✅ Admin user "${adminUsername}" already exists`);
  }

  // Check if site settings exist
  const settingsExist = await db.get('SELECT id FROM site_settings WHERE id = ?', ['main']);
  
  if (!settingsExist) {
    const defaultSettings = {
      general: {
        siteName: "Portfolio",
        tagline: "Building the Future",
        description: "A modern portfolio showcasing innovative projects and expertise",
        logo: "",
        favicon: ""
      },
      contact: {
        email: "contact@portfolio.com",
        phone: "",
        location: "",
        socialLinks: {
          github: "https://github.com",
          linkedin: "https://linkedin.com",
          twitter: "https://twitter.com"
        }
      },
      theme: {
        primaryColor: "#3b82f6",
        secondaryColor: "#8b5cf6",
        accentColor: "#06b6d4",
        darkMode: true
      },
      layout: {
        sections: [
          { id: "hero", name: "Hero", enabled: true, order: 1 },
          { id: "about", name: "About", enabled: true, order: 2 },
          { id: "projects", name: "Projects", enabled: true, order: 3 },
          { id: "experience", name: "Experience", enabled: true, order: 4 },
          { id: "testimonials", name: "Testimonials", enabled: true, order: 5 },
          { id: "contact", name: "Contact", enabled: true, order: 6 }
        ],
        containerWidth: "normal",
        spacing: "normal",
        borderRadius: "medium"
      },
      seo: {
        defaultTitle: "Portfolio | Building the Future",
        defaultDescription: "A modern portfolio showcasing innovative projects and expertise",
        defaultKeywords: ["portfolio", "developer", "projects", "web development"],
        ogImage: "",
        twitterCard: "summary_large_image",
        structuredData: {}
      }
    };

    await db.run(`
      INSERT INTO site_settings (id, general_settings, contact_settings, theme_settings, layout_settings, seo_settings)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [
      'main',
      JSON.stringify(defaultSettings.general),
      JSON.stringify(defaultSettings.contact),
      JSON.stringify(defaultSettings.theme),
      JSON.stringify(defaultSettings.layout),
      JSON.stringify(defaultSettings.seo)
    ]);

    console.log('✅ Default site settings created');
  }

  console.log('✅ Database initialized successfully');
}

export async function getDatabase(): Promise<Database<sqlite3.Database, sqlite3.Statement>> {
  if (!db) {
    throw new Error('Database not initialized. Call initializeDatabase() first.');
  }
  return db;
}

export async function closeDatabase(): Promise<void> {
  if (db) {
    await db.close();
    db = null;
  }
}
