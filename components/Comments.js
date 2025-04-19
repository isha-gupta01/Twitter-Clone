"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import Image from "next/image";
import axios from "axios";

const ChatBox = ({ messages, sendMessage, tweetId }) => {
  const [message, setMessage] = useState("");
  const [data, setData] = useState({});
  const [user, setUser] = useState(null);

  // Fetch user from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  // Handle sending comment
  const handleSend = () => {
    if (message.trim()) {
      sendMessage(message);
      setMessage("");
    }
  };

  // Fetch tweet data
  useEffect(() => {
    if (!tweetId) return;

    const fetchTweetData = async () => {
      try {
        const response = await axios.get(
          `https://twitterclonebackend-nqms.onrender.com/tweetfetch/tweetData/${tweetId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching tweet:", error);
      }
    };

    fetchTweetData();
  }, [tweetId]);

  return (
    <div className="h-[100vh] mb-20 md:mb-0 w-[703px] lg:ml-[51px] md:ml-[98px] xl:ml-[92px] bg-black shadow-lg flex flex-col">
      {/* Chat Header */}
      <div className="p-3 flex justify-between items-center px-10 border-b bg-black text-white font-semibold">
        <div className="flex items-center">
          <Image
            src={data?.profileImage || "/person2.png"}
            alt="img"
            width={40}
            height={40}
            className="w-10 h-10 mr-2 rounded-full"
          />
          <span>{data?.content || "Loading..."}</span>
        </div> 
        {data?.image && (
          <Image
            src={data.image}
            alt="tweet image"
            width={40}
            height={40}
            className="w-10 h-10 rounded-md"
          />
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 p-3 overflow-y-auto space-y-2">
        {messages?.map((msg) => {
          const isMe = msg.userId === user?.userId;
          return (
            <motion.div
              key={msg._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              {!isMe && (
                <Image
                  src={msg.profileImage || "/defaultProfile.png"}
                  alt="profile"
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full mr-2"
                />
              )}
              <div
                className={`p-2 px-4 rounded-xl text-sm shadow-md max-w-xs ${
                  isMe ? "bg-blue-500 text-black" : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.content}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Input Field */}
      <div className="border-t p-2 flex items-center">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          className="flex-1 p-2 border rounded-full text-black text-sm outline-none"
          placeholder="Type a message..."
        />
        <button
          onClick={handleSend}
          disabled={!message.trim()}
          className="ml-2 bg-blue-500 text-black p-2 rounded-full hover:bg-blue-600 disabled:opacity-50"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default ChatBox;