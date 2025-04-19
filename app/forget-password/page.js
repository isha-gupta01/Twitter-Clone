"use client";
import { useState } from "react";
import Link from "next/link";

export default function ForgetPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false)

  const handleClick = () => {
    setSubmitting(true);
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://twitterclonebackend-nqms.onrender.com/api/password/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        setSubmitting(false)
        return;
      }
      const data = await res.json();

      setMessage(data.message);
      setSubmitting(false);
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-900 flex justify-center items-center sm:h-screen text-white">
      <div className="bg-black rounded-lg h-[90vh] md:h-[60vh] xl:h-[70vh] flex items-center justify-center flex-col shadow-lg p-8 w-[30rem] max-w-md text-center">
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
          <h2 className="text-2xl my-5 font-bold">Forget Password</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
          <input
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-80 bg-gray-800 text-gray-200 placeholder-gray-500 px-4 py-2 rounded-md focus:outline-none ring-2 ring-blue-500" />
          <button type="submit" onClick={handleClick}
            disabled={!email}
            className="w-80 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition duration-200">
            {submitting ? (<div className="flex justify-center items-center">
              <div className="animate-spin h-6 w-6 border-4 border-gray-300 border-t-blue-500 rounded-full"></div>
            </div>) : "Send Reset Link"}
          </button>
          <p>{message}</p>
        </form>
      </div>
    </div>

  );
}
