// src/components/WeatherDisplay.js
import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import {
  Thermometer,
  Wind,
  Droplet,
  Cloud,
  Sunrise,
  Sunset,
  ArrowUp,
} from "lucide-react";
import {
  formatTime,
  formatTemperature,
  formatWindSpeed,
} from "../utils/formatters";

const WeatherDisplay = ({
  weatherData,
  units = "celsius",
  windUnit = "ms",
}) => {
  const { theme } = useTheme();

  if (!weatherData) return null;

  return (
    <div className="mt-6 bg-transparent rounded-lg overflow-hidden">
      <div
        className={`p-6 ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        } rounded-lg shadow`}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center border-r border-gray-300">
            <h3
              className={`text-xl font-semibold mb-2 ${
                theme === "dark" ? "text-blue-400" : "text-blue-600"
              }`}
            >
              {weatherData.name}, {weatherData.sys.country}
            </h3>
            <div className="mb-2">
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
                alt={weatherData.weather[0].description}
                className="w-32 h-32 mx-auto"
              />
            </div>
            <p
              className={`${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {weatherData.weather[0].description}
            </p>
          </div>
          <div className="col-span-2">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="flex items-center mb-2">
                  <Thermometer size={18} className="mr-2" />
                  Temperature:
                  <span
                    className={`ml-1 ${
                      theme === "dark" ? "text-blue-300" : "text-blue-500"
                    }`}
                  >
                    {formatTemperature(weatherData.main.temp, units)}
                  </span>
                </p>
                <p className="flex items-center mb-2">
                  <Thermometer size={18} className="mr-2" />
                  Feels Like:
                  <span
                    className={`ml-1 ${
                      theme === "dark" ? "text-blue-300" : "text-blue-500"
                    }`}
                  >
                    {formatTemperature(weatherData.main.feels_like, units)}
                  </span>
                </p>
                <p className="flex items-center mb-2">
                  <Droplet size={18} className="mr-2" />
                  Humidity:
                  <span
                    className={`ml-1 ${
                      theme === "dark" ? "text-blue-300" : "text-blue-500"
                    }`}
                  >
                    {weatherData.main.humidity}%
                  </span>
                </p>
                <p className="flex items-center mb-2">
                  <div className="mr-2 w-[18px] h-[18px] flex items-center justify-center">
                    P
                  </div>
                  Pressure:
                  <span
                    className={`ml-1 ${
                      theme === "dark" ? "text-blue-300" : "text-blue-500"
                    }`}
                  >
                    {weatherData.main.pressure} hPa
                  </span>
                </p>
              </div>
              <div>
                <p className="flex items-center mb-2">
                  <Thermometer size={18} className="mr-2" />
                  Min/Max:
                  <span
                    className={`ml-1 ${
                      theme === "dark" ? "text-blue-300" : "text-blue-500"
                    }`}
                  >
                    {formatTemperature(weatherData.main.temp_min, units)} /{" "}
                    {formatTemperature(weatherData.main.temp_max, units)}
                  </span>
                </p>
                <p className="flex items-center mb-2">
                  <Wind size={18} className="mr-2" />
                  Wind:
                  <span
                    className={`ml-1 ${
                      theme === "dark" ? "text-blue-300" : "text-blue-500"
                    }`}
                  >
                    {formatWindSpeed(weatherData.wind.speed, windUnit)}
                    <ArrowUp
                      className="inline-block ml-1 w-4 h-4"
                      style={{
                        transform: `rotate(${weatherData.wind.deg || 0}deg)`,
                      }}
                    />
                  </span>
                </p>
                <p className="flex items-center mb-2">
                  <Cloud size={18} className="mr-2" />
                  Clouds:
                  <span
                    className={`ml-1 ${
                      theme === "dark" ? "text-blue-300" : "text-blue-500"
                    }`}
                  >
                    {weatherData.clouds.all}%
                  </span>
                </p>
                <p className="flex items-center mb-2">
                  <Sunrise size={18} className="mr-2" />
                  Sunrise:
                  <span
                    className={`ml-1 ${
                      theme === "dark" ? "text-blue-300" : "text-blue-500"
                    }`}
                  >
                    {formatTime(weatherData.sys.sunrise)}
                  </span>
                </p>
                <p className="flex items-center mb-2">
                  <Sunset size={18} className="mr-2" />
                  Sunset:
                  <span
                    className={`ml-1 ${
                      theme === "dark" ? "text-blue-300" : "text-blue-500"
                    }`}
                  >
                    {formatTime(weatherData.sys.sunset)}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
