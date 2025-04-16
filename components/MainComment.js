"use client";
import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import ChatBox from "./Comments";
import axios from "axios";
import io from "socket.io-client";

let socket; // Global reference for socket

const Chat = ({ userId, username, profileImage }) => {
  const [comments, setComments] = useState([]);
  const params = useParams();
  const tweetId = params?.tweetId;
  const socketInitialized = useRef(false); // Prevent multiple socket setups
  const messagesEndRef = useRef(null); // Used for auto-scrolling

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [comments]);

  // Initialize socket connection
  useEffect(() => {
    if (!tweetId || socketInitialized.current) return;

    // Connect to socket
    socket = io("https://twitterclonebackend-nqms.onrender.com"); // Your backend URL
    socketInitialized.current = true;

    // Join tweet room
    socket.emit("joinTweetRoom", tweetId);

    // Listen for new comments from backend
    socket.on("receiveComment", (comment) => {
      setComments((prev) => {
        const exists = prev.some((c) => c._id === comment._id);
        return exists ? prev : [...prev, comment]; // Append if not duplicate
      });
    });

    // Cleanup socket connection on component unmount
    return () => {
      socket.off("receiveComment");
      socket.disconnect();
    };
  }, [tweetId]);

  // Fetch initial comments
  useEffect(() => {
    if (!tweetId) return;

    const fetchComments = async () => {
      try {
        const res = await axios.get(
          `https://twitterclonebackend-nqms.onrender.com/comment/${tweetId}`,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );
        setComments(res.data); // Assuming sorted by timestamp ascending from backend
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    };

    fetchComments();
  }, [tweetId]);

  // Send comment
  const sendComment = async (content) => {
    if (!content.trim()) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    const commentPayload = {
      tweetId,
      userId,
      username,
      profileImage,
      content,
    };

    try {
      // Emit to socket directly — backend will save and rebroadcast
      socket.emit("sendComment", commentPayload);
    } catch (err) {
      console.error("Error sending comment:", err);
    }
  };

  return (
    <>
      <ChatBox
        messages={comments}
        sendMessage={sendComment}
        tweetId={tweetId}
      />
      <div ref={messagesEndRef} /> {/* For auto-scroll */}
    </>
  );
};

export default Chat;
