"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export const Header = () => (
  <motion.header
    initial={{ y: -50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    className="py-4 px-8 flex justify-between items-center shadow bg-white/70 backdrop-blur-md fixed top-0 left-0 w-full z-50"
  >
    <Link href="/" className="text-xl font-semibold text-slate-800">InfluenceHub</Link>
    <nav className="flex gap-4">
      <Link href="/auth/login" className="hover:text-blue-600">Login</Link>
      <Link href="/auth/register" className="hover:text-blue-600">Register</Link>
    </nav>
  </motion.header>
);
