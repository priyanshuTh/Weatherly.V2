import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudDrizzle,
} from "lucide-react";
import { formatDate, formatTemperature } from "../utils/formatters";

const ForecastDisplay = ({ forecastData }) => {
  const { theme } = useTheme();

  if (!forecastData || !forecastData.list) {
    return null;
  }

  // Group forecast data by day
  const dailyForecasts = {};
  forecastData.list.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const day = date.toISOString().split("T")[0];

    if (!dailyForecasts[day]) {
      dailyForecasts[day] = {
        date: date,
        temps: [],
        icons: [],
        description: [],
        wind: [],
        humidity: [],
      };
    }

    dailyForecasts[day].temps.push(item.main.temp);
    dailyForecasts[day].icons.push(item.weather[0].icon);
    dailyForecasts[day].description.push(item.weather[0].description);
    dailyForecasts[day].wind.push(item.wind.speed);
    dailyForecasts[day].humidity.push(item.main.humidity);
  });

  // Convert to array and limit to 7 days
  const dailyData = Object.values(dailyForecasts).slice(0, 7);

  // Get the most common weather icon for each day
  dailyData.forEach((day) => {
    // Most frequent icon
    const iconCounts = {};
    day.icons.forEach((icon) => {
      iconCounts[icon] = (iconCounts[icon] || 0) + 1;
    });
    day.mainIcon = Object.entries(iconCounts).sort((a, b) => b[1] - a[1])[0][0];

    // Get min/max temps
    day.minTemp = Math.min(...day.temps);
    day.maxTemp = Math.max(...day.temps);

    // Average wind and humidity
    day.avgWind = day.wind.reduce((sum, val) => sum + val, 0) / day.wind.length;
    day.avgHumidity =
      day.humidity.reduce((sum, val) => sum + val, 0) / day.humidity.length;
  });

  // Helper to get icon component based on weather code
  const getWeatherIcon = (iconCode) => {
    // Map OpenWeatherMap icon codes to Lucide icons
    const iconMap = {
      "01d": <Sun size={36} className="text-yellow-500" />,
      "01n": <Sun size={36} className="text-yellow-400" />,
      "02d": <Cloud size={36} className="text-gray-400" />,
      "02n": <Cloud size={36} className="text-gray-400" />,
      "03d": <Cloud size={36} className="text-gray-400" />,
      "03n": <Cloud size={36} className="text-gray-400" />,
      "04d": <Cloud size={36} className="text-gray-500" />,
      "04n": <Cloud size={36} className="text-gray-500" />,
      "09d": <CloudDrizzle size={36} className="text-blue-400" />,
      "09n": <CloudDrizzle size={36} className="text-blue-400" />,
      "10d": <CloudRain size={36} className="text-blue-500" />,
      "10n": <CloudRain size={36} className="text-blue-500" />,
      "11d": <CloudLightning size={36} className="text-purple-500" />,
      "11n": <CloudLightning size={36} className="text-purple-500" />,
      "13d": <CloudSnow size={36} className="text-blue-200" />,
      "13n": <CloudSnow size={36} className="text-blue-200" />,
    };

    return iconMap[iconCode] || <Cloud size={36} className="text-gray-400" />;
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-max">
        <div className="grid grid-cols-7 gap-2">
          {dailyData.map((day, index) => (
            <div
              key={index}
              className={`p-4 text-center rounded-lg ${
                theme === "dark"
                  ? "bg-gray-800 hover:bg-gray-700"
                  : "bg-white hover:bg-gray-50"
              } transition-colors shadow`}
            >
              <p
                className={`font-medium ${
                  theme === "dark" ? "text-gray-200" : "text-gray-700"
                }`}
              >
                {formatDate(day.date.getTime() / 1000)}
              </p>
              <div className="flex justify-center my-3">
                {getWeatherIcon(day.mainIcon)}
              </div>
              <p
                className={`font-bold text-lg ${
                  theme === "dark" ? "text-blue-300" : "text-blue-600"
                }`}
              >
                {formatTemperature(day.maxTemp)} /{" "}
                {formatTemperature(day.minTemp)}
              </p>
              <div
                className={`mt-2 text-xs ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                <p>Wind: {day.avgWind.toFixed(1)} m/s</p>
                <p>Humidity: {Math.round(day.avgHumidity)}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ForecastDisplay;
