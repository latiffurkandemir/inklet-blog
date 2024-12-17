import React, { createContext, useState, useContext, useEffect } from "react";
import { getUserProfile, logout } from "../services/api";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      localStorage.removeItem("token");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const userData = await getUserProfile();
        setUser(userData);
      } catch (error) {
        console.error("Couldn't retrieve user information:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [localStorage.getItem("token")]);

  return (
    <UserContext.Provider
      value={{ user, loading, setUser, logout: handleLogout }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
