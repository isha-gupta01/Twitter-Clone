"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import DeleteConfirmationModal from '@/components/DeleteConfirmationModal';

const Posts = () => {
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tweetToDelete, setTweetToDelete] = useState(null);

    const handleDelete = async (id) => {
        const token = localStorage.getItem("token");

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tweetcrud/tweetdelete/${id}`, {
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
            setIsModalOpen(false);
            setTweetToDelete(null);
        } catch (error) {
            console.error("Error deleting tweet:", error);
        }
    };

    const openModal = (id) => {
        setTweetToDelete(id);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTweetToDelete(null);
    };

    useEffect(() => {
        const fetchUserTweet = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                console.error("No token found! Please log in.");
                return;
            }

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tweetfetch/usertweets`, {
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
        <div className="w-full max-w-screen-sm md:max-w-screen-lg mx-auto text-white px-4 sm:px-5 pb-20">
            <ul className="space-y-6">
                {data.map((item, index) => (
                    <li key={item._id} className="border-b border-gray-800 sm:px-5 lg:px-0 pb-4">
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

                            <div className="ml-auto">
                                <button onClick={() => openModal(item._id)}>
                                    <Image src="/delete.png" alt="Delete" width={20} height={20} className="invert" />
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Confirmation Modal */}
            <DeleteConfirmationModal
                isOpen={isModalOpen}
                onCancel={closeModal}
                onConfirm={() => handleDelete(tweetToDelete)}
            />
        </div>

    );
};

export default Posts;
