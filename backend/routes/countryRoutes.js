import express from "express";
import {
  getCountryInfo,
  getCountryImages,
  saveCountry,
  getSavedCountries,
} from "../controllers/countryController.js";

const router = express.Router();

// Fetch country info from REST Countries
router.get("/:name", getCountryInfo);

// Fetch country images from Unsplash
router.get("/images/:name", getCountryImages);

// Save a country in MongoDB (favorites or caching)
router.post("/", saveCountry);

// Get saved countries (favorites)
router.get("/", getSavedCountries);

export default router;
