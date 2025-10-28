import Fact from "../models/factModel.js";
import axios from "axios";

// ✅ Get all stored facts from MongoDB
export const getAllFacts = async (req, res) => {
  try {
    const facts = await Fact.find().limit(10);
    res.json(facts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching facts", error });
  }
};

// ✅ Get random fact from external API (API Ninjas)
export const getRandomFact = async (req, res) => {
  try {
    const country = req.query.country || "World";
    const { data } = await axios.get(`https://api.api-ninjas.com/v1/facts`, {
      headers: { "X-Api-Key": process.env.FACTS_API_KEY },
    });

    // You can enhance this: filter by country if available
    res.json({ country, fact: data[0]?.fact || "No fact found." });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error fetching fact", error });
  }
};

// ✅ Add a new fact (admin or internal use)
export const addFact = async (req, res) => {
  try {
    const { country, fact, image_url, tags } = req.body;

    if (!country || !fact)
      return res.status(400).json({ message: "Country and fact are required" });

    const newFact = await Fact.create({
      country,
      fact,
      image_url,
      tags,
    });

    res.status(201).json(newFact);
  } catch (error) {
    res.status(500).json({ message: "Error adding fact", error });
  }
};

// ✅ Get fact by country name
export const getFactByCountry = async (req, res) => {
  try {
    const { country } = req.params;
    const fact = await Fact.findOne({ country });

    if (!fact) {
      return res.status(404).json({ message: "Fact not found for this country" });
    }

    res.json(fact);
  } catch (error) {
    res.status(500).json({ message: "Error fetching fact", error });
  }
};
