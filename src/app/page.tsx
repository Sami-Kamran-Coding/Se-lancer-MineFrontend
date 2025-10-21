


// "use client";
// import Link from "next/link";
// import React from "react";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input";
// // import { Grid } from "@/components/ui/grid";
// import { Search } from "lucide-react";
// import {
//   Globe,
//   Users,
//   CheckCircle,
//   MessageCircle,
//   Award,
//   Sparkles,
//   PlusCircle,
// } from "lucide-react";
// import { motion } from "framer-motion";


// export default function Page() {
//   return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-100 via-indigo-50 to-indigo-200 text-slate-900">
//       {/* HERO */}
//       <header className="relative h-[100vh] flex items-center justify-center overflow-hidden">
//         <Image
//           src="/images/image1.jpg"
//           alt="Hero Background"
//           fill
//           priority
//           className="object-cover brightness-90"
//         />
//         <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent"></div>

//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="relative z-10 text-center text-white px-4 sm:px-6 max-w-3xl"
//         ><div>

//           <h1 className="text-2xl sm:text-6xl font-extrabold leading-tight drop-shadow-lg">
//             Connect Brands with Real Influencers
//           </h1>
//           <p className="mt-5 text-base text-lg md:text-xl text-gray-200">
//             Verified, transparent, and seamless collaborations across Instagram,
//             YouTube, TikTok, and more.
//           </p>

//           <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
//             <Link href="/auth/login">
//               <Button className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg px-8 py-5 rounded-lg shadow-lg">
//                 Join as Influencer
//               </Button>
//             </Link>
//             <Link href="/auth/login">
//               <Button
//                 variant="outline"
//                 className="bg-white/10 hover:bg-white/20 border border-white text-white text-lg px-8 py-5 rounded-lg"
//                 >
//                 Find Influencers
//               </Button>
//             </Link>
//           </div>
//                 </div>

//           <div className="mt-8 flex justify-center gap-6 flex-wrap text-sm text-gray-300">
//             <div className="inline-flex items-center gap-2">
//               <CheckCircle className="w-5 h-5 text-emerald-400" /> Verified
//               profiles
//             </div>
//             <div className="inline-flex items-center gap-2">
//               <Users className="w-5 h-5 text-indigo-400" /> Trusted community
//             </div>
//             <div className="inline-flex items-center gap-2">
//               <Globe className="w-5 h-5 text-sky-400" /> Multi-platform reach
//             </div>
//           </div>
//         </motion.div>
//       </header>

//       {/* PROBLEM SECTION */}
//       <section className="max-w-6xl mx-auto px-6 lg:px-8 py-20">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
//           <div>
//             <h2 className="text-3xl font-bold text-slate-900">
//               The Problem with Today’s Influencer Marketing
//             </h2>
//             <p className="mt-4 text-slate-600 leading-relaxed">
//               Brands face opaque metrics, fake followers, and fragmented creator
//               discovery. Collaboration workflows are manual and untraceable.
//             </p>
// <div className="grid grid-cols-1 md:grid-cols-2">

//             <ul className="mt-6 space-y-4 text-slate-700">
//               {[
//                 {
//                   icon: <Sparkles className="w-5 h-5" />,
//                   title: "Fake followers & unreliable stats",
//                   desc: "Hard to trust reach and engagement numbers across platforms.",
//                 },
//                 {
//                   icon: <Globe className="w-5 h-5" />,
//                   title: "No single verified directory",
//                   desc: "Creators are scattered across platforms with no central source of truth.",
//                 },
//                 {
//                   icon: <MessageCircle className="w-5 h-5" />,
//                   title: "Complicated collaboration process",
//                   desc: "Negotiations and content approvals take too long and lack transparency.",
//                 },
//               ].map((item, i) => (
//                 <li key={i} className="flex items-start gap-3">
//                   <span className="mt-0.5 text-indigo-600">{item.icon}</span>
//                   <div>
//                     <div className="font-semibold">{item.title}</div>
//                     <div className="text-sm text-slate-500">{item.desc}</div>
//                   </div>
//                 </li>
//               ))}
//             </ul>
// </div>

//           </div>

//           <div className="flex justify-center">
//             <div className="grid grid-cols-2 gap-4">
//               {["Verified", "Transparent", "Seamless", "Secure"].map(
//                 (text, i) => (
//                   <div
//                     key={i}
//                     className="w-40 h-40 sm:w-44 sm:h-44 rounded-xl bg-gradient-to-br from-indigo-600 to-teal-400 shadow-lg flex items-center justify-center text-white font-semibold text-center text-sm sm:text-base"
//                   >
//                     {text}
//                   </div>
//                 )
//               )}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* SOLUTION SECTION */}
//       <section className="bg-white/70 py-20 backdrop-blur-sm">
//         <div className="max-w-6xl mx-auto px-6 lg:px-8">
//           <h2 className="text-3xl font-bold text-center text-slate-900">
//             Our Solution
//           </h2>
//           <p className="text-center text-slate-600 mt-3">
//             A marketplace built for trust — verified profiles, transparent
//             metrics, and native collaboration tools.
//           </p>

