"use client"
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Posts from "@/sections/posts";
import Media from "@/sections/media";

const Profile = ({ userId }) => {
  const [isImageUpdating, setIsImageUpdating] = useState(false);
  const [dataUser, setDataUser] = useState(null);
  const [tweetCount, setTweetCount] = useState(0);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Posts");

  const defaultProfileImage = "/person2.png";
  const [profileImageSrc, setProfileImageSrc] = useState(defaultProfileImage);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const fileInputRef = useRef(null);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // Toggle menu
  const handleImageClick = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Update localStorage helper
  const updateLocalStorageProfile = (newProfileImage) => {
    const existingUser = JSON.parse(localStorage.getItem("user")) || {};
    const updatedUser = { ...existingUser, profileImage: newProfileImage };
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  // Handle file select & update profile
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsImageUpdating(true);
    const formData = new FormData();
    formData.append("imageUrl", file);
    formData.append("userId", userId);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/loggeduser/updateProfileImage`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Image update failed");

      const updated = await res.json();

      setDataUser((prev) => ({
        ...prev,
        profileImage: updated.user.profileImage,
      }));
      setProfileImageSrc(updated.user.profileImage);

      updateLocalStorageProfile(updated.user.profileImage);
      setIsImageUpdating(false)
      setIsMenuOpen(false);
      window.location.reload();
    } catch (err) {
      console.error("Error updating profile image:", err);
      setIsImageUpdating(false)
    }
  };

  // Open file input
  const handleUpdateImage = () => {
    fileInputRef.current?.click();
  };

  // Remove profile image
  const handleRemoveImage = async () => {
    setIsImageUpdating(true)
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/loggeduser/removeProfileImage`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: userId }),
        }
      );

      if (!res.ok) throw new Error("Failed to remove image");

      await res.json();

      setProfileImageSrc(defaultProfileImage);
      setDataUser((prev) => ({
        ...prev,
        profileImage: defaultProfileImage,
      }));

      updateLocalStorageProfile(defaultProfileImage);
      setIsImageUpdating(false)
      setIsMenuOpen(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
      setIsImageUpdating(false)
    }
  };

  // Tabs
  const renderContent = () => {
    switch (activeTab) {
      case "Posts":
        return <Posts />;
      case "Replies":
        return <div>Here are your Replies</div>;
      case "Highlights":
        return <div>Your Highlights will appear here</div>;
      case "Articles":
        return <div>Your Articles will be displayed</div>;
      case "Media":
        return <Media userId={userId} />;
      case "Likes":
        return <div>Here are your liked tweets</div>;
      default:
        return <div>Select a tab</div>;
    }
  };

  // Fetch tweet count
  useEffect(() => {
    const fetchTweetCount = async () => {
      try {
        if (!token) return;

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/tweetfetch/me`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch tweet count");

        const data = await response.json();
        setTweetCount(data.totalTweets);
      } catch (error) {
        console.error("Error fetching tweet count:", error);
      }
    };

    fetchTweetCount();
  }, [token]);

  // Fetch user
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        router.push("/LoginPage");
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/loggeduser/me`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error:", errorData.message);
          return;
        }

        const result = await response.json();
        setDataUser(result);
        setProfileImageSrc(result.profileImage || defaultProfileImage);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [token, router]);

  const date = dataUser?.createdAt
    ? new Date(dataUser.createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    })
    : "Loading...";

  return (
    <div>
      <div className="second scrollbar-hide bg-black sm:w-[430px] md:w-[712px] md:ml-[72px] xl:w-[89.3vw] xl:ml-[93px] lg:w-[703px] lg:ml-[59px] min-h-screen overflow-y-auto flex flex-col">
        <div className="flex gap-10 items-center px-4 py-2">
          <Link href="/Twitter">
            <Image
              src="/back.png"
              alt="back"
              width={20}
              height={20}
              className="invert self-center"
            />
          </Link>
          <div className=" text-white flex flex-col ">
            <span className="  text-xl">{dataUser?.Name} </span>
            <span className="text-sm text-white/30">{tweetCount} posts</span>
          </div>
        </div>
        <div className="relative  h-48 bg-gray-600">
          <Image
            src={dataUser?.coverImage || "/cover-fallback.png"}
            alt=""
            width={703}
            height={200}
            className="object-cover z-0 h-[192px] w-full"
          />
          {/* Profile Picture */}
          {isImageUpdating ? (
            <div className="w-44 h-44 absolute left-5 z-50 -bottom-[5.5rem] rounded-full border-4 border-black flex items-center justify-center bg-gray-800">
              <div className="animate-spin h-6 w-6 border-4 border-gray-300 border-t-blue-500 rounded-full"></div>
            </div>
          ) : (
            <div className="absolute left-5 z-50 -bottom-[5.5rem]">
              <Image
                src={profileImageSrc || defaultProfileImage}
                alt=""
                width={100}
                height={100}
                className="w-44 h-44 rounded-full border-4 cursor-pointer border-black"
                onClick={handleImageClick}
              />
            </div>
          )}

          {isMenuOpen && (
            <div className="absolute right-[3rem] top-[5rem] sm:right-[7rem] sm:top-[7rem] md:top-[10rem] md:right-[24rem] border z-90 bg-black  shadow-lg rounded-md p-3">
              <ul>
                <li
                  className="cursor-pointer  text-white"
                  onClick={handleRemoveImage}
                >
                  Remove Image
                </li>
                <hr />
                <li
                  className="cursor-pointer text-white"
                  onClick={handleUpdateImage}
                >
                  Update Image
                </li>
              </ul>
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            style={{ display: "none" }}
          />

          {/* Set Up Profile Button */}
          <div className="absolute -bottom-14 right-1 sm:right-12 md:right-5">
            <Link href="/SetupProfile">
              <button className="px-6 py-2 border border-gray-500 text-white rounded-full z-0 hover:bg-gray-700">
                Set up profile
              </button>
            </Link>
          </div>
        </div>
        <div className="flex flex-col mt-28 text-white ml-8">
          <span className="text-xl flex gap-6 font-bold">
            {dataUser?.Name}
          </span>
          <span className="text-[1rem] text-white/30">
            {dataUser?.username}
          </span>
          <span className="flex gap-3 my-2 text-white/30 items-center">
            <Image
              src="/calendar.png"
              alt="calender"
              width={20}
              height={20}
              className="invert w-5 h-5 opacity-30"
            />
            Joined {date}
          </span>
          <div className="text-white/30 flex gap-7">
            <span>{dataUser?.following?.length ?? 0} Following </span>
            <span>{dataUser?.followers?.length ?? 0} Followers</span>
          </div>
          {!dataUser?.bio ? (
            <p className="text-white">Loading...</p>
          ) : (
            <div className="flex flex-col md:flex-row gap-2">
              {(dataUser.bio || []).map((item, index) => (
                <div key={index}>
                  <div className="mt-2 text-white flex whitespace-nowrap  items-center justify-center h-8 border border-white rounded-3xl w-fit px-8 py-3">
                    {item}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="mt-10 text-white/30 ">
          <ul className="flex gap-[0.9rem] xl:gap-[3.2rem]  pl-4 pr-5 border-b border-gray-700 py-4">
            {["Posts", "Replies", "Highlights", "Articles", "Media"].map(
              (tab) => (
                <li
                  key={tab}
                  className={`cursor-pointer ${activeTab === tab
                    ? "text-white font-bold border-b-2 border-white"
                    : "text-gray-500"
                    }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </li>
              )
            )}
          </ul>

          {/* Content Section */}
          <div className="mt-4">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
