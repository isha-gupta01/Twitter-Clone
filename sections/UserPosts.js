"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const UserPosts = ({ userId }) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!userId) return; // ✅ Ensure `userId` is available before making the request

        const fetchUserTweet = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setError("No token found! Please log in.");
                return;
            }

            try {
                const response = await fetch(`https://twitterclonebackend-nqms.onrender.com/tweetfetch/profile/${userId}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }

                const result = await response.json();

                if (Array.isArray(result)) {
                    setData(result); // ✅ Ensure response is an array before setting state
                } else {
                    console.error("Unexpected API response:", result);
                    setData([]); // Prevent errors by setting an empty array
                }
            } catch (error) {
                console.error("Error fetching tweets:", error);
                setError("Failed to fetch tweets.");
                setData([]); // Ensure `data` is always an array
            }
        };

        fetchUserTweet();
    }, [userId]); // ✅ Added `userId` dependency to re-fetch when `userId` changes

    return (
        <div>
            {error && <p className="text-red-500">{error}</p>} {/* ✅ Show error message if any */}
            <div className="">
                <ul className="">
                    {data.length > 0 ? (
                        data.map((item, index) => (
                            <li key={item._id} className="flex text-lg text-white px-8 gap-8 py-5 items-center">
                                <div>{index + 1}.</div>
                                <div className="flex justify-between gap-14 items-center">
                                    <div className="w-[370px]">{item.content}</div>
                                    {item.image && (
                                        <div>
                                            <Image src={item.image} alt="img" width={50} height={50} />
                                        </div>
                                    )}
                                </div>
                            </li>
                        ))
                    ) : (
                        <p className="text-white">No tweets found.</p> // ✅ Show fallback message if `data` is empty
                    )}
                </ul>
            </div>
        </div>
    );
};

export default UserPosts;
