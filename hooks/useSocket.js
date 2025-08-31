import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const useSocket = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const newSocket = io(`${process.env.NEXT_PUBLIC_BACKEND_URL}`); // Connect to backend WebSocket server
    setSocket(newSocket);

    newSocket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => newSocket.disconnect(); // Cleanup when component unmounts
  }, []);

  const sendMessage = (message) => {
    if (socket) {
      socket.emit("sendMessage", message);
    }
  };

  return { messages, sendMessage };
};

export default useSocket;
