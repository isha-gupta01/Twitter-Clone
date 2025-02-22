"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/LoginPage"); // Redirect if not logged in
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) return null; // Prevent flickering

  return <>{children}</>;
}

