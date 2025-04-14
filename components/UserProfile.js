"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import UserPosts from "@/sections/UserPosts";
import FollowButton from "./FollowButton";

const UserProfile = ({ userId }) => {
    const [dataUser, setDataUser] = useState([]);
    const [tweetCount, setTweetCount] = useState(0);
    const [activeTab, setActiveTab] = useState("Posts"); // Default tab
    const router = useRouter();

    useEffect(() => {
        if (!userId) return; // Prevent fetch if userId is not available
        console.log(userId);
        const fetchUser = async () => {
            // const token = localStorage.getItem("token");

            if (!token) {
                router.push("/LoginPage"); // Redirect to login if no token
                return;
            }

            try {
                const response = await fetch(`https://twitterclonebackend-nqms.onrender.com/loggeduser/profile/${userId}`, {
                    method: "GET",
                    headers: {
                        // Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }

                const result = await response.json();
                console.log("Fetched user data:", result);
                // console.log("Is bio an array?", Array.isArray(result.bio));
                console.log("Bio:", result.bio);
                setDataUser(result);
                // console.log(result)
                // console.log(Array.isArray(dataUser.bio)); // should log true
                // console.log(dataUser.bio); 
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUser();
        // Fetch data whenever userId changes


        const fetchTweetCount = async () => {
            try {
                const token = localStorage.getItem("token"); // Get token from localStorage

                if (!token) {
                    console.log("No token found. User not authenticated.");
                    return;
                }

                const response = await fetch(`https://twitterclonebackend-nqms.onrender.com/tweetfetch/profiletweetcount/${userId}`, {
                    method: "GET",
                    headers: {
                        // "Authorization": `Bearer ${token}`,  // Send token properly
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch tweet count");
                }

                const data = await response.json();
                // console.log(data)
                setTweetCount(data.totalTweets);
            } catch (error) {
                console.error("Error fetching tweet count:", error);
            }
        }
        fetchTweetCount();
    }, [userId]);

    const renderContent = () => {
        switch (activeTab) {
            case "Posts":
                return <UserPosts userId={userId} />;
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

    if (!dataUser) {
        return <div className="text-white text-center mt-10">Loading user data...</div>;
    }

    const profileImageSrc = dataUser.profileImage || "/default-profile.png"; // Provide a default profile image
    const dateJoined = dataUser.createdAt
        ? new Date(dataUser.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long" })
        : "Loading...";
    // const bioData = dataUser.bio ? dataUser.bio : "No Bio"
    // should log something like ["Developer", "Tech lover"]


    return (
        <div className="bg-black sm:w-[430px] md:w-[703px] md:ml-[178px] xl:ml-[188px] lg:ml-[53px] min-h-screen overflow-y-auto flex flex-col">
            <div className="flex gap-10 items-center px-4 py-2">
                <Link href="/Twitter">
                    <Image src="/back.png" alt="back" width={20} height={20} className="invert self-center" />
                </Link>
                <div className="text-white flex flex-col">
                    <span className="text-xl">{dataUser.Name}</span>
                    <span className="text-sm text-white/30">{tweetCount} posts</span>
                </div>
            </div>
            <div className="relative h-48 bg-gray-600">
                {/* Profile Picture */}
                <div className="absolute left-5 z-50 -bottom-[5.5rem]">
                    <Image
                        src={profileImageSrc}
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
            <div className="flex flex-col mt-32 text-white ml-8">
                <span className="text-xl flex gap-6 font-bold">
                    {dataUser.Name}
                </span>
                <span className="text-[1rem] text-white/30">{dataUser.username}</span>
                <span className="flex gap-3 my-2 text-white/30 items-center">
                    <Image src="/calendar.png" alt="calendar" width={20} height={20} className="invert w-5 h-5 opacity-30" />
                    Joined {date}
                </span>
                <div className="text-white/30 flex gap-7">
                    <span>{dataUser?.following?.length ?? 0} Following</span>
                    <span>{dataUser?.followers?.length ?? 0} Followers</span>
                </div>

                <div className="flex justify-center">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {dataUser.bio.map((item, index) => (
                            <div key={index}>
                                <div

                                    className="mt-2 text-white flex items-center justify-center h-8 border border-white rounded-3xl w-fit px-8 py-3">
                                    {item}<span>Hi</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
            <div className="mt-10 text-white/30">
                <ul className="flex gap-[1rem] xl:gap-[3.2rem]   pl-4 pr-5 border-b border-gray-700 py-4">
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
    );
};

export default UserProfile;
