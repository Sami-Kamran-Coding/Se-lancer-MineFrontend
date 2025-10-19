"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api";
import { setToken, verifyToken } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

import { motion } from "framer-motion";
import { Lock, Mail } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();
  const handleLogin = async () => {
    if (!email || !password) return alert("Please fill all fields");
    setLoading(true);

    try {
      const res = await apiFetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      setToken(res.data.token);
      login(res.data.user);

      // ✅ Verify token right after setting it
      const user = await verifyToken();
      if (user) {
        router.push("/dashboard");
      } else {
        alert("Invalid token. Please log in again.");
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="min-h-screen mt-8 flex items-center justify-center bg-gradient-to-br from-slate-100 via-indigo-50 to-indigo-200 px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-gray-200 shadow-2xl rounded-2xl p-8 sm:p-10 space-y-6"
      >
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900">Welcome Back 👋</h1>
          <p className="text-slate-600 text-sm mt-2">
            Sign in to your account and continue where you left off.
          </p>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <Input
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 py-2.5"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 py-2.5"
              />
            </div>
   
          </div>
        </div>

        {/* Submit Button */}
        <Button
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-5 text-base font-medium bg-indigo-600 hover:bg-indigo-700 transition-all duration-200"
        >
          {loading ? "Signing in..." : "Sign In"}
        </Button>

        {/* Divider */}
        <div className="flex items-center gap-2 my-3">
          <span className="h-px bg-gray-300 flex-1" />
          <span className="text-gray-500 text-xs">or continue with</span>
          <span className="h-px bg-gray-300 flex-1" />
        </div>

     

        {/* Footer */}
        <p className="text-center text-sm text-slate-600">
          Don’t have an account?{" "}
          <a
            href="/auth/register"
            className="text-indigo-600 font-medium hover:underline"
          >
            Sign up
          </a>
        </p>
      </motion.div>
    </div>
  );
}

 
