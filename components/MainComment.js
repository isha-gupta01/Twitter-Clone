"use client"
import { useParams } from "next/navigation";
import ChatBox from "./Comments";
import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";

const Chat = ({ userId, username, profileImage }) => {
  const [comments, setComments] = useState([]);
  const params = useParams();
  const { tweetId } = params;

  const socketRef = useRef(null); // 👈 for maintaining socket instance

  useEffect(() => {
    if (!tweetId) return;

    // ✅ Initialize socket inside useEffect
    socketRef.current = io("https://twitterclonebackend-nqms.onrender.com");

    // Join the tweet-specific room
    socketRef.current.emit("joinTweetRoom", tweetId);

    // Listen for incoming comment
    socketRef.current.on("receiveComment", (comment) => {
      setComments((prev) => [comment, ...prev]);
    });

    return () => {
      // ✅ Clean up socket on unmount
      socketRef.current.disconnect();
    };
  }, [tweetId]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`https://twitterclonebackend-nqms.onrender.com/comment/${tweetId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        setComments(res.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    if (tweetId) {
      fetchComments();
    }
  }, [tweetId]);

  const sendComment = async (content) => {
    if (!content.trim()) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    const newComment = {
      tweetId,
      userId,
      username,
      profileImage,
      content,
    };

    try {
      const response = await axios.post(
        "https://twitterclonebackend-nqms.onrender.com/comment/add",
        newComment,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        const savedComment = response.data.comment;
        // ✅ Only emit through socket (don't duplicate with setComments here)
        socketRef.current.emit("sendComment", savedComment);
      }
    } catch (error) {
      console.error("Error saving comment:", error);
    }
  };

  return (
    <ChatBox
      messages={comments}
      sendMessage={sendComment}
      tweetId={tweetId}
    />
  );
};

export default Chat;
