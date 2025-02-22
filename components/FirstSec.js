import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
const FirstSec = () => {
  return (
    <div>
      <div className="first mt-3 fixed left-0 bg-black w-[189px] z-10 h-[100vh]">
                    <div className="sidebar flex  items-end  flex-col">
                        <div className="logo invert my-2 flex items-end mr-7">
                            <svg viewBox="0 0 24 24" aria-hidden="true"
                                className="w-8 m-auto r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-lrsllp r-1nao33i r-16y2uox r-8kz0gk">
                                <g>
                                    <path
                                        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z">
                                    </path>
                                </g>
                            </svg>
                        </div>
                        <ul className="flex flex-col  ">
                            <li
                                className="flex md:justify-center items-center gap-2 justify-center  mr-2 md:w-fit  hover:bg-gray-900 hover:cursor-pointer px-5 py-3 hover:rounded-full">
                                <Image src="/home.png" alt="home" width={30} height={30} />
                            </li>
                            <li
                                className="flex md:justify-start items-center gap-2 justify-center  mr-2 md:w-fit  hover:bg-gray-900 hover:cursor-pointer px-5 py-3 hover:rounded-full">
                                <Image src="/search.png" alt="search" width={30} height={30} />
                            </li>
                            <li
                                className="flex md:justify-start items-center gap-2 justify-center  mr-2 md:w-fit  hover:bg-gray-900 hover:cursor-pointer px-5 py-3 hover:rounded-full">
                                <Image src="/notification.png" alt="notification" width={30} height={30} />
                            </li>
                            <li
                                className="flex md:justify-start items-center gap-2 justify-center  mr-2 md:w-fit  hover:bg-gray-900 hover:cursor-pointer px-5 py-3 hover:rounded-full">
                                <Image src="/chat.png" alt="message" width={30} height={30} />
                            </li>
                            <li
                                className="flex md:justify-start items-center gap-2 justify-center  mr-2 md:w-fit  hover:bg-gray-900 hover:cursor-pointer px-5 py-3 hover:rounded-full">
                                <Image src="/box.png" alt="box" width={30} height={30} />
                            </li>
                            <li
                                className="flex md:justify-start items-center gap-2 justify-center  mr-2 md:w-fit  hover:bg-gray-900 hover:cursor-pointer px-5 py-3 hover:rounded-full">
                                <Image src="/group.png" alt="group" width={30} height={30} />
                            </li>
                            <li
                                className="flex md:justify-start items-center gap-2 justify-center  mr-2 md:w-fit  hover:bg-gray-900 hover:cursor-pointer px-5 py-3 hover:rounded-full">
                                <Image src="/lists.png" alt="lists" width={30} height={30} />
                            </li>
                            <li
                                className="flex md:justify-start items-center gap-2 justify-center  mr-2 md:w-fit  hover:bg-gray-900 hover:cursor-pointer px-5 py-3 hover:rounded-full">
                                <Image src="/bookmark.png" alt="bookmark" width={30} height={30} />
                            </li>
                            <Link href="/ProfilePage"><li
                                className="flex md:justify-start items-center gap-2 justify-center  mr-2 md:w-fit  hover:bg-gray-900 hover:cursor-pointer px-5 py-3 hover:rounded-full">
                                <Image src="/person.png" alt="person" width={30} height={30} />
                            </li></Link>
                            <li
                                className="flex md:justify-start items-center gap-2 justify-center  mr-2 md:w-fit  hover:bg-gray-900 hover:cursor-pointer px-5 py-3 hover:rounded-full">
                                <Image src="/pending.png" alt="pending" width={30} height={30} />
                            </li>

                            <Link href="/Logout">
                            <li
                                className="flex md:justify-start items-center justify-center  md:w-fit   hover:bg-gray-900 hover:cursor-pointer fixed bottom-3 left-24 px-5 py-3 hover:rounded-full">
                                <Image src="/person2.png" alt="person" width={50} height={50} className='rounded-full' />
                            </li>
                            </Link>
                        </ul>
                    </div>
                </div>
    </div>
  )
}

export default FirstSec
