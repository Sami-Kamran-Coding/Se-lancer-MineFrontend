
// "use client";
// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { apiFetch } from "@/lib/api";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { categories } from "../influencer/create/page";

// interface Influencer {
//   _id: string;
//   userId?: { name: string; profilePicture?: string };
//   category?: string[];
//   followers?: { [key: string]: number };
//   verified?: boolean;
// }

// export default function BrandPage() {
//   const [influencers, setInfluencers] = useState<Influencer[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [category, setCategory] = useState("");
//   const [verified, setVerified] = useState("");
//   const [platform, setPlatform] = useState("");
//   const [minFollowers, setMinFollowers] = useState("");

//   // ✅ Fetch all influencers on mount
//   useEffect(() => {
//     fetchInfluencers();
//   }, []);

//   const fetchInfluencers = async (query = "") => {
//     try {
//       setLoading(true);
//       const res = await apiFetch(`/api/influencer${query}`);
//       setInfluencers(res.data.profiles);
//     } catch (err) {
//       console.error("Failed to fetch influencers:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = async () => {
//     if (!searchTerm.trim()) return fetchInfluencers();
//     try {
//       setLoading(true);
//       const res = await apiFetch(`/api/influencer/search?query=${searchTerm}`);
//       setInfluencers(res.data.profiles);
//     } catch (err) {
//       console.error("Search failed:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFilter = () => {
//     const params = new URLSearchParams();
//     if (category) params.append("category", category);
//     if (verified) params.append("verified", verified);
//     if (platform) params.append("platform", platform);
//     if (minFollowers) params.append("minFollowers", minFollowers);

//     fetchInfluencers(`/filter?${params.toString()}`);
//   };

//   return (
//     <div className="mt-20 px-6 md:px-12 lg:px-20 flex flex-col lg:flex-row gap-8">
//       {/* ================= MAIN SECTION ================= */}
//       <div className="flex-1">
//         {/* 🔍 Search Bar */}
//         <div className="flex gap-3 mb-6">
//           <Input
//             placeholder="Search influencers by name or bio..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="flex-1"
//           />
//           <Button onClick={handleSearch}>Search</Button>
//         </div>

//         {/* 🎨 Influencers Grid */}
//         {loading ? (
//           <div className="flex justify-center items-center h-64">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
//           </div>
//         ) : influencers.length === 0 ? (
//           <p className="text-gray-600">No influencers found.</p>
//         ) : (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
//           >
//             {influencers.map((inf) => (
//               <Link key={inf._id} href={`/influencer/${inf._id}`}>
//                 <Card className="hover:shadow-lg transition rounded-2xl cursor-pointer">
//                   <CardContent className="p-4 flex flex-col items-center text-center">
//                     <img
//                       src={inf.userId?.profilePicture || "/default-avatar.png"}
//                       alt={inf.userId?.name}
//                       className="w-20 h-20 rounded-full object-cover mb-3"
//                     />
//                     <h3 className="font-semibold text-lg">
//                       {inf.userId?.name}
//                     </h3>
//                     <p className="text-sm text-gray-500">
//                       {inf.category?.join(", ") || "Uncategorized"}
//                     </p>
//                     <p className="text-sm mt-2">
//                       IG: {inf.followers?.instagram || 0}
//                     </p>
//                     {inf.verified && (
//                       <span className="text-blue-600 text-xs font-semibold mt-1">
//                         ✔ Verified
//                       </span>
//                     )}
//                   </CardContent>
//                 </Card>
//               </Link>
//             ))}
//           </motion.div>
//         )}
//       </div>

//       {/* ================= FILTER SIDEBAR ================= */}
//       <aside className="w-full lg:w-72 bg-white shadow rounded-2xl p-6 h-fit">
//         <h2 className="font-semibold text-lg mb-4">Filters</h2>
//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">Category</label>
//             <Input
//               placeholder="e.g. fashion, tech"
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Verified</label>
//             <select
//               value={verified}
//               onChange={(e) => setVerified(e.target.value)}
//               className="border border-gray-300 rounded-md w-full p-2"
//             >
//               <option value="">Any</option>
//               <option value="true">Verified</option>
//               <option value="false">Unverified</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Platform</label>
//             <select
//               value={platform}
//               onChange={(e) => setPlatform(e.target.value)}
//               className="border border-gray-300 rounded-md w-full p-2"
//             >
//               <option value="">All</option>
//               <option value="instagram">Instagram</option>
//               <option value="tiktok">TikTok</option>
//               <option value="youtube">YouTube</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Minimum Followers
//             </label>
//             <Input
//               placeholder="e.g. 10000"
//               type="number"
//               value={minFollowers}
//               onChange={(e) => setMinFollowers(e.target.value)}
//             />
//           </div>

