import { useEffect } from 'react';
import { Link } from 'react-router';
import { ArrowRight, CheckCircle, Zap, Users, TrendingUp } from 'lucide-react';
import { useServices, useFeaturedPortfolio, useFeaturedReviews } from '@/react-app/hooks/useApi';
import ServiceCard from '@/react-app/components/ServiceCard';
import PortfolioCard from '@/react-app/components/PortfolioCard';
import ReviewCard from '@/react-app/components/ReviewCard';
import TrustedBy from '@/react-app/components/TrustedBy';
export default function Home() {
  const {
    services,
    loading: servicesLoading
  } = useServices();
  const {
    portfolio,
    loading: portfolioLoading
  } = useFeaturedPortfolio();
  const {
    reviews,
    loading: reviewsLoading
  } = useFeaturedReviews();

  // Add Google Fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);
  const serviceImages = {
    'Digital Marketing (Meta Ads)': 'https://mocha-cdn.com/0199802e-9d4f-7614-ab21-0bfecd80f05c/digital-marketing.jpg',
    'Social Media Management': 'https://mocha-cdn.com/0199802e-9d4f-7614-ab21-0bfecd80f05c/social-media.jpg',
    'Website Building': 'https://mocha-cdn.com/0199802e-9d4f-7614-ab21-0bfecd80f05c/web-development.jpg',
    'AI Automations': 'https://mocha-cdn.com/0199802e-9d4f-7614-ab21-0bfecd80f05c/ai-automation.jpg'
  };
  
  return <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        {/* Dotted Pattern Background */}
        <div className="absolute inset-0 opacity-20 dark:opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle, #3B82F6 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-900 dark:text-white relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Transform Your
            <span className="block text-blue-600">
              Digital Presence
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed text-gray-600 dark:text-gray-300">
            We specialize in digital marketing, social media management, website building, and AI automations 
            to help your business thrive in the digital world.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
              <span>Get a Quote</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            
            <Link to="/portfolio" className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300">
              View Our Work
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="w-16 h-16 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">50+</h3>
              <p className="text-gray-600 dark:text-gray-300">Happy Clients</p>
            </div>
            
            <div className="p-6">
              <div className="w-16 h-16 bg-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">300%</h3>
              <p className="text-gray-600 dark:text-gray-300">Average Growth</p>
            </div>
            
            <div className="p-6">
              <div className="w-16 h-16 bg-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">100+</h3>
              <p className="text-gray-600 dark:text-gray-300">Projects Completed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <TrustedBy />

      {/* Services Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Comprehensive digital solutions tailored to grow your business and enhance your online presence.
            </p>
          </div>

          {servicesLoading ? <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map(i => <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>)}
            </div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.slice(0, 4).map(service => <ServiceCard key={service.id} service={service} imageUrl={serviceImages[service.name as keyof typeof serviceImages] || serviceImages['Website Building']} />)}
            </div>}

          <div className="text-center mt-12">
            <Link to="/services" className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 hover:shadow-lg transform hover:scale-105 transition-all duration-300 inline-flex items-center space-x-2">
              <span>View All Services</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Portfolio Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Work
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Discover how we've helped businesses like yours achieve remarkable growth and success.
            </p>
          </div>

          {portfolioLoading ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map(i => <div key={i} className="bg-white rounded-2xl p-6 animate-pulse shadow-lg">
                  <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                </div>)}
            </div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {portfolio.slice(0, 4).map(item => <PortfolioCard key={item.id} item={item} />)}
            </div>}

          <div className="text-center mt-12">
            <Link to="/portfolio" className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 hover:shadow-lg transform hover:scale-105 transition-all duration-300 inline-flex items-center space-x-2">
              <span>View Full Portfolio</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="relative py-20 bg-blue-600 dark:bg-gray-950 text-white">
        {/* Dotted Pattern Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle, #FFFFFF 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Choose Bykorp?
            </h2>
            <p className="text-xl  dark:text-gray-400 max-w-3xl mx-auto">
              We combine creativity, technology, and strategy to deliver exceptional results for your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[{
            title: "Expert Team",
            description: "Our team of digital marketing experts, designers, and developers bring years of experience to every project."
          }, {
            title: "Proven Results",
            description: "We've helped businesses achieve an average of 300% growth through our comprehensive digital strategies."
          }, {
            title: "Custom Solutions",
            description: "Every business is unique. We create tailored solutions that align with your specific goals and challenges."
          }, {
            title: "24/7 Support",
            description: "Our dedicated support team is always available to help you succeed and answer any questions."
          }, {
            title: "Latest Technology",
            description: "We stay ahead of the curve by utilizing the latest tools, technologies, and best practices in the industry."
          }, {
            title: "Transparent Reporting",
            description: "Track your progress with detailed analytics and regular reports that show real, measurable results."
          }].map((feature, index) => <div key={index} className="p-6 bg-gray-50 rounded-xl hover:bg-gray-10 transition-colors duration-300">
                <div className="mb-4">
                  <CheckCircle className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-xl text-gray-900 font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-900">{feature.description}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our clients have to say about their experience working with us.
            </p>
          </div>

          {reviewsLoading ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => <div key={i} className="bg-white rounded-2xl p-8 animate-pulse shadow-lg">
                  <div className="flex space-x-1 mb-6">
                    {[1, 2, 3, 4, 5].map(star => <div key={star} className="h-5 w-5 bg-gray-200 rounded"></div>)}
                  </div>
                  <div className="space-y-3 mb-6">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
                      <div className="h-3 bg-gray-200 rounded w-20"></div>
                    </div>
                  </div>
                </div>)}
            </div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reviews && reviews.slice(0, 6).map(review => <ReviewCard key={review.id} review={review} />)}
            </div>}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-blue-600 dark:bg-blue-800 text-white">
        {/* Dotted Pattern Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle, #FFFFFF 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help you achieve your digital marketing goals and grow your business.
          </p>
          <Link to="/contact" className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 hover:shadow-xl transform hover:scale-105 transition-all duration-300 inline-flex items-center space-x-2">
            <span>Schedule a Consultation</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>;
}
