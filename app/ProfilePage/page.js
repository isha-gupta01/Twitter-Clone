"use client"
import React from 'react'
import FirstSec from '@/components/FirstSec'
import ThirdSec from '@/components/ThirdSec'
import Profile from '@/components/Profile'
import { useState } from 'react'
import ProtectedRoute from '@/components/ProtectedRoute'

const ProfilePage = () => {
  // const [activeComponent, setActiveComponent] = useState()
  return (
    <div>
      <ProtectedRoute>
        <div className='black text-white'>
            <div className="flex md:container mx-auto  ">
                
                <FirstSec/>
                <div className=" w-px bg-gray-400 opacity-30 sticky left-[11.7rem] z-50"></div>
                <Profile/>
                <div className=" w-px bg-gray-400 opacity-25"></div>
                <ThirdSec/>

            </div>
        </div>
        </ProtectedRoute>
    </div>
  )
}

export default ProfilePage
