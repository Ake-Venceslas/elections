import Candidate from "../models/Candidate.js";
import Vote from "../models/Vote.js";

// Voter pour un candidat
export const voteForCandidate = async (req, res) => {
  try {
    const { candidateId } = req.body;
    const userId = req.user.id; // injecté par le middleware JWT

    const currentYear = new Date().getFullYear();

    // Vérifier si l’utilisateur a déjà voté dans l’année en cours
    const existingVote = await Vote.findOne({ userId, year: currentYear });
    if (existingVote) {
      return res.status(400).json({ message: "Vous avez déjà voté cette année !" });
    }

    // Vérifier si le candidat existe
    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      return res.status(404).json({ message: "Candidat non trouvé" });
    }

    // Incrémenter les votes du candidat
    candidate.votes += 1;
    await candidate.save();

    // Enregistrer le vote (lié à l’année en cours)
    const vote = new Vote({ userId, candidateId, year: currentYear });
    await vote.save();

    res.json({ message: "Vote enregistré avec succès", candidate });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