//           <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[
//               {
//                 icon: (
//                   <CheckCircle className="w-8 h-8 text-emerald-500 shrink-0" />
//                 ),
//                 title: "Verified Profiles",
//                 desc: "Profiles validated through platform checks and manual review.",
//               },
//               {
//                 icon: <Globe className="w-8 h-8 text-sky-500 shrink-0" />,
//                 title: "Transparent Data",
//                 desc: "Unified metrics across platforms with clear engagement numbers.",
//               },
//               {
//                 icon: (
//                   <MessageCircle className="w-8 h-8 text-indigo-500 shrink-0" />
//                 ),
//                 title: "Seamless Collaboration",
//                 desc: "Built-in requests, messaging, approvals, and payments.",
//               },
//             ].map((card, i) => (
//               <Card
//                 key={i}
//                 className="rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
//               >
//                 <CardContent className="p-6 flex items-start gap-4">
//                   {card.icon}
//                   <div>
//                     <h3 className="font-semibold text-slate-900">
//                       {card.title}
//                     </h3>
//                     <p className="text-sm text-slate-500 mt-1">{card.desc}</p>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* HOW IT WORKS */}
//       <section className="max-w-6xl mx-auto px-6 lg:px-8 py-20">
//         <h2 className="text-3xl font-bold text-center">How It Works</h2>
//         <p className="text-center text-slate-600 mt-3">
//           Start collaborating in three simple steps.
//         </p>

