
 "use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
export default function Home() {




  return (
    <div className="flex flex-col items-center justify-center text-center py-32">
      <motion.h1
        className="text-5xl font-bold text-slate-800 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Connect Brands & Influencers Effortlessly 🚀
      </motion.h1>
      <motion.p
        className="text-lg text-slate-600 max-w-xl mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Manage influencer profiles, collaborations, and more — all from one elegant dashboard.
      </motion.p>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
        <Link href="/auth/login">
          <Button className="px-6 py-3 text-lg rounded-xl shadow-lg hover:scale-105 transition-all">
            Get Started
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}

