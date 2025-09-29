import { create } from "zustand";
import { persist } from "zustand/middleware";

type Candidate = {
  id: string;
  name: string;
  votes: number;
  image: string;
};

type VotingState = {
  userName: string;
  setUserName: (name: string) => void;

  candidates: Candidate[];
  totalVoters: number;
  totalVotes: number;
  totalCandidates: number;

  notifications: string[];
  addNotification: (msg: string) => void;

  voteForCandidate: (id: string, voterName?: string) => void;
  addVoter: () => void;
  addCandidate: (candidate: Candidate) => void;
  resetVotes: () => void;
};

export const useVotingStore = create<VotingState>()(
  persist(
    (set) => ({
      notifications: [],
      addNotification: (msg) => set((state) => ({ notifications: [msg, ...state.notifications] })),
      userName: "Juan",
      setUserName: (name) => set({ userName: name }),

      candidates: [
        { id: "c1", name: "Paul Biya (RDPC)", votes: 0, image: "/paul-biya.jpg" },
        { id: "c2", name: "Bello Bouba Maigri (UNDP)", votes: 0, image: "/Bello-Bouba.jpg" },
        { id: "c3", name: "Cabral Libii (PCRN)", votes: 0, image: "/cabral-libii.jpeg" },
        { id: "c4", name: "Joshua Osih (SDF)", votes: 0, image: "/Osih.jpeg" },
        { id: "c5", name: "Akere Muna (Univers)", votes: 0, image: "/akere-muna.jpg" },
        { id: "c6", name: "Serge Espoir Matomba (PURS)", votes: 0, image: "/Serge-Espoir.jpg" },
        { id: "c7", name: "Issa Tchiroma Bakary (FNSC)", votes: 0, image: "/issa.jpg" },
        { id: "c8", name: "Ateki Caxton (PAL)", votes: 0, image: "/ateki.jpg" },
        { id: "c9", name: "Bougha Hagbe (MCNC)", votes: 0, image: "/Bougha.jpg" },
        { id: "c10", name: "Hilaire Dzipan (MP)", votes: 0, image: "/dzipan.jpg" },
        { id: "c11", name: "Hiram Samuel Iyodi (FDC)", votes: 0, image: "/hiram.jpeg" },
        { id: "c12", name: "Pierre Kwemo (UMS)", votes: 0, image: "/pierre.jpeg" },
        { id: "c13", name: "Tomaino Ndam Njoya (UDC)", votes: 0, image: "/tomaino-njoya.jpg" }
      ],
      totalVoters: 0, // départ à zéro
      totalVotes: 0,  // départ à zéro
      totalCandidates: 13,

      // Voter pour un candidat
      voteForCandidate: (id, voterName) =>
        set((state) => {
          const updated = state.candidates.map((c) =>
            c.id === id ? { ...c, votes: c.votes + 1 } : c
          );
          const candidate = state.candidates.find((c) => c.id === id);
          const notification = candidate && voterName
            ? `${voterName} a voté pour le candidat ${candidate.name.split(' (')[0]}`
            : undefined;
          return {
            candidates: updated,
            totalVotes: state.totalVotes + 1,
            notifications: notification ? [notification, ...state.notifications] : state.notifications,
          };
        }),

      // Ajouter un utilisateur (lorsqu’il s’inscrit)
      addVoter: () => set((state) => ({ totalVoters: state.totalVoters + 1 })),

      // Ajouter un nouveau candidat
      addCandidate: (candidate) =>
        set((state) => ({
          candidates: [...state.candidates, candidate],
          totalCandidates: state.totalCandidates + 1,
        })),
      // Remettre tous les votes à zéro
      resetVotes: () => set((state) => ({
        candidates: state.candidates.map((c: Candidate) => ({ ...c, votes: 0 })),
        totalVotes: 0,
      })),
    }),
    {
      name: "voting-store",
      partialize: (state) => ({ candidates: state.candidates, totalVotes: state.totalVotes }),
    }
  )
);
