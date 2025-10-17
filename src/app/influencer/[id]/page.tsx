"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiFetch } from "@/lib/api";

export default function InfluencerDetailPage() {
  const { id } = useParams();
  const [influencer, setInfluencer] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInfluencer = async () => {
      try {
        const res = await apiFetch(`/api/influencer/${id}`);
        setInfluencer(res.data.profile);
      } catch (err) {
        console.error("Failed to fetch influencer:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInfluencer();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );

  if (!influencer) return <p>Influencer not found.</p>;

  const user = influencer.userId;

  return (
    <div className="max-w-3xl mx-auto mt-20 bg-white p-6 rounded-xl shadow">
      <div className="flex items-center gap-6">
        <img
          src={user?.profilePicture || "/default-avatar.png"}
          alt={user?.name}
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <h1 className="text-2xl font-bold">{user?.name}</h1>
          <p className="text-gray-600">{influencer.bio}</p>
          {influencer.verified && (
            <span className="text-blue-500 text-sm">✔ Verified</span>
          )}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="font-semibold text-lg mb-2">Categories</h2>
        <p>{influencer.category?.join(", ") || "None"}</p>

        <h2 className="font-semibold text-lg mt-4 mb-2">Followers</h2>
        <ul className="space-y-1 text-sm">
          <li>Instagram: {influencer.followers?.instagram || 0}</li>
          <li>YouTube: {influencer.followers?.youtube || 0}</li>
          <li>TikTok: {influencer.followers?.tiktok || 0}</li>
        </ul>

        <h2 className="font-semibold text-lg mt-4 mb-2">Pricing</h2>
        {influencer.pricing?.length ? (
          <ul>
            {influencer.pricing.map((p: any, i: number) => (
              <li key={i} className="text-sm">
                {p.type}: ${p.price}
              </li>
            ))}
          </ul>
        ) : (
          <p>No pricing info.</p>
        )}
      </div>
    </div>
  );
}
