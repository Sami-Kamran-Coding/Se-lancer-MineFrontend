
 "use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Search, Camera, Users, Briefcase, Globe, Megaphone, Heart } from "lucide-react";
import { categories } from "./influencer/create/page";

export default function Home() {




  return (
     <section
        className="relative flex flex-col items-center justify-center text-center h-[90vh] bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        <div className="relative z-10 px-6">
          <motion.h1
            className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Connect Brands & Influencers Effortlessly 🚀
          </motion.h1>

          <motion.p
            className="text-lg text-slate-100 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Collaborate smarter. Grow faster. Manage all your influencer campaigns in one place.
          </motion.p>

          {/* 🔍 Search Bar */}
          <motion.div
            className="flex w-full max-w-lg mx-auto bg-white/90 backdrop-blur-lg p-2 rounded-full shadow-md"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Input
              placeholder="Search influencers, categories, or brands..."
              className="flex-1 border-none bg-transparent focus-visible:ring-0"
            />
            <Button className="rounded-full bg-indigo-600 hover:bg-indigo-700">
              <Search className="w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

    

  );
}

