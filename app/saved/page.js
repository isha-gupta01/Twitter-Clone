"use client"
import React, { useEffect, useState } from 'react'
import FirstSec from '@/components/FirstSec'
import ThirdSec from '@/components/ThirdSec'
import ProtectedRoute from '@/components/ProtectedRoute'
import MobFirstSec from '@/components/MobFirstSec'
import SearchOverlay from '@/components/SearchOverlay'
import SavedTweet from '@/components/savedTweet'


const SavedTweetPage = () => {
  const [userId, setUserId] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);


  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserId(parsedUser?.userId);
    }
  }, []);

  return (
    <ProtectedRoute>
      <div className="black text-white overflow-x-hidden ">
        <div className="flex md:container mx-auto">
          <div className="hidden md:flex">
            <FirstSec onSearchClick={() => setIsSearchOpen(true)} />
          </div>
          <div className="md:hidden block">
            <MobFirstSec />
          </div>
          <div className="w-px bg-gray-400 hidden md:flex opacity-30 sticky left-[5.7rem] z-50"></div>

          {/* Only render Profile if userId is available */}
          {userId && <SavedTweet/>}

          <div className="w-px bg-gray-400  opacity-25"></div>
          <ThirdSec />
          {/* Search overlay */}
          {isSearchOpen && <SearchOverlay open={isSearchOpen} onClose={() => setIsSearchOpen(false)} />}
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default SavedTweetPage;
