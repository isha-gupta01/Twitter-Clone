"use client"
import React from 'react'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import LikeButton from './LikeButton'
import Image from 'next/image';
import { useParams } from 'next/navigation';
import ShareDropdown from './ShareDropdown';

const TweetPostCard = () => {
    const [item, setPost] = useState(null);
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [commentCounts, setCommentCounts] = useState({});
    const [error, setError] = useState(null)
    const params = useParams();
    //fetching tweets
    useEffect(() => {
        const fetchUserData = () => {
            const user = localStorage.getItem("user");
            setData(JSON.parse(user));
        };
        fetchUserData();
    
        const fetchCommentCount = async (tweetId) => {
            try {
                const res = await fetch(`https://twitterclonebackend-nqms.onrender.com/comment/commentcount/${tweetId}`);
                if (!res.ok) throw new Error("Failed to fetch comment count");
                const data = await res.json();
                return data.commentCount;
            } catch (err) {
                console.error("Error fetching comment count for", tweetId, err);
                return 0;
            }
        };
    
        const fetchPost = async () => {
            try {
                const res = await fetch(`https://twitterclonebackend-nqms.onrender.com/tweetfetch/posts/${params.id}`, {
                    cache: 'no-store',
                });
                if (!res.ok) throw new Error("Failed to fetch post");
                const data = await res.json();
                setPost(data);
    
                const count = await fetchCommentCount(data._id);
                setCommentCounts({ [data._id]: count });
    
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
    
        if (params.id) fetchPost();
    }, [params.id]);
    
    if (loading) return <div className="text-center text-white mt-16 p-10">Loading post...</div>
    if (error) return <div className="text-center text-red-500 p-10">Error: {error}</div>
    if (!item) return null
    return (
        <div className=''>
            <div className="section-mid-part3 mt-16   w-full h-auto">
                <div  className="flex md:mr-10 lg:mr-0 flex-col relative gap-5">
                    <div className='flex m-2 md:m-3 md:px-14 md:ml-10 ml-5 lg:ml-6 items-center '>
                        <Link href={`/userProfile/${item.user_id._id}`} className='flex w-14 h-10' ><Image className="w-12 h-12 rounded-full object-cover cursor-pointer" src={item.profileImage} width={100} height={100} alt="Profile Pic" /></Link>
                        <div className='ml-5   flex flex-col'>
                            <div className='flex flex-row items-center justify-between'>
                                <div className="flex flex-row items-center">
                                    <Link href={`/userProfile/${item.user_id._id}`}><h3 className="font-bold text-lg cursor-pointer"> {item.Name} </h3>
                                    </Link>
                                    <svg viewBox="0 0 22 22" aria-label="Verified account" role="img"
                                        className="w-4 fill-blue-500 r-4qtqp9 r-yyyyoo r-1xvli5t r-bnwqim r-lrvibr r-m6rgpd r-1cvl2hr r-f9ja8p r-og9te1 r-3t4u6i"
                                        data-testid="icon-verified">
                                        <g>
                                            <path
                                                d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z">
                                            </path>
                                        </g>
                                    </svg>
                                    <Link href={`/userProfile/${item.user_id._id}`}><span className="text-gray-400 text-sm  cursor-pointer" > {item.username}  </span></Link>
                                    <div className=" flex items-center text-gray-500"><span className='text-lg font-bold '> · </span>{item.tweetTime}</div>
                                    <svg viewBox="0 0 24 24" aria-hidden="true"
                                        className="w-5 absolute md:hidden right-4  fill-gray-500 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1xvli5t r-1hdv0qi">
                                        <g>
                                            <path
                                                d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z">
                                            </path>
                                        </g>
                                    </svg>
                                </div>
                                <div className='hidden md:flex '>
                                    <svg viewBox="0 0 24 24" aria-hidden="true"
                                        className="w-5   md:absolute md:right-2 fill-gray-500 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1xvli5t r-1hdv0qi">
                                        <g>
                                            <path
                                                d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z">
                                            </path>
                                        </g>
                                    </svg>
                                </div>
                            </div>
                            <div className="text-sm">{item.content}</div>
                        </div>
                        <div>

                        </div>
                    </div>


                    <div className="h-auto ml-8 md:ml-0  px-10 justify-center items-center md:justify-between  flex flex-col">
                        {item.image && /\.(jpg|jpeg|png|gif|webp)$/i.test(item.image) ? (
                            <Image
                                src={item.image}
                                alt="Tweet Image"
                                width={200}
                                height={200}
                                className="w-[90%] md:w-[60%] h-[20rem] object-cover rounded-3xl mt-2"
                            />
                        ) : item.image && /\.(mp4|webm|ogg)$/i.test(item.image) ? (
                            <video
                                src={item.image}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-[90%] md:w-[80%] h-[20rem] rounded-3xl mt-2"
                            />
                        ) : null}

                        <ul className="flex flex-row gap-5 md:gap-7 mt-4">
                            <div className="flex flex-row gap-[1.5rem] md:gap-[4rem]">
                                <Link href={`/TweetComment/${item._id}`}>
                                    <li
                                        className="flex flex-row text-white/50 fill-white/50 hover:fill-blue-500 hover:text-blue-500 ">
                                        <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1xvli5t r-1hdv0qi">
                                            <g>
                                                <path
                                                    d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z">
                                                </path>
                                            </g>
                                        </svg>
                                        <span>{commentCounts[item._id]}</span>
                                    </li>
                                </Link>
                                <li
                                    className="flex flex-row cursor-pointer text-white/50 fill-white/50 hover:fill-blue-500 hover:text-blue-500 ">
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
                                    className="flex flex-row cursor-pointer text-white/50 fill-white/50 hover:fill-blue-500 hover:text-blue-500 ">
                                    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1xvli5t r-1hdv0qi">
                                        <g>
                                            <path
                                                d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z">
                                            </path>
                                        </g>
                                    </svg>{item.views}</li>
                            </div>
                            <div className="flex mx-2 cursor-pointer flex-row gap-5 md:gap-10 items-center">
                                <li className="hover:fill-blue-500 fill-white/50">
                                    <svg viewBox="0 0 24 24"
                                        aria-hidden="true"
                                        className="w-4  r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1xvli5t r-1hdv0qi">
                                        <g>
                                            <path
                                                d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z">
                                            </path>
                                        </g>
                                    </svg></li>
                                <li className="hover:fill-blue-500 fill-white/50">
                                    <ShareDropdown id={item._id}/>
                                    </li>
                            </div>
                        </ul>
                    </div>
                    <hr className="opacity-25 w-full" />
                </div>
            </div>
            
        </div>
    )
}

export default TweetPostCard
