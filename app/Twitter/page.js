"use client";
import React, { useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import ThirdSec from '@/components/ThirdSec';
import SecondSec from '@/components/SecondSec';
import FirstSec from '@/components/FirstSec';
import MobFirstSec from '@/components/MobFirstSec';
import SearchOverlay from '@/components/SearchOverlay'; 

const Twitter = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <ProtectedRoute>
            <div className='black text-white'>
                <div className="flex md:container mx-auto">
                    {/* Desktop FirstSec */}
                    <div className='hidden md:flex'>
                        <FirstSec onSearchClick={() => setIsSearchOpen(true)} />
                    </div>

                    {/* Mobile FirstSec */}
                    <div className='md:hidden block'>
                        <MobFirstSec />
                    </div>

                    <div className="w-px bg-gray-400 hidden md:flex opacity-30 sticky left-[5.7rem] z-50"></div>
                    <SecondSec />
                    <div className="w-px hidden md:flex bg-gray-400 opacity-30"></div>
                    <ThirdSec />

                    {/* Search overlay */}
                    {isSearchOpen && <SearchOverlay open={isSearchOpen} onClose={() => setIsSearchOpen(false)} />}
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default Twitter;
