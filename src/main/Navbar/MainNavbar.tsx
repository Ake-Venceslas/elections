"use client";

import { useState, useEffect } from "react";
import { FaBell, FaQuestionCircle, FaUserCircle } from "react-icons/fa";

interface Candidate {
  id: number;
  name: string;
}

export default function MainNavbar() {
  const [username, setUsername] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [candidates] = useState<Candidate[]>([
    { id: 1, name: "Juan Perez" },
    { id: 2, name: "Sarah Connor" },
    { id: 3, name: "John Doe" },
    { id: 4, name: "Emma Watson" },
  ]);
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);

  // Simuler récupération du nom utilisateur après login/inscription
  useEffect(() => {
    const storedName = localStorage.getItem("username");
    if (storedName) {
      setUsername(storedName);
    }

    // ---- CLERK ----
    // Ici, tu utiliseras Clerk pour récupérer le nom de l'utilisateur connecté
    // Exemple:
    // import { useUser } from "@clerk/nextjs";
    // const { user } = useUser();
    // setUsername(user?.fullName || user?.username || "");
  }, []);

  // Filtrage dynamique sur recherche
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredCandidates([]);
    } else {
      setFilteredCandidates(
        candidates.filter((c) =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, candidates]);

  return (
    <nav className="w-full flex items-center justify-between px-4 py-3 bg-white shadow-sm sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <span className="bg-blue-500 text-white font-bold px-2 py-1 rounded-full">i</span>
        <span className="text-xl font-bold text-blue-700">VOTE</span>
      </div>

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
              >
                {candidate.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Icons + Profile */}
      <div className="flex items-center gap-4">
        <button className="text-blue-600 hover:text-blue-800">
          <FaBell size={18} />
        </button>
        <button className="text-blue-600 hover:text-blue-800">
          <FaQuestionCircle size={18} />
        </button>
        <div className="flex items-center gap-2">
          <FaUserCircle size={24} className="text-blue-600" />
          <span className="font-medium">
            {username || "Guest"}
          </span>
        </div>
      </div>
    </nav>
  );
}