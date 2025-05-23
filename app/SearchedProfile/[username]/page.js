"use client"
import React, { useState, useEffect } from 'react'
import FirstSec from '@/components/FirstSec'
import ThirdSec from '@/components/ThirdSec'
import SearchedUser from '@/components/SearchedUser'
import ProtectedRoute from '@/components/ProtectedRoute'
import MobFirstSec from '@/components/MobFirstSec'
import { useParams } from 'next/navigation'
import SearchOverlay from '@/components/SearchOverlay'


const SearchedProfilePage = () => {
    const [id, setId] = useState(null)
    const params = useParams();
    const username = params.username;

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const res = await fetch(`https://twitterclonebackend-nqms.onrender.com/api/users/media/${username}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if (!res.ok) {
                    console.log("Failed to fetch userId");
                    return;
                }
                const userId = await res.json();
                setId(userId);
            } catch (err) {
                console.error("Error fetching userId:", err);
            }
        }

        if (username) {
            fetchUserId();
        }
    }, [username]);
    const [isSearchOpen, setIsSearchOpen] = useState(false);


    return (
        <div>
            <ProtectedRoute>
                <div className='black text-white overflow-x-hidden'>
                    <div className="flex md:container mx-auto">

                        <div className='hidden md:flex'>
                            <FirstSec onSearchClick={() => setIsSearchOpen(true)} />
                        </div>
                        <div className='md:hidden block'>
                            <MobFirstSec />
                        </div>
                        <div className="w-px bg-gray-400 hidden md:flex opacity-30 sticky left-[5.7rem] z-50"></div>

                        <SearchedUser username={username} userId={id} />

                        <div className="w-px bg-gray-400 opacity-25"></div>
                        <ThirdSec />
                        {/* Search overlay */}
                        {isSearchOpen && <SearchOverlay open={isSearchOpen} onClose={() => setIsSearchOpen(false)} />}

                    </div>
                </div>
            </ProtectedRoute>
        </div>
    )
}

export default SearchedProfilePage;
