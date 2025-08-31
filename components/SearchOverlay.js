"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SearchOverlay({ open, onClose }) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const inputRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        if (open && inputRef.current) {
            inputRef.current.focus();
        }
    }, [open]);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (query.trim()) {
                axios
                    .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/search?query=${query}`)
                    .then((res) => setResults(res.data))
                    .catch((err) => console.error(err));
            } else {
                setResults([]);
            }
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [query]);

    const handleUserClick = (username) => {
        router.push(`/SearchedProfile/${username}`);
        onClose(); // Close the overlay after navigating
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex justify-center pt-24 ">
            <div className="w-full max-w-xl bg-black text-white p-4 rounded shadow-lg relative mx-4 mb-20">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-4 text-white text-2xl"
                >
                    ✕
                </button>

                {/* Search input */}
                <div className="flex items-center border-b border-gray-600 pb-2">
                    <span className="material-symbols-outlined mr-2">search</span>
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search users..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="bg-black outline-none w-full"
                    />
                </div>

                {/* Results */}
                <div className="mt-4 bg-gray-800 rounded-xl max-h-60 overflow-y-auto">
                    {results.map((user) => (
                        <div
                            key={user._id}
                            onClick={() => handleUserClick(user.username)}
                            className="p-3 hover:bg-gray-700 rounded-xl cursor-pointer"
                        >
                            <div className="font-semibold">{user.username}</div>
                            <div className="text-sm text-gray-400">{user.Name}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
