// src/components/Footer.js
import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

const Footer = () => {
  const { theme } = useTheme();

  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`py-6 ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-900 text-white"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p>&copy; {currentYear} Weatherly. All rights reserved.</p>
          </div>
          <div className="text-center">
            <p className="text-gray-400 mb-2">Download our app:</p>
            <div className="flex justify-center gap-3">
              <a
                href="https://apps.apple.com/app/weatherly-app"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="/assets/images/App-store.png"
                  alt="Download on the App Store"
                  className="h-8"
                />
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.weatherly.app"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="/assets/images/Google-Play.png"
                  alt="Get it on Google Play"
                  className="h-8"
                />
              </a>
            </div>
          </div>
          <div className="md:text-right text-center">
            <Link to="/privacy" className="text-white hover:text-blue-300 mr-4">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-white hover:text-blue-300">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
