"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await fetch("https://twitterclonebackend-nqms.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Invalid credentials");
        return;
      }

      // Store JWT token (if backend sends one)
    //   console.log(data)
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect to Twitter page on successful login
      router.push("/Twitter");

    } catch (error) {
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="bg-gray-900 flex justify-center items-center h-screen text-white">
      <div className="bg-black rounded-lg h-[90vh] flex items-center justify-center flex-col shadow-lg p-8 w-[30rem] max-w-md text-center">
        <div className="mb-6">
          <div className="flex invert justify-center items-center">
            <Link href="/"><svg viewBox="0 0 24 24" aria-hidden="true"
              className="w-12 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-lrsllp r-1nao33i r-16y2uox r-8kz0gk">
              <g>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z">
                </path>
              </g>
            </svg></Link>
          </div>
          <h2 className="text-2xl my-5 font-bold">Sign in to X</h2>
        </div>
        <button className="px-[3.7rem] mt-8 flex items-center bg-white justify-center border border-gray-300 rounded-full py-1 text-xs font-bold text-black ">
          <Link href="#" className="font-bold text-base hover:no-underline flex justify-center items-center">
            <Image src="/google.png" alt="Google Icon" width={30} height={30} className="h-8 w-8 mr-2" /> Sign up with Google
          </Link>
        </button>
        <span className="my-2">or</span>
        <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
          <input type="text" name="email" placeholder="Email" required value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-80 bg-gray-800 text-gray-200 placeholder-gray-500 px-4 py-2 rounded-md focus:outline-none ring-2 ring-blue-500" />
          <input type="password" name="password" placeholder="Password" required value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-80 bg-gray-800 text-gray-200 placeholder-gray-500 px-4 py-2 rounded-md focus:outline-none ring-2 ring-blue-500" />

          <button type="submit"
            className="w-80 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition duration-200">
            Log in
          </button>

          {error && <p className="text-red-500 mt-2">{error}</p>}

          <Link href="#" className="text-sm text-gray-400 hover:text-gray-300">Forgot password?</Link>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
