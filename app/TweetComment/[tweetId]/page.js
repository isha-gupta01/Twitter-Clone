"use client"
import React, { useEffect, useState } from 'react'
import FirstSec from '@/components/FirstSec'
import ThirdSec from '@/components/ThirdSec'
// import Chat from '@/components/MainComment'
// import TweetChat from '@/components/TweetMainComment'
import ProtectedRoute from '@/components/ProtectedRoute'
import MobFirstSec from '@/components/MobFirstSec'
import { useParams } from 'next/navigation'

const CommentPage = () => {
  const [user, setUser] = useState(null);
  // const params = useParams();

  // const tweetId = params.tweetId;

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user")); // Assuming you store user data
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  if (!user) {
    return <div>Loading...</div>; // You can also show a loading state if the user data isn't ready yet
  }

  return (
    <div>
      <ProtectedRoute>
        <div className='black text-white'>
          <div className="flex md:container mx-auto">

            <div className='hidden md:flex'>
              <FirstSec />
            </div>
            <div className='md:hidden block'>
              <MobFirstSec />
            </div>
            <div className=" w-px bg-gray-400 hidden xl:flex opacity-30 sticky left-[5.7rem] z-50"></div>
            
            {/* Pass user data as props to Chat component */}
            {/* <TweetChat 
              userId={user.userId} 
              username={user.username} 
              profileImage={user.profileImage} 
            /> */}
            
            <div className=" w-px bg-gray-400 opacity-25"></div>
            <ThirdSec />

          </div>
        </div>
      </ProtectedRoute>
    </div>
  )
}

export default CommentPage
