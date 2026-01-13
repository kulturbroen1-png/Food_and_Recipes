
import React from 'react';
import { StarIcon } from './icons';

interface StarRatingProps {
  rating: number; // Expecting a rating out of 5
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <StarIcon
          key={index}
          className={`w-5 h-5 ${index < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
        />
      ))}
    </div>
  );
};

export default StarRating;