"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { clearToken } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

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
  }, []);

  const handleSelect = (value: string) => {
    setRole(value);
    if (value === "influencer") router.push("/influencer/create");
    else if (value === "brand") router.push("/brand");
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <h1 className="text-3xl font-semibold mb-4">Welcome, {user.name}</h1>
      <select
        className="p-3 border rounded-lg mt-4"
        value={role}
        onChange={(e) => handleSelect(e.target.value)}
      >
        <option value="">Select Role</option>
        <option value="influencer">Influencer</option>
        <option value="brand">Brand</option>
        {/* <option value="admin">Admin</option> */}
      </select>

      <Button
        onClick={() => {
          clearToken();
          router.push("/");
        }}
        className="mt-6"
      >
        Logout
      </Button>
    </div>
  );
}
