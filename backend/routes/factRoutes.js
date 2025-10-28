import express from "express";
import { getRandomFact, getFactsByCountry } from "../controllers/factController.js";

const router = express.Router();

// 🧠 Route 1: Get a random fact of the day
router.get("/random", getRandomFact);

// 🌍 Route 2: Get facts based on country name
router.get("/:country", getFactsByCountry);

export default router;
