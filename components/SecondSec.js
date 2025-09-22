"use client"
import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import PostCard from './PostCard'
import { ToastContainer, toast } from 'react-toastify'
import SecondSecSkeleton from '@/skeleton/SecondSecSkeleton'

const SecondSec = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const isActive = content.trim() !== "" || selectedFile !== null;
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > window.innerHeight * 0.5);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleInputChange = (event) => {
        setContent(event.target.value);
    };

    const handleOpenFilePicker = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) setSelectedFile(file);
    };

    const handlePostSubmitting = async (event) => {
        event.preventDefault();
        setSubmitting(true);

        if (!content.trim() && !selectedFile) {
            alert("Tweet content or media is required!");
            return;
        }

        const formData = new FormData();
        formData.append("tweetContent", content);
        if (selectedFile) formData.append("media", selectedFile);
        formData.append("username", user.username);
        formData.append("Name", user.Name);
        formData.append("profileImage", user.profileImage);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tweetcrud/loggedtweet`, {
                method: "POST",
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                body: formData,
            });

            const result = await response.json();
            if (response.ok) {
                toast("Tweet Posted Successfully!", {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    theme: "light",
                    className: "twitter-toast",
                    bodyClassName: "twitter-toast-body",
                    icon: "✅",
                });
                setContent("");
                setSelectedFile(null);
                fetchTweets();
            } else {
                console.error("Error posting tweet:", result);
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setSubmitting(false);
        }
    };

    const fetchTweets = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setError("No token found! Please log in.");
            return;
        }
        try {
            setLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tweetfetch/tweets`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
            const data = await response.json();
            setData(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTweets();
    }, []);

    const profileImg = user.profileImage && user.profileImage !== "undefined" ? user.profileImage : "/person2.png";

    return (
        <div className=" overflow-hidden">
            <ToastContainer
                position="bottom-center"
                autoClose={3000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick={true}
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={true}
                theme="colored"
                toastClassName="custom-toast"
                bodyClassName="custom-toast-body"
                className="text-white"
            />

            {loading ? <SecondSecSkeleton /> : (
                <div className="second bg-black w-full md:w-[703px] xl:w-[907px] lg:w-[703px] mb-20 md:mb-0 min-h-screen md:ml-[60px] xl:ml-[90px] lg:ml-[59px] overflow-y-auto scrollbar-hide">
                    {/* Header Section */}
                    <div className={`${scrolled ? "hidden" : "flex flex-col fixed top-0 w-full md:w-auto"} md:flex md:flex-col md:fixed md:top-0 z-50`}>                        <div className="backdrop-blur w-full max-w-full md:w-[703px] xl:w-[907px] lg:w-[703px] max-h-fit md:h-[53px] bg-black/30 flex flex-col md:flex-row">
                        {/* Mobile Header */}
                        <div className="flex md:hidden items-center px-4">
                            <Link href="/Logout">
                                <li className="flex items-center justify-center hover:bg-gray-900 hover:cursor-pointer px-3 py-3">
                                    <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
                                        <Image src={profileImg} alt="person" width={40} height={40} className="object-cover w-full h-full" />
                                    </div>
                                </li>
                            </Link>
                            <div className="text-white font-semibold">Home</div>
                        </div>

                        {/* Navigation Tabs */}
                        <div className="flex mt-1 justify-center items-center w-full px-4 md:px-0">
                            <div className="text-[1rem] md:text-[1.1rem] w-1/2 md:w-[300px] h-[53px] xl:w-[452px] lg:w-[300px] flex justify-center items-center flex-col text-white hover:text-white cursor-pointer text-center">
                                <div className="relative inline-block group">
                                    {/* Background box - stays in place */}
                                    <div className="h-7 w-20 md:w-[7.7rem] rounded-2xl bg-white border border-white"></div>

                                    {/* Foreground text - moves on hover */}
                                    <span className="absolute inset-0 flex items-center justify-center rounded-2xl border border-gray-700 bg-black text-white px-4 md:px-8 transition-transform duration-200 group-hover:-translate-y-1 text-sm md:text-base">
                                        For you
                                    </span>
                                </div>
                                <div className="w-[3rem] md:w-[4rem] h-[6px] backdrop-blur rounded-full bg-blue-500 relative -bottom-[0.66rem]"></div>
                            </div>
                            <div className="text-[1rem] md:text-[1.1rem] w-1/2 md:w-[300px] h-[53px] xl:w-[452px] lg:w-[300px] flex justify-center items-center flex-col text-white hover:text-white cursor-pointer text-center">
                                <Link href="/following" className="relative bottom-1 inline-block group">
                                    {/* Background box - stays in place */}
                                    <div className="h-7 w-20 md:w-[7.7rem] rounded-2xl bg-white border border-white"></div>

                                    {/* Foreground text - moves on hover */}
                                    <span className="absolute py-2 inset-0 flex items-center justify-center rounded-2xl border border-gray-700 bg-black text-white px-4 md:px-8 transition-transform duration-200 group-hover:-translate-y-1 text-sm md:text-base">
                                        Following
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                        <hr className="opacity-25 w-full relative" />
                    </div>

                    {/* Tweet Composition Section */}
                    <div className="section-mid-part2 mt-[130px] md:mt-[53px] w-full h-auto flex flex-col mb-5">
                        <form onSubmit={handlePostSubmitting} className="px-4 md:px-0">
                            <div className="flex flex-row mx-1 md:m-5 items-start gap-3 py-4">
                                <Link href="/ProfilePage" className="hidden md:flex xl:flex flex-shrink-0">
                                    <img src={user.profileImage} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
                                </Link>
                                <div className="flex-1 min-w-0">
                                    <input
                                        className="text-[1rem] bg-black w-full border focus:border-blue-500 rounded-full px-4 py-3 border-white/30 text-white placeholder-gray-500"
                                        placeholder="What is Happening?"
                                        name="content"
                                        value={content}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-row justify-between items-center mx-1 md:mr-4">
                                <ul className="flex flex-row gap-2 ml-4 md:ml-24">
                                    <li onClick={handleOpenFilePicker}>
                                        <svg viewBox="0 0 24 24" aria-hidden="true" className="w-6 cursor-pointer fill-blue-500/80">
                                            <g>
                                                <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path>
                                            </g>
                                        </svg>
                                    </li>
                                </ul>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    style={{ display: "none" }}
                                    className="cursor-pointer"
                                />
                                <div className="flex items-center gap-3">
                                    {selectedFile && <p className="text-green-400 font-bold text-sm">Selected</p>}
                                    <button
                                        type="submit"
                                        disabled={!isActive || submitting}
                                        className={`rounded-full text-center px-4 md:px-5 py-1.5 md:py-1 font-bold transition-colors duration-300 text-sm md:text-base
                                            ${isActive ? "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer" : "bg-gray-400 text-black cursor-not-allowed"}`}>
                                        {submitting ? "Posting..." : "Post"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    <hr className="opacity-25 w-full" />

                    {loading ? (
                        <div className="flex justify-center items-center h-20">
                            <div className="animate-spin h-8 w-8 border-4 border-gray-300 border-t-blue-500 rounded-full"></div>
                        </div>
                    ) : (
                        <PostCard />
                    )}
                </div>
            )}
        </div>
    )
}

export default SecondSec