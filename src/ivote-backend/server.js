import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";

dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
import authRoutes from "./routes/authRoutes.js";
import voteRoutes from "./routes/voteRoutes.js";
import resultRoutes from "./routes/resultRoutes.js";
app.use("/api/auth", authRoutes); // Authentification
app.use("/api/votes", voteRoutes); // Votes
app.use("/api/results", resultRoutes); // Résultats

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});