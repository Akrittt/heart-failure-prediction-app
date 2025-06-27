
import React from 'react';

const Card = ({ count, label }) => {
  return (
    <div className="relative bg-white shadow-xl rounded-3xl px-6 py-6 text-center w-40 sm:w-48 overflow-hidden">
      {/* Shadow Background Number */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2  text-5xl font-bold opacity-20 select-none pointer-events-none bg-gradient-to-b from-gray-500 to-white bg-clip-text text-transparent">
        {count}
      </div>

      {/* Foreground Content */}
      <h2 className="text-blue-600 text-2xl pt-1 font-bold relative z-10">{count}</h2>
      <p className="text-gray-700 font-medium text-lg pt-1 relative z-10">{label}</p>
    </div>
  );
};

export default Card;
