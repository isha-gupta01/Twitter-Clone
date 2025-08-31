"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from 'next/navigation'

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [userData, setUserData] = useState([]);
    const router = useRouter();


    const handleUserClick = (username) => {
        router.push(`/SearchedProfile/${username}`); // or `/user/${userId}`, etc.
    }

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
        }, 300); // debounce delay


        return () => clearTimeout(delayDebounce);
    }, [query]);

    return (
        <div className="w-full h-12 max-w-sm mx-auto">
            <div className="flex items-center">
                <span className="material-symbols-outlined p-3">
                    search
                </span>
                <input
                    type="text"
                    placeholder="Search users..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="bg-black outline-none"
                />

            </div>
            <div className="mt-2 bg-gray-800 shadow rounded-2xl">
                {results.map((user) => (
                    <div key={user._id} onClick={() => handleUserClick(user.username)} className="p-2 hover:bg-gray-900 hover:rounded-2xl cursor-pointer">
                        {user.username} - {user.Name}
                    </div>
                ))}
            </div>
        </div>
    );
}
