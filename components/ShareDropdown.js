"use client";

import { useState, useRef, useEffect } from "react";
import { Share2, Copy } from "lucide-react";

export default function ShareDropdown({ id }) {
    const [open, setOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const dropdownRef = useRef(null);

    const postUrl = `https://twitter-clone-tweets.vercel.app/post/${id}`;

    const toggleDropdown = () => setOpen(!open);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(postUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 5000);
    };

    // 🔒 Close on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            {/* Share button */}
            <button
                onClick={toggleDropdown}
                className="  hover:text-blue-800"
            >
                <svg viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="w-4 fill-blue-500 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1xvli5t r-1hdv0qi">
                    <g>
                        <path
                            d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z">
                        </path>
                    </g>
                </svg>
            </button>

            {/* Dropdown */}
            {open && (
                <div className="absolute right-1 md:-right-8 z-10 mt-2 w-48 rounded-md shadow-lg bg-black ring-1 ring-black ring-opacity-5">
                    <div className="py-1 flex flex-col">
                        <a
                            href={`https://wa.me/?text=${encodeURIComponent(postUrl)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 text-sm hover:bg-green-500"
                        >
                            Share to WhatsApp
                        </a>
                        <a
                            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=Check this out!`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 text-sm hover:bg-gray-500"
                        >
                            Share to X
                        </a>
                        <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 text-sm hover:bg-blue-500"
                        >
                            Share to Facebook
                        </a>
                        <button
                            onClick={copyToClipboard}
                            className="px-4 py-2 text-sm text-left hover:bg-gray-500 flex items-center gap-2"
                        >
                            <Copy size={14} />
                            {copied ? "Link Copied!" : "Copy Link"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
