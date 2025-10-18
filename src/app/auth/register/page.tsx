"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { setToken } from "@/lib/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { User, Mail, Lock } from "lucide-react";
export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("brand");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }
    setLoading(true);

    try {
      const res = await apiFetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password, role }),
      });

      // Auto login after register
      const loginRes = await apiFetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      setToken(loginRes.data.token);
      router.push("/auth/login");
    } catch (err: any) {
      alert(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex  mt-8 items-center justify-center min-h-screen bg-gradient-to-br from-slate-100 via-indigo-50 to-indigo-200 px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-gray-200 shadow-2xl rounded-2xl p-8 sm:p-10 space-y-6"
      >
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            Create an Account ✨
          </h1>
          <p className="text-slate-600 text-sm mt-2">
            Join our community as a brand or influencer.
          </p>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <Input
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10 py-2.5"
              />
            </div>
          </div>

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
                type="email"
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
                placeholder="••••••••"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 py-2.5"
              />
            </div>
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Select Role
            </label>
            <select
              className="w-full p-3 border rounded-lg text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="influencer">Influencer</option>
              <option value="brand">Brand</option>
            </select>
          </div>

          {/* Button */}
          <Button
            onClick={handleRegister}
            disabled={loading}
            className="w-full py-5 text-base font-medium bg-indigo-600 hover:bg-indigo-700 transition-all duration-200"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </Button>

          {/* Login Redirect */}
          <p className="text-sm text-center text-slate-600 mt-3">
            Already have an account?{" "}
            <a href="/auth/login" className="text-indigo-600 hover:underline">
              Log in
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