//         <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
//           {[
//             {
//               icon: <PlusCircle className="w-8 h-8 text-indigo-500" />,
//               title: "Create Profile",
//               desc: "Influencers add their bio, platforms, and pricing.",
//             },
//             {
//               icon: <Search className="w-8 h-8 text-indigo-500" />,
//               title: "Search & Filter",
//               desc: "Brands find creators by niche, followers, and platform metrics.",
//             },
//             {
//               icon: <Award className="w-8 h-8 text-indigo-500" />,
//               title: "Collaborate",
//               desc: "Request collaborations, approve content, and pay securely.",
//             },
//           ].map((step, i) => (
//             <div
//               key={i}
//               className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition duration-300"
//             >
//               <div className="flex items-center gap-3">
//                 {step.icon}
//                 <div>
//                   <h3 className="font-semibold text-slate-900">{step.title}</h3>
//                   <p className="text-sm text-slate-500 mt-1">{step.desc}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* CTA */}
//       <section className="max-w-6xl mx-auto px-6 lg:px-8 py-20">
//         <div className="rounded-3xl bg-gradient-to-r from-indigo-600 to-teal-500 p-10 text-white shadow-2xl">
//           <div className="flex flex-col md:flex-row items-center justify-between gap-6">
//             <div>
//               <h3 className="text-2xl font-bold">
//                 Join the Future of Influencer Marketing
//               </h3>
//               <p className="mt-2 text-slate-100 max-w-md">
//                 Start discovering verified creators and run collaboration
//                 campaigns that truly deliver.
//               </p>
//             </div>
//             <div className="flex gap-3">
//               <Button className="bg-white text-indigo-600 hover:bg-slate-100">
//                 Get Started
//               </Button>
//               <Button
//                 variant="ghost"
//                 className="text-white hover:bg-white/20 border border-white"
//               >
//                 Explore Now
//               </Button>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Users,
  Globe,
  Sparkles,
  MessageCircle,
  PlusCircle,
  Search,
  Award,
  Lock,
  Workflow,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-indigo-50 to-indigo-200 text-slate-900 overflow-x-hidden">
      {/* ================= HERO ================= */}
        <header className="relative h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/image1.jpg"
          alt="Hero Background"
          fill
          priority
          className="object-cover brightness-90"
        />
      </div>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex mt-10 flex-col items-center text-center text-white px-4 sm:px-8 md:px-12 max-w-4xl"
      >
        {/* Headline */}
        <h1 className="text-3xl mt-3 sm:text-4xl md:text-5xl lg:text-6xl  font-extrabold leading-tight drop-shadow-xl">
          Connect Brands with <br className="hidden xs:block" /> Real Influencers
        </h1>

        {/* Description */}
        <p className="mt-2 text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 leading-relaxed max-w-2xl">
          Verified, transparent, and seamless collaborations across Instagram,
          YouTube, TikTok, and more.
        </p>

        {/* Buttons */}
        <div className="mt-3 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 w-full sm:w-auto">
          <Link href="/auth/login" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
              Join as Influencer
            </Button>
          </Link>

          <Link href="/auth/login" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border border-white text-white text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-all duration-300"
            >
              Find Influencers
            </Button>
          </Link>
        </div>

        {/* Feature Highlights */}
        <div className="mt-4 flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm md:text-base text-gray-300">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-emerald-400" />
            Verified profiles
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 sm:w-5 h-4 sm:h-5 text-indigo-400" />
            Trusted community
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-4 sm:w-5 h-4 sm:h-5 text-sky-400" />
            Multi-platform reach
          </div>
        </div>
      </motion.div>
    </header>

      {/* ================= PROBLEM SECTION ================= */}
   <section className="max-w-6xl mx-auto px-6 lg:px-8 py-20">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
      >
        {/* Left Content */}
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
            The Problem with Today’s Influencer Marketing
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed text-base sm:text-lg">
            Brands face opaque metrics, fake followers, and fragmented creator discovery. Collaboration workflows are manual and untraceable.
          </p>

          <ul className="mt-6 space-y-5 text-slate-700">
            {[
              {
                icon: <Sparkles className="w-5 h-5 text-indigo-500" />,
                title: "Fake followers & unreliable stats",
                desc: "Hard to trust reach and engagement numbers across platforms.",
              },
              {
                icon: <Globe className="w-5 h-5 text-indigo-500" />,
                title: "No single verified directory",
                desc: "Creators are scattered across platforms with no central source of truth.",
              },
              {
                icon: <MessageCircle className="w-5 h-5 text-indigo-500" />,
                title: "Complicated collaboration process",
                desc: "Negotiations and approvals take too long and lack transparency.",
              },
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1">{item.icon}</span>
                <div>
                  <div className="font-semibold">{item.title}</div>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Content – Clean White Cards with Icons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8">
            {[
              {
                icon: <CheckCircle2 className="w-8 h-8 text-indigo-600 mb-3" />,
                title: "Verified",
                desc: "Authentic influencers you can trust.",
              },
              {
                icon: <ShieldCheck className="w-8 h-8 text-green-600 mb-3" />,
                title: "Transparent",
                desc: "Clear insights and genuine engagement.",
              },
              {
                icon: <Workflow className="w-8 h-8 text-blue-600 mb-3" />,
                title: "Seamless",
                desc: "Smooth workflow between brands and creators.",
              },
              {
                icon: <Lock className="w-8 h-8 text-purple-600 mb-3" />,
                title: "Secure",
                desc: "Data protection and safe transactions.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="w-60 h-60 sm:w-52 sm:h-52 rounded-2xl bg-white border border-gray-200 shadow-lg flex flex-col items-center justify-center text-center p-5 transition-all duration-300"
              >
                {item.icon}
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>


      {/* ================= SOLUTION SECTION ================= */}
      <section className="bg-white/70 py-20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-slate-900"
          >
            Our Solution
          </motion.h2>
          <p className="text-slate-600 mt-3 text-base sm:text-lg max-w-2xl mx-auto">
            A marketplace built for trust — verified profiles, transparent metrics,
            and native collaboration tools.
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <CheckCircle className="w-10 h-10 text-emerald-500" />,
                title: "Verified Profiles",
                desc: "Profiles validated through platform checks and manual review.",
              },
              {
                icon: <Globe className="w-10 h-10 text-sky-500" />,
                title: "Transparent Data",
                desc: "Unified metrics across platforms with clear engagement numbers.",
              },
              {
                icon: <MessageCircle className="w-10 h-10 text-indigo-500" />,
                title: "Seamless Collaboration",
                desc: "Built-in requests, messaging, approvals, and payments.",
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-none bg-white/90">
                  <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                    {card.icon}
                    <h3 className="font-semibold text-slate-900 text-lg">{card.title}</h3>
                    <p className="text-sm text-slate-500">{card.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 py-20">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-center text-slate-900"
        >
          How It Works
        </motion.h2>
        <p className="text-center text-slate-600 mt-3">
          Start collaborating in three simple steps.
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <PlusCircle className="w-10 h-10 text-indigo-500" />,
              title: "Create Profile",
              desc: "Influencers add their bio, platforms, and pricing.",
            },
            {
              icon: <Search className="w-10 h-10 text-indigo-500" />,
              title: "Search & Filter",
              desc: "Brands find creators by niche, followers, and platform metrics.",
            },
            {
              icon: <Award className="w-10 h-10 text-indigo-500" />,
              title: "Collaborate",
              desc: "Request collaborations, approve content, and pay securely.",
            },
          ].map((step, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="p-6 bg-white/90 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center"
            >
              <div className="flex flex-col items-center gap-3">
                {step.icon}
                <h3 className="font-semibold text-slate-900 text-lg">{step.title}</h3>
                <p className="text-sm text-slate-500">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-gradient-to-r from-indigo-600 to-teal-500 p-10 text-white shadow-2xl text-center md:text-left"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold">
                Join the Future of Influencer Marketing
              </h3>
              <p className="mt-3 text-slate-100 max-w-md">
                Start discovering verified creators and run collaboration
                campaigns that truly deliver.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-white text-indigo-600 hover:bg-slate-100 text-base px-8 py-4 rounded-xl font-semibold">
                Get Started
              </Button>
              <Button
                variant="ghost"
                className="text-white hover:bg-white/20 border border-white text-base px-8 py-4 rounded-xl"
              >
                Explore Now
              </Button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
