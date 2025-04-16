"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const LikeButton = ({ tweetId }) => {
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);
    const [loading, setLoading] = useState(true);

    // Fetch tweet info (likes and whether user has liked it)
    useEffect(() => {
        const fetchTweetLikeStatus = async () => {
            try {
                const response = await fetch(
                    `https://twitterclonebackend-nqms.onrender.com/tweetcrud/tweet/${tweetId}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );

                if (!response.ok) throw new Error("Failed to fetch tweet");

                const tweet = await response.json();
                setLikes(tweet.likes);
                setLiked(tweet.hasLiked); // Assume your backend sends this field
                setLoading(false);
            } catch (error) {
                console.error("Error loading tweet like status:", error);
            }
        };

        fetchTweetLikeStatus();
    }, [tweetId]);

    const handleLike = async () => {
        try {
            const response = await fetch("https://twitterclonebackend-nqms.onrender.com/tweetcrud/likes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ tweetId }),
            });

            if (!response.ok) throw new Error("Failed to update like");

            const result = await response.json();
            setLikes(result.likes);
            setLiked(result.hasLiked);
        } catch (error) {
            console.error("Error updating like:", error);
        }
    };

    if (loading) return null; // Optionally show skeleton or spinner

    return (
        <button
            onClick={handleLike}
            className="flex flex-row items-center text-white/50 fill-white/50 hover:fill-red-500 hover:text-red-500 hover:shadow-[0_0_12px_2px_rgba(226,11,11)] transition-shadow cursor-pointer"
        >
            {liked ? (
                <Image src="/heart.png" alt="Liked" width={15} height={15} />
            ) : (
                <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4">
                    <g>
                        <path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.315 1.99l.49.663.49-.663c.947-1.43 2.664-2.08 4.314-1.99 1.954.1 3.713 1.22 4.6 3.01.896 1.81.85 4.17-.51 6.67z" />
                    </g>
                </svg>
            )}
            <span className="ml-1">{likes}</span>
        </button>
    );
};

export default LikeButton;
