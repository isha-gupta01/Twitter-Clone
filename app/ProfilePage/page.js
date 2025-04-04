"use client"
import React from 'react'
import FirstSec from '@/components/FirstSec'
import ThirdSec from '@/components/ThirdSec'
import Profile from '@/components/Profile'
// import { useState } from 'react'
import ProtectedRoute from '@/components/ProtectedRoute'
import MobFirstSec from '@/components/MobFirstSec'

const ProfilePage = () => {
  // const [activeComponent, setActiveComponent] = useState()
  return (
    <div>
      <ProtectedRoute>
        <div className='black text-white'>
          <div className="flex md:container mx-auto  ">

            <div className='hidden md:flex'>
              <FirstSec />
            </div>
            <div className='md:hidden block'>
              <MobFirstSec />
            </div>
            <div className=" w-px bg-gray-400 opacity-30 sticky left-[11.7rem] z-50"></div>
            <Profile />
            <div className=" w-px bg-gray-400 opacity-25"></div>
            <ThirdSec />

          </div>
        </div>
      </ProtectedRoute>
    </div>
  )
}

export default ProfilePage
