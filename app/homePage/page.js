"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { signIn } from 'next-auth/react'

const HomePage = () => {
    return (
        <div className='flex md:container mx-auto md:mt-16 lg:mt-0 bg-white dark:bg-black  items-center justify-center xl:min-h-screen'>
            <div className=" rounded-lg w-full flex flex-col xl:flex-row h-96">
                <div className="flex">
                    <svg viewBox="0 0 24 24" aria-hidden="true"
                        className="w-[20rem] invert mx-28 sm:mx-36 h-36 sm:h-48 md:h-72 md:mt-12 xl:h-80 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-lrsllp r-1nao33i r-16y2uox r-8kz0gk">
                        <g>
                            <path
                                d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z">
                            </path>
                        </g>
                    </svg>
                </div>
                <div className=" flex flex-col justify-center px-4 sm:px-0 xl:ml-0 sm:ml-6  md:ml-40  ">
                    <h1 className="font-extrabold text-5xl sm:text-6xl my-10 xs:mr-3 sm:mr-0 text-white">Happening now</h1>
                    <h2 className="font-bold text-3xl text-white">Join today.</h2>
                    <div className="mt-4 my-5">

                        <button
                            onClick={() => signIn("google")}
                            className="px-[3.3rem] my-2  flex items-center bg-white justify-center   rounded-full py-1 text-[1.1rem] font-bold text-black  ">
                            <Image src="/google.png" alt="Google Icon" width={40} height={40} className="mr-2" />
                            Sign up with Google
                        </button>

                        <span className="flex ml-[9.5rem] items-center text-white">or</span>
                        <button
                            className="px-24 my-2 flex items-center bg-blue-500/90 justify-center   rounded-full py-2 text-xs font-bold text-white hover:bg-blue-600 hover:text-black">
                            <a href="/RegisterPage" className=" font-bold text-lg hover:no-underline">Create Account</a>
                        </button>
                        <div className="text-xs text-gray-400">By signing up, you agree to the <span className="text-blue-500 ">Terms of Service</span> and <span className="text-blue-500">Privacy</span><br />
                            <span className="text-blue-500"> Policy</span>,including <span className="text-blue-500">Cookie Use</span>.</div>
                    </div>
                    <div className="my-6">
                        <span className="font-bold text-lg text-white">Already Have Account?</span>
                        <button
                            className="px-[7.9rem]  flex items-center justify-center border border-gray-300 rounded-full py-2 mt-4 text-xs font-bold text-blue-500 ">
                            <Link href="/LoginPage" className=" font-bold text-lg hover:no-underline">Sign In</Link>
                        </button>
                    </div>
                    <div className="mt-1 flex items-center text-xs text-black">
                        Terms of Service
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage
