import mysql from 'mysql2/promise';

// Database configuration
export const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'bykorp_agency',
  port: Number(process.env.DB_PORT) || 3306,
};

// Create connection pool
export const pool = mysql.createPool({
  ...dbConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Database initialization functions
export async function initializeDatabase() {
  try {
    // Create database if it doesn't exist
    const connection = await mysql.createConnection({
      host: dbConfig.host,
      user: dbConfig.user,
      password: dbConfig.password,
      port: dbConfig.port,
    });

    await connection.execute(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`);
    await connection.end();

    // Test the pool connection
    const testConnection = await pool.getConnection();
    console.log('MySQL connected successfully!');
    testConnection.release();
    
    // Create tables
    await createTables();
    
  } catch (error) {
    console.error('MySQL connection failed:', error);
    throw error;
  }
}

async function createTables() {
  try {
    // Create services table
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS services (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        price_starting VARCHAR(255),
        features TEXT,
        is_active BOOLEAN DEFAULT TRUE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Create portfolio_items table
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS portfolio_items (
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        category VARCHAR(255) NOT NULL,
        image_url VARCHAR(500),
        client_name VARCHAR(255),
        completion_date DATE,
        technologies TEXT,
        is_featured BOOLEAN DEFAULT FALSE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Create reservations table
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS reservations (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        company VARCHAR(255),
        service_type VARCHAR(255) NOT NULL,
        message TEXT,
        preferred_date DATE,
        status VARCHAR(50) DEFAULT 'pending',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Create reviews table
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS reviews (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        company VARCHAR(255) NOT NULL,
        role VARCHAR(255) NOT NULL,
        review TEXT NOT NULL,
        rating INT NOT NULL,
        photo_url VARCHAR(500),
        is_featured BOOLEAN DEFAULT FALSE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    console.log('Database tables created successfully!');
    
    // Insert sample data
    await insertSampleData();
    
  } catch (error) {
    console.error('Error creating tables:', error);
    throw error;
  }
}

async function insertSampleData() {
  try {
    // Check if services already exist
    const [existingServices] = await pool.execute('SELECT COUNT(*) as count FROM services');
    const servicesCount = (existingServices as any)[0].count;
    
    if (servicesCount === 0) {
      // Insert sample services
      await pool.execute(`
        INSERT INTO services (name, description, price_starting, features) VALUES
        ('Digital Marketing (Meta Ads)', 'Comprehensive digital marketing campaigns with Facebook and Instagram advertising to boost your brand visibility and drive conversions.', 'Starting at $1,500/month', 'Campaign Strategy,Ad Creation,Audience Targeting,Performance Analytics,Monthly Reports'),
        ('Social Media Management', 'Complete social media presence management across all platforms with content creation, scheduling, and community engagement.', 'Starting at $800/month', 'Content Creation,Post Scheduling,Community Management,Analytics,Brand Voice Development'),
        ('Website Building', 'Custom website development with modern design principles, responsive layouts, and optimized performance.', 'Starting at $3,000', 'Custom Design,Responsive Layout,SEO Optimization,Content Management,Analytics Integration'),
        ('AI Automations', 'Cutting-edge AI solutions to streamline your business processes and enhance customer experience.', 'Starting at $2,000', 'Process Automation,Chatbot Development,Data Analysis,Custom AI Solutions,Integration Support')
      `);

      // Insert sample portfolio items
      await pool.execute(`
        INSERT INTO portfolio_items (title, description, category, client_name, completion_date, technologies, is_featured) VALUES
        ('E-commerce Growth Campaign', 'Increased online sales by 340% through targeted Meta advertising and conversion optimization.', 'Digital Marketing', 'TechStyle Co.', '2024-08-15', 'Meta Ads,Google Analytics,Conversion Tracking', TRUE),
        ('Brand Website Redesign', 'Complete website overhaul with modern design and improved user experience.', 'Website Building', 'InnovateCorp', '2024-07-20', 'React,Node.js,PostgreSQL', TRUE),
        ('Social Media Strategy', 'Comprehensive social media campaign that boosted engagement by 250%.', 'Social Media Management', 'StyleHub Fashion', '2024-06-10', 'Instagram,Facebook,TikTok', FALSE)
      `);

      // Insert sample reviews
      await pool.execute(`
        INSERT INTO reviews (name, company, role, review, rating, photo_url, is_featured) VALUES
        ('Sarah Johnson', 'TechFlow Solutions', 'Marketing Director', 'Bykorp transformed our digital presence completely. Our sales increased by 340% in just 6 months! Their team is incredibly professional and results-driven.', 5, 'https://images.unsplash.com/photo-1494790108755-2616b612b8da?w=150&h=150&fit=crop&crop=face', TRUE),
        ('Michael Chen', 'GreenLife Foods', 'CEO & Founder', 'Their social media strategy helped us reach a whole new audience. Professional, creative, and results-driven. I couldn''t be happier with the outcome.', 5, 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', TRUE),
        ('Emily Rodriguez', 'CloudSync Solutions', 'Chief Technology Officer', 'The website they built for us perfectly captures our brand and converts visitors into customers. The attention to detail is exceptional.', 5, 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face', TRUE)
      `);

      console.log('Sample data inserted successfully!');
    }
  } catch (error) {
    console.error('Error inserting sample data:', error);
    // Don't throw error here as tables might already have data
  }
}