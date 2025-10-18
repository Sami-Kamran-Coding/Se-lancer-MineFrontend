
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Instagram, Youtube, Music } from "lucide-react";

export interface Influencer {
  _id: string;
  userId: {
    name: string;
    email: string;
    profilePicture?: string;
  };
  bio?: string;
  category?: string[];
  followers?: {
    instagram?: number;
    youtube?: number;
    tiktok?: number;
  };
  verified?: boolean;
}

export default function InfluencersPage() {
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
    <div className="max-w-7xl mx-auto px-4  mt-20 mb-16">
      <h1 className="text-3xl font-bold mb-8 mt-20 text-center tracking-tight">
        ✨ All Influencers
      </h1>

      {influencers.length === 0 ? (
        <p className="text-center text-gray-500">No influencers found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {influencers.map((inf) => (
            <Link key={inf._id} href={`/influencer/${inf._id}`}>
              <Card
                className="group bg-white/90 backdrop-blur-md border border-gray-100 hover:shadow-2xl hover:border-indigo-200 transition-transform transform hover:-translate-y-1 rounded-2xl overflow-hidden"
              >
                <CardContent className="p-5 flex flex-col items-center text-center">
                  <div className="relative">
                    <img
                      src={inf.userId?.profilePicture || "/default-avatar.png"}
                      alt={inf.userId?.name}
                      className="w-24 h-24  rounded-full object-cover border-4 border-white shadow-lg mb-5 transition-transform group-hover:scale-105"
                    />
                    {inf.verified && (
                      <Badge
                        variant="secondary"
                        className="absolute -bottom-2 right-2 bg-blue-600 text-white text-xs flex items-center gap-1 shadow-md"
                      >
                        <CheckCircle size={14} /> Verified
                      </Badge>
                    )}
                  </div>

                  <h3 className="font-semibold text-lg mt-2 text-gray-900">
                    {inf.userId?.name}
                  </h3>

                  <p className="text-sm text-gray-500 line-clamp-2">
                    {inf.bio || "No bio available"}
                  </p>

                  <div className="mt-3">
                    <p className="text-xs text-gray-600">
                      {inf.category?.join(", ") || "Uncategorized"}
                    </p>
                  </div>

                  <div className="mt-4 flex gap-4 text-sm font-medium text-gray-700">
                    <div className="flex items-center gap-1">
                      <Instagram className="w-4 h-4 text-pink-500" />
                      <span>{inf.followers?.instagram || 0}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Youtube className="w-4 h-4 text-red-500" />
                      <span>{inf.followers?.youtube || 0}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Music className="w-4 h-4 text-black" />
                      <span>{inf.followers?.tiktok || 0}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
