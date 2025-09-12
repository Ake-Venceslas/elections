import Candidate from "../models/Candidate.js";
import User from "../models/User.js";

// Voter pour un candidat
export const voteForCandidate = async (req, res) => {
  try {
    const { candidateId } = req.body;
    const userId = req.user.id; // injecté par le middleware d’auth JWT

    // Vérifier si l’utilisateur a déjà voté
    const user = await User.findById(userId);
    if (user.hasVoted) {
      return res.status(400).json({ message: "You have already voted!" });
    }

    // Incrémenter les votes du candidat
    const candidate = await Candidate.findById(candidateId);
    if (!candidate) return res.status(404).json({ message: "Candidate not found" });

    candidate.votes += 1;
    await candidate.save();

    // Marquer l’utilisateur comme ayant voté
    user.hasVoted = true;
    await user.save();

    res.json({ message: "Vote successful", candidate });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
