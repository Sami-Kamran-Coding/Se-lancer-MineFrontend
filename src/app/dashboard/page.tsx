
"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { clearToken } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { User, LogOut, ArrowRight, Briefcase, Sparkles } from "lucide-react";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState("");
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await apiFetch("/api/auth/me");
        setUser(res.data.user);
      } catch {
        router.push("/");
      }
    };
    load();
  }, [router]);

  const handleSelect = (value: string) => {
    setRole(value);
    if (value === "influencer") router.push("/influencer/create");
    else if (value === "brand") router.push("/brand");
  };

  if (!user)
    return (
      <div className="flex  items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-slate-200">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-slate-700 text-lg font-medium"
        >
          Loading your dashboard...
        </motion.div>
      </div>
    );

  return (
    <div className="flex mt-10 items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-slate-100 to-indigo-200 px-4">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg bg-white/80 backdrop-blur-xl shadow-2xl border border-gray-200 rounded-2xl p-8 space-y-6 text-center"
      >
        {/* Header Section */}
        <div className="space-y-2">
          <div className="flex justify-center">
            <div className="bg-indigo-100 p-3 rounded-full">
              <User className="w-8 h-8 text-indigo-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-slate-900">
            Welcome, {user.name} 👋
          </h1>
          <p className="text-slate-600 text-sm">
            Let’s get started by choosing your role below.
          </p>
        </div>

        {/* Role Selector */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-slate-700">
            Select your role
          </label>
          <div className="relative">
            <select
              className="w-full p-3 border rounded-lg text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              value={role}
              onChange={(e) => handleSelect(e.target.value)}
            >
              <option value="">Choose...</option>
              <option value="influencer">Influencer</option>
              <option value="brand">Brand</option>
            </select>
          </div>
        </div>

        {/* Quick Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="p-4 bg-indigo-50 rounded-xl shadow-sm cursor-pointer hover:shadow-md transition"
            onClick={() => handleSelect("influencer")}
          >
            <div className="flex items-center justify-center mb-2">
              <Sparkles className="w-6 h-6 text-indigo-600" />
            </div>
            <h2 className="font-semibold text-slate-800">Influencer</h2>
            <p className="text-sm text-slate-600 mt-1">
              Create your profile and start collaborating.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="p-4 bg-indigo-50 rounded-xl shadow-sm cursor-pointer hover:shadow-md transition"
            onClick={() => handleSelect("brand")}
          >
            <div className="flex items-center justify-center mb-2">
              <Briefcase className="w-6 h-6 text-indigo-600" />
            </div>
            <h2 className="font-semibold text-slate-800">Brand</h2>
            <p className="text-sm text-slate-600 mt-1">
              Explore influencers and start marketing campaigns.
            </p>
          </motion.div>
        </div>

        {/* Logout Button */}
        <div className="pt-6 border-t border-slate-200">
          <Button
            onClick={() => {
              clearToken();
              router.push("/");
            }}
            className="w-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center gap-2"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
