// src/components/CookieConsent.js
import React from "react";
import { useTheme } from "../contexts/ThemeContext";

const CookieConsent = ({ show, onDismiss }) => {
  const { theme } = useTheme();

  if (!show) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 ${
        theme === "dark" ? "bg-gray-800" : "bg-gray-900"
      } text-white p-3 shadow-lg z-40 animate-slide-up`}
    >
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="mb-3 md:mb-0">
          This site uses necessary cookies to enable basic functionality.{" "}
          <a href="#" className="text-blue-300 hover:underline">
            Learn more
          </a>
        </p>
        <button
          onClick={onDismiss}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md"
        >
          Got it
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
