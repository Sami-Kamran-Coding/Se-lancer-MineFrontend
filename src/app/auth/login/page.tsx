"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api";
import { setToken, verifyToken } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

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
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-100 to-slate-300">
      <div className="p-8 rounded-2xl bg-white shadow-xl w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button onClick={handleLogin} disabled={loading} className="w-full mt-4">
          {loading ? "Logging in..." : "Sign In"}
        </Button>
      </div>
    </div>
  );
}
