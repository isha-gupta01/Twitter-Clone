"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, AlertCircle, Wifi, WifiOff, RefreshCw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { getChatTime } from "@/utils/Time";
import { groupMessagesByDate } from "@/utils/groupMessageByDate";

const CommentUI = ({
    messages,
    sendMessage,
    tweetId,
    loading,
    error,
    connectionStatus,
    onRetry,
    currentUserId
}) => {
    // Local state
    const [message, setMessage] = useState("");
    const [tweetData, setTweetData] = useState({});
    const [currentUser, setCurrentUser] = useState(null);
    const [sending, setSending] = useState(false);
    const [tweetLoading, setTweetLoading] = useState(true);

    // Get current user from localStorage
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setCurrentUser(storedUser);
        }
    }, []);

    // Fetch tweet data
    useEffect(() => {
        if (!tweetId) return;

        const fetchTweetData = async () => {
            try {
                setTweetLoading(true);
                const token = localStorage.getItem("token");

                if (!token) return;

                const response = await axios.get(
                    `https://twitterclonebackend-nqms.onrender.com/tweetfetch/tweetData/${tweetId}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                        timeout: 8000
                    }
                );

                setTweetData(response.data || {});
            } catch (err) {
                console.error("Error fetching tweet data:", err);
            } finally {
                setTweetLoading(false);
            }
        };

        fetchTweetData();
    }, [tweetId]);

    // Handle sending comment
    const handleSend = async () => {
        if (!message.trim() || sending) return;

        setSending(true);
        const success = await sendMessage(message.trim());

        if (success) {
            setMessage(""); // Clear input only on success
        }

        setSending(false);
    };

    // Handle Enter key press
    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    // Group messages by date
    const groupedMessages = groupMessagesByDate(messages || []);

    // Connection status indicator
    const ConnectionIndicator = () => {
        const getStatusConfig = () => {
            switch (connectionStatus) {
                case "connected":
                    return { icon: Wifi, color: "text-green-500", text: "Connected" };
                case "disconnected":
                    return { icon: WifiOff, color: "text-yellow-500", text: "Disconnected" };
                case "error":
                    return { icon: AlertCircle, color: "text-red-500", text: "Connection Error" };
                default:
                    return { icon: RefreshCw, color: "text-blue-500", text: "Connecting..." };
            }
        };

        const { icon: Icon, color, text } = getStatusConfig();

        return (
            <div className={`flex items-center gap-1 ${color}`}>
                <Icon size={12} className={connectionStatus === "connecting" ? "animate-spin" : ""} />
                <span className="text-xs">{text}</span>
            </div>
        );
    };

    // Error display component
    const ErrorDisplay = () => {
        if (!error) return null;

        return (
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-red-900/20 border border-red-500/30 rounded-lg p-3 mx-3 mb-3"
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <AlertCircle size={16} className="text-red-400" />
                        <span className="text-red-300 text-sm">{error}</span>
                    </div>
                    {connectionStatus === "error" && (
                        <button
                            onClick={onRetry}
                            className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1"
                        >
                            <RefreshCw size={12} />
                            Retry
                        </button>
                    )}
                </div>
            </motion.div>
        );
    };

    // Loading skeleton for tweet header
    const TweetHeaderSkeleton = () => (
        <div className="flex items-center animate-pulse">
            <div className="w-10 h-10 bg-gray-700 rounded-full mr-2"></div>
            <div className="flex-1">
                <div className="h-4 bg-gray-700 rounded w-3/4 mb-1"></div>
                <div className="h-3 bg-gray-700 rounded w-1/2"></div>
            </div>
        </div>
    );

    // Message loading skeleton
    const MessagesSkeleton = () => (
        <div className="space-y-4 animate-pulse">
            {[1, 2, 3].map((i) => (
                <div key={i} className={`flex ${i % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                    {i % 2 !== 0 && <div className="w-8 h-8 bg-gray-700 rounded-full mr-2"></div>}
                    <div className={`p-2 rounded-xl max-w-xs ${i % 2 === 0 ? 'bg-gray-700' : 'bg-gray-600'}`}>
                        <div className="h-4 bg-gray-500 rounded w-24 mb-1"></div>
                        <div className="h-3 bg-gray-500 rounded w-16"></div>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="h-[100vh] mb-20 md:mb-0 w-full max-w-[703px] lg:ml-[51px] md:ml-[98px] xl:ml-[92px] bg-black shadow-lg flex flex-col">

            {/* Header */}
            <div className="p-3 flex justify-between items-center px-4 border-b border-gray-800 bg-black text-white">
                <div className="flex items-center flex-1 min-w-0">
                    <Link href="/Twitter" className="mr-3 flex-shrink-0">
                        <Image
                            src="/back.png"
                            alt="back"
                            width={20}
                            height={20}
                            className="invert hover:opacity-80 transition-opacity"
                        />
                    </Link>

                    {tweetLoading ? (
                        <TweetHeaderSkeleton />
                    ) : (
                        <>
                            <Image
                                src={tweetData?.profileImage || "/person2.png"}
                                alt="Profile"
                                width={40}
                                height={40}
                                className="w-10 h-10 mr-3 rounded-full object-cover flex-shrink-0"
                            />
                            <div className="min-w-0 flex-1">
                                <div className="font-semibold truncate">
                                    {tweetData?.username || "Unknown User"}
                                </div>
                                <div className="text-sm text-gray-400 truncate">
                                    {tweetData?.content || "Loading..."}
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Tweet image thumbnail */}
                {tweetData?.image && (
                    <Image
                        src={tweetData.image}
                        alt="Tweet media"
                        width={40}
                        height={40}
                        className="w-10 h-10 hidden md:block rounded-md object-cover ml-3 flex-shrink-0"
                    />
                )}
            </div>

            {/* Connection Status */}
            <div className="px-4 py-2 bg-gray-900/50 border-b border-gray-800">
                <div className="flex items-center justify-between">
                    <ConnectionIndicator />
                    <span className="text-xs text-gray-500">
                        {messages.length} comment{messages.length !== 1 ? 's' : ''}
                    </span>
                </div>
            </div>

            {/* Error Display */}
            <AnimatePresence>
                <ErrorDisplay />
            </AnimatePresence>

            {/* Messages Container */}
            <div className="flex-1 p-3 mb-10 md:mb-0 overflow-y-auto scrollbar-hide">
                {loading ? (
                    <MessagesSkeleton />
                ) : (
                    <div className="space-y-4">
                        {Object.entries(groupedMessages).map(([dateLabel, msgs]) => (
                            <div key={dateLabel}>
                                {/* Date separator */}
                                <div className="text-center text-gray-400 text-xs mb-4 relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-700"></div>
                                    </div>
                                    <div className="relative bg-black px-3">{dateLabel}</div>
                                </div>

                                {/* Messages for this date */}
                                <div className="space-y-3">
                                    {msgs.map((msg) => {
                                        const isCurrentUser = msg.userId === currentUser?.userId;

                                        return (
                                            <motion.div
                                                key={msg._id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className={`flex ${isCurrentUser ? "justify-end" : "justify-start"} items-end gap-2`}
                                            >
                                                {/* Profile image for other users */}
                                                {!isCurrentUser && (
                                                    <Image
                                                        src={msg.profileImage || "/defaultProfile.png"}
                                                        alt={`${msg.username}'s profile`}
                                                        width={32}
                                                        height={32}
                                                        className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                                                    />
                                                )}

                                                {/* Message bubble */}
                                                <div className="max-w-xs lg:max-w-sm">
                                                    {/* Username for other users */}
                                                    {!isCurrentUser && (
                                                        <div className="text-xs text-gray-400 mb-1 px-1">
                                                            {msg.username}
                                                        </div>
                                                    )}

                                                    {/* Message content */}
                                                    <div
                                                        className={`p-3 rounded-2xl break-words ${isCurrentUser
                                                                ? "bg-blue-500 text-white rounded-br-sm"
                                                                : "bg-gray-700 text-white rounded-bl-sm"
                                                            }`}
                                                    >
                                                        <div className="text-sm leading-relaxed">
                                                            {msg.content}
                                                        </div>
                                                        <div className={`text-xs mt-1 ${isCurrentUser ? 'text-blue-100' : 'text-gray-400'}`}>
                                                            {getChatTime(msg.timestamp)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}

                        {/* Empty state */}
                        {!loading && messages.length === 0 && (
                            <div className="text-center text-gray-500 py-8">
                                <div className="text-4xl mb-2">💬</div>
                                <p>No comments yet. Be the first to comment!</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Input Field */}
            {/* Replace your current input section with this */}
            <div className="border-t border-gray-800 p-4 fixed bottom-[3.3rem] md:relative md:bottom-0 bg-black w-full max-w-[703px]">
                <div className="flex items-center gap-3">
                    {/* Input with better styling */}
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={handleKeyPress}
                            disabled={sending || connectionStatus !== "connected"}
                            className="w-full p-4 pr-12 border-2 border-gray-700/50 rounded-full bg-gray-900/80 backdrop-blur text-white text-sm outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 placeholder-gray-400"
                            placeholder={
                                connectionStatus !== "connected"
                                    ? "Connecting..."
                                    : "Add a comment..."
                            }
                            maxLength={280}
                        />

                        {/* Character count inside input */}
                        {message.length > 200 && (
                            <span className="absolute right-14 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
                                {280 - message.length}
                            </span>
                        )}
                    </div>

                    {/* Modern send button */}
                    <button
                        onClick={handleSend}
                        disabled={!message.trim() || sending || connectionStatus !== "connected"}
                        className={`relative p-4 rounded-full transition-all duration-200 transform ${!message.trim() || sending || connectionStatus !== "connected"
                                ? 'bg-gray-700 cursor-not-allowed opacity-50 scale-95'
                                : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 hover:scale-105 shadow-lg hover:shadow-blue-500/25'
                            }`}
                    >
                        {sending ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <Send size={18} className="text-white transform hover:translate-x-0.5 transition-transform" />
                        )}

                        {/* Ripple effect on click */}
                        <div className="absolute inset-0 rounded-full bg-white opacity-0 scale-0 transition-all duration-200 hover:opacity-10 hover:scale-100"></div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CommentUI;