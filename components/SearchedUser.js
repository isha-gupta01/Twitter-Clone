"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
// import { useRouter } from 'next/navigation'
import SearchedPosts from '@/sections/searchedPosts'
import Media from '@/sections/media'
import FollowButton from './FollowButton'

const SearchedUser = ({ username, userId }) => {
    const [dataUser, setDataUser] = useState(null);
    const [tweetCount, setTweetCount] = useState(0);
    const [activeTab, setActiveTab] = useState("Posts");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // const router = useRouter();

    const renderContent = () => {
        switch (activeTab) {
            case "Posts":
                return <SearchedPosts userId={userId} />;
            case "Replies":
                return <div>Here are your Replies</div>;
            case "Highlights":
                return <div>Your Highlights will appear here</div>;
            case "Articles":
                return <div>Your Articles will be displayed</div>;
            case "Media":
                return <Media userId={userId} />;
            case "Likes":
                return <div>Here are your liked tweets</div>;
            default:
                return <div>Select a tab</div>;
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await fetch(`https://twitterclonebackend-nqms.onrender.com/loggeduser/profile/searched/${username}`);
                if (!res.ok) throw new Error("User not found");
                
                const user = await res.json();
                setDataUser(user);
                const userId = user._id; // ✅ Extract userId from the response
    
                // ✅ Fetch their tweet count using the correct userId
                const tweetRes = await fetch(`https://twitterclonebackend-nqms.onrender.com/tweetfetch/count/searched/${userId}`);
                const tweetData = await tweetRes.json();
                setTweetCount(tweetData.totalTweets || 0);
            } catch (err) {
                console.error(err);
                setError("User not found or error fetching data");
            } finally {
                setLoading(false);
            }
        };
    
        fetchUserData();
    }, [username]);
    

    if (loading) return <div className="flex mx-auto mt-20 md:w-[703px] justify-center items-center">
        <div className="animate-spin h-6 w-6  border-4 border-gray-300 border-t-blue-500 rounded-full"></div>
    </div>
    if (error || !dataUser) return <div className="text-red-500 p-4">{error}</div>;

    const joinDate = dataUser?.createdAt
        ? new Date(dataUser.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long" })
        : "Unknown";

    return (
        <div>
            <div className='bg-black sm:w-[430px] md:w-[712px] md:ml-[80px] xl:w-[90.9vw] xl:ml-[93px] lg:w-[703px] lg:ml-[59px] min-h-screen overflow-y-auto flex flex-col'>
                <div className='  flex gap-10 items-center px-4 py-2'>
                    <Link href="/Twitter"><Image src="/back.png" alt='back' width={20} height={20} className='invert self-center' /></Link>
                    <div className=' text-white flex flex-col '>
                        <span className='  text-xl'>{dataUser.Name} </span>
                        <span className='text-sm text-white/30'>{tweetCount} posts</span>
                    </div>
                </div>
                <div className="relative  h-48 bg-gray-600">

                    <div className="absolute left-5 z-50 -bottom-[5.5rem]">
                        <Image
                            src={dataUser.profileImage} // Change to your profile image URL
                            alt="Profile Picture"
                            width={100}
                            height={100}
                            className="w-44 h-44 rounded-full border-4 border-black"
                        />
                    </div>
                    {/* Follow Button */}
                    <div className="absolute -bottom-14 right-4">
                        <Link href="#">
                            <FollowButton userIdToFollow={dataUser._id} />
                            {/* <div className="text-white">{dataUser._id}</div> */}
                        </Link>
                    </div>

                </div>
                <div className='flex flex-col mt-28 text-white ml-8'>
                    <span className='text-[1rem] text-white/30'>{dataUser.username}</span>
                    <span className='flex gap-3 my-2 text-white/30 items-center'><Image src="/calendar.png" alt='calender' width={20} height={20} className='invert w-5 h-5 opacity-30' />Joined {joinDate}</span>
                    <div className='text-white/30 flex gap-7'>
                        <span>{dataUser?.following?.length ?? 0}  Following </span>
                        <span>{dataUser?.followers?.length ?? 0}  Followers</span>
                    </div>
                    {!dataUser.bio ? (
                        <p className="text-white">Loading...</p>
                    ) : (
                        <div className='flex flex-col md:flex-row gap-2'>
                            {(dataUser.bio || []).map((item, index) => (
                                <div key={index}>
                                    <div className='mt-2 text-white flex whitespace-nowrap  items-center justify-center h-8 border border-white rounded-3xl w-fit px-8 py-3'>
                                        {item}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                </div>
                <div className='mt-10 text-white/30 '>
                    <ul className="flex gap-[2rem] xl:gap-[3.2rem]  pl-4 pr-5 border-b border-gray-700 py-4">
                        {["Posts", "Replies", "Highlights", "Articles", "Media"].map((tab) => (
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
    );
};

export default SearchedUser;
