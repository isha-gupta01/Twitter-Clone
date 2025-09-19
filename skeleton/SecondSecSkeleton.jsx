import React from 'react';

const SecondSecSkeleton = ({scrolled=false}) => {
  return (
    <div>
      <div className="second bg-black w-[703px] md:w-[703px] xl:w-[907px] lg:w-[703px] mb-20 md:mb-0 min-h-screen md:ml-[60px] xl:ml-[90px] lg:ml-[59px] overflow-y-auto scrollbar-hide">

        {/* Header Skeleton - Fixed positioning like original */}
        <div className="flex flex-col fixed top-0 md:flex md:flex-col md:fixed md:top-0 z-50 bg-black">
          <div className="backdrop-blur w-[703px] md:w-[703px] xl:w-[907px] lg:w-[703px] h-[53px] bg-black/90 flex">

            {/* Tab Navigation */}
            <div className={`${scrolled ? "hidden" : "flex flex-col fixed top-0"} md:flex md:flex-col md:fixed md:top-0 z-50`}>
              <div className="backdrop-blur w-[500px] md:w-[703px] xl:w-[907px] lg:w-[703px] max-h-fit md:h-[53px] bg-black/30 flex flex-col md:flex-row">

                {/* Mobile Header - Profile + Home */}
                <div className="flex md:hidden items-center">
                  <li className="flex md:justify-start items-center justify-center md:w-fit hover:bg-gray-900 hover:cursor-pointer px-5 py-3">
                    <div className="w-[50px] h-[50px] rounded-full bg-gray-700 animate-pulse overflow-hidden"></div>
                  </li>
                  <div className="w-12 h-5 bg-gray-700 rounded animate-pulse ml-2"></div>
                </div>

                {/* Tab Navigation */}
                <div className="flex">
                  {/* For you tab */}
                  <div className="text-[1.1rem] w-[210px] md:w-[300px] h-[53px] xl:w-[452px] lg:w-[300px] flex justify-center items-center flex-col text-white cursor-pointer text-center">
                    <div className="w-16 h-4 bg-gray-700 rounded animate-pulse mb-2"></div>
                    <div className="w-[4rem] h-[6px] bg-blue-500 rounded-full relative -bottom-[0.66rem]"></div>
                  </div>

                  {/* Following tab */}
                  <div className="text-[1.1rem] md:w-[300px] h-[53px] flex justify-center items-center text-white cursor-pointer text-center">
                    <div className="w-20 h-4 bg-gray-700 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <hr className="opacity-25 w-[703px] relative border-gray-700" />
            </div>
          </div>
          <hr className="opacity-25 w-full border-gray-700" />
        </div>

        {/* Post Composer Skeleton */}
        <div className="mt-16 w-full border-b  border-gray-800 pb-4">
          <div className="flex items-center gap-4 p-4">
            {/* Profile Image Skeleton - Only show on xl screens like original */}
            <div className="hidden md:block">
              <div className="w-10 h-10 rounded-full bg-gray-700 animate-pulse"></div>
            </div>
            {/* Input Field Skeleton */}
            <div className="flex-1 h-12 bg-gray-900 border border-gray-600 rounded-full animate-pulse"></div>
          </div>

          <div className="flex justify-between items-center px-4 mt-3">
            {/* Action Icons Skeleton */}
            <div className="flex gap-4 ml-5 md:ml-24 xl:ml-14">
              {Array.from({ length: 7 }).map((_, index) => (
                <div key={index} className="w-6 h-6  bg-gray-700 rounded animate-pulse"></div>
              ))}
            </div>

            {/* Post Button Skeleton */}
            <div className="rounded-full px-6 py-2 bg-gray-600 animate-pulse">
              <div className="w-10 h-4 bg-gray-500 rounded"></div>
            </div>
          </div>
        </div>

        {/* Feed Content Skeleton */}
        <div className="mt-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <PostCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Individual Post Card Skeleton Component
const PostCardSkeleton = () => {
  return (
    <div className="border-b border-gray-800 p-4 animate-pulse hover:bg-gray-950/30">
      <div className="flex gap-3">
        {/* Profile Image */}
        <div className="w-12 h-12 bg-gray-700 rounded-full flex-shrink-0"></div>

        <div className="flex-1 min-w-0">
          {/* Header (Name, username, time) */}
          <div className="flex items-center gap-2 mb-2">
            <div className="w-20 h-4 bg-gray-700 rounded"></div>
            <div className="w-16 h-3 bg-gray-600 rounded"></div>
            <div className="w-8 h-3 bg-gray-600 rounded"></div>
          </div>

          {/* Tweet Content */}
          <div className="space-y-2 mb-3">
            <div className="w-full h-4 bg-gray-700 rounded"></div>
            <div className="w-4/5 h-4 bg-gray-700 rounded"></div>
            <div className="w-3/5 h-4 bg-gray-700 rounded"></div>
          </div>

          {/* Media Placeholder (randomly show) */}
          {Math.random() > 0.6 && (
            <div className="w-full h-48 bg-gray-700 rounded-xl mb-3"></div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between items-center max-w-md pt-2">
            {Array.from({ length: 4 }).map((_, actionIndex) => (
              <div key={actionIndex} className="flex items-center gap-2">
                <div className="w-5 h-5 bg-gray-600 rounded-full"></div>
                <div className="w-6 h-3 bg-gray-600 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondSecSkeleton;


