import axios from "axios";

// ✅ Get all countries
export const getAllCountries = async (req, res) => {
  try {
    const { data } = await axios.get("https://restcountries.com/v3.1/all");
    res.json(data);
  } catch (error) {
    console.error("Error fetching countries:", error.message);
    res.status(500).json({ message: "Failed to fetch countries" });
  }
};

// ✅ Get details of a specific country by name
export const getCountryByName = async (req, res) => {
  try {
    const { name } = req.params;
    const { data } = await axios.get(`https://restcountries.com/v3.1/name/${name}`);
    res.json(data[0]);
  } catch (error) {
    console.error("Error fetching country:", error.message);
    res.status(404).json({ message: "Country not found" });
  }
};
