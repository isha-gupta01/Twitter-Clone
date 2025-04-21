"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import FollowingsContent from './followingsContent'
import Link from 'next/link'

const Following = () => {
    const [loading, setLoading] = useState(true)
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > window.innerHeight * 0.5) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);


    const user = JSON.parse(localStorage.getItem("user"))



    
    //fetching tweets
    useEffect(() => {
        const fetchTweets = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setError("No token found! Please log in.");
                return;
            }
            try {
                setLoading(true);
                const response = await fetch("https://twitterclonebackend-nqms.onrender.com/tweetfetch/tweets", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }

                const data = await response.json();
                setData(data); // Store the fetched data of tweets
            } catch (error) {
                setError(error.message);
            }
            finally {
                setLoading(false);
            }
        };

        fetchTweets();

    }, []);



    return (
        <div>
            <div className="second bg-black w-full md:w-[703px] mb-20 md:mb-0 min-h-screen  md:ml-[60px]  xl:ml-[93px] lg:ml-[59px] overflow-y-auto scrollbar-hide ">
                <div className={`${scrolled ? "hidden" : "flex flex-col fixed top-0"} md:flex md:flex-col md:fixed md:top-0 z-50 `}>
                    <div className="backdrop-blur w-[500px] md:w-[703px] max-h-fit md:h-[53px] bg-black/30 flex flex-col md:flex-row  ">
                        <div className='flex md:hidden   items-center'>
                            <Link href="/Logout">
                                <li
                                    className="flex md:justify-start items-center justify-center  md:w-fit   hover:bg-gray-900 hover:cursor-pointer px-5 py-3 hover:rounded-full">
                                    <Image src={user.profileImage} alt="person" width={50} height={50} className='rounded-full' />
                                </li>
                            </Link>
                            <div className=''>Home</div>
                        </div>
                        <div className='flex'>
                            <div className="text-[1.1rem] w-[210px] md:w-[300px] h-[53px]  flex justify-center items-center flex-col text-white hover:text-white cursor-pointer text-center"><Link href="/Twitter"><span>Home</span>
                            </Link>

                            </div>
                            <div className='flex'>
                                <Link href="/following"><div className="text-[1.1rem]  md:w-[300px] h-[53px]  flex justify-center items-center text-white hover:text-white cursor-pointer text-center">Following</div></Link>
                                <div className='w-[4rem] h-[6px] backdrop-blur rounded-full  bg-blue-500 relative -bottom-[3rem] right-[4.4rem] md:-bottom-[3rem] md:right-[11.5rem]'></div>
                            </div>
                        </div>
                    </div>
                    <hr className="opacity-25 relative  " />
                </div>


                <hr className="opacity-25 w-full" />
                {loading ? (<div className="flex mt-40 ml-40 md:ml-0 md:mt-20 justify-center items-center h-20">
                    <div className="animate-spin h-8 w-8 border-4 border-gray-300 border-t-blue-500 rounded-full"></div>
                </div>) : (<FollowingsContent />)}
            </div>
        </div>
    )
}

export default Following

