import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // Function to handle login
  const login = async (email, password) => {
    try {
      const response = await fetch(
        "https://twitterclonebackend-nqms.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }
  
      const data = await response.json();
      console.log("Logged in user:", data.user.username);
  
      // Save JWT in localStorage (or cookies if needed)
      localStorage.setItem("token", data.token);
  
      // Set authentication state
      setIsAuthenticated(true);
      setEmail(data.user.email);
  
    } catch (error) {
      console.error("Error logging in:", error.message);
    }
  };

  // Function to handle logout
  const logout = () => {
    setIsAuthenticated(false);
    setEmail("");
    setPassword(""); 
    navigate("/LoginPage", { replace: true });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        email,
        password,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  return useContext(AuthContext);
};