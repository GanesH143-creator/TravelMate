import axios from "axios";

export const fetchUnsplashImages = async (req, res) => {
  try {
    const query = req.query.query;
    const { data } = await axios.get(
      `https://api.unsplash.com/search/photos?query=${query}&client_id=${process.env.UNSPLASH_API_KEY}`
    );
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Unsplash proxy error", error });
  }
};

export const fetchWeatherData = async (req, res) => {
  try {
    const city = req.query.city;
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`
    );
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Weather proxy error", error });
  }
};

export const fetchFactData = async (req, res) => {
  try {
    const country = req.query.country;
    const { data } = await axios.get(
      `https://api.api-ninjas.com/v1/facts?limit=1&country=${country}`,
      {
        headers: { "X-Api-Key": process.env.FACTS_API_KEY },
      }
    );
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Facts proxy error", error });
  }
};
