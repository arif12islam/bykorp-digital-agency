import { ServiceType } from '@/shared/types';

interface ServiceCardProps {
  service: ServiceType;
  imageUrl: string;
}
export default function ServiceCard({
  service,
  imageUrl
}: ServiceCardProps) {
  const features = service.features ? service.features.split(',') : [];
  return <div className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 flex flex-col h-full">
      {/* Service Image */}
      <div className="h-48 overflow-hidden">
        <img src={imageUrl} alt={service.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
      </div>
      
      {/* Content */}
      <div className="p-6 flex flex-col h-full">
        {/* Title - Fixed height */}
        <div className="h-14 mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
            {service.name}
          </h3>
        </div>
        
        {/* Description - Fixed height */}
        <div className="h-20 mb-10">
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
            {service.description}
          </p>
        </div>

        {/* Features - Always present with fixed height */}
        <div className="h-24 mb-6">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Key Features:</h4>
          <ul className="space-y-2">
            {features.length > 0 ? (
              features.slice(0, 3).map((feature, index) => (
                <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3 mt-1.5 flex-shrink-0" />
                  <span className="leading-tight">{feature.trim()}</span>
                </li>
              ))
            ) : (
              <li className="text-sm text-gray-500 dark:text-gray-400 flex items-start">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3 mt-1.5 flex-shrink-0" />
                <span className="leading-tight">Custom solutions tailored to your needs</span>
              </li>
            )}
          </ul>
        </div>

        
      </div>
    </div>;
}
