import express from "express";
import { voteForCandidate } from "../controllers/voteController.js";
import { protect } from "../middleware/authMiddleware.js"; // middleware JWT

const router = express.Router();

router.post("/", protect, voteForCandidate);

export default router;
