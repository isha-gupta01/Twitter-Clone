"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const FollowButton = ({ userIdToFollow }) => {
    const [isFollowing, setIsFollowing] = useState(false);
    const router = useRouter();

    // Get logged-in user from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    const followerId = user?.userId;

    useEffect(() => {
        // Load follow state from localStorage
        const storedFollowState = localStorage.getItem(`follow_${userIdToFollow}`);
        if (storedFollowState) {
            setIsFollowing(JSON.parse(storedFollowState)); // Convert back to boolean
        } else {
            // Check if user is following (API request)
            const checkFollowingStatus = async () => {
                try {
                    const response = await fetch(`https://twitterclonebackend-nqms.onrender.com/loggeduser/${userIdToFollow}`);
                    const data = await response.json();
                    
                    if (response.ok && data.followers.includes(followerId)) {
                        setIsFollowing(true);
                        localStorage.setItem(`follow_${userIdToFollow}`, JSON.stringify(true));
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            };

            checkFollowingStatus();
        }
    }, [userIdToFollow, followerId]);

    const handleFollowToggle = async () => {
        if (!followerId) {
            alert("Please log in first.");
            router.push('/LoginPage');
            return;
        }

        const url = `https://twitterclonebackend-nqms.onrender.com/loggeduser/${isFollowing ? "unfollow" : "follow"}/${userIdToFollow}`;
        
        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ followerId }),
            });

            if (response.ok) {
                setIsFollowing(!isFollowing); // Toggle state
                localStorage.setItem(`follow_${userIdToFollow}`, JSON.stringify(!isFollowing)); // Save state in localStorage
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <button onClick={handleFollowToggle} className={`px-4 py-2 rounded ${isFollowing ? "bg-red-500" : "bg-blue-500"} text-white`}>
            {isFollowing ? "Unfollow" : "Follow"}
        </button>
    );
};

export default FollowButton;