//           <Button onClick={handleFilter} className="w-full mt-2">
//             Apply Filters
//           </Button>
//         </div>
//       </aside>
//     </div>
//   );
// }


"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { apiFetch } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { categories } from "../influencer/create/page";

interface Influencer {
  _id: string;
  userId?: { name: string; profilePicture?: string };
  category?: string[];
  followers?: { [key: string]: number };
  verified?: boolean;
}

export default function BrandPage() {
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [verified, setVerified] = useState("");
  const [platform, setPlatform] = useState("");
  const [minFollowers, setMinFollowers] = useState("");

  // Fetch influencers on mount
  useEffect(() => {
    fetchInfluencers();
  }, []);

  const fetchInfluencers = async (query = "") => {
    try {
      setLoading(true);
      const res = await apiFetch(`/api/influencer${query}`);
      setInfluencers(res.data.profiles);
    } catch (err) {
      console.error("Failed to fetch influencers:", err);
    } finally {
      setLoading(false);
    }
  };

  // Search by name or bio
  const handleSearch = async () => {
    if (!searchTerm.trim()) return fetchInfluencers();
    try {
      setLoading(true);
      const res = await apiFetch(`/api/influencer/search?query=${searchTerm}`);
      setInfluencers(res.data.profiles);
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // Clear search
  const handleClearSearch = () => {
    setSearchTerm("");
    fetchInfluencers();
  };

  // Apply filters
  const handleFilter = () => {
    const params = new URLSearchParams();
    if (category) params.append("category", category);
    if (verified) params.append("verified", verified);
    if (platform) params.append("platform", platform);
    if (minFollowers) params.append("minFollowers", minFollowers);
    fetchInfluencers(`/filter?${params.toString()}`);
  };

  // Reset filters
  const handleResetFilters = () => {
    setCategory("");
    setVerified("");
    setPlatform("");
    setMinFollowers("");
    fetchInfluencers();
  };

  return (
    <div className="mt-20 px-6 md:px-12 lg:px-20 flex flex-col lg:flex-row gap-8">
      {/* ================= MAIN SECTION ================= */}
      <div className="flex-1">
        {/* 🔍 Search Bar */}
        <div className="flex gap-3 mb-6">
          <Input
            placeholder="Search influencers by name or bio..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleSearch}>Search</Button>
          {searchTerm && (
            <Button
              variant="outline"
              onClick={handleClearSearch}
              className="text-gray-700 border-gray-300"
            >
              Clear
            </Button>
          )}
        </div>

        {/* 🎨 Influencers Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : influencers.length === 0 ? (
          <p className="text-gray-600">No influencers found.</p>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {influencers.map((inf) => (
              <Link key={inf._id} href={`/influencer/${inf._id}`}>
                <Card className="hover:shadow-lg transition rounded-2xl cursor-pointer">
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <img
                      src={inf.userId?.profilePicture || "/default-avatar.png"}
                      alt={inf.userId?.name}
                      className="w-20 h-20 rounded-full object-cover mb-3"
                    />
                    <h3 className="font-semibold text-lg">
                      {inf.userId?.name}
                    </h3>
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
          </motion.div>
        )}
      </div>

      {/* ================= FILTER SIDEBAR ================= */}
      <aside className="w-full lg:w-72 bg-white shadow rounded-2xl p-6 h-fit">
        <h2 className="font-semibold text-lg mb-4">Filters</h2>
        <div className="space-y-4">
          {/* Category Dropdown */}
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-300 rounded-md w-full p-2"
            >
              <option value="">All Categories</option>
              {categories.map((cat: string) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Verified Filter */}
          <div>
            <label className="block text-sm font-medium mb-1">Verified</label>
            <select
              value={verified}
              onChange={(e) => setVerified(e.target.value)}
              className="border border-gray-300 rounded-md w-full p-2"
            >
              <option value="">Any</option>
              <option value="true">Verified</option>
              <option value="false">Unverified</option>
            </select>
          </div>

          {/* Platform Filter */}
          <div>
            <label className="block text-sm font-medium mb-1">Platform</label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="border border-gray-300 rounded-md w-full p-2"
            >
              <option value="">All</option>
              <option value="instagram">Instagram</option>
              <option value="tiktok">TikTok</option>
              <option value="youtube">YouTube</option>
            </select>
          </div>

          {/* Followers Filter */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Minimum Followers
            </label>
            <Input
              placeholder="e.g. 10000"
              type="number"
              value={minFollowers}
              onChange={(e) => setMinFollowers(e.target.value)}
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-3 mt-3">
            <Button onClick={handleFilter} className="flex-1">
              Apply
            </Button>
            <Button
              variant="outline"
              onClick={handleResetFilters}
              className="flex-1 border-gray-300 text-gray-700"
            >
              Reset
            </Button>
          </div>
        </div>
      </aside>
    </div>
  );
}
