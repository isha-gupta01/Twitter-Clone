"use client"
import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import PostCard from './PostCard'
import { ToastContainer, toast } from 'react-toastify'

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
        <div>
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

            <div className="second bg-black w-full md:w-[703px] xl:w-[907px] lg:w-[703px] mb-20 md:mb-0 min-h-screen md:ml-[60px] xl:ml-[90px] lg:ml-[59px] overflow-y-auto scrollbar-hide">
                <div className={`${scrolled ? "hidden" : "flex flex-col fixed top-0"} md:flex md:flex-col md:fixed md:top-0 z-50`}>
                    <div className="backdrop-blur w-[500px] md:w-[703px] xl:w-[907px] lg:w-[703px] max-h-fit md:h-[53px] bg-black/30 flex flex-col md:flex-row">
                        <div className="flex md:hidden items-center">
                            <Link href="/Logout">
                                <li className="flex md:justify-start items-center justify-center md:w-fit hover:bg-gray-900 hover:cursor-pointer px-5 py-3">
                                    <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
                                        <Image src={profileImg} alt="person" width={50} height={50} className="object-cover w-full h-full" />
                                    </div>
                                </li>
                            </Link>
                            <div>Home</div>
                        </div>
                        <div className="flex">
                            <div className="text-[1.1rem] w-[210px] md:w-[300px] h-[53px] xl:w-[452px] lg:w-[300px] flex justify-center items-center flex-col text-white hover:text-white cursor-pointer text-center">
                                <span>For you</span>
                                <div className="w-[4rem] h-[6px] backdrop-blur rounded-full bg-blue-500 relative -bottom-[0.66rem]"></div>
                            </div>
                            <Link href="/following">
                                <div className="text-[1.1rem] md:w-[300px] h-[53px] flex justify-center items-center text-white hover:text-white cursor-pointer text-center">
                                    Following
                                </div>
                            </Link>
                        </div>
                    </div>
                    <hr className="opacity-25 relative" />
                </div>

                <div className="section-mid-part2 mt-[130px] md:mt-[53px] w-full h-28 flex flex-col mb-5">
                    <form onSubmit={handlePostSubmitting}>
                        <div className="flex flex-row m-5 items-center gap-3">
                            <Link href="/ProfilePage" className="hidden w-[3rem] xl:flex">
                                <img src={user.profileImage} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
                            </Link>
                            <input
                                className="text-xl bg-black w-full border focus:border-blue-500 rounded-full px-3 mx-5 py-2 border-white/30 text-white"
                                placeholder="What is Happening?"
                                name="content"
                                value={content}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="flex flex-row justify-between mr-4 items-center">
                            <ul className="flex flex-row gap-2 ml-5 md:ml-24">
                                <li onClick={handleOpenFilePicker}>
                                    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-7 cursor-pointer fill-blue-500/80">
                                        <g>
                                            <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path>
                                        </g>
                                    </svg>
                                </li>
                                <li><svg viewBox="0 0 24 24" aria-hidden="true" className="w-7 fill-blue-500/50 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-z80fyv r-19wmn03" > <g> <path d="M3 5.5C3 4.119 4.12 3 5.5 3h13C19.88 3 21 4.119 21 5.5v13c0 1.381-1.12 2.5-2.5 2.5h-13C4.12 21 3 19.881 3 18.5v-13zM5.5 5c-.28 0-.5.224-.5.5v13c0 .276.22.5.5.5h13c.28 0 .5-.224.5-.5v-13c0-.276-.22-.5-.5-.5h-13zM18 10.711V9.25h-3.74v5.5h1.44v-1.719h1.7V11.57h-1.7v-.859H18zM11.79 9.25h1.44v5.5h-1.44v-5.5zm-3.07 1.375c.34 0 .77.172 1.02.43l1.03-.86c-.51-.601-1.28-.945-2.05-.945C7.19 9.25 6 10.453 6 12s1.19 2.75 2.72 2.75c.85 0 1.54-.344 2.05-.945v-2.149H8.38v1.032H9.4v.515c-.17.086-.42.172-.68.172-.76 0-1.36-.602-1.36-1.375 0-.688.6-1.375 1.36-1.375z"> </path> </g> </svg></li>
                                <li><svg viewBox="0 0 24 24" aria-hidden="true" className=" w-7 fill-blue-500/50 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-z80fyv r-19wmn03" > <g> <path d="M2.205 7.423L11.745 21h4.241L6.446 7.423H2.204zm4.237 7.541L2.2 21h4.243l2.12-3.017-2.121-3.02zM16.957 0L9.624 10.435l2.122 3.02L21.2 0h-4.243zm.767 6.456V21H21.2V1.51l-3.476 4.946z"> </path> </g> </svg></li> 
                                <li><svg viewBox="0 0 24 24" aria-hidden="true" className="w-7 fill-blue-500/50 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-z80fyv r-19wmn03"> <g> <path d="M6 5c-1.1 0-2 .895-2 2s.9 2 2 2 2-.895 2-2-.9-2-2-2zM2 7c0-2.209 1.79-4 4-4s4 1.791 4 4-1.79 4-4 4-4-1.791-4-4zm20 1H12V6h10v2zM6 15c-1.1 0-2 .895-2 2s.9 2 2 2 2-.895 2-2-.9-2-2-2zm-4 2c0-2.209 1.79-4 4-4s4 1.791 4 4-1.79 4-4 4-4-1.791-4-4zm20 1H12v-2h10v2zM7 7c0 .552-.45 1-1 1s-1-.448-1-1 .45-1 1-1 1 .448 1 1z"> </path> </g> </svg></li> 
                                <li><svg viewBox="0 0 24 24" aria-hidden="true" className="w-7 fill-blue-500/50 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-z80fyv r-19wmn03"> <g> <path d="M8 9.5C8 8.119 8.672 7 9.5 7S11 8.119 11 9.5 10.328 12 9.5 12 8 10.881 8 9.5zm6.5 2.5c.828 0 1.5-1.119 1.5-2.5S15.328 7 14.5 7 13 8.119 13 9.5s.672 2.5 1.5 2.5zM12 16c-2.224 0-3.021-2.227-3.051-2.316l-1.897.633c.05.15 1.271 3.684 4.949 3.684s4.898-3.533 4.949-3.684l-1.896-.638c-.033.095-.83 2.322-3.053 2.322zm10.25-4.001c0 5.652-4.598 10.25-10.25 10.25S1.75 17.652 1.75 12 6.348 1.75 12 1.75 22.25 6.348 22.25 12zm-2 0c0-4.549-3.701-8.25-8.25-8.25S3.75 7.451 3.75 12s3.701 8.25 8.25 8.25 8.25-3.701 8.25-8.25z"> </path> </g> </svg></li> 
                                <li><svg viewBox="0 0 24 24" aria-hidden="true" className="w-7 fill-blue-500/50 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-z80fyv r-19wmn03"> <g> <path d="M6 3V2h2v1h6V2h2v1h1.5C18.88 3 20 4.119 20 5.5v2h-2v-2c0-.276-.22-.5-.5-.5H16v1h-2V5H8v1H6V5H4.5c-.28 0-.5.224-.5.5v12c0 .276.22.5.5.5h3v2h-3C3.12 20 2 18.881 2 17.5v-12C2 4.119 3.12 3 4.5 3H6zm9.5 8c-2.49 0-4.5 2.015-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.01-4.5-4.5-4.5zM9 15.5C9 11.91 11.91 9 15.5 9s6.5 2.91 6.5 6.5-2.91 6.5-6.5 6.5S9 19.09 9 15.5zm5.5-2.5h2v2.086l1.71 1.707-1.42 1.414-2.29-2.293V13z"> </path> </g> </svg></li> <li><svg viewBox="0 0 24 24" aria-hidden="true" className="w-7 fill-blue-500/50 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-z80fyv r-19wmn03 "> <g> <path d="M12 7c-1.93 0-3.5 1.57-3.5 3.5S10.07 14 12 14s3.5-1.57 3.5-3.5S13.93 7 12 7zm0 5c-.827 0-1.5-.673-1.5-1.5S11.173 9 12 9s1.5.673 1.5 1.5S12.827 12 12 12zm0-10c-4.687 0-8.5 3.813-8.5 8.5 0 5.967 7.621 11.116 7.945 11.332l.555.37.555-.37c.324-.216 7.945-5.365 7.945-11.332C20.5 5.813 16.687 2 12 2zm0 17.77c-1.665-1.241-6.5-5.196-6.5-9.27C5.5 6.916 8.416 4 12 4s6.5 2.916 6.5 6.5c0 4.073-4.835 8.028-6.5 9.27z"> </path> </g> </svg></li>
                            </ul>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="image/*"
                                style={{ display: "none" }}
                                className="cursor-pointer"
                            />
                            {selectedFile && <p className="text-green-400 font-bold">Selected</p>}
                            <button
                                type="submit"
                                disabled={!isActive}
                                className={`rounded-full text-center px-5 py-1 font-bold transition-colors duration-300
                                    ${isActive ? "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer" : "bg-gray-400 text-black cursor-not-allowed"}`}>
                                {submitting ? "Posting..." : "Post"}
                            </button>
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
        </div>
    )
}

export default SecondSec
