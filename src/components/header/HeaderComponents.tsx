"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HeaderComponent() {
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Contact Us", href: "/contact" },
    { label: "FAQs", href: "/faq" },
  ];

  return (
    <header className="bg-gradient-to-r from-indigo-500 to-blue-500 shadow-lg">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-white font-bold text-xl flex items-center gap-2"
        >
            <img
                src="/Voting.jpg"
                alt="Logo"
                className="w-8 h-8 rounded-full"
            />
        </motion.div>

        {/* Navigation Links */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="hidden md:flex gap-8 text-white"
        >
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className={`hover:underline underline-offset-4 ${
                index === 3 ? "font-semibold" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </motion.nav>

        {/* Auth Buttons */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex gap-3"
        >
          <Link
            href="/login"
            className="px-4 py-1 border border-white text-white rounded-full hover:bg-white hover:text-blue-600 transition"
          >
            Log in
          </Link>
          <Link
            href="/register"
            className="px-4 py-1 bg-white text-blue-600 rounded-full hover:bg-blue-100 transition"
          >
            Register
          </Link>
        </motion.div>
      </div>

      {/* Curved Bottom */}
      <div className="bg-white h-6 -mt-4 rounded-t-[50%]"></div>
    </header>
  );
}