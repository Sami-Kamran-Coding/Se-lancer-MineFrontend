"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { apiFetch } from "@/lib/api";
import { verifyToken } from "@/lib/auth";

interface PricingItem {
  type: string;
  price: number;
}
export const categories = ["Fashion", "Lifestyle", "Beauty", "Fitness", "Travel" , "Food", "Tech", "Gaming", "Health", "Education"];


export default function CreateInfluencerPage() {
  const [bio, setBio] = useState("");
  const [category, setCategory] = useState<string[]>([]);
  const [instagram, setInstagram] = useState("");
  const [youtube, setYoutube] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [followers, setFollowers] = useState({
    instagram: 0,
    youtube: 0,
    tiktok: 0,
  });
  const [pricing, setPricing] = useState<PricingItem[]>([
    { type: "post", price: 0 },
    { type: "story", price: 0 },
    { type: "reel", price: 0 },
    { type: "video", price: 0 },
    { type: "review", price: 0 },
  ]);
  const [bannerImage, setBannerImage] = useState("");
  const [verified, setVerified] = useState(false);
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // Verify token
  useEffect(() => {
    (async () => {
      const user = await verifyToken();
      if (!user) router.push("/auth/login");
    })();
  }, [router]);

  const handleSubmit = async () => {
    if (!bio || category.length === 0) {
      alert("Please fill required fields (bio, category)");
      return;
    }

    setLoading(true);
    try {
      await apiFetch("/api/influencer", {
        method: "POST",
        body: JSON.stringify({
          bio,
          category,
          platformLinks: {
            instagram: instagram || undefined,
            youtube: youtube || undefined,
            tiktok: tiktok || undefined,
          },
          followers: {
            instagram: followers.instagram || 0,
            youtube: followers.youtube || 0,
            tiktok: followers.tiktok || 0,
          },
          verified: verified || false,
          rating: rating || undefined,
          pricing: pricing.filter((p) => p.price > 0),
          bannerImage: bannerImage || undefined,
        }),
      });

      alert("Influencer profile created successfully!");
      router.push("/influencer");
    } catch (err: any) {
      alert(err.message || "Failed to create influencer profile");
    } finally {
      setLoading(false);
    }
  };

  const toggleCategory = (value: string) => {
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value]
    );
  };

  return (
    <div className="min-h-screen mt-15 bg-slate-100 flex items-center justify-center py-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white shadow-xl p-8 rounded-2xl w-full max-w-3xl space-y-6"
      >
        <h1 className="text-2xl font-semibold text-center text-slate-800">
          Create Influencer Profile
        </h1>

        {/* Bio */}
        <Textarea
          placeholder="Short bio..."
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />

        {/* Categories */}
        <div>
          <p className="font-medium text-slate-700 mb-2">Select Categories</p>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                className={`px-3 py-1 rounded-full border ${
                  category.includes(cat)
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-slate-700 border-slate-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Social Links */}
        <div className="grid md:grid-cols-3 gap-4">
          <Input
            placeholder="Instagram URL (optional)"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
          />
          <Input
            placeholder="YouTube URL (optional)"
            value={youtube}
            onChange={(e) => setYoutube(e.target.value)}
          />
          <Input
            placeholder="TikTok URL (optional)"
            value={tiktok}
            onChange={(e) => setTiktok(e.target.value)}
          />
        </div>

        {/* Followers */}
        <div className="grid md:grid-cols-3 gap-4">
          <Input
            type="number"
            placeholder="Instagram Followers"
            value={followers.instagram}
            onChange={(e) =>
              setFollowers({ ...followers, instagram: Number(e.target.value) })
            }
          />
          <Input
            type="number"
            placeholder="YouTube Followers"
            value={followers.youtube}
            onChange={(e) =>
              setFollowers({ ...followers, youtube: Number(e.target.value) })
            }
          />
          <Input
            type="number"
            placeholder="TikTok Followers"
            value={followers.tiktok}
            onChange={(e) =>
              setFollowers({ ...followers, tiktok: Number(e.target.value) })
            }
          />
        </div>

        {/* Pricing */}
        <div>
          <p className="font-medium text-slate-700 mb-2">Pricing (optional)</p>
          <div className="grid md:grid-cols-3 gap-3">
            {pricing.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="w-16 capitalize">{item.type}</span>
                <Input
                  type="number"
                  value={item.price}
                  onChange={(e) => {
                    const newPricing = [...pricing];
                    newPricing[idx].price = Number(e.target.value);
                    setPricing(newPricing);
                  }}
                  placeholder="Price"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Optional Fields */}
        <Input
          placeholder="Banner Image URL (optional)"
          value={bannerImage}
          onChange={(e) => setBannerImage(e.target.value)}
        />

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={verified}
              onChange={(e) => setVerified(e.target.checked)}
            />
            Verified
          </label>
          <Input
            type="number"
            step="0.1"
            placeholder="Rating (optional)"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          />
        </div>

        {/* Submit */}
        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full text-lg mt-4"
        >
          {loading ? "Creating..." : "Create Profile"}
        </Button>
      </motion.div>
    </div>
  );
}
