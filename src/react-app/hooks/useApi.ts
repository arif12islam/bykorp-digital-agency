import { useState, useEffect } from 'react';
import { ServiceType, PortfolioItemType, CreateReservationType, ReviewType } from '@/shared/types';

const API_BASE = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3001/api';

// Mock data for development
const mockServices: ServiceType[] = [
  {
    id: 1,
    name: 'Digital Marketing (Meta Ads)',
    description: 'Boost your brand with targeted Meta advertising campaigns that drive real results.',
    features: 'Campaign Strategy, Ad Creation, Performance Analytics, A/B Testing',
    price_starting: '$800/month',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 2,
    name: 'Social Media Management',
    description: 'Grow your online presence with strategic content creation and community management.',
    features: 'Content Planning, Daily Posting, Engagement Management, Analytics Reports',
    price_starting: '$500/month',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 3,
    name: 'Website Building',
    description: 'Create stunning, responsive websites that convert visitors into customers.',
    features: 'Custom Design, Mobile Optimization, SEO Setup, Analytics Integration',
    price_starting: '$1,200',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 4,
    name: 'AI Automations',
    description: 'Streamline your business processes with intelligent automation solutions.',
    features: 'Workflow Automation, Chatbot Integration, Process Optimization, Custom AI Solutions',
    price_starting: '$600/month',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
];

const mockPortfolio: PortfolioItemType[] = [
  {
    id: 1,
    title: 'E-commerce Platform Redesign',
    description: 'Complete redesign and development of a modern e-commerce platform',
    category: 'Website Building',
    image_url: 'https://mocha-cdn.com/0199802e-9d4f-7614-ab21-0bfecd80f05c/portfolio1.jpg',
    client_name: 'TechCorp Inc.',
    completion_date: '2024-09-15',
    technologies: 'React, Node.js, PostgreSQL',
    is_featured: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 2,
    title: 'Social Media Campaign - Fashion Brand',
    description: 'Comprehensive social media campaign that increased engagement by 300%',
    category: 'Social Media Management',
    image_url: 'https://mocha-cdn.com/0199802e-9d4f-7614-ab21-0bfecd80f05c/portfolio2.jpg',
    client_name: 'StyleHub',
    completion_date: '2024-08-20',
    technologies: 'Meta Business, Instagram, Facebook',
    is_featured: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 3,
    title: 'AI Chatbot Integration',
    description: 'Custom AI chatbot solution for customer service automation',
    category: 'AI Automations',
    image_url: 'https://mocha-cdn.com/0199802e-9d4f-7614-ab21-0bfecd80f05c/portfolio3.jpg',
    client_name: 'ServiceFirst',
    completion_date: '2024-07-10',
    technologies: 'OpenAI, Python, Flask',
    is_featured: false,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
];

const mockReviews: ReviewType[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    company: 'TechCorp Inc.',
    role: 'Marketing Director',
    review: 'Bykorp transformed our online presence completely. The team was professional, creative, and delivered beyond our expectations.',
    rating: 5,
    photo_url: 'https://mocha-cdn.com/0199802e-9d4f-7614-ab21-0bfecd80f05c/review1.jpg',
    is_featured: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 2,
    name: 'Mike Chen',
    company: 'StyleHub',
    role: 'CEO',
    review: 'The social media campaign they created for us increased our engagement by 300%. Highly recommended!',
    rating: 5,
    photo_url: 'https://mocha-cdn.com/0199802e-9d4f-7614-ab21-0bfecd80f05c/review2.jpg',
    is_featured: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
];

export function useServices() {
  const [services, setServices] = useState<ServiceType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_BASE}/services`)
      .then(res => {
        if (!res.ok) throw new Error('API not available');
        return res.json();
      })
      .then(data => {
        setServices(data);
        setLoading(false);
      })
      .catch(() => {
        // Use mock data when API is not available
        setServices(mockServices);
        setLoading(false);
        setError(null);
      });
  }, []);

  return { services, loading, error };
}

export function usePortfolio() {
  const [portfolio, setPortfolio] = useState<PortfolioItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_BASE}/portfolio`)
      .then(res => {
        if (!res.ok) throw new Error('API not available');
        return res.json();
      })
      .then(data => {
        setPortfolio(data);
        setLoading(false);
      })
      .catch(() => {
        // Use mock data when API is not available
        setPortfolio(mockPortfolio);
        setLoading(false);
        setError(null);
      });
  }, []);

  return { portfolio, loading, error };
}

export function useFeaturedPortfolio() {
  const [portfolio, setPortfolio] = useState<PortfolioItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_BASE}/portfolio/featured`)
      .then(res => {
        if (!res.ok) throw new Error('API not available');
        return res.json();
      })
      .then(data => {
        setPortfolio(data);
        setLoading(false);
      })
      .catch(() => {
        // Use mock data when API is not available
        setPortfolio(mockPortfolio.filter(item => item.is_featured));
        setLoading(false);
        setError(null);
      });
  }, []);

  return { portfolio, loading, error };
}

export function useReservation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const createReservation = async (data: CreateReservationType) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(`${API_BASE}/reservations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSuccess(true);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to create reservation');
      }
    } catch (err) {
      setError('Failed to create reservation');
    } finally {
      setLoading(false);
    }
  };

  const resetReservation = () => {
    setSuccess(false);
    setError(null);
    setLoading(false);
  };

  return { createReservation, resetReservation, loading, error, success };
}

export function useReviews() {
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_BASE}/reviews`)
      .then(res => {
        if (!res.ok) throw new Error('API not available');
        return res.json();
      })
      .then(data => {
        setReviews(data);
        setLoading(false);
      })
      .catch(() => {
        // Use mock data when API is not available
        setReviews(mockReviews);
        setLoading(false);
        setError(null);
      });
  }, []);

  return { reviews, loading, error };
}

export function useFeaturedReviews() {
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_BASE}/reviews/featured`)
      .then(res => {
        if (!res.ok) throw new Error('API not available');
        return res.json();
      })
      .then(data => {
        setReviews(data);
        setLoading(false);
      })
      .catch(() => {
        // Use mock data when API is not available
        setReviews(mockReviews.filter(review => review.is_featured));
        setLoading(false);
        setError(null);
      });
  }, []);

  return { reviews, loading, error };
}
