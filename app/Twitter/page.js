"use client"
import React from 'react'
import ProtectedRoute from '@/components/ProtectedRoute'
import ThirdSec from '@/components/ThirdSec'
import SecondSec from '@/components/SecondSec'
import FirstSec from '@/components/FirstSec'
import MobFirstSec from '@/components/MobFirstSec'
import { useState } from 'react'
const Twitter = () => {
    // const [activeComponent, setActiveComponent] = useState()
    return (
        <ProtectedRoute>
            <div className='black text-white'>
                <div className="flex md:container mx-auto  ">
                    <div className='hidden md:flex'>
                        <FirstSec />
                    </div>
                    <div className='md:hidden block'>
                        <MobFirstSec />
                    </div>
                    <div className=" w-px bg-gray-400 hidden  md:flex opacity-30 sticky left-[11.7rem] z-50"></div>
                    <SecondSec />
                    <div className=" w-px hidden  md:flex bg-gray-400 opacity-30"></div>
                    <ThirdSec />

                </div>
            </div>
        </ProtectedRoute>
    )
}

export default Twitter
