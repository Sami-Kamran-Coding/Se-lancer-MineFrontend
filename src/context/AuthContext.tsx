// context/AuthContext.tsx
"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { verifyToken, clearToken } from "@/lib/auth";

interface AuthContextType {
  user: any;
  setUser: (user: any) => void;
    hasProfile: boolean;
  setHasProfile: React.Dispatch<React.SetStateAction<boolean>>;
  login: (userData: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [hasProfile, setHasProfile] = useState(false);
  useEffect(() => {
    const loadUser = async () => {
      const currentUser = await verifyToken();
      if (currentUser) setUser(currentUser);
    };
    loadUser();
  }, []);

  const login = (userData: any) => {
    setUser(userData);
  };

  const logout = () => {
    clearToken();
    setUser(null);
    setHasProfile(false);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout , hasProfile, setHasProfile,}}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
