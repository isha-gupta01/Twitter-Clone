"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Posts from '@/sections/posts'


const Profile = () => {
    const [dataUser, setDataUser] = useState([])
    const [tweetCount, setTweetCount] = useState(0);
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("Posts"); // Default tab

    // Define content for each tab
    const renderContent = () => {
        switch (activeTab) {
            case "Posts":
                return <Posts/>
            case "Replies":
                return <div>Here are your Replies</div>;
            case "Highlights":
                return <div>Your Highlights will appear here</div>;
            case "Articles":
                return <div>Your Articles will be displayed</div>;
            case "Media":
                return <div>All your uploaded Media files</div>;
            case "Likes":
                return <div>Here are your liked tweets</div>;
            default:
                return <div>Select a tab</div>;
        }
    };

    useEffect(() => {
        const fetchTweetCount = async () => {
            try {
                const token = localStorage.getItem("token"); // Get token from localStorage

                if (!token) {
                    console.log("No token found. User not authenticated.");
                    return;
                }

                const response = await fetch("http://localhost:4000/tweetfetch/me", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,  // Send token properly
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch tweet count");
                }

                const data = await response.json();
                console.log(data)
                setTweetCount(data.totalTweets);
            } catch (error) {
                console.error("Error fetching tweet count:", error);
            }
        };

        fetchTweetCount();
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            // console.log(token)

            if (!token) {
                router.push("/LoginPage"); // Redirect to login if no token
                return;
            }

            try {
                const response = await fetch("http://localhost:4000/loggeduser/me", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`, // Include token
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error("Error:", errorData.message);
                    return;
                }

                const result = await response.json();
                // console.log("User Data:", result);
                setDataUser(result);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUser();
    }, []);
    const date = dataUser?.createdAt? new Date(dataUser.createdAt).toLocaleDateString("en-US", {year: "numeric",month: "long",}): "Loading...";    // console.log(date);


    return (
        <div>
            <div className='bg-black w-[600px] min-h-screen overflow-y-auto ml-[188px] flex flex-col'>
                <div className='  flex gap-10 items-center px-4 py-2'>
                    <Link href="/Twitter"><Image src="/back.png" alt='back' width={20} height={20} className='invert self-center' /></Link>
                    <div className=' text-white flex flex-col '>
                        <span className='  text-xl'>{dataUser.Name} </span>
                        <span className='text-sm text-white/30'>{tweetCount} posts</span>
                    </div>
                </div>
                <div className="relative  h-48 bg-gray-600">
                    {/* <Image src="/hqdefault.png" alt='cover image'width={600} height={200} className='object-fit z-0 h-[192px]'/> */}
                    {/* Profile Picture */}
                    <div className="absolute left-5 z-50 -bottom-[5.5rem]">
                        <Image
                            src={dataUser.profileImage} // Change to your profile image URL
                            alt="Profile Picture"
                            width={100}
                            height={100}
                            className="w-44 h-44 rounded-full border-4 border-black"
                        />
                    </div>

                    {/* Set Up Profile Button */}
                    <div className="absolute -bottom-14 right-4">
                        <Link href="/SetupProfile"><button className="px-6 py-2 border border-gray-500 text-white rounded-full hover:bg-gray-700">
                            Set up profile
                        </button></Link>
                    </div>
                </div>
                <div className='flex flex-col mt-28 text-white ml-8'>
                    <span className='text-xl flex gap-6 font-bold'>{dataUser.Name}<div className='flex gap-3 px-3  bg-black text-white text-[1rem] items-center border border-white rounded-full'><Image src="/notification.png" alt='verified' height={20} width={20} className='w-5 h-5' /><span className='text-white'>Get Verified</span></div></span>
                    <span className='text-[1rem] text-white/30'>{dataUser.username}</span>
                    <span className='flex gap-3 my-2 text-white/30 items-center'><Image src="/calendar.png" alt='calender' width={20} height={20} className='invert w-5 h-5 opacity-30' />Joined {date}</span>
                    <div className='text-white/30 flex gap-7'>
                        <span>{dataUser.following}0 Following </span>
                        <span>{dataUser.followers}1 Followers</span>
                    </div>
                </div>
                <div className='mt-10 text-white/30 '>
                    <ul className="flex gap-[3.2rem]  pl-4 pr-5 border-b border-gray-700 py-4">
                        {["Posts", "Replies", "Highlights", "Articles", "Media", "Likes"].map((tab) => (
                            <li
                                key={tab}
                                className={`cursor-pointer ${activeTab === tab ? "text-white font-bold border-b-2 border-white" : "text-gray-500"
                                    }`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab}
                            </li>
                        ))}
                    </ul>

                    {/* Content Section */}
                    <div className="mt-4">{renderContent()}</div>
                </div>
            </div>
        </div>
    )
}

export default Profile
