import { PortfolioItemType } from '@/shared/types';
import { Calendar, User, Code } from 'lucide-react';

interface PortfolioCardProps {
  item: PortfolioItemType;
}

export default function PortfolioCard({ item }: PortfolioCardProps) {
  const technologies = item.technologies ? item.technologies.split(',') : [];
  const completionDate = item.completion_date 
    ? new Date(item.completion_date).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long' 
      })
    : null;

  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 flex flex-col h-full">
      {/* Featured Badge */}
      {item.is_featured && (
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
            Featured
          </span>
        </div>
      )}

      {/* Portfolio Image */}
      <div className="h-48 bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl mx-auto mb-2 flex items-center justify-center">
            <Code className="h-8 w-8 text-white" />
          </div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{item.category}</p>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6 flex flex-col h-full">
        {/* Title - Fixed height */}
        <div className="h-14 mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
            {item.title}
          </h3>
        </div>
        
        {/* Description - Fixed height */}
        <div className="h-20 mb-4">
          {item.description ? (
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
              {item.description}
            </p>
          ) : (
            <p className="text-gray-400 dark:text-gray-500 leading-relaxed text-sm italic">
              Project details available upon request
            </p>
          )}
        </div>

        {/* Meta Information - Fixed height */}
        <div className="h-16 mb-4 space-y-2">
          {item.client_name && (
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <User className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="truncate">{item.client_name}</span>
            </div>
          )}
          
          {completionDate && (
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>{completionDate}</span>
            </div>
          )}
        </div>

        {/* Technologies - Flexible height but aligned */}
        <div className="mt-auto">
          {technologies.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {technologies.slice(0, 4).map((tech, index) => (
                <span 
                  key={index}
                  className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs font-medium"
                >
                  {tech.trim()}
                </span>
              ))}
            </div>
          ) : (
            <div className="h-6"></div>
          )}
        </div>
      </div>
    </div>
  );
}
