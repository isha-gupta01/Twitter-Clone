"use client"
import React from 'react'
import Link from 'next/link'
const SignedUp = () => {
    return (
        <div className='bg-gray-900 flex flex-col  justify-center items-center h-screen text-white'>
            <div class="bg-black rounded-lg h-[90vh] flex gap-8 items-center justify-center flex-col shadow-lg p-8 w-[30rem] max-w-md text-center font-bold">
                <div class="flex invert justify-center items-center ">
                    <svg viewBox="0 0 24 24" aria-hidden="true"
                        class="w-16 my-2 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-lrsllp r-1nao33i r-16y2uox r-8kz0gk">
                        <g>
                            <path
                                d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z">
                            </path>
                        </g>
                    </svg>
                </div>
                <span class="text-lg font-bold">Signed Up Successfully!!!</span>
                <button class=" btn w-80 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition duration-200"><Link href="/homePage">Home</Link></button>
            </div>


        </div>
    )
}

export default SignedUp
