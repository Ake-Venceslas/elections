"use client";

import { useVotingStore } from "@/store/VotingStore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";

import Image from "next/image";

const CandidateCard = ({ candidate, onVote, isSignedIn, hasVoted, votedCandidateId }: { candidate: { id: string; name: string; image: string; votes: number }, onVote: (id: string) => void, isSignedIn: boolean, hasVoted: boolean, votedCandidateId: string | null }) => {
  const empCode = candidate.id.padEnd(7, "0");
  // Extraction du parti politique entre parenthèses
  const match = candidate.name.match(/\(([^)]+)\)/);
  const parti = match ? match[1] : "";
  const voted = hasVoted && votedCandidateId === candidate.id;
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
            onClick={() => isSignedIn && !hasVoted && onVote(candidate.id)}
            style={{
              padding: "8px 32px",
              background: voted ? "#43a047" : isSignedIn && !hasVoted ? "#1976d2" : "#ccc",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontWeight: 600,
              fontSize: 15,
              cursor: isSignedIn && !hasVoted ? "pointer" : "not-allowed",
              boxShadow: "0 2px 6px rgba(25,118,210,0.08)"
            }}
            disabled={!isSignedIn || hasVoted}
          >
            {voted ? "Merci pour votre vote" : isSignedIn && !hasVoted ? "Voter" : "Connectez-vous pour voter"}
          </button>
        </div>
      </div>
    </div>
  );
};

const MainVote = () => {
  const { candidates, voteForCandidate } = useVotingStore();
  const { user } = useUser();
  const isSignedIn = !!user;
  // Stocker si l'utilisateur a déjà voté pour un candidat (persisté par user.id)
  const [hasVoted, setHasVoted] = useState(false);
  const [votedCandidateId, setVotedCandidateId] = useState<string | null>(null);

  // Vérifier dans localStorage si l'utilisateur a déjà voté (persistant par user.id)
  useEffect(() => {
    if (user) {
      const voted = localStorage.getItem(`voted_${user.id}`);
      if (voted) {
        setHasVoted(true);
        setVotedCandidateId(voted);
      }
    }
  }, [user]);

  const handleVote = (candidateId: string) => {
    if (!isSignedIn) return;
    if (hasVoted) {
      toast.error("Vous avez déjà voté pour un candidat !");
      return;
    }
    voteForCandidate(candidateId);
    setHasVoted(true);
    setVotedCandidateId(candidateId);
    localStorage.setItem(`voted_${user.id}`, candidateId);
    toast.success("Vote soumis avec succès !");
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 0" }}>
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
          <CandidateCard
            key={candidate.id}
            candidate={candidate}
            onVote={handleVote}
            isSignedIn={isSignedIn && !hasVoted}
            hasVoted={hasVoted}
            votedCandidateId={votedCandidateId}
          />
        ))}
      </div>
      {hasVoted && votedCandidateId && (
        <div style={{ marginTop: 24, textAlign: "center", color: "#1976d2", fontWeight: 600 }}>
          Merci pour votre vote ! Vous avez voté pour : {candidates.find(c => c.id === votedCandidateId)?.name.split(" (")[0]}
        </div>
      )}
      <ToastContainer position="top-right" autoClose={4000} hideProgressBar={false} newestOnTop closeOnClick pauseOnHover theme="colored" />
    </div>
  );
};

export default MainVote;