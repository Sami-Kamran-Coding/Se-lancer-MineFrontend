// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { apiFetch } from "@/lib/api";

// export default function InfluencerDetailPage() {
//   const { id } = useParams();
//   const [influencer, setInfluencer] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchInfluencer = async () => {
//       try {
//         const res = await apiFetch(`/api/influencer/${id}`);
//         setInfluencer(res.data.profile);
//       } catch (err) {
//         console.error("Failed to fetch influencer:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchInfluencer();
//   }, [id]);

//   if (loading)
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
//       </div>
//     );

//   if (!influencer) return <p>Influencer not found.</p>;

//   const user = influencer.userId;

//   return (
//     <div className="max-w-3xl mx-auto mt-20 bg-white p-6 rounded-xl shadow">
//       <div className="flex items-center gap-6">
//         <img
//           src={user?.profilePicture || "/default-avatar.png"}
//           alt={user?.name}
//           className="w-24 h-24 rounded-full object-cover"
//         />
//         <div>
//           <h1 className="text-2xl font-bold">{user?.name}</h1>
//           <p className="text-gray-600">{influencer.bio}</p>
//           {influencer.verified && (
//             <span className="text-blue-500 text-sm">✔ Verified</span>
//           )}
//         </div>
//       </div>

//       <div className="mt-6">
//         <h2 className="font-semibold text-lg mb-2">Categories</h2>
//         <p>{influencer.category?.join(", ") || "None"}</p>

//         <h2 className="font-semibold text-lg mt-4 mb-2">Followers</h2>
//         <ul className="space-y-1 text-sm">
//           <li>Instagram: {influencer.followers?.instagram || 0}</li>
//           <li>YouTube: {influencer.followers?.youtube || 0}</li>
//           <li>TikTok: {influencer.followers?.tiktok || 0}</li>
//         </ul>

//         <h2 className="font-semibold text-lg mt-4 mb-2">Pricing</h2>
//         {influencer.pricing?.length ? (
//           <ul>
//             {influencer.pricing.map((p: any, i: number) => (
//               <li key={i} className="text-sm">
//                 {p.type}: ${p.price}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No pricing info.</p>
//         )}
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Instagram, Youtube, Music, Star } from "lucide-react";

export default function InfluencerDetailPage() {
  const { id } = useParams();
  const [influencer, setInfluencer] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInfluencer = async () => {
      try {
        const res = await apiFetch(`/api/influencer/${id}`);
        setInfluencer(res?.data?.profile || {});
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
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );

  if (!influencer || !influencer.userId)
    return (
      <p className="text-center mt-20 text-gray-600">
        Influencer not found.
      </p>
    );

  const user = influencer.userId;

  return (
    <div className="max-w-4xl mx-auto mt-24 px-4">
      {/* Banner */}
    <div className="relative w-full h-56 rounded-2xl overflow-hidden shadow-md bg-black">
  {influencer.bannerImage ? (
    <img
      src={influencer.bannerImage}
      alt="Banner"
      className="w-full h-full object-cover"
    />
  ) : (
<div className="w-full h-full bg-gradient-to-r from-gray-900 via-gray-800 to-black animate-pulse"></div>


  )}
  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

  {/* Profile Picture */}
  <div className="absolute top-8 z-40 left-1/12 transform -translate-x-1/2 translate-y-1/2">
    <img
      src={user?.profilePicture || "/default-avatar.png"}
      alt={user?.name || "User"}
      className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover bg-gray-100"
    />
  </div>
</div>

      <Card className="mt-20 p-6 shadow-lg">
        <CardContent className="space-y-6">
          {/* Name, Bio & Rating */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                {user?.name || "Unnamed Influencer"}
                {influencer.verified && (
                  <span className="text-blue-500 text-xl">✔</span>
                )}
              </h1>
              <p className="text-gray-600 mt-1">
                {influencer.bio || "No bio provided yet."}
              </p>
            </div>
            <div className="flex items-center gap-2 text-yellow-500 font-semibold">
              <Star className="w-5 h-5 fill-yellow-500" />
              <span>{influencer.rating || "N/A"}</span>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h2 className="font-semibold text-lg mb-2">Categories</h2>
            <div className="flex flex-wrap gap-2">
              {influencer.category?.length ? (
                influencer.category.map((cat: string, i: number) => (
                  <Badge key={i} className="bg-blue-100 text-blue-800">
                    {cat}
                  </Badge>
                ))
              ) : (
                <Badge className="bg-gray-100 text-gray-600">No categories</Badge>
              )}
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h2 className="font-semibold text-lg mb-2">Platforms</h2>
            <div className="flex flex-wrap gap-3">
              {influencer.platformLinks?.instagram ? (
                <a
                  href={influencer.platformLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="flex items-center gap-2 hover:bg-pink-100">
                    <Instagram className="w-5 h-5 text-pink-500" />
                    Instagram
                  </Button>
                </a>
              ) : (
                <Button variant="outline" disabled className="flex items-center gap-2">
                  <Instagram className="w-5 h-5 text-gray-400" />
                  Instagram
                </Button>
              )}
              {influencer.platformLinks?.youtube ? (
                <a
                  href={influencer.platformLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="flex items-center gap-2 hover:bg-red-100">
                    <Youtube className="w-5 h-5 text-red-500" />
                    YouTube
                  </Button>
                </a>
              ) : (
                <Button variant="outline" disabled className="flex items-center gap-2">
                  <Youtube className="w-5 h-5 text-gray-400" />
                  YouTube
                </Button>
              )}
              {influencer.platformLinks?.tiktok ? (
                <a
                  href={influencer.platformLinks.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="flex items-center gap-2 hover:bg-gray-100">
                    <Music className="w-5 h-5 text-black" />
                    TikTok
                  </Button>
                </a>
              ) : (
                <Button variant="outline" disabled className="flex items-center gap-2">
                  <Music className="w-5 h-5 text-gray-400" />
                  TikTok
                </Button>
              )}
            </div>
          </div>

          {/* Followers */}
          <div>
            <h2 className="font-semibold text-lg mb-2">Followers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-gray-50 rounded-lg shadow-sm">
                <p className="text-2xl font-bold">
                  {influencer.followers?.instagram || 0}
                </p>
                <p className="text-gray-600 text-sm">Instagram</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg shadow-sm">
                <p className="text-2xl font-bold">
                  {influencer.followers?.youtube || 0}
                </p>
                <p className="text-gray-600 text-sm">YouTube</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg shadow-sm">
                <p className="text-2xl font-bold">
                  {influencer.followers?.tiktok || 0}
                </p>
                <p className="text-gray-600 text-sm">TikTok</p>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div>
            <h2 className="font-semibold text-lg mb-2">Pricing</h2>
            {influencer.pricing?.length ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {influencer.pricing.map((p: any, i: number) => (
                  <div
                    key={i}
                    className="flex justify-between bg-gray-50 p-3 rounded-lg shadow-sm"
                  >
                    <span className="font-medium capitalize">{p.type || "Service"}</span>
                    <span className="text-blue-600 font-semibold">
                      ${p.price || "—"}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No pricing info available.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
