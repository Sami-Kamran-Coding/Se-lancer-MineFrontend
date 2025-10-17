// app/brand/page.tsx
"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import Link from "next/link";
import { Influencer } from "../influencer/page";

export default function BrandPage() {
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInfluencers = async () => {
      try {
        const res = await apiFetch("/api/influencer");
        setInfluencers(res.data.profiles);
      } catch (err) {
        console.error("Failed to fetch influencers:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInfluencers();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );

  return (
    <div className=" mx-auto mt-20 ">
      <h1 className="text-2xl font-bold mb-6">All Influencers</h1>
      {influencers.length === 0 ? (
        <p>No influencers found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {influencers.map((inf) => (
            <Link key={inf._id} href={`/influencer/${inf._id}`}>
              <Card className="hover:shadow-lg transition rounded-2xl cursor-pointer">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <img
                    src={inf.userId?.profilePicture || "/default-avatar.png"}
                    alt={inf.userId?.name}
                    className="w-20 h-20 rounded-full object-cover mb-3"
                  />
                  <h3 className="font-semibold text-lg">{inf.userId?.name}</h3>
                  <p className="text-sm text-gray-500">
                    {inf.category?.join(", ") || "Uncategorized"}
                  </p>
                  <p className="text-sm mt-2">
                    IG: {inf.followers?.instagram || 0}
                  </p>
                  {inf.verified && (
                    <span className="text-blue-600 text-xs font-semibold mt-1">
                      ✔ Verified
                    </span>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}