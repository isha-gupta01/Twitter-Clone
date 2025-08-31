"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const FollowingsContent = () => {
  const [followingUsers, setFollowingUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  
  const router = useRouter();


  const handleUserClick = (username) => {
    router.push(`/SearchedProfile/${username}`); // or `/user/${userId}`, etc.
  }

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim()) {
        axios
          .get(`https://twitterclonebackend-nqms.onrender.com/api/users/search?query=${query}`)
          .then((res) => setResults(res.data))
          .catch((err) => console.error(err));
      } else {
        setResults([]);
      }
    }, 300); // debounce delay


    return () => clearTimeout(delayDebounce);
  }, [query]);

  useEffect(() => {
    const fetchFollowingUsers = async () => {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.userId;

      if (!userId || !token) {
        setError("User not logged in");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`https://twitterclonebackend-nqms.onrender.com/loggeduser/profile/${userId}/followings`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch following users");

        const result = await response.json(); // should be { followings: [...] }

        setFollowingUsers(result.followings || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowingUsers();
  }, []);

  //   if (loading) return <p className="text-white mt-32">Loading...</p>;
  if (error) return <p className="text-red-500 mt-32">{error}</p>;

  return (
    <div className="mt-40 md:mt-20 px-4 sm:px-10">
      <h2 className="text-3xl font-extrabold text-center text-white neon-text mb-10 tracking-wider">
        Followings
      </h2>

      {followingUsers.length === 0 ? (
        <p className="text-white/50 text-center text-lg">No followings yet.</p>
      ) : (
        <div className="flex justify-center items-center">
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
            {followingUsers.map((user) => (
              <li
                key={user._id}
                onClick={() => handleUserClick(user.username)}
                className="bg-white/10 cursor-pointer backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-cyan-400/20 transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] group"
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-cyan-400 group-hover:border-white transition duration-300">
                    <Image
                      src={user.profileImage || "/default-profile.png"}
                      alt={user.username}
                      width={200}
                      height={200}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  <div>
                    {/* <p className="text-white font-medium text-lg group-hover:text-cyan-300">
                {user.name}
              </p> */}
                    <p className="text-sm text-white/50">{user.username}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>


  );
};

export default FollowingsContent;
