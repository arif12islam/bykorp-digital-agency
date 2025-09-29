import sqlite3 from 'sqlite3';
import { promisify } from 'util';

// SQLite database setup
const DB_PATH = './bykorp_agency.db';

class Database {
  private db: sqlite3.Database;
  public run: (sql: string, params?: any[]) => Promise<any>;
  public get: (sql: string, params?: any[]) => Promise<any>;
  public all: (sql: string, params?: any[]) => Promise<any[]>;

  constructor() {
    this.db = new sqlite3.Database(DB_PATH, (err) => {
      if (err) {
        console.error('Error opening database:', err);
      } else {
        console.log('SQLite database connected successfully!');
      }
    });

    // Create promisified methods with proper return values
    this.run = (sql: string, params?: any[]): Promise<any> => {
      return new Promise((resolve, reject) => {
        this.db.run(sql, params || [], function(err) {
          if (err) reject(err);
          else resolve(this);
        });
      });
    };

    this.get = (sql: string, params?: any[]): Promise<any> => {
      return new Promise((resolve, reject) => {
        this.db.get(sql, params || [], (err, row) => {
          if (err) reject(err);
          else resolve(row);
        });
      });
    };

    this.all = (sql: string, params?: any[]): Promise<any[]> => {
      return new Promise((resolve, reject) => {
        this.db.all(sql, params || [], (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        });
      });
    };
  }

  async initialize() {
    try {
      await this.createTables();
      await this.insertSampleData();
    } catch (error) {
      console.error('Error initializing database:', error);
      throw error;
    }
  }

  private async createTables() {
    const tables = [
      `CREATE TABLE IF NOT EXISTS services (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        price_starting TEXT,
        features TEXT,
        is_active BOOLEAN DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS portfolio_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        category TEXT NOT NULL,
        image_url TEXT,
        client_name TEXT,
        completion_date DATE,
        technologies TEXT,
        is_featured BOOLEAN DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS reservations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        company TEXT,
        service_type TEXT NOT NULL,
        message TEXT,
        preferred_date DATE,
        status TEXT DEFAULT 'pending',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS reviews (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        company TEXT NOT NULL,
        role TEXT NOT NULL,
        review TEXT NOT NULL,
        rating INTEGER NOT NULL,
        photo_url TEXT,
        is_featured BOOLEAN DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`
    ];

    for (const table of tables) {
      await this.run(table);
    }

    console.log('Database tables created successfully!');
  }

  private async insertSampleData() {
    try {
      // Check if services already exist
      const existingServices = await this.get('SELECT COUNT(*) as count FROM services') as { count: number };
      
      if (existingServices.count === 0) {
        // Insert sample services from migration 1.sql
        const services = [
          ['Digital Marketing (Meta Ads)', 'Comprehensive digital marketing campaigns with Facebook and Instagram advertising to boost your brand visibility and drive conversions.', 'Starting at $1,500/month', 'Campaign Strategy,Ad Creation,Audience Targeting,Performance Analytics,Monthly Reports'],
          ['Social Media Management', 'Complete social media presence management across all platforms with content creation, scheduling, and community engagement.', 'Starting at $800/month', 'Content Creation,Post Scheduling,Community Management,Analytics,Brand Voice Development'],
          ['Website Building', 'Custom website development with modern design principles, responsive layouts, and optimized performance.', 'Starting at $3,000', 'Custom Design,Responsive Layout,SEO Optimization,Content Management,Analytics Integration'],
          ['AI Automations', 'Cutting-edge AI solutions to streamline your business processes and enhance customer experience.', 'Starting at $2,000', 'Process Automation,Chatbot Development,Data Analysis,Custom AI Solutions,Integration Support']
        ];

        for (const service of services) {
          await this.run('INSERT INTO services (name, description, price_starting, features) VALUES (?, ?, ?, ?)', service);
        }

        // Insert sample portfolio items from migration 1.sql
        const portfolioItems = [
          ['E-commerce Growth Campaign', 'Increased online sales by 340% through targeted Meta advertising and conversion optimization.', 'Digital Marketing', 'TechStyle Co.', '2024-08-15', 'Meta Ads,Google Analytics,Conversion Tracking', 1],
          ['Brand Social Media Transformation', 'Complete brand overhaul across social platforms resulting in 500% follower growth.', 'Social Media', 'GreenLife Foods', '2024-07-22', 'Instagram,TikTok,LinkedIn,Canva', 1],
          ['SaaS Platform Website', 'Modern, conversion-focused website for B2B SaaS company with integrated dashboard.', 'Website Building', 'CloudSync Solutions', '2024-09-10', 'React,Tailwind,TypeScript,Cloudflare', 1],
          ['Customer Service AI Bot', 'AI-powered customer service automation reducing response time by 80%.', 'AI Automation', 'RetailMax', '2024-06-30', 'OpenAI API,Webhooks,CRM Integration', 1]
        ];

        for (const item of portfolioItems) {
          await this.run('INSERT INTO portfolio_items (title, description, category, client_name, completion_date, technologies, is_featured) VALUES (?, ?, ?, ?, ?, ?, ?)', item);
        }

        // Insert sample reviews from migration 2.sql
        const reviews = [
          ['Sarah Johnson', 'TechFlow Solutions', 'Marketing Director', 'Bykorp transformed our digital presence completely. Our sales increased by 340% in just 6 months! Their team is incredibly professional and results-driven.', 5, 'https://images.unsplash.com/photo-1494790108755-2616b612b8da?w=150&h=150&fit=crop&crop=face', 1],
          ['Michael Chen', 'GreenLife Foods', 'CEO & Founder', 'Their social media strategy helped us reach a whole new audience. Professional, creative, and results-driven. I couldn\'t be happier with the outcome.', 5, 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', 1],
          ['Emily Rodriguez', 'CloudSync Solutions', 'Chief Technology Officer', 'The website they built for us perfectly captures our brand and converts visitors into customers. The attention to detail is exceptional.', 5, 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face', 1],
          ['David Park', 'InnovateLab', 'Head of Operations', 'Working with Bykorp was a game-changer for our business. Their AI automation solutions saved us countless hours and improved our efficiency dramatically.', 5, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', 1],
          ['Lisa Thompson', 'MarketPro Agency', 'Creative Director', 'The team at Bykorp delivered beyond our expectations. Their creative approach and strategic thinking helped us stand out in a crowded market.', 5, 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face', 1],
          ['James Wilson', 'DigitalFirst', 'VP of Marketing', 'Outstanding results! Our Meta ads performance improved by 280% within the first quarter. Bykorp truly understands digital marketing.', 5, 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face', 1]
        ];

        for (const review of reviews) {
          await this.run('INSERT INTO reviews (name, company, role, review, rating, photo_url, is_featured) VALUES (?, ?, ?, ?, ?, ?, ?)', review);
        }

        console.log('Sample data inserted successfully with migration data!');
      } else {
        console.log('Database already contains data, skipping sample data insertion.');
      }
    } catch (error) {
      console.error('Error inserting sample data:', error);
    }
  }

  async close() {
    return new Promise<void>((resolve, reject) => {
      this.db.close((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

export const database = new Database();