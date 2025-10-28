import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import countryRoutes from "./routes/countryRoutes.js"; 
import authRoutes from "./routes/authRoutes.js";
import proxyRoutes from "./routes/proxyRoutes.js";
import factRoutes from "./routes/factRoutes.js";

app.use("/api/facts", factRoutes);

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("🌍 TravelMate Backend Running..."));

app.use("/api/auth", authRoutes);
app.use("/api/proxy", proxyRoutes);
app.use("/api/facts", factRoutes);
app.use("/api/countries", countryRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


