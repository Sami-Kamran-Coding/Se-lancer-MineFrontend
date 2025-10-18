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
    <div className="min-h-screen mt-8 bg-gradient-to-br from-slate-50 to-indigo-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="bg-white shadow-xl border border-gray-100 rounded-2xl w-full max-w-3xl p-6 sm:p-8 md:p-10 space-y-8"
  >
    {/* Header */}
    <div className="text-center space-y-2">
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
        Create Your Influencer Profile ✨
      </h1>
      <p className="text-gray-500 text-sm sm:text-base">
        Fill in the details below so brands can discover and collaborate with you.
      </p>
    </div>

    {/* Bio */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Short Bio <span className="text-red-500">*</span>
      </label>
      <Textarea
        placeholder="Tell brands about your style, niche, and what makes you unique..."
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        className="min-h-[100px]"
      />
      <p className="text-xs text-gray-500 mt-1">
        Example: “Lifestyle creator sharing daily fashion & travel inspiration.”
      </p>
    </div>

    {/* Categories */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select Your Categories <span className="text-red-500">*</span>
      </label>
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => toggleCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-sm border transition-all ${
              category.includes(cat)
                ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                : "bg-white text-slate-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-1">
        Choose all categories that describe your content style.
      </p>
    </div>

    {/* Social Links */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Social Media Links
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Input
          placeholder="Instagram Profile URL"
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
        />
        <Input
          placeholder="YouTube Channel URL"
          value={youtube}
          onChange={(e) => setYoutube(e.target.value)}
        />
        <Input
          placeholder="TikTok Profile URL"
          value={tiktok}
          onChange={(e) => setTiktok(e.target.value)}
        />
      </div>
      <p className="text-xs text-gray-500 mt-1">
        Add the platforms where you are most active.
      </p>
    </div>

    {/* Followers */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Follower Count
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
          placeholder="YouTube Subscribers"
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
      <p className="text-xs text-gray-500 mt-1">
        These numbers help brands understand your audience reach.
      </p>
    </div>

    {/* Pricing */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Collaboration Pricing (optional)
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {pricing.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <span className="w-20 capitalize text-gray-600 text-sm">
              {item.type}
            </span>
            <Input
              type="number"
              value={item.price}
              onChange={(e) => {
                const newPricing = [...pricing];
                newPricing[idx].price = Number(e.target.value);
                setPricing(newPricing);
              }}
              placeholder="Price ($)"
            />
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-1">
        Add rates for your services (e.g. $50 for story, $100 for post).
      </p>
    </div>

    {/* Optional Fields */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Banner Image URL (optional)
      </label>
      <Input
        placeholder="https://example.com/banner.jpg"
        value={bannerImage}
        onChange={(e) => setBannerImage(e.target.value)}
      />
      <p className="text-xs text-gray-500 mt-1">
        This will appear as your cover image on your profile.
      </p>
    </div>

    {/* Verified & Rating */}
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input
          type="checkbox"
          checked={verified}
          onChange={(e) => setVerified(e.target.checked)}
        />
        Verified Account
      </label>
      <Input
        type="number"
        step="0.1"
        placeholder="Rating (e.g. 4.5)"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        className="max-w-[150px]"
      />
    </div>

    {/* Submit */}
    <Button
      onClick={handleSubmit}
      disabled={loading}
      className="w-full text-base sm:text-lg py-4 sm:py-5 bg-indigo-600 hover:bg-indigo-700 transition-colors rounded-xl"
    >
      {loading ? "Creating..." : "Create Profile"}
    </Button>
  </motion.div>
</div>

    
  );
}
