"use client"
import React from 'react'
import Link from 'next/link';
import { useRouter } from "next/navigation";

const Logout = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    localStorage.removeItem("user"); // Remove token
    router.push("/LoginPage"); // Redirect to login page
  };

    return (
        <div>
            <div className='bg-gray-800 w-full text-white min-h-screen flex justify-center items-center'>
                <div className='bg-black w-[19rem] h-[22rem] rounded-2xl py-8 flex flex-col '>
                    <div className=" invert">
                        <svg viewBox="0 0 24 24" aria-hidden="true"
                            className="w-9 h-10 m-auto r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-lrsllp r-1nao33i r-16y2uox r-8kz0gk">
                            <g>
                                <path
                                    d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z">
                                </path>
                            </g>
                        </svg>
                    </div>
                    <div className='px-7 mt-4 text-[1.3rem]'>Log out of X?</div>
                    <div className='text-sm text-white/30 px-7 text-left'>You can always log back in at any<br/> time. If you want to switch <br/> accounts, you can do that by adding<br/> an existing account.</div>
                    <button onClick={handleLogout} className='bg-white text-black font-semibold rounded-full w-[16rem] mx-auto py-2 mt-4'>Log out</button>
                    <Link href="/Twitter" className='mx-auto'><button className='bg-black border border-white/40  font-semibold rounded-full w-[16rem] mx-auto py-2 mt-3'>Cancel</button>
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default Logout
