// src/components/LanguageSwitcher.js
import React from "react";
import { useSettings } from "../contexts/SettingsContext";
import { useTheme } from "../contexts/ThemeContext";
import { Globe } from "lucide-react";

const LanguageSwitcher = () => {
  const { settings, updateSetting } = useSettings();
  const { theme } = useTheme();

  // Available languages with names and flags
  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "it", name: "Italiano", flag: "🇮🇹" },
    { code: "pt", name: "Português", flag: "🇵🇹" },
    { code: "ru", name: "Русский", flag: "🇷🇺" },
    { code: "zh", name: "中文", flag: "🇨🇳" },
    { code: "ja", name: "日本語", flag: "🇯🇵" },
    { code: "ko", name: "한국어", flag: "🇰🇷" },
    { code: "ar", name: "العربية", flag: "🇸🇦" },
    { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
  ];

  // Get current language data
  const currentLanguage =
    languages.find((lang) => lang.code === settings.language) || languages[0];

  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLanguageChange = (languageCode) => {
    updateSetting("language", languageCode);
    setDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownOpen && !event.target.closest(".language-dropdown")) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <div className="language-dropdown relative">
      <button
        onClick={toggleDropdown}
        className={`flex items-center space-x-1 px-3 py-1.5 rounded-full ${
          theme === "dark"
            ? "hover:bg-gray-700 text-gray-300"
            : "hover:bg-blue-500 text-white"
        }`}
        aria-label="Change language"
      >
        <Globe size={16} />
        <span className="text-sm">{currentLanguage.flag}</span>
        <span className="text-sm hidden sm:inline">{currentLanguage.name}</span>
      </button>

      {dropdownOpen && (
        <div
          className={`absolute right-0 mt-2 py-2 w-48 rounded-md shadow-lg z-50 ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          } ring-1 ring-black ring-opacity-5`}
        >
          <div className="max-h-64 overflow-y-auto">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`flex items-center px-4 py-2 text-sm w-full text-left ${
                  settings.language === language.code
                    ? theme === "dark"
                      ? "bg-gray-700 text-white"
                      : "bg-blue-100 text-blue-800"
                    : theme === "dark"
                    ? "text-gray-300 hover:bg-gray-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="mr-2">{language.flag}</span>
                <span>{language.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
