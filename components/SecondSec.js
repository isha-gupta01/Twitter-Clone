"use client"
import React from 'react'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import LikeButton from './LikeButton'
import Link from 'next/link'

const SecondSec = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [content, setContent] = useState("")
    const [loading, setLoading] = useState(true)

    const user = JSON.parse(localStorage.getItem("user"))



    // Handle tweet content change
    const handleInputChange = (event) => {
        setContent(event.target.value);
    };


    // Function to trigger file input when clicking on the li
    const handleOpenFilePicker = () => {
        fileInputRef.current.click(); // Click the hidden file input
    };


    // Function to handle file selection
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            console.log("Selected File:", file);
        }
    };

    // Handle Tweet Submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        const user = JSON.parse(localStorage.getItem("user"));

        if (!content.trim() && !selectedFile) {
            alert("Tweet content or media is required!");
            return;
        }

        const formData = new FormData();
        formData.append("tweetContent", content);
        if (selectedFile) {
            formData.append("media", selectedFile); // Attach file
        }
        formData.append("username", user.username);
        formData.append("Name", user.Name);
        formData.append("profileImage", user.profileImage);

        try {
            const response = await fetch("http://localhost:4000/tweetcrud/loggedtweet", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`, // Add Auth Token
                },
                body: formData, // Send form data
            });

            const result = await response.json();
            // console.log(result)
            if (response.ok) {
                alert("Tweet posted successfully:", result);
                setContent(""); // Clear input
                setSelectedFile(null); // Clear file
            } else {
                console.error("Error posting tweet:", result);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    //fetching tweets
    useEffect(() => {
        const fetchTweets = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setError("No token found! Please log in.");
                return;
            }
            try {
                setLoading(true);
                const response = await fetch("http://localhost:4000/tweetfetch/tweets", {
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
                setData(data); // Store the fetched data of tweets
            } catch (error) {
                setError(error.message);
            }
            finally {
                setLoading(false);
            }
        };

        fetchTweets();

    }, []);



    return (
        <div>
            <div className="second bg-black w-[600px] min-h-screen ml-[188px] overflow-y-auto ">
                <div className='flex flex-col fixed top-0'>
                    <div className="backdrop-blur w-[600px] h-[53px] bg-black/30 flex flex-row  ">
                        <div className="text-[1.1rem] w-[300px] h-[53px]  flex justify-center items-center flex-col text-white/45 hover:text-white cursor-pointer text-center"><span>For you</span>
                            <div className='w-[4rem] h-[6px] backdrop-blur rounded-full  bg-blue-500 relative -bottom-[0.66rem]'></div>
                        </div>
                        <div className="text-[1.1rem] w-[300px] h-[53px]  flex justify-center items-center text-white/45 hover:text-white cursor-pointer text-center">Following</div>
                    </div>
                    <hr className="opacity-25 relative  " />
                </div>
                <div className="section-mid-part2 mt-[53px] w-full h-28 flex flex-col mb-5">
                    <form onSubmit={handleSubmit}>
                        <div className=" flex flex-row m-5 items-center gap-3">
                            <img src={user.profileImage} className=" w-10 h-10 rounded-full" />
                            <input className="text-xl bg-black w-full  border focus:border-blue-500 rounded-full px-2 py-2 border-white/30 text-gray-500" placeholder='What is Happening?' name="content"
                                value={content}
                                onChange={handleInputChange} />
                        </div>
                        <div className="flex flex-row justify-between mr-4 items-center">

                            <ul className="flex flex-row  gap-2 ml-16">
                                <li onClick={handleOpenFilePicker}><svg viewBox="0 0 24 24" aria-hidden="true"
                                    className="w-7 fill-blue-500/80 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-z80fyv r-19wmn03"
                                >
                                    <g>
                                        <path
                                            d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z">
                                        </path>
                                    </g>
                                </svg></li>
                                <li><svg viewBox="0 0 24 24" aria-hidden="true"
                                    className="w-7 fill-blue-500/80 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-z80fyv r-19wmn03"
                                >
                                    <g>
                                        <path
                                            d="M3 5.5C3 4.119 4.12 3 5.5 3h13C19.88 3 21 4.119 21 5.5v13c0 1.381-1.12 2.5-2.5 2.5h-13C4.12 21 3 19.881 3 18.5v-13zM5.5 5c-.28 0-.5.224-.5.5v13c0 .276.22.5.5.5h13c.28 0 .5-.224.5-.5v-13c0-.276-.22-.5-.5-.5h-13zM18 10.711V9.25h-3.74v5.5h1.44v-1.719h1.7V11.57h-1.7v-.859H18zM11.79 9.25h1.44v5.5h-1.44v-5.5zm-3.07 1.375c.34 0 .77.172 1.02.43l1.03-.86c-.51-.601-1.28-.945-2.05-.945C7.19 9.25 6 10.453 6 12s1.19 2.75 2.72 2.75c.85 0 1.54-.344 2.05-.945v-2.149H8.38v1.032H9.4v.515c-.17.086-.42.172-.68.172-.76 0-1.36-.602-1.36-1.375 0-.688.6-1.375 1.36-1.375z">
                                        </path>
                                    </g>
                                </svg></li>
                                <li><svg viewBox="0 0 24 24" aria-hidden="true"
                                    className=" w-7 fill-blue-500/80 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-z80fyv r-19wmn03"
                                >
                                    <g>
                                        <path
                                            d="M2.205 7.423L11.745 21h4.241L6.446 7.423H2.204zm4.237 7.541L2.2 21h4.243l2.12-3.017-2.121-3.02zM16.957 0L9.624 10.435l2.122 3.02L21.2 0h-4.243zm.767 6.456V21H21.2V1.51l-3.476 4.946z">
                                        </path>
                                    </g>
                                </svg></li>
                                <li><svg viewBox="0 0 24 24" aria-hidden="true"
                                    className="w-7 fill-blue-500/80 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-z80fyv r-19wmn03">
                                    <g>
                                        <path
                                            d="M6 5c-1.1 0-2 .895-2 2s.9 2 2 2 2-.895 2-2-.9-2-2-2zM2 7c0-2.209 1.79-4 4-4s4 1.791 4 4-1.79 4-4 4-4-1.791-4-4zm20 1H12V6h10v2zM6 15c-1.1 0-2 .895-2 2s.9 2 2 2 2-.895 2-2-.9-2-2-2zm-4 2c0-2.209 1.79-4 4-4s4 1.791 4 4-1.79 4-4 4-4-1.791-4-4zm20 1H12v-2h10v2zM7 7c0 .552-.45 1-1 1s-1-.448-1-1 .45-1 1-1 1 .448 1 1z">
                                        </path>
                                    </g>
                                </svg></li>
                                <li><svg viewBox="0 0 24 24" aria-hidden="true"
                                    className="w-7 fill-blue-500/80 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-z80fyv r-19wmn03">
                                    <g>
                                        <path
                                            d="M8 9.5C8 8.119 8.672 7 9.5 7S11 8.119 11 9.5 10.328 12 9.5 12 8 10.881 8 9.5zm6.5 2.5c.828 0 1.5-1.119 1.5-2.5S15.328 7 14.5 7 13 8.119 13 9.5s.672 2.5 1.5 2.5zM12 16c-2.224 0-3.021-2.227-3.051-2.316l-1.897.633c.05.15 1.271 3.684 4.949 3.684s4.898-3.533 4.949-3.684l-1.896-.638c-.033.095-.83 2.322-3.053 2.322zm10.25-4.001c0 5.652-4.598 10.25-10.25 10.25S1.75 17.652 1.75 12 6.348 1.75 12 1.75 22.25 6.348 22.25 12zm-2 0c0-4.549-3.701-8.25-8.25-8.25S3.75 7.451 3.75 12s3.701 8.25 8.25 8.25 8.25-3.701 8.25-8.25z">
                                        </path>
                                    </g>
                                </svg></li>
                                <li><svg viewBox="0 0 24 24" aria-hidden="true"
                                    className="w-7 fill-blue-500/80 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-z80fyv r-19wmn03">
                                    <g>
                                        <path
                                            d="M6 3V2h2v1h6V2h2v1h1.5C18.88 3 20 4.119 20 5.5v2h-2v-2c0-.276-.22-.5-.5-.5H16v1h-2V5H8v1H6V5H4.5c-.28 0-.5.224-.5.5v12c0 .276.22.5.5.5h3v2h-3C3.12 20 2 18.881 2 17.5v-12C2 4.119 3.12 3 4.5 3H6zm9.5 8c-2.49 0-4.5 2.015-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.01-4.5-4.5-4.5zM9 15.5C9 11.91 11.91 9 15.5 9s6.5 2.91 6.5 6.5-2.91 6.5-6.5 6.5S9 19.09 9 15.5zm5.5-2.5h2v2.086l1.71 1.707-1.42 1.414-2.29-2.293V13z">
                                        </path>
                                    </g>
                                </svg></li>
                                <li><svg viewBox="0 0 24 24" aria-hidden="true"
                                    className="w-7 fill-blue-500/50 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-z80fyv r-19wmn03 ">
                                    <g>
                                        <path
                                            d="M12 7c-1.93 0-3.5 1.57-3.5 3.5S10.07 14 12 14s3.5-1.57 3.5-3.5S13.93 7 12 7zm0 5c-.827 0-1.5-.673-1.5-1.5S11.173 9 12 9s1.5.673 1.5 1.5S12.827 12 12 12zm0-10c-4.687 0-8.5 3.813-8.5 8.5 0 5.967 7.621 11.116 7.945 11.332l.555.37.555-.37c.324-.216 7.945-5.365 7.945-11.332C20.5 5.813 16.687 2 12 2zm0 17.77c-1.665-1.241-6.5-5.196-6.5-9.27C5.5 6.916 8.416 4 12 4s6.5 2.916 6.5 6.5c0 4.073-4.835 8.028-6.5 9.27z">
                                        </path>
                                    </g>
                                </svg></li>
                            </ul>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="image/*,video/*"
                                style={{ display: "none" }}
                            />

                            {/* Display selected file name */}
                            {selectedFile && (
                                <p className="mt-2 text-sm text-green-400">
                                    Selected: {selectedFile.name}
                                </p>
                            )}
                            <div className=""><button type='submit' className="rounded-full text-center px-5 py-1 bg-gray-500 text-black font-bold pb-1">Post</button></div>
                        </div>
                    </form>
                </div>


                <hr className="opacity-25 w-full" />
                {loading ? (<div className="flex justify-center items-center h-20">
                    <div className="animate-spin h-8 w-8 border-4 border-gray-300 border-t-blue-500 rounded-full"></div>
                </div>) : (<div className="section-mid-part3   w-full h-auto">
                    {data.map((item) => (
                        <div key={item._id} className="flex flex-row m-3 ml-6 gap-5">
                            <Link href={`/userProfile/${item.user_id}`}><Image className="w-10 h-10 rounded-full cursor-pointer" src={item.profileImage} width={100} height={100} alt="Profile Pic" /></Link>
                            <div className="h-auto flex flex-col">
                                <div className="flex flex-row items-center">
                                    <Link href="/userProfile"><h3 className="font-bold text-lg cursor-pointer">{item.Name}</h3>
                                    </Link>
                                    <span className="text-gray-400 text-sm cursor-pointer" >{item.username} </span>
                                    <svg viewBox="0 0 22 22" aria-label="Verified account" role="img"
                                        className="w-4 fill-blue-500 r-4qtqp9 r-yyyyoo r-1xvli5t r-bnwqim r-lrvibr r-m6rgpd r-1cvl2hr r-f9ja8p r-og9te1 r-3t4u6i"
                                        data-testid="icon-verified">
                                        <g>
                                            <path
                                                d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z">
                                            </path>
                                        </g>
                                    </svg>
                                    <div className="text-gray-500"> <span className='text-xl font-bold '> · </span> {item.tweetTime} </div>
                                    <svg viewBox="0 0 24 24" aria-hidden="true"
                                        className="w-3 ml-40 fill-gray-500 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1xvli5t r-1hdv0qi">
                                        <g>
                                            <path
                                                d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z">
                                            </path>
                                        </g>
                                    </svg>
                                </div>

                                <div className="pt-3">{item.content}</div>

                                {item.image && <img src={item.image} alt="Tweet Image" className="w-[90%] h-[20rem] rounded-3xl  mt-2" />}
                                <ul className="flex flex-row justify-between gap-5 mt-4">
                                    <div className="flex flex-row gap-[3rem]">
                                        <li
                                            className="flex flex-row text-white/50 fill-white/50 hover:fill-blue-500 hover:text-blue-500 hover:shadow-[0_0_12px_2px_rgba(0,89,255)] transition-shadow">
                                            <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1xvli5t r-1hdv0qi">
                                                <g>
                                                    <path
                                                        d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z">
                                                    </path>
                                                </g>
                                            </svg>
                                            <span>{item.comments}</span>
                                        </li>
                                        <li
                                            className="flex flex-row text-white/50 fill-white/50 hover:fill-blue-500 hover:text-blue-500 hover:shadow-[0_0_12px_2px_rgba(0,89,255)] transition-shadow">
                                            <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1xvli5t r-1hdv0qi">
                                                <g>
                                                    <path
                                                        d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z">
                                                    </path>
                                                </g>
                                            </svg>
                                            <span>{item.retweets}</span>
                                        </li>
                                        <LikeButton tweetId={item._id} initialLikes={item.likes} userId={item.userId} />
                                        <li
                                            className="flex flex-row text-white/50 fill-white/50 hover:fill-blue-500 hover:text-blue-500 hover:shadow-[0_0_12px_2px_rgba(0,89,255)] transition-shadow">
                                            <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1xvli5t r-1hdv0qi">
                                                <g>
                                                    <path
                                                        d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z">
                                                    </path>
                                                </g>
                                            </svg>{item.views}</li>
                                    </div>
                                    <div className="flex mx-2 flex-row gap-2 items-center">
                                        <li className="hover:fill-blue-500 fill-white/50"><svg viewBox="0 0 24 24"
                                            aria-hidden="true"
                                            className="w-4  r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1xvli5t r-1hdv0qi">
                                            <g>
                                                <path
                                                    d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z">
                                                </path>
                                            </g>
                                        </svg></li>
                                        <li className="hover:fill-blue-500 fill-white/50"><svg viewBox="0 0 24 24"
                                            aria-hidden="true"
                                            className="w-4 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1xvli5t r-1hdv0qi">
                                            <g>
                                                <path
                                                    d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z">
                                                </path>
                                            </g>
                                        </svg></li>
                                    </div>
                                </ul>
                            </div>
                            {/* <hr className="opacity-25 w-full" /> */}
                        </div>
                    ))}
                </div>)}
            </div>
        </div>
    )
}

export default SecondSec
