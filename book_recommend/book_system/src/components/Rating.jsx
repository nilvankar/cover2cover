import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const Rating = ({ rating }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(<FaStar key={i} className="rating-star" />);
    } else if (i === fullStars + 1 && hasHalfStar) {
      stars.push(<FaStarHalfAlt key={i} className="rating-star" />);
    } else {
      stars.push(<FaRegStar key={i} className="rating-star" />);
    }
  }

  return (
    <div className="rating">
      {stars} <span className="ms-1">{rating.toFixed(1)}</span>
    </div>
  );
};

export default Rating;