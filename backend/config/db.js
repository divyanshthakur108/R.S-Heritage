const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Helper to run query
const query = (text, params) => pool.query(text, params);

const initializeDatabase = async () => {
  try {
    console.log('🔌 Connecting to Neon PostgreSQL database...');
    
    // Test connection
    await query('SELECT NOW()');
    console.log('✅ PostgreSQL database connection established.');

    // 1. Create Users/Admins Table
    await query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'admin',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('📋 Verified "users" table exists.');

    // 2. Create Bookings/Inquiries Table
    await query(`
      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        location VARCHAR(255),
        event_date DATE NOT NULL,
        guest_count VARCHAR(100),
        event_type VARCHAR(100) NOT NULL,
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('📋 Verified "bookings" table exists.');

    // 3. Create Availability Table
    await query(`
      CREATE TABLE IF NOT EXISTS availability (
        date_str VARCHAR(10) PRIMARY KEY,
        status VARCHAR(50) NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('📋 Verified "availability" table exists.');

    // 4. Seed Default Admin
    const defaultUser = process.env.ADMIN_USERNAME || 'admin';
    const defaultPass = process.env.ADMIN_PASSWORD || 'admin123';
    
    const adminCheck = await query('SELECT * FROM users WHERE username = $1', [defaultUser]);
    if (adminCheck.rows.length === 0) {
      await query(
        'INSERT INTO users (username, password, role) VALUES ($1, $2, $3)',
        [defaultUser, defaultPass, 'admin']
      );
      console.log(`👤 Seeded default admin user: "${defaultUser}"`);
    } else {
      console.log('👤 Admin user already exists in database.');
    }

  } catch (error) {
    console.error('❌ Database initialization error:', error.message);
  }
};

module.exports = {
  query,
  initializeDatabase,
  pool
};
