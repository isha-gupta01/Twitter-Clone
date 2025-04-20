"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
const SearchedPosts = ({ userId }) => {
    const [data, setData] = useState([])
    // const [count, setCount] = useState(0)
    useEffect(() => {
        const fetchUserTweet = async () => {
            // const token = localStorage.getItem("token");

            // if (!token) {
            //     setError("No token found! Please log in.");
            //     return;
            // }
            try {
                const response = await fetch(`https://twitterclonebackend-nqms.onrender.com/tweetfetch/tweets/searched/${userId}`, {
                    method: "GET",
                    headers: {
                        // Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }

                const data = await response.json();
                setData(data); // Store the fetched data
            } catch (error) {
                console.log(error)
            }
        }
        fetchUserTweet();

    }, [])

    return (
        <div className="w-full max-w-screen-sm md:max-w-screen-lg mx-auto text-white px-4 sm:px-5 pb-20">
            <ul className="space-y-6">
                {data.map((item, index) => (
                    <li key={item._id} className="border-b border-gray-800 pb-4">
                        <div className="flex gap-3 sm:gap-4 items-start">
                            <div className="text-gray-500 mt-1">{index + 1}.</div>

                            <div className="flex-1 overflow-hidden">
                                <Link href={`/post/${item._id}`}>
                                    <div className="text-white text-sm sm:text-base break-words whitespace-pre-wrap w-full">
                                        {item.content}
                                    </div>
                                </Link>

                                {item.image && (
                                    <Link href={`/post/${item._id}`}>
                                        <div className="mt-3 w-full">
                                            <Image
                                                src={item.image}
                                                alt="Tweet"
                                                width={500}
                                                height={300}
                                                className="rounded-lg object-cover w-full max-h-[300px]"
                                                style={{ maxWidth: '100%', height: 'auto' }}
                                            />
                                        </div>
                                    </Link>
                                )}
                            </div>

                            
                        </div>
                    </li>
                ))}
            </ul>

           
        </div>

    )
}

export default SearchedPosts
