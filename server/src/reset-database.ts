const { initializeDatabase, getDatabase } = require('./config/database');

async function resetDatabase() {
  console.log('🔄 Resetting database and creating new user...');
  
  try {
    await initializeDatabase();
    const db = await getDatabase();
    
    // Clear ALL data from all tables
    console.log('🗑️  Clearing all data...');
    await db.run('DELETE FROM projects');
    await db.run('DELETE FROM blog_posts');
    await db.run('DELETE FROM testimonials');
    await db.run('DELETE FROM users');
    await db.run('DELETE FROM site_settings');
    
    // Create new user with specified credentials
    console.log('👤 Creating new user: raffayyy');
    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash('dev235358', 12);
    
    await db.run(`
      INSERT INTO users (id, username, email, password, role, is_active)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [
      'user-raffayyy',
      'raffayyy',
      'raffayyy@portfolio.com',
      hashedPassword,
      'admin',
      1
    ]);

    // Create default site settings only
    console.log('⚙️  Creating default site settings...');
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
    
    console.log('✅ Database reset complete!');
    console.log('📊 Final state:');
    
    // Show final counts
    const userCount = await db.get('SELECT COUNT(*) as count FROM users');
    const settingsCount = await db.get('SELECT COUNT(*) as count FROM site_settings');
    const projectCount = await db.get('SELECT COUNT(*) as count FROM projects');
    const blogCount = await db.get('SELECT COUNT(*) as count FROM blog_posts');
    const testimonialCount = await db.get('SELECT COUNT(*) as count FROM testimonials');
    
    console.log(`- Users: ${userCount.count} (raffayyy user only)`);
    console.log(`- Site Settings: ${settingsCount.count} (default settings only)`);
    console.log(`- Projects: ${projectCount.count}`);
    console.log(`- Blog Posts: ${blogCount.count}`);
    console.log(`- Testimonials: ${testimonialCount.count}`);
    
    console.log('\n🔑 Login credentials:');
    console.log('Username: raffayyy');
    console.log('Password: dev235358');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error resetting database:', error);
    process.exit(1);
  }
}

resetDatabase();
