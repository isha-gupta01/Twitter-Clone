"use client"
import { useEffect, useRef, useState } from "react";
import { createSocket } from "../utils/socket";
import axios from "axios";

export default function GroupChat({ tweetId }) {
  const [socket, setSocket] = useState(null);
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");
  const chatEndRef = useRef(null);

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    const sock = createSocket(token);
    setSocket(sock);

    sock.emit("join-group", tweetId);

    axios.get(`http://localhost:4000/api/messages/${tweetId}`).then(res => {
      setChat(res.data);
    });

    sock.on("receive-group-message", (msg) => {
      setChat(prev => [...prev, msg]);
    });

    return () => sock.disconnect();
  }, [tweetId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const sendMessage = () => {
    if (!message.trim()) return;
    socket.emit("send-group-message", {
      groupId: tweetId,
      text: message,
    });
    setMessage("");
  };

  return (
    <div className="w-full max-w-xl h-[500px] border border-gray-300 rounded-xl flex flex-col shadow-md bg-white">
      {/* Chat Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-2">
        {chat.map((msg, index) => {
          const isOwn = msg.userId === currentUser?._id;
          return (
            <div
              key={index}
              className={`max-w-[75%] px-4 py-2 rounded-lg text-sm shadow-sm ${
                isOwn
                  ? "bg-blue-100 text-right ml-auto"
                  : "bg-gray-200 text-left mr-auto"
              }`}
            >
              {!isOwn && (
                <div className="font-semibold text-xs text-gray-700 mb-1">
                  {msg.username}
                </div>
              )}
              <div>{msg.text}</div>
              <div className="text-[10px] text-gray-500 mt-1">
                {new Date(msg.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          );
        })}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 border-t border-gray-300 bg-white flex items-center gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
        >
          Send
        </button>
      </div>
    </div>
  );
}
