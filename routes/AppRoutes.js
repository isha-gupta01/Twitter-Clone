"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import Twitter from "@/app/Twitter";
import HomePage from "@/app/homePage";

export default function App() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser(token);
    }
  }, []);

  return (
    <div>
      {!user ? (
        <>
          <HomePage />
        </>
      ) : (
        <Twitter />
      )}
    </div>
  );
}
