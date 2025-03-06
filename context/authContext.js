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
    setIsAuthenticated(true);
    setEmail(email);
    setPassword(password); 

    try {
      const response = await fetch("https://twitterclonebackend-nqms.onrender.com/api/auth/login");
      const users = await response.json();

      const loggedInUser = users.find((user) => user.email === email);

      if (loggedInUser) {
        // setUserName(loggedInUser.Name);
        // setUser(loggedInUser.EmpId);
        console.log("Logged in user",loggedInUser.username)
      } else {
        console.error("User not found:", email);
      }
    } 
    catch (error) {
      console.error("Error fetching user data:", error);
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