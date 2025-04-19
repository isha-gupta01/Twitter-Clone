'use client'

import React, { useState, useEffect } from 'react'
// import FirstSec from '@/components/FirstSec'
// import ThirdSec from '@/components/ThirdSec'
// import MobFirstSec from '@/components/MobFirstSec'
// import SearchOverlay from '@/components/SearchOverlay'
import TweetPostCard from './TweetPostCart'
import Link from 'next/link'
import Image from 'next/image'

const PostViewClient = ({tweetId}) => {

    const [scrolled, setScrolled] = useState(false)

    // const params = useParams()

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > window.innerHeight * 0.5) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])


    return (
        <div>
            <div className="second bg-black w-full md:w-[703px] xl:w-[907px] lg:w-[703px] mb-20 md:mb-0 md:ml-[60px]  xl:ml-[90px] lg:ml-[58px] overflow-y-auto scrollbar-hide ">
                <div className={`${scrolled ? "hidden" : "flex flex-col fixed top-0"} md:flex md:flex-col md:fixed md:top-0 z-50 `}>
                    <div className="backdrop-blur w-[500px] md:w-[703px] xl:w-[907px] lg:w-[703px] max-h-fit md:h-[53px] bg-black/30 flex flex-col md:flex-row  ">
                        <div className='flex gap-3 px-10 py-5'>
                            <Link href="/Twitter"><Image src="/back.png" alt='back' width={20} height={20} className='invert self-center' /></Link>
                            <div className=''>Post</div>
                        </div>

                    </div>
                    <hr className="opacity-25 relative w-full " />
                </div>


                <hr className="opacity-25 w-full" />


            </div>
            <TweetPostCard tweetId={tweetId}/>
        </div>

    )
}

export default PostViewClient
