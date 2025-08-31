"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const FollowButton = ({ userIdToFollow }) => {
    const [isFollowing, setIsFollowing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        const followerId = user?.userId;

        if (!followerId || !userIdToFollow || followerId === userIdToFollow) return;

        const checkFollowStatus = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/loggeduser/profile/${userIdToFollow}`);
                const data = await res.json();

                if (res.ok) {
                    const isUserFollowing = data.followers.includes(followerId);
                    setIsFollowing(isUserFollowing);
                } else {
                    console.error("Failed to load follow status.");
                }
            } catch (error) {
                console.error("Error checking follow status:", error);
            } finally {
                setIsLoading(false);
            }
        };

        checkFollowStatus();
    }, [userIdToFollow]);

    const handleFollowToggle = async () => {
        const token = localStorage.getItem("token");
    
        if (!token) {
            alert("Please log in first.");
            router.push("/LoginPage");
            return;
        }
    
        const action = isFollowing ? "unfollow" : "follow";
    
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/loggeduser/${action}/${userIdToFollow}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // JWT from localStorage
                },
            });
    
            if (response.ok) {
                setIsFollowing(!isFollowing); // Toggle button state
            } else {
                const data = await response.json();
                alert(data.message || "Something went wrong.");
            }
        } catch (error) {
            console.error(`Error during ${action}:`, error);
        }
    };
    
    if (isLoading) return null;

    return (
        <button
            onClick={handleFollowToggle}
            className={`px-4 py-2 rounded ${isFollowing ? "border border-white rounded-3xl font-bold" : " hover:bg-sky-600 font-bold bg-sky-500 rounded-3xl "} text-white`}
        >
            {isFollowing ? "Unfollow" : "Follow"}
        </button>
    );
};

export default FollowButton;
