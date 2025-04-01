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

                const response = await fetch("https://twitterclonebackend-nqms.onrender.com/tweetfetch/me", {
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
                const response = await fetch("https://twitterclonebackend-nqms.onrender.com/loggeduser/me", {
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
            <div className='bg-black sm:w-[430px] md:w-[600px] md:ml-[178px] xl:ml-[188px] lg:ml-[149px] min-h-screen overflow-y-auto flex flex-col'>
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
                    <span className='text-xl flex gap-6 font-bold'>{dataUser.Name}<div className='flex gap-3 px-3  bg-black text-white text-[1rem] items-center border border-white rounded-full'><svg viewBox="0 0 22 22" aria-label="Verified account" role="img"
                                        className="w-4 fill-blue-500 r-4qtqp9 r-yyyyoo r-1xvli5t r-bnwqim r-lrvibr r-m6rgpd r-1cvl2hr r-f9ja8p r-og9te1 r-3t4u6i"
                                        data-testid="icon-verified">
                                        <g>
                                            <path
                                                d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z">
                                            </path>
                                        </g>
                                    </svg><span className='text-white'>Get Verified</span></div></span>
                    <span className='text-[1rem] text-white/30'>{dataUser.username}</span>
                    <span className='flex gap-3 my-2 text-white/30 items-center'><Image src="/calendar.png" alt='calender' width={20} height={20} className='invert w-5 h-5 opacity-30' />Joined {date}</span>
                    <div className='text-white/30 flex gap-7'>
                        <span>{dataUser.following}0 Following </span>
                        <span>1 Followers</span>
                    </div>
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
    )
}

export default Profile
