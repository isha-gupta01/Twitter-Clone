"use client";
import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import io from "socket.io-client";
import CommentUI from "./CommentUI";

const TweetComments = ({ userId, username, profileImage }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [connectionStatus, setConnectionStatus] = useState("connecting");
  
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null); // ✅ Add container ref
  const isUnmountedRef = useRef(false);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true); // ✅ Track if user scrolled up
  
  const params = useParams();
  const tweetId = params?.tweetId;

  // ✅ Improved auto-scroll with multiple methods
  const scrollToBottom = (behavior = "smooth") => {
    // Method 1: Scroll using ref element
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior, 
        block: "end",
        inline: "nearest"
      });
    }
    
    // Method 2: Scroll container to bottom (fallback)
    if (messagesContainerRef.current) {
      const container = messagesContainerRef.current;
      container.scrollTop = container.scrollHeight;
    }
    
    // Method 3: Force scroll with timeout (final fallback)
    setTimeout(() => {
      if (messagesContainerRef.current) {
        const container = messagesContainerRef.current;
        container.scrollTo({
          top: container.scrollHeight,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  // ✅ Check if user is at bottom (to determine auto-scroll)
  const checkIfAtBottom = () => {
    if (!messagesContainerRef.current) return true;
    
    const container = messagesContainerRef.current;
    const threshold = 100; // pixels from bottom
    const isAtBottom = container.scrollHeight - container.scrollTop - container.clientHeight < threshold;
    
    return isAtBottom;
  };

  // ✅ Handle scroll events to track user position
  const handleScroll = () => {
    const isAtBottom = checkIfAtBottom();
    setShouldAutoScroll(isAtBottom);
  };

  // ✅ Auto-scroll when messages change
  useEffect(() => {
    if (!loading && comments.length > 0 && shouldAutoScroll) {
      // Use timeout to ensure DOM is updated
      const timeoutId = setTimeout(() => {
        scrollToBottom();
      }, 50);
      
      return () => clearTimeout(timeoutId);
    }
  }, [comments, loading, shouldAutoScroll]);

  // ✅ Always scroll to bottom on initial load
  useEffect(() => {
    if (!loading && comments.length > 0) {
      scrollToBottom("auto"); // Instant scroll on load
      setShouldAutoScroll(true);
    }
  }, [loading]);

  // Initialize socket connection and fetch initial data
  useEffect(() => {
    if (!tweetId || !userId) return;

    isUnmountedRef.current = false;
    initializeSocket();
    fetchInitialComments();

    return () => {
      isUnmountedRef.current = true;
      cleanupSocket();
    };
  }, [tweetId, userId]);

  // Initialize Socket.IO connection
  const initializeSocket = () => {
    try {
      socketRef.current = io("https://twitterclonebackend-nqms.onrender.com", {
        transports: ['websocket', 'polling'],
        forceNew: true
      });

      socketRef.current.on("connect", () => {
        console.log("Socket connected");
        setConnectionStatus("connected");
        setError("");
        socketRef.current.emit("joinTweetRoom", tweetId);
      });

      socketRef.current.on("disconnect", () => {
        console.log("Socket disconnected");
        setConnectionStatus("disconnected");
      });

      socketRef.current.on("connect_error", (err) => {
        console.error("Socket connection error:", err);
        setConnectionStatus("error");
        setError("Connection failed. Comments may not update in real-time.");
      });

      socketRef.current.on("receiveComment", handleNewComment);

      socketRef.current.on("commentError", (errorMsg) => {
        setError(errorMsg);
      });

    } catch (err) {
      console.error("Failed to initialize socket:", err);
      setError("Failed to connect to real-time chat.");
    }
  };

  // ✅ Handle new comment with auto-scroll logic
  const handleNewComment = (comment) => {
    if (isUnmountedRef.current) return;
    
    // Check if user is at bottom before adding message
    const wasAtBottom = checkIfAtBottom();
    
    setComments((prevComments) => {
      const exists = prevComments.some((c) => c._id === comment._id);
      if (exists) return prevComments;
      
      const updatedComments = [...prevComments, comment];
      return updatedComments.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    });
    
    // Only auto-scroll if user was at bottom or it's their own message
    if (wasAtBottom || comment.userId === userId) {
      setShouldAutoScroll(true);
    }
  };

  // Fetch initial comments from API
  const fetchInitialComments = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.get(
        `https://twitterclonebackend-nqms.onrender.com/comment/${tweetId}`,
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        }
      );

      if (!isUnmountedRef.current) {
        setComments(response.data || []);
        setError("");
      }
    } catch (err) {
      console.error("Error fetching comments:", err);
      if (!isUnmountedRef.current) {
        if (err.response?.status === 401) {
          setError("Please log in to view comments.");
        } else if (err.response?.status === 404) {
          setError("Tweet not found.");
        } else {
          setError("Failed to load comments. Please try refreshing.");
        }
      }
    } finally {
      if (!isUnmountedRef.current) {
        setLoading(false);
      }
    }
  };

  // ✅ Send comment with immediate auto-scroll
  const sendComment = async (content) => {
    if (!content?.trim()) {
      setError("Comment cannot be empty.");
      return false;
    }

    if (!socketRef.current?.connected) {
      setError("Not connected to chat. Please refresh the page.");
      return false;
    }

    if (!userId || !username) {
      setError("User information missing. Please log in again.");
      return false;
    }

    try {
      const commentPayload = {
        tweetId,
        userId,
        username,
        profileImage: profileImage || "/defaultProfile.png",
        content: content.trim(),
        timestamp: new Date().toISOString()
      };

      // Emit comment to backend via socket
      socketRef.current.emit("sendComment", commentPayload);
      
      // Ensure auto-scroll for own messages
      setShouldAutoScroll(true);
      
      // Force scroll after a short delay
      setTimeout(() => scrollToBottom(), 100);
      
      setError("");
      return true;

    } catch (err) {
      console.error("Error sending comment:", err);
      setError("Failed to send comment. Please try again.");
      return false;
    }
  };

  // Cleanup socket connection
  const cleanupSocket = () => {
    if (socketRef.current) {
      console.log("Cleaning up socket connection");
      
      socketRef.current.off("connect");
      socketRef.current.off("disconnect");
      socketRef.current.off("connect_error");
      socketRef.current.off("receiveComment");
      socketRef.current.off("commentError");
      
      socketRef.current.emit("leaveTweetRoom", tweetId);
      socketRef.current.disconnect();
      socketRef.current = null;
    }
  };

  // Retry connection
  const retryConnection = () => {
    setError("");
    setConnectionStatus("connecting");
    cleanupSocket();
    setTimeout(() => {
      initializeSocket();
      fetchInitialComments();
    }, 1000);
  };

  return (
    <>
      <CommentUI
        messages={comments}
        sendMessage={sendComment}
        tweetId={tweetId}
        loading={loading}
        error={error}
        connectionStatus={connectionStatus}
        onRetry={retryConnection}
        currentUserId={userId}
        messagesContainerRef={messagesContainerRef} // ✅ Pass ref to UI
        onScroll={handleScroll} // ✅ Pass scroll handler
      />
      {/* ✅ Positioned at the very end of messages */}
      <div ref={messagesEndRef} style={{ height: 0, overflow: 'hidden' }} />
    </>
  );
};

export default TweetComments;