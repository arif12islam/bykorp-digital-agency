import { Star } from 'lucide-react';

interface ReviewCardProps {
  review: {
    id: number | string;
    name: string;
    company: string;
    role: string;
    review: string;
    rating: number;
    photo_url?: string | null;
  };
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 h-full flex flex-col">
      {/* Rating Stars */}
      <div className="flex space-x-1 mb-6">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`h-5 w-5 ${
              index < review.rating
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300 dark:text-gray-600'
            }`}
          />
        ))}
      </div>

      {/* Review Text */}
      <div className="flex-1 mb-6">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed italic text-lg">
          "{review.review}"
        </p>
      </div>

      {/* Customer Info */}
      <div className="flex items-center space-x-4 mt-auto">
        <div className="flex-shrink-0">
          {review.photo_url ? (
            <img
              src={review.photo_url}
              alt={review.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-white font-semibold text-lg">
                {review.name.charAt(0)}
              </span>
            </div>
          )}
        </div>
        <div>
          <p className="font-semibold text-gray-900 dark:text-white">{review.name}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">{review.role}</p>
          <p className="text-sm font-medium text-blue-600 dark:text-blue-400">{review.company}</p>
        </div>
      </div>
    </div>
  );
}
