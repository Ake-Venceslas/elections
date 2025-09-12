import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

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
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/votes", require("./routes/voteRoutes"));
app.use("/api/results", require("./routes/resultRoutes")); // <-- On doit créer ce fichier
app.use(express.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
