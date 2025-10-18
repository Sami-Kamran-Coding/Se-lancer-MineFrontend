"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { setToken } from "@/lib/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

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
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-100 to-slate-300">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-8 rounded-2xl bg-white shadow-xl w-full max-w-md space-y-6"
      >
        <h1 className="text-2xl font-bold text-center text-slate-800">Create an Account</h1>
        <div className="space-y-4">
          <Input
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <select
            className="w-full p-3 border rounded-lg text-slate-700"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="influencer">Influencer</option>
            <option value="brand">Brand</option>
            {/* <option value="admin">Admin</option> */}
          </select>

          <Button
            onClick={handleRegister}
            disabled={loading}
            className="w-full mt-4 text-lg"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </Button>

          <p className="text-sm text-center text-slate-600 mt-3">
            Already have an account?{" "}
            <a href="/auth/login" className="text-blue-600 hover:underline">
              Login
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
