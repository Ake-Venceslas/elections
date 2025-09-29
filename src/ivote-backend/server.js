const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes")); // Authentification
app.use("/api/votes", require("./routes/voteRoutes")); // Votes
app.use("/api/results", require("./routes/resultRoutes")); // Résultats

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(🚀 Server running on http://localhost:${PORT});
});