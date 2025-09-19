import React from 'react';

const ThirdSecSkeleton = () => {
  return (
    <div className="bg-black border border-white/30 w-[300px] h-fit space-y-4 mt-3 p-4 rounded-2xl animate-pulse">
      {/* "What's Happening" title skeleton */}
      <div className="w-32 h-5 bg-gray-700 rounded"></div>
      
      {/* Trending items skeleton */}
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="flex flex-row items-center justify-between">
          <div className="flex flex-col items-start space-y-2">
            {/* Category skeleton */}
            <div className="w-20 h-3 bg-gray-600 rounded"></div>
            {/* Title skeleton */}
            <div className="w-36 h-4 bg-gray-700 rounded"></div>
            {/* Posts count skeleton */}
            <div className="w-16 h-3 bg-gray-600 rounded"></div>
          </div>

          {/* Random image or dots skeleton */}
          {Math.random() > 0.5 ? (
            <div className="w-10 h-10 bg-gray-700 rounded"></div>
          ) : (
            <div className="w-6 h-4 bg-gray-600 rounded ml-10"></div>
          )}
        </div>
      ))}
      
      {/* "Show more" link skeleton */}
      <div className="w-20 h-4 bg-blue-500/70 rounded"></div>
    </div>
  );
};

export default ThirdSecSkeleton;