"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Posts = () => {
    const [data, setData] = useState([]);

    const handleDelete = async (id) => {
        const token = localStorage.getItem("token");

        try {
            const res = await fetch(`https://twitterclonebackend-nqms.onrender.com/tweetcrud/tweetdelete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) {
                throw new Error("Failed to delete tweet");
            }

            setData((prevData) => prevData.filter((tweet) => tweet._id !== id));
        } catch (error) {
            console.error("Error deleting tweet:", error);
        }
    };

    useEffect(() => {
        const fetchUserTweet = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                console.error("No token found! Please log in.");
                return;
            }

            try {
                const response = await fetch("https://twitterclonebackend-nqms.onrender.com/tweetfetch/usertweets", {
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
                setData(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchUserTweet();
    }, []);

    return (
        <div className="h-screen lg:h-[50vh] overflow-y-auto scrollbar-hide px-2 sm:px-4">
            <ul className="space-y-4">
                {data.map((item, index) => (

                    <li
                        key={item._id}
                        className="flex flex-col  sm:flex-row text-white gap-3 sm:gap-6 p-4  rounded-md shadow-sm"
                    >
                        
                        <div className="flex items-center gap-2 text-base sm:text-lg font-semibold">
                            <span className="text-gray-400 ">{index + 1}.</span>
                            <Link href={`/post/${item._id}`}><div className="break-words max-w-full sm:max-w-[300px]">{item.content}</div></Link>
                        </div>

                        {item.image && (
                            <Link href={`/post/${item._id}`}><div className="mt-2 sm:mt-0">
                                <Image
                                    src={item.image}
                                    alt="Tweet Image"
                                    width={60}
                                    height={60}
                                    className="rounded-md xs:hidden lg:flex object-cover"
                                />
                            </div></Link>
                        )}
                        <div className="sm:ml-auto flex justify-end">
                            <button onClick={() => handleDelete(item._id)} className="mt-2 sm:mt-0">
                                <Image src="/delete.png" alt="Delete" width={24} height={24} className="invert" />
                            </button>
                        </div>


                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Posts;
