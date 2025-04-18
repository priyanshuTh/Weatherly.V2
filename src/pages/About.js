import React from "react";
import { useTheme } from "../contexts/ThemeContext";

const About = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen py-12 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">About Weatherly</h1>
        <p className="mb-4">
          Weatherly is a modern weather application built with React that
          provides real-time weather information.
        </p>
        {/* Add more content here */}
      </div>
    </div>
  );
};

export default About;
