"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { verifyToken, clearToken } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";

export const Header = () => {
  const { user, setUser, logout ,hasProfile,setHasProfile} = useAuth();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const currentUser = await verifyToken();
      if (currentUser) setUser(currentUser);
    };
    checkAuth();
  }, [setUser]);

  const handleLogout = () => {
    clearToken();
    logout();
    router.push("/auth/login");
  };
  useEffect(() => {
    const checkAuth = async () => {
      const currentUser = await verifyToken();
      if (currentUser) {
        setUser(currentUser);

        // ✅ Check if influencer has a profile
        if (currentUser.role === "influencer") {
          try {
            const res = await apiFetch("/api/influencer/me");
            if (res.data.profile) {
              setHasProfile(true);
            } else {
              setHasProfile(false);
            }
          } catch {
            setHasProfile(false);
          }
        }
      }
    };
    checkAuth();
  }, [setUser, setHasProfile]);
  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="py-4 px-8 flex justify-between items-center shadow bg-white/70 backdrop-blur-md fixed top-0 left-0 w-full z-50"
    >
      <Link href="/" className="text-xl font-semibold text-slate-800">
        InfluenceHub
      </Link>

      <nav className="flex gap-4 items-center">
        {/* 🔹 Not logged in */}
        {!user ? (
          <>
            <Link href="/auth/login" className="hover:text-blue-600">
              Login
            </Link>
            <Link href="/auth/register" className="hover:text-blue-600">
              Register
            </Link>
          </>
        ) : (
          <>
            {/* 🔹 Influencer: Create + All Influencers */}
           {user.role === "influencer" && (
              <>
                {/* ✅ Only show "Create Profile" if profile does NOT exist */}
                {!hasProfile && (
                  <Link
                    href="/influencer/create"
                    className="hover:text-blue-600 transition-colors"
                  >
                    Create Profile
                  </Link>
                )}

                <Link
                  href="/influencer"
                  className="hover:text-blue-600 transition-colors"
                >
                  All Influencers
                </Link>
              </>
            )}

            {/* 🔹 Brand: Only All Influencers */}
            {user.role === "brand" && (
              <Link
                href="/brand"
                className="hover:text-blue-600 transition-colors"
              >
                All Influencers
              </Link>
            )}

            {/* 🔹 Common user info */}
            <span className="text-slate-700">Hello, {user.name || "User"}</span>

            <button
              onClick={handleLogout}
              className="hover:text-red-600 transition-colors"
            >
              Logout
            </button>
          </>
        )}
      </nav>
    </motion.header>
  );
};
