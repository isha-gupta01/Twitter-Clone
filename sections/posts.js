"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import Image from 'next/image'
const Posts = () => {
    const [data, setData] = useState([])
    // const [count, setCount] = useState(0)


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
    
            // Remove the deleted tweet from UI
            setData((prevData) => prevData.filter((tweet) => tweet._id !== id));
        } catch (error) {
            console.error("Error deleting tweet:", error);
        }
    };
    
    useEffect(() => {
        const fetchUserTweet = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setError("No token found! Please log in.");
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
                setData(data); // Store the fetched data
            } catch (error) {
                console.log(error)
            }
        }
        fetchUserTweet();

    }, [])

    return (
        <div className="h-screen lg:h-[50vh] overflow-y-auto xl:overflow-y-auto scrollbar-hide">
            <ul className="space-y-4">
                {data.map((item, index) => (
                    <li
                        key={item._id}
                        className="flex text-lg text-white px-8 gap-8 py-5 items-center"
                    >
                        <button onClick={()=>handleDelete(item._id)} ><Image src="/delete.png" alt="D" width={30} height={30} className='invert'/></button>
                        <div className="flex justify-between gap-14 items-center w-full">
                            <div className="w-[350px]">{item.content}</div>
                            <div className="hidden xl:flex">
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



    )
}

export default Posts
