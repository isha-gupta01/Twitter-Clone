"use client"
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import Image from "next/image";
import axios from "axios";


const ChatBox = ({ messages, sendMessage, tweetId }) => {
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user")); // Assuming you store user data
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);



  const handleSend = () => {
    if (message.trim()) {
      sendMessage(message);
      setMessage("");
    }
  };


  useEffect(() => {
    if (!tweetId) return; // ✅ Prevent API calls if tweetId is missing

    const fetchTweetData = async () => {
      try {
        const response = await axios.get(`https://twitterclonebackend-nqms.onrender.com/tweetfetch/tweetData/${tweetId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });

        setData(response.data); // ✅ Extract actual tweet data
      } catch (error) {
        console.error("Error fetching tweet:", error);
      }
    };

    fetchTweetData();
  }, [tweetId]); // ✅ Runs only when tweetId changes



  return (
    <div className="h-[100vh] mb-20 md:mb-0 w-[703px] lg:ml-[51px]  md:ml-[98px]  xl:ml-[92px]  bg-black  shadow-lg flex flex-col">
      {/* Chat Header */}

      <div className="p-3 flex justify-between items-center px-10  border-b bg-black text-white font-semibold">
        <div className="flex items-center">
          <Image src={data.profileImage} alt="img" width={20} height={20} className="w-10 h-10  mr-2" />
          <span>{data.content}</span>
        </div>
        <Image src={data.image} alt="img" width={20} height={20} className="w-10 h-10 rounded-md mr-2" />
      </div>

      {/* Messages */}
      <div className="flex-1 p-3 overflow-y-auto space-y-2">
        {messages.map((msg, index) => {
          const isMe = msg.userId === user.userId; // Use user._id directly
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`} // Use isMe directly
            >
              {!isMe && ( // Show profile image only for others (optional)
                <Image
                  src={msg.profileImage}
                  alt="img"
                  width={20}
                  height={20}
                  className="w-8 h-8 rounded-full mr-2"
                />
              )}
              <div
                className={`p-2 px-4 rounded-xl text-sm shadow-md max-w-xs ${isMe ? "bg-blue-500 text-black" : "bg-gray-200 text-gray-800"
                  }`}
              >
                {msg.content}
              </div>
            </motion.div>
          );
        })}
      </div>


      {/* Input Field */}
      <div className="border-t  p-2 flex items-center">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-2 border rounded-full text-black text-sm outline-none"
          placeholder="Type a message..."
        />
        <button
          onClick={handleSend}
          className="ml-2 bg-blue-500 text-black p-2 rounded-full hover:bg-blue-600"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
