import mongoose from "mongoose";

const voteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  candidateId: { type: mongoose.Schema.Types.ObjectId, ref: "Candidate", required: true },
  year: { type: Number, required: true },
});

// ✅ Empêcher un utilisateur de voter deux fois dans la même année
voteSchema.index({ userId: 1, year: 1 }, { unique: true });

export default mongoose.model("Vote", voteSchema);
