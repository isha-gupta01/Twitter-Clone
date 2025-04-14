import React from 'react'
import MobThirdSec from '@/components/MobThirdSec'
import ThirdSec from '@/components/ThirdSec'

const page = () => {
  return (
    <div className='lg:hidden'>
      <div className='hidden md:flex h-[100vh]'>
       <ThirdSec />
      </div>
      <div className='md:hidden block'>
        <MobThirdSec />
      </div>
    </div>
  )
}

export default page
