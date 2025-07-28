import React, { useState } from 'react'

const Rating = () => {

  const [rating, setRating] = useState(inialRating || 0);

  return (
    <div>
      {Array.from({length: 5}, (_, index) => {
        const startValue = index + 1;
        return (
          <span key={index} className={`text-xl sm:text-2xl cursor-pointer transition-colors ${startValue <= rating ? 'text-yellow-500' : 'text-gray-400'}`}>
            &#9733;
          </span>
        )
      })}
    </div>
  )
}

export default Rating