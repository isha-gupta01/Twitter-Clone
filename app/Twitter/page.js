"use client"
import React from 'react'
import ProtectedRoute from '@/components/ProtectedRoute'
import ThirdSec from '@/components/ThirdSec'
import SecondSec from '@/components/SecondSec'
import FirstSec from '@/components/FirstSec'
import { useState } from 'react'
const Twitter = () => {
    const [activeComponent, setActiveComponent] = useState()
    return (
        <ProtectedRoute>
        <div className='black text-white'>
            <div className="flex md:container mx-auto  ">
                
                <FirstSec/>
                <div className=" w-px bg-gray-400 opacity-30 sticky left-[11.7rem] z-50"></div>
                <SecondSec/>
                <div className=" w-px bg-gray-400 opacity-25"></div>
                <ThirdSec/>

            </div>
        </div>
        </ProtectedRoute>
    )
}

export default Twitter
