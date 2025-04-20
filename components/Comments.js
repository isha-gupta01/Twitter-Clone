"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import { getChatTime } from "@/utils/Time";
import { groupMessagesByDate } from "@/utils/groupMessageByDate";

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

  // ✅ Group messages by date label
  const groupedMessages = groupMessagesByDate(messages || []);

  return (
    <div className="h-[100vh] mb-20 md:mb-0 w-[703px] lg:ml-[51px] md:ml-[98px] xl:ml-[92px] bg-black shadow-lg flex flex-col">
      {/* Chat Header */}
      <div className="p-3 flex justify-between items-center px-10 border-b bg-black text-white font-semibold">
        <div className="flex items-center">
          <Link href={`/Twitter`}>
            <Image src="/back.png" alt="back" width={20} height={20} className="invert mr-4" />
          </Link>
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
            className="w-10 h-10 hidden md:flex rounded-md"
          />
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 p-3 mb-10 md:mb-0 overflow-y-auto scrollbar-hide space-y-4">
        {Object.entries(groupedMessages).map(([dateLabel, msgs]) => (
          <div key={dateLabel}>
            <div className="text-center text-gray-400 text-xs mb-2">{dateLabel}</div>

            {msgs.map((msg) => {
              const isMe = msg.userId === user?.userId;

              return (
                <motion.div
                  key={msg._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${isMe ? "justify-end" : "justify-start"} mb-1`}
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
                  <div className="  w-fit mb-5">
                    <div
                      className={`p-2 px-4 flex gap-10 rounded-xl text-sm shadow-md max-w-xs ${isMe ? "bg-blue-500 text-black" : "bg-gray-200 text-black"
                        }`}
                    >
                      {msg.content}
                      <span className="text-[10px]  ">
                        {getChatTime(msg.timestamp)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Input Field */}
      <div className="border-t p-2 fixed bottom-[3.3rem] md:relative md:bottom-0  bg-white md:bg-black w-full flex items-center">
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
