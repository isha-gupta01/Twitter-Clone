"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import ChatBox from "./Comments";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:4000");

const Chat = ({  userId, username, profileImage }) => {
  const [comments, setComments] = useState([]);
  const params = useParams();
  const {tweetId} =params;

  useEffect(() => {
    if (!tweetId) return; // ✅ Prevent API calls if tweetId is missing

    const fetchComments = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/comment/${tweetId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        setComments(res.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();

    // ✅ Join the tweet chat room
    socket.emit("joinTweetRoom", tweetId);

    // ✅ Listen for new comments
    socket.on("receiveComment", (comment) => 
      setComments((prev) => [...prev, comment])
    );

    return () => {
      socket.off("receiveComment"); // ✅ Cleanup event listener
    };
  }, [tweetId]);

  const sendComment = async (content) => {
    if (!content.trim()) return;
  
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found.");
      return;
    }
  
    const newComment = {
      tweetId,
      userId,
      username,
      profileImage,
      content,
    };
  
    try {
      // ✅ Send new comment to backend API
      const response = await axios.post(
        "http://localhost:4000/comment/add",
        newComment,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.status === 201) {
        const savedComment = response.data; // Get the full saved comment from the backend
  
        // ✅ Emit only the necessary data via WebSocket
        socket.emit("sendComment", savedComment);
  
        // ✅ Update UI with correct data
        setComments((prev) => [savedComment, ...prev]); // Ensure it's added at the top
      }
    } catch (error) {
      console.error("Error saving comment:", error.response?.data || error);
    }
  };
  

  return <ChatBox messages={comments} sendMessage={sendComment} tweetId={tweetId}/>;
};

export default Chat;
