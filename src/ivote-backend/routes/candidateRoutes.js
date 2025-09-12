import express from "express";
import { addCandidate, getCandidates } from "../controllers/candidateController.js";

const router = express.Router();

router.post("/", addCandidate);
router.get("/", getCandidates);

export default router;
