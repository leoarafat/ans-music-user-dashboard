import React from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { BsStar } from 'react-icons/bs';

const Rating = ({ rating }) => {
    const stars = [];
    const wholeStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    // Render whole stars
    for (let i = 0; i < wholeStars; i++) {
        stars.push(<FaStar key={i} />);
    }

    // Render half star (if applicable)
    if (hasHalfStar) {
        stars.push(<FaStarHalfAlt key="half" />);
    }

    // Render remaining unfilled stars (up to 5 stars)
    while (stars.length < 5) {
        stars.push(<BsStar key={stars.length} />);
    }

    return <span className='text-yellow-400 text- flex items-center gap-1 '>{stars}</span>;
};

export default Rating;