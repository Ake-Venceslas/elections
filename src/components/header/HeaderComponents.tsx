"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function HeaderComponent() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Contact Us", href: "/contact" },
    { label: "FAQs", href: "/faq" },
  ];

  return (
    <header className="bg-gradient-to-r from-indigo-500 to-blue-500 shadow-lg">
      <div className="container mx-auto flex items-center justify-between py-4 px-6 relative">
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

        {/* Toggle Menu (mobile only) */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-full bg-white text-blue-600 border border-blue-200 shadow focus:outline-none"
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className={`block w-6 h-0.5 bg-blue-600 mb-1 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-blue-600 mb-1 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-blue-600 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>

        {/* Navigation Links - Desktop */}
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
              className={`hover:underline underline-offset-4 ${index === 3 ? "font-semibold" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </motion.nav>

        {/* Navigation Links - Mobile */}
        {menuOpen && (
          <nav className="absolute top-16 left-0 w-full bg-white shadow-lg rounded-b-xl flex flex-col items-center py-4 z-50 md:hidden animate-fade-in">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className={`w-full text-center py-2 text-blue-600 hover:bg-blue-50 ${index === 3 ? "font-semibold" : ""}`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}

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