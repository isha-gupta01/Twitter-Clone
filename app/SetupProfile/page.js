"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const SetupProfile = () => {
    const [form, setForm] = useState({ username: "", Name: "", bio: "" });
    const [selectedFile, setSelectedFile] = useState(null);
    const [response, setResponse] = useState("");
    const [user, setUser] = useState(null);
    const router = useRouter();

    // ✅ Load user data from localStorage on client-side only
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedUser = JSON.parse(localStorage.getItem("user"));
            if (storedUser) {
                setUser(storedUser);
                setForm({
                    username: storedUser.username || "",
                    Name: storedUser.Name || "",
                    bio: storedUser.bio || "",
                });
            }
        }
    }, []);

    // ✅ Handle text input changes
    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // ✅ Handle file selection
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            console.log("Selected File:", file);
        }
    };

    // ✅ Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("username", form.username);
        formData.append("Name", form.Name);
        formData.append("bio", form.bio);
        if (selectedFile) {
            formData.append("media", selectedFile); // ✅ Change to "profileImage"
        }

        try {
            const response = await fetch("https://twitterclonebackend-nqms.onrender.com/usercrud/setupprofile", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                setResponse("Profile Updated Successfully.");

                // ✅ Update LocalStorage with new profile data
                const updatedUser = {
                    ...user,
                    username: data.profile.username,
                    Name: data.profile.Name,
                    bio: data.profile.bio,
                    profileImage: data.profile.profileImage, // ✅ Corrected profile image URL
                };

                if (typeof window !== "undefined") {
                    localStorage.setItem("user", JSON.stringify(updatedUser));
                }

                setUser(updatedUser);
                setForm({ username: "", Name: "", bio: "" });
                setSelectedFile(null);

                // ✅ Reset file input visually
                document.getElementById("fileInput").value = "";

                setTimeout(() => {
                    router.push("/ProfilePage");
                }, 1000);
            } else {
                setResponse(data.message || "Error updating profile.");
            }
        } catch (error) {
            setResponse("Error: " + error.message);
        }
    };

    return (
        <div className="bg-gray-800 w-full text-white min-h-screen flex justify-center items-center">
            <div className="bg-black w-[28rem] h-[40rem] rounded-2xl py-8 flex flex-col">
                <div className="w-[27rem] p-4 xl:pl-[3rem] justify-center">
                    <div className="invert">
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="w-9 h-10 m-auto"
                        >
                            <g>
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                            </g>
                        </svg>
                    </div>
                    <div className="text-center mt-5 text-2xl">Set Up Profile</div>
                    <form onSubmit={handleSubmit} className="flex my-10 flex-col gap-5">
                        <input
                            className="py-2 px-2 rounded-2xl bg-black text-white border border-white/30"
                            onChange={handleInputChange}
                            value={form.username}
                            type="text"
                            name="username"
                            placeholder="Username"
                        />
                        <input
                            className="py-2 px-2 rounded-2xl bg-black text-white border border-white/30"
                            onChange={handleInputChange}
                            value={form.Name}
                            type="text"
                            name="Name"
                            placeholder="Name"
                        />
                        <input
                            className="py-2 px-2 rounded-2xl bg-black text-white border border-white/30"
                            onChange={handleInputChange}
                            value={form.bio}
                            type="text"
                            name="bio"
                            placeholder="Bio"
                        />
                        <input
                            id="fileInput"
                            className="py-2 px-2 rounded-2xl bg-black text-white border border-white/30"
                            accept="image/*,video/*"
                            onChange={handleFileChange}
                            type="file"
                            name="profileImage"
                            placeholder="Upload File"
                        />
                        <button
                            type="submit"
                            className="bg-white text-black font-semibold rounded-full w-[16rem] mx-auto py-2 mt-4"
                        >
                            Update
                        </button>
                        {response && <div className="text-red-600 text-center">{response}</div>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SetupProfile;
