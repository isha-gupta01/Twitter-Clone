"use client"
import React, { useEffect, useState } from 'react'
import ProtectedRoute from '@/components/ProtectedRoute'
import FirstSec from '@/components/FirstSec'
import MobFirstSec from '@/components/MobFirstSec'
import TweetComments from '@/components/TweetComment'
import ThirdSec from '@/components/ThirdSec'

const CommentPage = () => {
  const [user, setUser] = useState(null);


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
    <ProtectedRoute>
      <div>
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
            <TweetComments
              userId={user?.userId}
              username={user?.username}
              profileImage={user?.profileImage}
            />

            <div className=" w-px bg-gray-400 opacity-25"></div>
            <ThirdSec />

          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default CommentPage