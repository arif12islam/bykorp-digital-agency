import { useServices } from '@/react-app/hooks/useApi';
import ServiceCard from '@/react-app/components/ServiceCard';
import LoadingSpinner from '@/react-app/components/LoadingSpinner';

export default function Services() {
  const { services, loading, error } = useServices();

  const serviceImages = {
    'Digital Marketing (Meta Ads)': 'https://mocha-cdn.com/0199802e-9d4f-7614-ab21-0bfecd80f05c/digital-marketing.jpg',
    'Social Media Management': 'https://mocha-cdn.com/0199802e-9d4f-7614-ab21-0bfecd80f05c/social-media.jpg',
    'Website Building': 'https://mocha-cdn.com/0199802e-9d4f-7614-ab21-0bfecd80f05c/web-development.jpg',
    'AI Automations': 'https://mocha-cdn.com/0199802e-9d4f-7614-ab21-0bfecd80f05c/ai-automation.jpg',
  };

  

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-center">
          <LoadingSpinner size="large" className="mb-4" />
          <p className="text-gray-600 dark:text-gray-300">Loading services...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="py-20 bg-blue-600 dark:bg-blue-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Our Services
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            Comprehensive digital solutions designed to accelerate your business growth 
            and establish a dominant online presence.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.id} className="lg:col-span-1">
                <ServiceCard
                  service={service}
                  imageUrl={serviceImages[service.name as keyof typeof serviceImages] || serviceImages['Website Building']}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Our Process
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We follow a proven methodology to ensure your project's success from start to finish.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Discovery",
                description: "We start by understanding your business, goals, and target audience to create a tailored strategy."
              },
              {
                step: "02",
                title: "Strategy",
                description: "Our team develops a comprehensive plan with clear objectives, timelines, and success metrics."
              },
              {
                step: "03",
                title: "Execution",
                description: "We implement the strategy with precision, keeping you updated on progress every step of the way."
              },
              {
                step: "04",
                title: "Optimization",
                description: "We continuously monitor, analyze, and optimize to ensure maximum results and ROI."
              }
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{process.step}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{process.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-gray-900 dark:bg-gray-950 text-white">
        {/* Dotted Pattern Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle, #3B82F6 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let's discuss which services are right for your business and create a custom plan for your success.
          </p>
          <a
            href="/contact"
            className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 hover:shadow-xl transform hover:scale-105 transition-all duration-300 inline-block"
          >
            Schedule a Consultation
          </a>
        </div>
      </section>
    </div>
  );
}
