"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const SetupProfile = () => {
    const [form, setForm] = useState({ username: "", Name: "", bio: [] });
    const [selectedFile, setSelectedFile] = useState(null);
    const [coverSelectedFile, setCoverSelectedFile] = useState(null);
    const [response, setResponse] = useState("");
    const [user, setUser] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [coverImagePreview, setCoverImagePreview] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedUser = JSON.parse(localStorage.getItem("user"));
            if (storedUser) {
                setUser(storedUser);
                setForm({
                    username: storedUser.username || "",
                    Name: storedUser.Name || "",
                    bio: JSON.stringify(storedUser.bio) ? storedUser.bio : [],
                });
                if (storedUser.profileImage) {
                    setImagePreview(storedUser.profileImage);
                }
                if (storedUser.coverImage) {
                    setCoverImagePreview(storedUser.coverImage);
                }
            }
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: name === "bio"
                ? value.split(",").map((item) => item.trim())
                : value,
        }));
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCoverFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setCoverSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setCoverImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setSelectedFile(null);
        setImagePreview(null);
        document.getElementById("fileInput").value = "";
    };

    const handleRemoveCoverImage = () => {
        setCoverSelectedFile(null);
        setCoverImagePreview(null);
        document.getElementById("coverFileInput").value = "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const hasTextUpdates =
            form.username.trim() !== "" ||
            form.Name.trim() !== "" ||
            (Array.isArray(form.bio) && form.bio.some((b) => b.trim() !== ""));

        const hasProfileFile = selectedFile !== null;
        const hasCoverFile = coverSelectedFile !== null;

        if (!hasProfileFile && !hasCoverFile && !hasTextUpdates) {
            setResponse("Please update at least one field or upload a file.");
            setSubmitting(false);
            return;
        }

        const formData = new FormData();

        if (hasTextUpdates) {
            formData.append("username", form.username);
            formData.append("Name", form.Name);
            formData.append("bio", JSON.stringify(form.bio));
        }

        if (hasProfileFile) {
            formData.append("media", selectedFile);
        }

        if (hasCoverFile) {
            formData.append("coverImage", coverSelectedFile);
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
                setSubmitting(false);
                setResponse("Profile Updated Successfully.");

                const updatedUser = {
                    ...user,
                    ...(data.profile.username && { username: data.profile.username }),
                    ...(data.profile.Name && { Name: data.profile.Name }),
                    ...(data.profile.bio && { bio: data.profile.bio }),
                    ...(data.profile.profileImage && { profileImage: data.profile.profileImage }),
                    ...(data.profile.coverImage && { coverImage: data.profile.coverImage }),
                };

                if (typeof window !== "undefined") {
                    localStorage.setItem("user", JSON.stringify(updatedUser));
                }

                setUser(updatedUser);
                setForm({ username: "", Name: "", bio: [] });
                setSelectedFile(null);
                setImagePreview(null);
                document.getElementById("fileInput").value = "";

                setCoverSelectedFile(null);
                setCoverImagePreview(null);
                document.getElementById("coverFileInput").value = "";

                setTimeout(() => {
                    router.push("/ProfilePage");
                }, 1000);
            } else {
                setResponse(data.message || "Error updating profile.");
                setSubmitting(false);
            }
        } catch (error) {
            setResponse("Error: " + error.message);
            setSubmitting(false);
        }
    };

    return (
        <div className="bg-gray-800 w-full text-white min-h-screen flex justify-center items-center">
            <div className="bg-black w-[28rem] h-[48rem] sm:h-[80rem] md:h-[40rem] rounded-2xl py-8 flex flex-col">
                <div className="w-[27rem] p-4 xl:pl-[3rem] justify-center">
                    <div className="invert">
                        <svg viewBox="0 0 24 24" aria-hidden="true" className="w-9 h-10 my-auto mx-48 md:mx-auto">
                            <g>
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                            </g>
                        </svg>
                    </div>
                    <div className="text-center ml-[2rem] md:ml-0 mt-5 text-2xl">Setup Profile</div>

                    <form onSubmit={handleSubmit} className="flex my-10 ml-8 sm:ml-5 md:ml-0 flex-col gap-5">
                        <div className="flex">
                            {imagePreview && (
                                <div className="relative w-20 h-20 mx-auto">
                                    <img src={imagePreview} alt="Profile Preview" className="rounded-full w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={handleRemoveImage}
                                        className="absolute top-0 -right-4 ring-1 ring-white text-white px-[0.35rem] py-[0.15rem] rounded-full text-[0.60rem]"
                                    >
                                        ✕
                                    </button>
                                </div>
                            )}

                            {coverImagePreview && (
                                <div className="relative w-30 h-20 mx-auto">
                                    <img src={coverImagePreview} alt="Cover Preview" className=" w-full h-full rounded-lg object-cover" />
                                    <button
                                        type="button"
                                        onClick={handleRemoveCoverImage}
                                        className="absolute top-0 -right-5 ring-1 ring-white text-white px-[0.35rem] py-[0.15rem] rounded-full  text-[0.60rem]"
                                    >
                                        ✕
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="flex gap-4">
                            <div className="flex flex-col items-center">
                                <label
                                    htmlFor="fileInput"
                                    className="cursor-pointer px-3 py-2 text-white rounded-full border border-white/30 hover:bg-gray-300 hover:text-black transition-all duration-200"
                                >
                                    Update Profile Image
                                </label>
                                <input
                                    id="fileInput"
                                    type="file"
                                    name="profileImage"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </div>
                            <div className="flex flex-col items-center">
                                <label
                                    htmlFor="coverFileInput"
                                    className="cursor-pointer px-3 py-2 text-white rounded-full border border-white/30 hover:bg-gray-300 hover:text-black transition-all duration-200"
                                >
                                    Update Cover Image
                                </label>
                                <input
                                    id="coverFileInput"
                                    type="file"
                                    name="coverImage"
                                    accept="image/*"
                                    onChange={handleCoverFileChange}
                                    className="hidden"
                                />
                            </div>
                        </div>

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
                            value={Array.isArray(form.bio) ? form.bio.join(", ") : ""}
                            type="text"
                            name="bio"
                            placeholder="Bio"
                        />

                        <button
                            type="submit"
                            className="bg-white text-black font-semibold rounded-full w-[16rem] mx-auto py-2 mt-4"
                        >
                            {submitting ? "Updating..." : "Update"}
                        </button>

                        {response && <div className="text-green-600 text-center">{response}</div>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SetupProfile;
