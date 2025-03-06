"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
import { useState} from 'react'


const SetupProfile = () => {
    const [form, setForm] = useState({ username: "", Name: "", bio: ""})
    const [selectedFile, setSelectedFile] = useState(null)
    const router = useRouter();
    const [response, setResponse] = useState("")
        // Handle tweet content change
    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Function to handle file selection
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            console.log("Selected File:", file);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("username", form.username);
        formData.append("Name", form.Name);
        formData.append("bio", form.bio);
        if (selectedFile) {
          formData.append("media", selectedFile);
        }
    
        try {
          const response = await fetch("https://twitterclonebackend-nqms.onrender.com/usercrud/setupprofile",
            {
              method: "POST",
              body: formData,
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
    
          const data = await response.json();
    
          if (response.ok) {
            setResponse("Profile Updated Successfully.");
            setForm({ username: "", Name: "", bio: "" }); // ✅ Correct Reset
            setSelectedFile(null); // ✅ Reset File Selection
            const updatedUser = {
                ...JSON.parse(localStorage.getItem("user")),
                profileImage: data.profile.profileImage,
            };

            localStorage.setItem("user", JSON.stringify(updatedUser));

            // ✅ Update state to reflect new image immediately
            setUser(updatedUser);
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
        <div className='bg-gray-800 w-full text-white min-h-screen flex justify-center items-center'>
            <div className='bg-black w-[30rem] h-[40rem] rounded-2xl py-8 flex flex-col '>
                <div className='w-[27rem] pl-[3rem] justify-center'>
                    <div className=" invert">
                        <svg viewBox="0 0 24 24" aria-hidden="true"
                            className="w-9 h-10 m-auto r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-lrsllp r-1nao33i r-16y2uox r-8kz0gk">
                            <g>
                                <path
                                    d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z">
                                </path>
                            </g>
                        </svg>
                    </div>
                    <div className='text-center mt-5 text-2xl'>Set Up Profile</div>
                    <form onSubmit={handleSubmit} className='flex my-10  flex-col gap-5  '>
                        <input className='py-2 px-2 rounded-2xl bg-black text-white border border-white/30' onChange={handleInputChange} value={form.username} type='text' name='username' placeholder='Username' />
                        <input className='py-2 px-2 rounded-2xl bg-black text-white border border-white/30' onChange={handleInputChange} value={form.Name} type='text' name='Name' placeholder='Name' />
                        <input className='py-2 px-2 rounded-2xl bg-black text-white border border-white/30' onChange={handleInputChange} value={form.bio} type='text' name='bio' placeholder='Bio' />
                        <input className='py-2 px-2 rounded-2xl bg-black text-white border border-white/30' accept="image/*,video/*" onChange={handleFileChange} type='file' name='profileImage' placeholder='Upload File' />
                        <button type='submit' className='bg-white text-black font-semibold rounded-full w-[16rem] mx-auto py-2 mt-4'>Update</button>
                        {response && <div className='text-red-600 text-center'>{response}</div>}
                    </form>
                </div>
            </div>

        </div>
    )
}

export default SetupProfile
