"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useState,useEffect } from 'react'
const FirstSec = ({ onSearchClick }) => {
    const [user, setUser] = useState([])
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("user"))
        setUser(data);
    }, [])
    
    const profileImg = user.profileImage && user.profileImage !== "undefined" ? user.profileImage : "/person2.png";
    return (
        <div>
            <div className="first mt-3 fixed left-0 bg-black w-[90px] z-10 h-[100vh]">
                <div className="sidebar flex  items-start flex-col">
                    <div className="logo invert my-4 lg:my-2  flex items-end ml-6 mr-3">
                        <Link href="/Twitter"><svg viewBox="0 0 24 24" aria-hidden="true"
                            className="w-8 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-lrsllp r-1nao33i r-16y2uox r-8kz0gk">
                            <g>
                                <path
                                    d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z">
                                </path>
                            </g>
                        </svg></Link>
                    </div>
                    <ul className="flex flex-col gap-6 ml-3 lg:gap-0">
                        <li
                            className="flex md:justify-center items-center gap-2 justify-center mr-2 md:w-fit px-3 py-3 rounded-full hover:bg-gray-900 hover:cursor-pointer"
                        >
                            <Link href="/Twitter"><Image src="/home.png" alt="home" width={30} height={30} /></Link>
                        </li>

                        <li
                            className="flex md:justify-start items-center gap-2 justify-center  mr-2 md:w-fit  hover:bg-gray-900 hover:cursor-pointer px-3 py-3 rounded-full">
                            <button onClick={onSearchClick}><Image src="/search.png" alt="search" width={30} height={30} /> </button>
                        </li>
                        <li
                            className="flex md:justify-start items-center gap-2 justify-center  mr-2 md:w-fit  hover:bg-gray-900 hover:cursor-pointer px-3 py-3 rounded-full">
                            <Image src="/notification.png" alt="notification" width={30} height={30} />
                        </li>
                        <li
                            className="flex md:justify-start items-center gap-2 justify-center  mr-2 md:w-fit  hover:bg-gray-900 hover:cursor-pointer px-3 py-3 rounded-full">
                            <Image src="/chat.png" alt="message" width={30} height={30} />
                        </li>
                        <li
                            className="flex md:justify-start items-center gap-2 justify-center  mr-2 md:w-fit  hover:bg-gray-900 hover:cursor-pointer px-3 py-3 rounded-full">
                            <Image src="/box.png" alt="box" width={30} height={30} />
                        </li>
                        <li
                            className="flex md:justify-start items-center gap-2 justify-center  mr-2 md:w-fit  hover:bg-gray-900 hover:cursor-pointer px-3 py-3 rounded-full">
                            <Image src="/group.png" alt="group" width={30} height={30} />
                        </li>
                        <li
                            className="flex md:justify-start items-center gap-2 justify-center  mr-2 md:w-fit  hover:bg-gray-900 hover:cursor-pointer px-3 py-3 rounded-full">
                            <Image src="/lists.png" alt="lists" width={30} height={30} />
                        </li>
                        <li
                            className="flex md:justify-start items-center gap-2 justify-center  mr-2 md:w-fit  hover:bg-gray-900 hover:cursor-pointer px-3 py-3 rounded-full">
                            <Image src="/bookmark.png" alt="bookmark" width={30} height={30} />
                        </li>
                        <Link href="/ProfilePage"><li
                            className="flex md:justify-start items-center gap-2 justify-center  mr-2 md:w-fit  hover:bg-gray-900 hover:cursor-pointer px-3 py-3 rounded-full">
                            <Image src="/person.png" alt="person" width={30} height={30} />
                        </li></Link>
                        <li
                            className="flex md:justify-start items-center gap-2 justify-center  mr-2 md:w-fit  hover:bg-gray-900 hover:cursor-pointer px-3 py-3 rounded-full">
                            <Image src="/pending.png" alt="pending" width={30} height={30} />
                        </li>

                        <Link href="/Logout">
                            <li className="flex md:justify-start items-center  justify-center md:w-fit  hover:cursor-pointer fixed bottom-3 left-0 px-5 py-3 ">
                                <div className="w-[50px] h-[50px] rounded-full transition-shadow hover:shadow-[0px_4px_21px_8px_rgba(59,_130,_246,_0.5)]  overflow-hidden">
                                    <Image
                                        src={profileImg}
                                        alt="person"
                                        width={50}
                                        height={50}
                                        className="object-cover  w-full h-full"
                                    />
                                </div>
                            </li>

                        </Link>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default FirstSec
