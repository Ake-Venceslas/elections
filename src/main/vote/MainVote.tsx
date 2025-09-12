"use client";

import { useVotingStore } from "@/store/votingStore";

const MainVote = () => {
  const { candidates, voteForCandidate } = useVotingStore();

  const handleVote = (candidateId: string) => {
  voteForCandidate(candidateId);
  alert('Vote submitted for ${candidateId}');
};

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold mb-4">Vote for Your Candidate</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {candidates.map((candidate) => (
          <div
            key={candidate.id}
            className="bg-white shadow rounded-lg p-4 flex flex-col items-center"
          >
            <h2 className="font-semibold">{candidate.name}</h2>
            <p className="text-gray-500">{candidate.votes} votes</p>
            <button
              onClick={() => handleVote(candidate.id)}
              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Vote
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainVote;