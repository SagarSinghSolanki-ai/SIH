// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve frontend (index.html, style.css, script.js, chat-client.js in /public)
app.use(express.static(path.join(__dirname, "public")));

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// In-memory chat sessions
const sessions = {};

// Function to call Gemini
async function callGemini(messages) {
  try {
    const prompt = messages.map(m => `${m.role}: ${m.content}`).join("\n");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (err) {
    console.error("Gemini API error:", err);
    return "⚠ Sorry, Gemini service is not available right now.";
  }
}

// Weather API endpoint
app.get("/api/weather", async (req, res) => {
  try {
    const { lat, lon, city } = req.query;
    
    if (!process.env.WEATHER_API_KEY) {
      return res.status(500).json({ 
        error: "Weather API key not configured. Please add WEATHER_API_KEY to your .env file" 
      });
    }

    let weatherUrl;
    
    if (lat && lon) {
      // Use coordinates
      weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}&units=metric`;
    } else if (city) {
      // Use city name
      weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${process.env.WEATHER_API_KEY}&units=metric`;
    } else {
      return res.status(400).json({ 
        error: "Please provide either 'lat' and 'lon' coordinates or 'city' name" 
      });
    }

    const response = await axios.get(weatherUrl);
    const weatherData = response.data;

    // Format weather data for agricultural use
    const formattedWeather = {
      location: weatherData.name + ", " + weatherData.sys.country,
      temperature: {
        current: Math.round(weatherData.main.temp),
        feelsLike: Math.round(weatherData.main.feels_like),
        min: Math.round(weatherData.main.temp_min),
        max: Math.round(weatherData.main.temp_max)
      },
      humidity: weatherData.main.humidity,
      pressure: weatherData.main.pressure,
      wind: {
        speed: weatherData.wind.speed,
        direction: weatherData.wind.deg
      },
      weather: {
        main: weatherData.weather[0].main,
        description: weatherData.weather[0].description,
        icon: weatherData.weather[0].icon
      },
      visibility: weatherData.visibility / 1000, // Convert to km
      uvIndex: weatherData.uvi || "N/A",
      agriculturalAdvice: getAgriculturalAdvice(weatherData)
    };

    res.json(formattedWeather);
  } catch (err) {
    console.error("Weather API error:", err);
    if (err.response?.status === 404) {
      res.status(404).json({ error: "City not found. Please check the city name." });
    } else if (err.response?.status === 401) {
      res.status(401).json({ error: "Invalid API key. Please check your weather API key." });
    } else {
      res.status(500).json({ error: "Weather service unavailable", details: err.message });
    }
  }
});

// Weather forecast endpoint (5-day forecast)
app.get("/api/weather/forecast", async (req, res) => {
  try {
    const { lat, lon, city } = req.query;
    
    if (!process.env.WEATHER_API_KEY) {
      return res.status(500).json({ 
        error: "Weather API key not configured. Please add WEATHER_API_KEY to your .env file" 
      });
    }

    let weatherUrl;
    
    if (lat && lon) {
      weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}&units=metric`;
    } else if (city) {
      weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${process.env.WEATHER_API_KEY}&units=metric`;
    } else {
      return res.status(400).json({ 
        error: "Please provide either 'lat' and 'lon' coordinates or 'city' name" 
      });
    }

    const response = await axios.get(weatherUrl);
    const forecastData = response.data;

    // Group forecast by day
    const dailyForecast = {};
    forecastData.list.forEach(item => {
      const date = new Date(item.dt * 1000).toDateString();
      if (!dailyForecast[date]) {
        dailyForecast[date] = {
          date: date,
          temps: [],
          weather: [],
          humidity: [],
          wind: []
        };
      }
      dailyForecast[date].temps.push(item.main.temp);
      dailyForecast[date].weather.push(item.weather[0]);
      dailyForecast[date].humidity.push(item.main.humidity);
      dailyForecast[date].wind.push(item.wind.speed);
    });

    // Calculate daily averages and extremes
    const formattedForecast = Object.values(dailyForecast).map(day => ({
      date: day.date,
      temperature: {
        min: Math.round(Math.min(...day.temps)),
        max: Math.round(Math.max(...day.temps)),
        avg: Math.round(day.temps.reduce((a, b) => a + b, 0) / day.temps.length)
      },
      humidity: Math.round(day.humidity.reduce((a, b) => a + b, 0) / day.humidity.length),
      windSpeed: Math.round(day.wind.reduce((a, b) => a + b, 0) / day.wind.length * 10) / 10,
      weather: day.weather[Math.floor(day.weather.length / 2)] // Use midday weather
    }));

    res.json({
      location: forecastData.city.name + ", " + forecastData.city.country,
      forecast: formattedForecast.slice(0, 5) // 5-day forecast
    });
  } catch (err) {
    console.error("Weather forecast error:", err);
    res.status(500).json({ error: "Weather forecast unavailable", details: err.message });
  }
});

