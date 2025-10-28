import express from "express";
import {
  fetchUnsplashImages,
  fetchWeatherData,
  fetchFactData,
} from "../controllers/proxyController.js";

const router = express.Router();

router.get("/images", fetchUnsplashImages);
router.get("/weather", fetchWeatherData);
router.get("/facts", fetchFactData);

export default router;
