import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useTranslation } from "../utils/i18n";

const About = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <div
      className={`min-h-screen py-12 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">About Weatherly</h1>
        <p className="mb-4">
          Weatherly is a modern, responsive weather application built with React
          that provides real-time weather information, forecasts, and
          interactive weather maps.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div
            className={`p-6 rounded-lg ${
              theme === "dark" ? "bg-gray-800" : "bg-gray-100"
            }`}
          >
            <h2 className="text-xl font-semibold mb-3">Key Features</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Real-time weather data from OpenWeatherMap</li>
              <li>Location-based forecasts</li>
              <li>Interactive weather maps</li>
              <li>10-day forecast</li>
              <li>Dark/Light theme support</li>
              <li>Multiple language support</li>
            </ul>
          </div>

          <div
            className={`p-6 rounded-lg ${
              theme === "dark" ? "bg-gray-800" : "bg-gray-100"
            }`}
          >
            <h2 className="text-xl font-semibold mb-3">Technology</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>React for UI components</li>
              <li>Tailwind CSS for styling</li>
              <li>OpenWeatherMap API for weather data</li>
              <li>Leaflet.js for interactive maps</li>
              <li>Context API for state management</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
