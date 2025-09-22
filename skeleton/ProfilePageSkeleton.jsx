import React from 'react';

const ProfileSkeleton = () => {
  return (
    <div className="second scrollbar-hide bg-black sm:w-[430px] md:w-[712px] md:ml-[72px] xl:w-[89.3vw] xl:ml-[93px] lg:w-[703px] lg:ml-[59px] min-h-screen overflow-y-auto flex flex-col">
      {/* Header Section Skeleton */}
      <div className="flex gap-10 items-center px-4 py-2">
        <div className="w-5 h-5 bg-gray-700 rounded animate-pulse"></div>
        <div className="flex flex-col gap-2">
          <div className="w-32 h-6 bg-gray-700 rounded animate-pulse"></div>
          <div className="w-20 h-4 bg-gray-700 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Cover Image Skeleton */}
      <div className="relative h-48 bg-gray-700 animate-pulse">
        {/* Profile Picture Skeleton */}
        <div className="absolute left-5 z-50 -bottom-[5.5rem]">
          <div className="w-44 h-44 rounded-full border-4 border-black bg-gray-700 animate-pulse"></div>
        </div>

        {/* Set Up Profile Button Skeleton */}
        <div className="absolute -bottom-14 right-1 sm:right-12 md:right-5">
          <div className="px-6 py-2 border border-gray-500 bg-gray-700 rounded-full animate-pulse w-32 h-10"></div>
        </div>
      </div>

      {/* Profile Info Skeleton */}
      <div className="flex flex-col mt-28 text-white ml-8">
        {/* Name Skeleton */}
        <div className="w-40 h-6 bg-gray-700 rounded animate-pulse mb-2"></div>
        
        {/* Username Skeleton */}
        <div className="w-32 h-5 bg-gray-700 rounded animate-pulse mb-4"></div>
        
        {/* Joined Date Skeleton */}
        <div className="flex gap-3 my-2 items-center">
          <div className="w-5 h-5 bg-gray-700 rounded animate-pulse"></div>
          <div className="w-28 h-4 bg-gray-700 rounded animate-pulse"></div>
        </div>
        
        {/* Following/Followers Skeleton */}
        <div className="flex gap-7 mb-4">
          <div className="w-24 h-4 bg-gray-700 rounded animate-pulse"></div>
          <div className="w-24 h-4 bg-gray-700 rounded animate-pulse"></div>
        </div>

        {/* Bio Tags Skeleton */}
        <div className="flex flex-col md:flex-row gap-2">
          <div className="mt-2 h-8 border border-gray-500 rounded-3xl w-20 px-8 py-3 bg-gray-700 animate-pulse"></div>
          <div className="mt-2 h-8 border border-gray-500 rounded-3xl w-24 px-8 py-3 bg-gray-700 animate-pulse"></div>
          <div className="mt-2 h-8 border border-gray-500 rounded-3xl w-16 px-8 py-3 bg-gray-700 animate-pulse"></div>
        </div>
      </div>

      {/* Tabs Skeleton */}
      <div className="mt-10">
        <ul className="flex gap-[0.9rem] xl:gap-[3.2rem] pl-4 pr-5 border-b border-gray-700 py-4">
          {[1, 2, 3, 4, 5].map((_, index) => (
            <li key={index}>
              <div className="w-16 h-5 bg-gray-700 rounded animate-pulse"></div>
            </li>
          ))}
        </ul>

        {/* Content Section Skeleton */}
        <div className="mt-4 px-4">
          {/* Post Cards Skeleton */}
          {[1, 2, 3, 4].map((_, index) => (
            <div key={index} className="border-b border-gray-700 py-6">
              <div className="flex gap-3">
                {/* Avatar */}
                <div className="w-12 h-12 bg-gray-700 rounded-full animate-pulse flex-shrink-0"></div>
                
                <div className="flex-1">
                  {/* User Info */}
                  <div className="flex gap-2 items-center mb-2">
                    <div className="w-24 h-4 bg-gray-700 rounded animate-pulse"></div>
                    <div className="w-20 h-4 bg-gray-700 rounded animate-pulse"></div>
                    <div className="w-16 h-4 bg-gray-700 rounded animate-pulse"></div>
                  </div>
                  
                  {/* Post Content */}
                  <div className="space-y-2 mb-3">
                    <div className="w-full h-4 bg-gray-700 rounded animate-pulse"></div>
                    <div className="w-3/4 h-4 bg-gray-700 rounded animate-pulse"></div>
                    <div className="w-1/2 h-4 bg-gray-700 rounded animate-pulse"></div>
                  </div>
                  
                  {/* Media Placeholder (random for some posts) */}
                  {index % 3 === 0 && (
                    <div className="w-full h-64 bg-gray-700 rounded-lg animate-pulse mb-3"></div>
                  )}
                  
                  {/* Action Buttons */}
                  <div className="flex justify-between items-center max-w-md">
                    {[1, 2, 3, 4].map((_, btnIndex) => (
                      <div key={btnIndex} className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-gray-700 rounded animate-pulse"></div>
                        <div className="w-8 h-4 bg-gray-700 rounded animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Load More Skeleton */}
          <div className="flex justify-center py-8">
            <div className="w-24 h-8 bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;