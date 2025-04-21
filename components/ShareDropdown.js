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
    setTimeout(() => setCopied(false), 2000);
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
        className="flex items-center gap-1 px-3 py-1 border rounded-md shadow-sm hover:bg-gray-100"
      >
        <Share2 size={18} />
        Share
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1 flex flex-col">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(postUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm hover:bg-gray-100"
            >
              Share to WhatsApp
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=Check this out!`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm hover:bg-gray-100"
            >
              Share to X
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm hover:bg-gray-100"
            >
              Share to Facebook
            </a>
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 text-sm text-left hover:bg-gray-100 flex items-center gap-2"
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
