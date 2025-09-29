"use client";

import { useVotingStore } from "@/store/VotingStore";
// ...existing code...
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "@clerk/nextjs";

import Image from "next/image";

const CandidateCard = ({ candidate, onVote }: { candidate: { id: string; name: string; image: string; votes: number }, onVote: (id: string) => void }) => {
  const empCode = candidate.id.padEnd(7, "0");
  // Extraction du parti politique entre parenthèses
  const match = candidate.name.match(/\(([^)]+)\)/);
  const parti = match ? match[1] : "";
  return (
    <div style={{
      display: "flex",
      background: "#fff",
      borderRadius: 16,
      boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
      overflow: "hidden",
      margin: "18px 0",
      maxWidth: 420,
      minHeight: 140,
      border: "1px solid #ececec"
    }}>
      <div style={{ width: 140, height: "100%", position: "relative" }}>
        <Image src={candidate.image} alt={candidate.name} width={140} height={140} style={{ objectFit: "cover", height: "100%", width: "100%" }} />
      </div>
      <div style={{ flex: 1, padding: "18px 22px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ fontWeight: 700, fontSize: 20, color: "#222", marginBottom: 6 }}>{candidate.name.split(" (")[0]}</div>
        <div style={{ fontSize: 15, color: "#555", marginBottom: 2 }}>Candidate Code : <span style={{ fontWeight: 500 }}>{empCode}</span></div>
        <div style={{ fontSize: 15, color: "#555", marginBottom: 18 }}>Partis Politique : <span style={{ fontWeight: 500 }}>{parti}</span></div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            onClick={() => onVote(candidate.id)}
            style={{
              padding: "8px 32px",
              background: "#1976d2",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontWeight: 600,
              fontSize: 15,
              cursor: "pointer",
              boxShadow: "0 2px 6px rgba(25,118,210,0.08)"
            }}
          >
            Voter
          </button>
        </div>
      </div>
    </div>
  );
};

const MainVote = () => {
  const { candidates, voteForCandidate } = useVotingStore();
  const { user } = useUser();
  const handleVote = (candidateId: string) => {
    const voterName = user?.firstName || user?.username || "Utilisateur";
    const candidate = candidates.find(c => c.id === candidateId);
    voteForCandidate(candidateId, voterName);
    toast.success(`${voterName} a voté pour le candidat ${candidate?.name.split(' (')[0]}`);
  };
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 0" }}>
      <ToastContainer position="top-right" autoClose={4000} hideProgressBar={false} newestOnTop closeOnClick pauseOnHover theme="colored" />
      <div style={{ marginBottom: 32, textAlign: "left" }}>
        <button
          onClick={() => window.location.href = "/mainpage"}
          style={{
            padding: "8px 24px",
            background: "#e0e0e0",
            color: "#222",
            border: "none",
            borderRadius: 8,
            fontWeight: 600,
            fontSize: 16,
            cursor: "pointer",
            marginBottom: 16
          }}
        >
          Return
        </button>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 32, justifyContent: "center" }}>
        {candidates.map((candidate) => (
          <CandidateCard key={candidate.id} candidate={candidate} onVote={handleVote} />
        ))}
      </div>
    </div>
  );
};

export default MainVote;