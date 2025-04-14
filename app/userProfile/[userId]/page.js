"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import FirstSec from "@/components/FirstSec";
import ThirdSec from "@/components/ThirdSec";
import UserProfile from "@/components/UserProfile";
import ProtectedRoute from "@/components/ProtectedRoute";
import MobFirstSec from "@/components/MobFirstSec";

const ProfilePage = () => {
    const { userId } = useParams(); // Get userId from URL
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        if (!userId) return; // Prevent unnecessary fetch

        const fetchUserProfile = async () => {
            try {
                const res = await fetch(`https://twitterclonebackend-nqms.onrender.com/loggeduser/profile/${userId}`);
                if (!res.ok) throw new Error("User not found");
                const userData = await res.json();
                setSelectedUser(userData._id);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchUserProfile();
    }, [userId]);

    return (
        <ProtectedRoute>
            <div className="black text-white">
                <div className="flex md:container mx-auto">
                <div className='hidden md:flex'>
                            <FirstSec />
                        </div>
                        <div className='md:hidden block'>
                            <MobFirstSec />
                        </div>
                    <div className="w-px bg-gray-400 hidden md:flex opacity-30 sticky left-[5.7rem] z-50"></div>
                    
                    {/* Pass the selected user to UserProfile */}
                    <UserProfile userId={selectedUser} />
                    
                    <div className="w-px bg-gray-400 opacity-25"></div>
                    <ThirdSec />
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default ProfilePage;
