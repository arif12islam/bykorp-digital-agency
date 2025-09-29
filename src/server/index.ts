import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { MongoClient, Db, ObjectId } from 'mongodb';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// MongoDB configuration
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
// Extract database name from URI or use default
const DATABASE_NAME = MONGODB_URI.includes('mongodb+srv://') 
  ? MONGODB_URI.split('/')[3]?.split('?')[0] || 'bykorp_agency'
  : process.env.DATABASE_NAME || 'bykorp_agency';

let client: MongoClient;
let db: Db;

// Initialize MongoDB connection
async function initializeDatabase() {
  try {
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    db = client.db(DATABASE_NAME);
    console.log('MongoDB connected successfully!');
    
    // Create sample data if collections are empty
    await insertSampleData();
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

// Insert sample data
async function insertSampleData() {
  try {
    // Check if services collection is empty
    const servicesCount = await db.collection('services').countDocuments();
    if (servicesCount === 0) {
      console.log('Inserting sample data...');
      
      // Insert services
      await db.collection('services').insertMany([
        {
          name: "Digital Marketing (Meta Ads)",
          description: "Comprehensive digital marketing campaigns with Facebook and Instagram advertising to boost your brand visibility and drive conversions.",
          price_starting: "Starting at $1,500/month",
          features: ["Campaign Strategy", "Ad Creation", "Audience Targeting", "Performance Analytics", "Monthly Reports"],
          is_active: true,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: "Social Media Management",
          description: "Complete social media presence management across all platforms with content creation, scheduling, and community engagement.",
          price_starting: "Starting at $800/month",
          features: ["Content Creation", "Post Scheduling", "Community Management", "Analytics", "Brand Voice Development"],
          is_active: true,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: "Website Building",
          description: "Custom website development with modern design principles, responsive layouts, and optimized performance.",
          price_starting: "Starting at $3,000",
          features: ["Custom Design", "Responsive Layout", "SEO Optimization", "Content Management", "Analytics Integration"],
          is_active: true,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: "AI Automations",
          description: "Cutting-edge AI solutions to streamline your business processes and enhance customer experience.",
          price_starting: "Starting at $2,000",
          features: ["Process Automation", "Chatbot Development", "Data Analysis", "Custom AI Solutions", "Integration Support"],
          is_active: true,
          created_at: new Date(),
          updated_at: new Date()
        }
      ]);

      // Insert portfolio items
      await db.collection('portfolio_items').insertMany([
        {
          title: "E-commerce Growth Campaign",
          description: "Increased online sales by 340% through targeted Meta advertising and conversion optimization.",
          category: "Digital Marketing",
          image_url: null,
          client_name: "TechStyle Co.",
          completion_date: new Date("2024-08-15"),
          technologies: ["Meta Ads", "Google Analytics", "Conversion Tracking"],
          is_featured: true,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          title: "Brand Social Media Transformation",
          description: "Complete brand overhaul across social platforms resulting in 500% follower growth.",
          category: "Social Media",
          image_url: null,
          client_name: "GreenLife Foods",
          completion_date: new Date("2024-07-22"),
          technologies: ["Instagram", "TikTok", "LinkedIn", "Canva"],
          is_featured: true,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          title: "SaaS Platform Website",
          description: "Modern, conversion-focused website for B2B SaaS company with integrated dashboard.",
          category: "Website Building",
          image_url: null,
          client_name: "CloudSync Solutions",
          completion_date: new Date("2024-09-10"),
          technologies: ["React", "Tailwind", "TypeScript", "Cloudflare"],
          is_featured: true,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          title: "Customer Service AI Bot",
          description: "AI-powered customer service automation reducing response time by 80%.",
          category: "AI Automation",
          image_url: null,
          client_name: "RetailMax",
          completion_date: new Date("2024-06-30"),
          technologies: ["OpenAI API", "Webhooks", "CRM Integration"],
          is_featured: true,
          created_at: new Date(),
          updated_at: new Date()
        }
      ]);

      // Insert reviews
      await db.collection('reviews').insertMany([
        {
          name: "Sarah Johnson",
          company: "TechStart Inc.",
          role: "CEO",
          review: "Exceptional service! Bykorp transformed our digital presence completely. Their team delivered beyond our expectations with professional expertise and creative solutions.",
          rating: 5,
          photo_url: "/images/reviews/sarah.jpg",
          is_featured: true,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: "Michael Chen",
          company: "GrowthCo",
          role: "Marketing Director",
          review: "Outstanding digital marketing results. Our ROI increased by 300% within the first quarter. Highly recommend their Meta Ads expertise.",
          rating: 5,
          photo_url: "/images/reviews/michael.jpg",
          is_featured: true,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: "Emily Rodriguez",
          company: "BrandForward",
          role: "Founder",
          review: "Professional, reliable, and creative. They built our website from scratch and continue to provide excellent support. Great team to work with!",
          rating: 5,
          photo_url: "/images/reviews/emily.jpg",
          is_featured: true,
          created_at: new Date(),
          updated_at: new Date()
        }
      ]);

      console.log('Sample data inserted successfully!');
    }
  } catch (error) {
    console.error('Error inserting sample data:', error);
  }
}

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database
initializeDatabase().catch(console.error);

// Routes

// Get all services
app.get('/api/services', async (req, res) => {
  try {
    const services = await db.collection('services').find({ is_active: true }).sort({ _id: 1 }).toArray();
    // Transform MongoDB documents to match expected format
    const transformedServices = services.map((service: any) => ({
      id: service._id.toString(),
      name: service.name,
      description: service.description,
      price_starting: service.price_starting,
      features: Array.isArray(service.features) ? service.features.join(', ') : service.features,
      is_active: service.is_active,
      created_at: service.created_at.toISOString(),
      updated_at: service.updated_at.toISOString()
    }));
    res.json(transformedServices);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

// Get all portfolio items
app.get('/api/portfolio', async (req, res) => {
  try {
    const items = await db.collection('portfolio_items').find().sort({ is_featured: -1, completion_date: -1 }).toArray();
    // Transform MongoDB documents to match expected format
    const transformedItems = items.map((item: any) => ({
      id: item._id.toString(),
      title: item.title,
      description: item.description,
      category: item.category,
      image_url: item.image_url,
      client_name: item.client_name,
      completion_date: item.completion_date ? item.completion_date.toISOString().split('T')[0] : null,
      technologies: Array.isArray(item.technologies) ? item.technologies.join(', ') : item.technologies,
      is_featured: item.is_featured,
      created_at: item.created_at.toISOString(),
      updated_at: item.updated_at.toISOString()
    }));
    res.json(transformedItems);
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    res.status(500).json({ error: 'Failed to fetch portfolio items' });
  }
});

// Get featured portfolio items
app.get('/api/portfolio/featured', async (req, res) => {
  try {
    const items = await db.collection('portfolio_items').find({ is_featured: true }).sort({ completion_date: -1 }).toArray();
    // Transform MongoDB documents to match expected format
    const transformedItems = items.map((item: any) => ({
      id: item._id.toString(),
      title: item.title,
      description: item.description,
      category: item.category,
      image_url: item.image_url,
      client_name: item.client_name,
      completion_date: item.completion_date ? item.completion_date.toISOString().split('T')[0] : null,
      technologies: Array.isArray(item.technologies) ? item.technologies.join(', ') : item.technologies,
      is_featured: item.is_featured,
      created_at: item.created_at.toISOString(),
      updated_at: item.updated_at.toISOString()
    }));
    res.json(transformedItems);
  } catch (error) {
    console.error('Error fetching featured portfolio:', error);
    res.status(500).json({ error: 'Failed to fetch featured portfolio items' });
  }
});

// Get all reviews
app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await db.collection('reviews').find().sort({ is_featured: -1, created_at: -1 }).toArray();
    // Transform MongoDB documents to match expected format
    const transformedReviews = reviews.map((review: any) => ({
      id: review._id.toString(),
      name: review.name,
      company: review.company,
      role: review.role,
      review: review.review,
      rating: review.rating,
      photo_url: review.photo_url,
      is_featured: review.is_featured,
      created_at: review.created_at.toISOString(),
      updated_at: review.updated_at.toISOString()
    }));
    res.json(transformedReviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// Get featured reviews
app.get('/api/reviews/featured', async (req, res) => {
  try {
    const reviews = await db.collection('reviews').find({ is_featured: true }).sort({ created_at: -1 }).toArray();
    // Transform MongoDB documents to match expected format
    const transformedReviews = reviews.map((review: any) => ({
      id: review._id.toString(),
      name: review.name,
      company: review.company,
      role: review.role,
      review: review.review,
      rating: review.rating,
      photo_url: review.photo_url,
      is_featured: review.is_featured,
      created_at: review.created_at.toISOString(),
      updated_at: review.updated_at.toISOString()
    }));
    res.json(transformedReviews);
  } catch (error) {
    console.error('Error fetching featured reviews:', error);
    res.status(500).json({ error: 'Failed to fetch featured reviews' });
  }
});

// Create reservation
app.post('/api/reservations', async (req, res) => {
  try {
    const { name, email, phone, company, service_type, message, preferred_date } = req.body;
    
    // Validate required fields
    if (!name || !email || !service_type) {
      return res.status(400).json({ error: 'Name, email, and service type are required' });
    }

    const reservation = {
      name,
      email,
      phone: phone || null,
      company: company || null,
      service_type,
      message: message || null,
      preferred_date: preferred_date ? new Date(preferred_date) : null,
      status: 'pending',
      created_at: new Date(),
      updated_at: new Date()
    };

    const result = await db.collection('reservations').insertOne(reservation);
    
    res.status(201).json({ 
      message: 'Reservation created successfully', 
      id: result.insertedId
    });
  } catch (error) {
    console.error('Error creating reservation:', error);
    res.status(500).json({ error: 'Failed to create reservation' });
  }
});

// Get all reservations (for admin)
app.get('/api/reservations', async (req, res) => {
  try {
    const reservations = await db.collection('reservations').find().sort({ created_at: -1 }).toArray();
    res.json(reservations);
  } catch (error) {
    console.error('Error fetching reservations:', error);
    res.status(500).json({ error: 'Failed to fetch reservations' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Bykorp API Server with MongoDB is running' });
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\nShutting down gracefully...');
  if (client) {
    await client.close();
  }
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`🚀 Bykorp API Server with MongoDB running on http://localhost:${PORT}`);
});