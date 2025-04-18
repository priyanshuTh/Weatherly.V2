// src/components/Navbar.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { useTranslation } from "../utils/i18n";
import { Sun, Moon, Settings } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import SettingsModal from "./SettingsModal";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav
        className={`${
          theme === "dark" ? "bg-gray-800" : "bg-blue-600"
        } py-3 sticky top-0 z-40`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img
              src="/assets/images/logo.png"
              alt="Weatherly logo"
              className="h-8 mr-2"
            />
            <span className="font-bold text-white text-xl">{t("appName")}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <Link
              to="/about"
              className="text-white hover:text-gray-200 mx-2 text-sm px-3 py-1 border border-white/30 rounded-md"
            >
              {t("aboutUs")}
            </Link>
            <Link
              to="/login"
              className="text-white hover:text-gray-200 mx-2 text-sm px-3 py-1 border border-white/30 rounded-md"
            >
              {t("login")}
            </Link>
            <Link
              to="/signup"
              className="text-white hover:text-gray-200 mx-2 text-sm px-3 py-1 border border-white/30 rounded-md"
            >
              {t("signup")}
            </Link>

            <LanguageSwitcher />

            <button
              onClick={() => setShowSettingsModal(true)}
              className="text-white p-2 rounded-full hover:bg-white/10"
              aria-label="Settings"
            >
              <Settings size={20} />
            </button>

            <button
              onClick={toggleTheme}
              className="text-white p-2 rounded-full hover:bg-white/10"
              aria-label={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageSwitcher />

            <button
              onClick={toggleTheme}
              className="text-white p-2 rounded-full hover:bg-white/10"
              aria-label={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-2"
              aria-label="Toggle mobile menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            className={`md:hidden ${
              theme === "dark" ? "bg-gray-800" : "bg-blue-600"
            } px-4 py-3 space-y-2`}
          >
            <Link
              to="/about"
              className="block text-white hover:bg-white/10 px-3 py-2 rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("aboutUs")}
            </Link>
            <Link
              to="/login"
              className="block text-white hover:bg-white/10 px-3 py-2 rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("login")}
            </Link>
            <Link
              to="/signup"
              className="block text-white hover:bg-white/10 px-3 py-2 rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("signup")}
            </Link>
            <button
              onClick={() => {
                setShowSettingsModal(true);
                setMobileMenuOpen(false);
              }}
              className="flex items-center w-full text-white hover:bg-white/10 px-3 py-2 rounded"
            >
              <Settings size={18} className="mr-2" />
              {t("settings")}
            </button>
          </div>
        )}
      </nav>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
      />
    </>
  );
};

export default Navbar;
