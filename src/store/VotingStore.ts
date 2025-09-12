import { create } from "zustand";

type Candidate = {
  id: string;
  name: string;
  votes: number;
};

type VotingState = {
  userName: string;
  setUserName: (name: string) => void;

  candidates: Candidate[];
  totalVoters: number;
  totalVotes: number;
  totalCandidates: number;

  voteForCandidate: (id: string) => void;
  addVoter: () => void;
  addCandidate: (candidate: Candidate) => void;
};

export const useVotingStore = create<VotingState>((set) => ({
  userName: "Juan",
  setUserName: (name) => set({ userName: name }),

  candidates: [
    { id: "c1", name: "Candidate 1", votes: 25 },
    { id: "c2", name: "Candidate 2", votes: 50 },
    { id: "c3", name: "Candidate 3", votes: 78 },
    { id: "c4", name: "Candidate 4", votes: 60 },
    { id: "c5", name: "Candidate 5", votes: 42 },
    { id: "c6", name: "Candidate 6", votes: 36 },
    { id: "c7", name: "Candidate 7", votes: 29 },
    { id: "c8", name: "Candidate 8", votes: 41 },
    { id: "c9", name: "Candidate 9", votes: 53 },
    { id: "c10", name: "Candidate 10", votes: 39 },
    { id: "c11", name: "Candidate 11", votes: 64 },
    { id: "c12", name: "Candidate 12", votes: 21 },
    { id: "c13", name: "Candidate 13", votes: 57 },
  ],
  totalVoters: 362,
  totalVotes: 344,
  totalCandidates: 13,

  voteForCandidate: (id) =>
    set((state) => {
      const updated = state.candidates.map((c) =>
        c.id === id ? { ...c, votes: c.votes + 1 } : c
      );
      return {
        candidates: updated,
        totalVotes: state.totalVotes + 1,
      };
    }),

  addVoter: () =>
    set((state) => ({ totalVoters: state.totalVoters + 1 })),

  addCandidate: (candidate) =>
    set((state) => ({
      candidates: [...state.candidates, candidate],
      totalCandidates: state.totalCandidates + 1,
    })),
}));