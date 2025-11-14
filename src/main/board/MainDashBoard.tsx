"use client";

import { useEffect, useState } from "react";
import { useVotingStore } from "@/store/VotingStore";
import { useUser } from "@clerk/nextjs";
import dayjs from "dayjs";

// ---------------------
// Composant TopCandidates intégré
// ---------------------
type LocalCandidate = {
  id: string;
  name: string;
  votes: number;
  image?: string;
  percent?: number;
};

const TopCandidates = ({ candidates }: { candidates: LocalCandidate[] }) => {
  // Calcul automatique des pourcentages en fonction du total de votes
  const totalVotes = candidates.reduce((sum, c) => sum + c.votes, 0);

  // Trie par nombre de votes décroissant et garde les 5 premiers
  const top5 = [...candidates]
    .sort((a, b) => b.votes - a.votes)
    .slice(0, 5)
    .map((c) => ({
      ...c,
      percent: totalVotes ? Math.round((c.votes / totalVotes) * 100) : 0,
    }));

  // Palette de couleurs stylée pour chaque barre
  const colors = ["bg-teal-500", "bg-sky-400", "bg-violet-500", "bg-pink-500", "bg-orange-500"];

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-xl shadow-lg">
      <h2 className="text-center text-lg font-semibold mb-4">🏆 Classement des candidats</h2>

      {top5.map((c, i) => (
        <div key={i} className="flex items-center mb-4">
          {/* Photo du candidat */}
          <img
            src={c.image || "/default-avatar.png"}
            alt={c.name}
            className={`w-10 h-10 rounded-full object-cover border-2 ${
              i === 0 ? "border-yellow-400 shadow-[0_0_8px_gold]" : "border-gray-200"
            } mr-3`}
          />

          {/* Barre de progression */}
          <div className="flex-1">
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium">{c.name}</span>
              <span className="font-semibold text-gray-700">{c.percent}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className={`${colors[i % colors.length]} h-4 transition-all duration-700 ease-out`}
                style={{ width: `${c.percent}%` }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// ---------------------
// MainDashboard principal
// ---------------------
const MainDashboard = () => {
  const { user } = useUser();
  const [currentDate, setCurrentDate] = useState(dayjs());
  const { candidates, totalVotes, totalCandidates } = useVotingStore();

  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(dayjs()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Bouton retour */}
        <div className="mb-6 text-left flex gap-4">
          <button
            onClick={() => (window.location.href = "/mainpage")}
            className="px-5 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold text-base hover:bg-gray-300 transition"
          >
            Return
          </button>
        </div>

        {/* Message de bienvenue */}
        <h1 className="text-2xl font-bold">
          Hello,{" "}
          <span className="text-green-600">{user?.firstName || user?.username || "Utilisateur"}</span>!
        </h1>
        <p className="text-gray-600">Welcome to MboaVote Online Voting System</p>

        {/* Calendrier */}
        <div className="bg-white shadow p-4 rounded-lg w-fit">
          <h2 className="font-semibold mb-2">Calendar</h2>
          <p className="text-lg font-bold">{currentDate.format("MMMM DD, YYYY")}</p>
        </div>

        {/* Classement des candidats (remplace le Bar Chart) */}
        <TopCandidates candidates={candidates} />

        {/* Informations globales */}
        <div className="bg-white shadow p-4 rounded-lg space-y-4">
          <div className="text-center">
            <p className="text-2xl font-bold">{totalVotes}</p>
            <p className="text-gray-500">Total number of votes</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{totalCandidates}</p>
            <p className="text-gray-500">Total number of registered candidates</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainDashboard;
