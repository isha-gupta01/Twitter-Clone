"use client"
import ProtectedRoute from '@/components/ProtectedRoute'
import FirstSec from '@/components/FirstSec';
import MobFirstSec from '@/components/MobFirstSec';
import ThirdSec from '@/components/ThirdSec';
import PostViewClient from '@/components/PostViewClient';
import SearchOverlay from '@/components/SearchOverlay';
import { useState } from 'react';
import React from 'react';
import { useParams } from 'next/navigation';


const PostPage =  () => {
  // const post = await getPostById(params.id);
  const params = useParams();
  const tweetId = params;

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
                        <PostViewClient tweetId={tweetId}/>
                        <div className="w-px hidden md:flex bg-gray-400 opacity-30"></div>
                        <ThirdSec />
    
                        {/* Search overlay */}
                        {isSearchOpen && <SearchOverlay open={isSearchOpen} onClose={() => setIsSearchOpen(false)} />}
                    </div>
                </div>
            </ProtectedRoute>
  );
}

export default PostPage;
