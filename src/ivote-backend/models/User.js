import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // hasVoted: { type: Boolean, default: false }, // supprimé, la vérification se fait via Vote.js
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);