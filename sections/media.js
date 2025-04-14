"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import Image from 'next/image'
const Media = ({ userId }) => {
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchUserTweet = async () => {
            try {
                const response = await fetch(`https://twitterclonebackend-nqms.onrender.com/tweetfetch/profile/${userId}`, {
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
        <div className="h-screen lg:h-[50vh] overflow-y-auto xl:overflow-y-auto scrollbar-hide px-3">
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {data.map((item, index) => (
                    <li
                        key={index}
                        className="text-white text-lg flex flex-col items-center"
                    >
                        {item.image && (
                            <div className="bg-gray-500 w-full aspect-square overflow-hidden rounded-lg">
                                <Image
                                    src={item.image}
                                    alt="img"
                                    width={200}
                                    height={200}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>




    )
}

export default Media
