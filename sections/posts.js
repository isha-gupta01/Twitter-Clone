"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import Image from 'next/image'
const Posts = () => {
    const [data, setData] = useState([])
    // const [count, setCount] = useState(0)
    useEffect(() => {
        const fetchUserTweet = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setError("No token found! Please log in.");
                return;
            }
            try {
                const response = await fetch("http://localhost:4000/tweetfetch/usertweets", {
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
                setData(data); // Store the fetched data
            } catch (error) {
                console.log(error)
            }
        }
        fetchUserTweet();

    }, [])

    return (
        <div>
            <div className=''>
                <ul className="">
                    {data.map((item, index) => (
                        <li key={item._id} className="flex text-lg text-white px-8 gap-8  py-5 items-center">
                            <div>{index + 1}.</div>
                            <div className='flex justify-between gap-14  items-center'>
                                <div className='w-[370px]'>{item.content}</div>
                                <div className=''>
                                    {item.image && (
                                        <div>
                                            <Image src={item.image} alt="img" width={50} height={50} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    )
}

export default Posts
