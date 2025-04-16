"use client"
import React from 'react'
import FirstSec from '@/components/FirstSec'
import ThirdSec from '@/components/ThirdSec'
import Following from '@/components/Following'
import { useState } from 'react'
import ProtectedRoute from '@/components/ProtectedRoute'
import MobFirstSec from '@/components/MobFirstSec'
import SearchOverlay from '@/components/SearchOverlay'

const FollowingPage = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div>
      <ProtectedRoute>
        <div className='black text-white'>
          <div className="flex md:container mx-auto  ">

            <div className='hidden md:flex'>
              <FirstSec onSearchClick={() => setIsSearchOpen(true)} />
            </div>
            <div className='md:hidden block'>
              <MobFirstSec />
            </div>
            <div className=" w-px bg-gray-400 hidden md:flex opacity-30 sticky left-[5.7rem] z-50"></div>
            <Following />
            <div className=" w-px hidden md:flex  bg-gray-400 opacity-25"></div>
            <ThirdSec />
            {/* Search overlay */}
            {isSearchOpen && <SearchOverlay open={isSearchOpen} onClose={() => setIsSearchOpen(false)} />}

          </div>
        </div>
      </ProtectedRoute>
    </div>
  )
}

export default FollowingPage
