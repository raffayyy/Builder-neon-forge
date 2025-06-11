const { initializeDatabase, getDatabase } = require('./config/database');

async function clearDummyData() {
  console.log('🧹 Clearing dummy data from database...');
  
  try {
    await initializeDatabase();
    const db = await getDatabase();
    
    // Clear all dummy data tables (keep admin user and site settings)
    await db.run('DELETE FROM projects');
    await db.run('DELETE FROM blog_posts');
    await db.run('DELETE FROM testimonials');
    
    console.log('✅ Dummy data cleared successfully');
    console.log('📊 Remaining data:');
    
    // Show what's left in the database
    const userCount = await db.get('SELECT COUNT(*) as count FROM users');
    const settingsCount = await db.get('SELECT COUNT(*) as count FROM site_settings');
    const projectCount = await db.get('SELECT COUNT(*) as count FROM projects');
    const blogCount = await db.get('SELECT COUNT(*) as count FROM blog_posts');
    const testimonialCount = await db.get('SELECT COUNT(*) as count FROM testimonials');
    
    console.log(`- Users: ${userCount.count} (admin user only)`);
    console.log(`- Site Settings: ${settingsCount.count} (default settings only)`);
    console.log(`- Projects: ${projectCount.count}`);
    console.log(`- Blog Posts: ${blogCount.count}`);
    console.log(`- Testimonials: ${testimonialCount.count}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error clearing dummy data:', error);
    process.exit(1);
  }
}

clearDummyData();