// Function to provide agricultural advice based on weather
function getAgriculturalAdvice(weatherData) {
  const temp = weatherData.main.temp;
  const humidity = weatherData.main.humidity;
  const windSpeed = weatherData.wind.speed;
  const weatherMain = weatherData.weather[0].main;
  
  let advice = [];
  
  // Temperature advice
  if (temp < 5) {
    advice.push("⚠️ Very cold weather - protect sensitive crops with covers or move indoors");
  } else if (temp < 15) {
    advice.push("🌡️ Cool weather - good for root vegetables and leafy greens");
  } else if (temp > 35) {
    advice.push("🔥 Hot weather - increase watering frequency and provide shade for sensitive plants");
  } else if (temp > 25) {
    advice.push("☀️ Warm weather - ideal for most summer crops");
  }
  
  // Humidity advice
  if (humidity > 80) {
    advice.push("💧 High humidity - watch for fungal diseases, ensure good air circulation");
  } else if (humidity < 30) {
    advice.push("🏜️ Low humidity - increase watering and consider mulching to retain moisture");
  }
  
  // Wind advice
  if (windSpeed > 10) {
    advice.push("💨 Strong winds - secure plants and consider windbreaks");
  }
  
  // Weather condition advice
  if (weatherMain === "Rain") {
    advice.push("🌧️ Rainy weather - reduce watering, check drainage, watch for waterlogging");
  } else if (weatherMain === "Clear") {
    advice.push("☀️ Clear skies - good for photosynthesis, monitor soil moisture");
  } else if (weatherMain === "Clouds") {
    advice.push("☁️ Cloudy weather - plants may need less water, good for transplanting");
  }
  
  return advice.length > 0 ? advice : ["🌱 Weather conditions are generally favorable for farming activities"];
}

// Crop Advisory endpoint with ML prediction
app.post("/api/crop-advisory", async (req, res) => {
  try {
    const { soilData, location, cropType } = req.body;
    
    if (!soilData) {
      return res.status(400).json({ error: "Soil data is required" });
    }

    // Prepare data for ML prediction
    const mlData = {
      soil_ph: soilData.soil_ph || 6.5,
      nitrogen: soilData.nitrogen || 50,
      phosphorus: soilData.phosphorus || 30,
      potassium: soilData.potassium || 40,
      rainfall: soilData.rainfall || 1000,
      temperature: soilData.temperature || 25,
      humidity: soilData.humidity || 60,
      region: location || 'tropical',
      crop_type: cropType || 'rice',
      area: soilData.area || 1.0
    };

    // Get ML prediction from Flask API
    let mlPrediction = null;
    try {
      const response = await axios.post('http://localhost:5000/api/crop-prediction', mlData, {
        timeout: 10000,
        headers: { 'Content-Type': 'application/json' }
      });
      mlPrediction = response.data;
    } catch (mlError) {
      console.error("ML API error:", mlError.message);
    }

    // Get AI advice using Gemini
    const aiPrompt = `Based on the following agricultural data, provide crop advisory recommendations:
    - Soil pH: ${mlData.soil_ph}
    - Nitrogen (N): ${mlData.nitrogen} mg/kg
    - Phosphorus (P): ${mlData.phosphorus} mg/kg
    - Potassium (K): ${mlData.potassium} mg/kg
    - Temperature: ${mlData.temperature}°C
    - Humidity: ${mlData.humidity}%
    - Rainfall: ${mlData.rainfall}mm
    - Region: ${mlData.region}
    - Crop Type: ${mlData.crop_type}
    
    Please provide specific recommendations for:
    1. Best crops to grow based on NPK levels
    2. Planting season
    3. Soil preparation and NPK optimization
    4. Fertilizer requirements based on current NPK
    5. Irrigation needs
    6. Pest management
    7. Expected yield`;

    const aiAdvice = await callGemini([{ role: "user", content: aiPrompt }]);

    // Combine ML prediction with AI advice
    const response = {
      location: location || "Unknown",
      soilData: mlData,
      mlPrediction: mlPrediction,
      aiAdvice: aiAdvice,
      recommendations: {
        bestCrops: mlPrediction?.prediction || ["Rice", "Wheat", "Maize"],
        plantingSeason: "Based on your region and soil conditions",
        soilPreparation: "Test soil pH and add necessary amendments",
        fertilizer: "Use balanced NPK fertilizer based on soil test",
        irrigation: "Maintain consistent moisture levels",
        pestManagement: "Monitor regularly and use integrated pest management"
      },
      timestamp: new Date().toISOString()
    };

    res.json(response);
  } catch (err) {
    console.error("Crop advisory error:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

// Chat endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message, lang, sessionId } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const sid = sessionId || Math.random().toString(36).slice(2, 10);

    // Initialize session with system prompt
    if (!sessions[sid]) {
      let systemPrompt = "You are a helpful farming assistant. Be concise and practical. You can provide weather-based agricultural advice when users ask about weather conditions or farming recommendations.";
      if (lang === "hi") {
        systemPrompt = "आप एक सहायक कृषि सहायक हैं। संक्षिप्त और व्यावहारिक उत्तर दें। आप मौसम के आधार पर कृषि सलाह दे सकते हैं।";
      }
      if (lang === "ml") {
        systemPrompt = "നിങ്ങൾ ഒരു കൃഷി സഹായിയാണ്. ചുരുക്കവും പ്രായോഗികവുമായ മറുപടികൾ നൽകുക. കാലാവസ്ഥയെ അടിസ്ഥാനമാക്കി കൃഷി ഉപദേശങ്ങൾ നൽകാം.";
      }
      sessions[sid] = [{ role: "system", content: systemPrompt }];
    }

    // Add user message
    sessions[sid].push({ role: "user", content: message });

    // Get Gemini reply
    const reply = await callGemini(sessions[sid]);

    // Save reply in session
    sessions[sid].push({ role: "assistant", content: reply });

    // Limit session length (avoid memory bloat)
    if (sessions[sid].length > 20) {
      const system = sessions[sid][0];
      sessions[sid] = [system, ...sessions[sid].slice(-19)];
    }

    res.json({ sessionId: sid, reply });
  } catch (err) {
    console.error("Chat error:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});
// --- START SERVER ---
app.listen(8080, () => {
  console.log("Server running on http://localhost:8080");
});