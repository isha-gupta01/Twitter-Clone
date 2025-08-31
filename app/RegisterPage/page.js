"use client"
import React from 'react'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ToastContainer,toast } from 'react-toastify';

const Registerpage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitting, setSubmitting] = useState(false)
    const router = useRouter();

    const handleClick = () => {
        setSubmitting(true);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();
        console.log(data)
        if (response.ok) {
            toast("Registration successful! Redirecting to login...", {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                theme: "light",
                className: "twitter-toast ",
                bodyClassName: "twitter-toast-body",
                icon: "✅", // optional: gives a subtle Twitter vibe
            });
            router.push("/LoginPage"); // Redirect to login page
            setSubmitting(false);
        } else {
            toast("Registration Failed!", {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                theme: "light",
                className: "twitter-toast ",
                bodyClassName: "twitter-toast-body",
                icon: "✅", // optional: gives a subtle Twitter vibe
            });
            setSubmitting(false)
        }
    };
    return (
        <>
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
            <div className='bg-gray-900 flex justify-center items-center sm:h-screen  text-white'>
                <div className="bg-black rounded-lg h-[90vh] md:h-[60vh] xl:h-[70vh] flex items-center justify-center flex-col shadow-lg p-8 w-[30rem] max-w-md text-center">
                    <div className="mb-6">
                        <Link href="/">
                            <div className="flex invert justify-center items-center">
                                <svg viewBox="0 0 24 24" aria-hidden="true"
                                    className="w-12 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-lrsllp r-1nao33i r-16y2uox r-8kz0gk">
                                    <g>
                                        <path
                                            d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z">
                                        </path>
                                    </g>
                                </svg>
                            </div>
                        </Link>
                        <h2 className="text-2xl  my-5 font-bold">Sign up to X</h2>
                    </div>
                    <form onSubmit={handleSubmit} method="POST" className="flex flex-col gap-5">
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            required value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-80 bg-gray-800 text-gray-200 placeholder-gray-500 px-4 py-2 rounded-md focus:outline-none ring-2 ring-blue-500" />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            required value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-80 bg-gray-800 text-gray-200 placeholder-gray-500 px-4 py-2 rounded-md focus:outline-none ring-2 ring-blue-500" />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            required value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-80 bg-gray-800 text-gray-200 placeholder-gray-500 px-4 py-2 rounded-md focus:outline-none ring-2 ring-blue-500" />
                        <button
                            onClick={handleClick}
                            disabled={!email || !password}
                            type="submit"
                            className=" btn w-80 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition duration-200">
                            {submitting ? (<div className="flex justify-center items-center">
                                <div className="animate-spin h-6 w-6 border-4 border-gray-300 border-t-blue-500 rounded-full"></div>
                            </div>) : "Sign up"}
                        </button>
                        <br />
                    </form>
                </div>
            </div>
        </>
    )

}

export default Registerpage
