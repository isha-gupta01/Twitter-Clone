"use client";
import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import ChatBox from "./Comments";
import axios from "axios";
import io from "socket.io-client";
import TweetChatBox from "./TweetComment";

const TweetChat = ({ userId, username, profileImage }) => {
  const [comments, setComments] = useState([]);
  const params = useParams();
  const tweetId = params?.tweetId;
  const socketRef = useRef(null); // Maintain socket instance
  const messagesEndRef = useRef(null); // Used for auto-scrolling

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [comments]);

  // Initialize socket connection
  useEffect(() => {
    if (!tweetId) return;

    // Create socket connection
    socketRef.current = io("https://twitterclonebackend-nqms.onrender.com");

    // Join the tweet's specific room
    socketRef.current.emit("joinTweetRoom", tweetId);

    // Listen for incoming comments
    socketRef.current.on("receiveComment", (comment) => {
      setComments((prev) => {
        const exists = prev.some((c) => c._id === comment._id);
        return exists ? prev : [...prev, comment];
      });
    });

    // Cleanup on component unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.off("receiveComment");
        socketRef.current.emit("leaveTweetRoom", tweetId);
        socketRef.current.disconnect();
      }
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
        setComments(res.data);
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
      if (socketRef.current) {
        socketRef.current.emit("sendComment", commentPayload);
      } else {
        console.error("Socket not connected yet.");
      }
    } catch (err) {
      console.error("Error sending comment:", err);
    }
  };

  return (
    <>
      <TweetChatBox
        messages={comments}
        sendMessage={sendComment}
        tweetId={tweetId}
      />
      <div ref={messagesEndRef} />
    </>
  );
};

export default TweetChat;
