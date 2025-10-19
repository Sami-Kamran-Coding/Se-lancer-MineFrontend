
"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { verifyToken, clearToken } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";

export const Header = () => {
  const { user, setUser, logout, hasProfile, setHasProfile } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const currentUser = await verifyToken();
      if (currentUser) {
        setUser(currentUser);
        if (currentUser.role === "influencer") {
          try {
            const res = await apiFetch("/api/influencer/me");
            setHasProfile(!!res.data.profile);
          } catch {
            setHasProfile(false);
          }
        }
      }
    };
    checkAuth();
  }, [setUser, setHasProfile]);

  const handleLogout = () => {
    clearToken();
    logout();
    router.push("/auth/login");
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 w-full z-50 bg-white backdrop-blur-md border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-lg sm:text-xl font-semibold text-slate-800"
        >
          InfluenceHub
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-5 items-center text-sm font-medium">
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
              {user.role === "influencer" && (
                <>
                  {!hasProfile && (
                    <Link
                      href="/influencer/create"
                      className="hover:text-blue-600"
                    >
                      Create Profile
                    </Link>
                  )}
                  <Link href="/influencer" className="hover:text-blue-600">
                    All Influencers
                  </Link>
                </>
              )}

              {user.role === "brand" && (
                <Link href="/brand" className="hover:text-blue-600">
                  All Influencers
                </Link>
              )}

              <span className="text-slate-700">
                Hello, {user.name || "User"}
              </span>
              <button
                onClick={handleLogout}
                className="hover:text-red-600 transition-colors"
              >
                Logout
              </button>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-lg"
          >
            <div className="flex flex-col items-center py-4 space-y-4 text-sm font-medium">
              {!user ? (
                <>
                  <Link
                    href="/auth/login"
                    className="hover:text-blue-600"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/register"
                    className="hover:text-blue-600"
                    onClick={() => setMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              ) : (
                <>
                  {user.role === "influencer" && (
                    <>
                      {!hasProfile && (
                        <Link
                          href="/influencer/create"
                          className="hover:text-blue-600"
                          onClick={() => setMenuOpen(false)}
                        >
                          Create Profile
                        </Link>
                      )}
                      <Link
                        href="/influencer"
                        className="hover:text-blue-600"
                        onClick={() => setMenuOpen(false)}
                      >
                        All Influencers
                      </Link>
                    </>
                  )}

                  {user.role === "brand" && (
                    <Link
                      href="/brand"
                      className="hover:text-blue-600"
                      onClick={() => setMenuOpen(false)}
                    >
                      All Influencers
                    </Link>
                  )}

                  <span className="text-slate-700">
                    Hello, {user.name || "User"}
                  </span>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                    className="hover:text-red-600"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
