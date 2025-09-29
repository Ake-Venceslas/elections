"use client";

import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useVotingStore } from "@/store/VotingStore";
import { FaQuestionCircle, FaUserCircle } from "react-icons/fa";
import MainBar from "../bar/MainBar";

// On utilise le type du store

export default function MainNavbar() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);
  const candidates = useVotingStore((state) => state.candidates);
  // Suppression de la logique de notification
  const filteredCandidates = searchQuery.trim() === ""
    ? []
    : candidates.filter((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()));

  // Si un seul candidat trouvé, affichage plein écran
  const voteForCandidate = useVotingStore((state) => state.voteForCandidate);
  if (filteredCandidates.length === 1) {
    const candidate = filteredCandidates[0];
    const match = candidate.name.match(/\(([^)]+)\)/);
    const parti = match ? match[1] : "";
    return (
      <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-[100]">
        <div className="absolute top-6 right-8">
          <button
            aria-label="Fermer"
            className="bg-red-500 hover:bg-red-600 text-white rounded-full w-9 h-9 flex items-center justify-center text-xl shadow-lg"
            onClick={() => setSearchQuery("")}
          >
            &times;
          </button>
        </div>
        <div className="flex flex-col items-center p-8 rounded-xl shadow-lg border border-gray-200 max-w-md w-full">
          <Image src={candidate.image} alt={candidate.name} width={180} height={180} className="rounded-lg object-cover mb-6" />
          <div className="font-bold text-2xl mb-2">{candidate.name.split(" (")[0]}</div>
          <div className="text-gray-600 mb-2">Partis Politique : <span className="font-semibold">{parti}</span></div>
          <div className="text-gray-500 mb-6">Code : <span className="font-semibold">{candidate.id.padEnd(7, "0")}</span></div>
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold mb-2"
            onClick={() => {
              voteForCandidate(candidate.id);
              alert(`Vote soumis pour ${candidate.name.split(' (')[0]}`);
              setSearchQuery("");
            }}
          >
            Voter
          </button>
        </div>
      </div>
    );
  }

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: "🏠" },
    { name: "Vote", path: "/vote", icon: "🗳" },
    { name: "Visitors Guideline", path: "/guide", icon: "📘" },
    { name: "Settings", path: "/params", icon: "⚙" },
  ];

  return (
    <nav className="w-full flex items-center justify-between px-4 py-3 bg-white shadow-sm sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Image src="/Voting.jpg" alt="Logo Voting" width={40} height={40} className="rounded-full object-cover" />
      </div>
      {/* Toggle Menu (mobile only) */}
      <button
        className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-full bg-white text-blue-600 border border-blue-200 shadow focus:outline-none"
        aria-label="Toggle menu"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span className={`block w-6 h-0.5 bg-blue-600 mb-1 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-blue-600 mb-1 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-blue-600 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
      </button>
      {/* Search bar */}
      <div className="relative w-1/3 max-md:w-1/2 max-sm:w-[60%]">
        <input
          type="text"
          placeholder="Search candidates..."
          className="w-full border border-gray-300 rounded-full px-4 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Résultats de recherche */}
        {filteredCandidates.length > 0 && (
          <ul className="absolute top-10 left-0 w-full bg-white border border-gray-200 rounded-lg shadow-md max-h-60 overflow-y-auto z-50">
            {filteredCandidates.map((candidate) => (
              <li
                key={candidate.id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => setSearchQuery(candidate.name)}
              >
                {candidate.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* NavItems sous la barre de recherche (desktop only) */}
      <div className="hidden md:flex gap-4 mt-2">
        {navItems.map((item) => (
          <Link key={item.name} href={item.path} className="flex items-center gap-1 px-3 py-2 rounded-lg text-blue-700 hover:bg-blue-100 font-semibold text-sm">
            <span className="text-lg">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </div>

      {/* Icons + Profile */}
      <div className="flex items-center gap-4">
        <Link href="/guide">
          <button className="text-blue-600 hover:text-blue-800">
            <FaQuestionCircle size={18} />
          </button>
        </Link>
        <div className="flex items-center gap-2">
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
      {/* MainBar overlay for mobile */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-[200] md:hidden" onClick={() => setMenuOpen(false)}>
          <div className="absolute left-0 top-0 h-full w-64 bg-white shadow-lg p-6" onClick={e => e.stopPropagation()}>
            {/* NavItems dans le menu Toggle mobile */}
            <nav className="flex flex-col gap-6 mt-8">
              {navItems.map((item) => (
                <Link key={item.name} href={item.path} className="flex items-center gap-2 px-4 py-3 rounded-lg text-blue-700 hover:bg-blue-100 font-bold text-base">
                  <span className="text-xl">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </nav>
  );
}