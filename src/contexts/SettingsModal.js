// src/components/SettingsModal.js
import React, { useState, useEffect } from "react";
import { useTheme } from "./ThemeContext";
import { useSettings } from "./SettingsModal";
import { useTranslation } from "../utils/i18n";
import {
  X,
  Sun,
  Moon,
  Thermometer,
  Wind,
  MapPin,
  Bell,
  Volume2,
  VolumeX,
} from "lucide-react";

const SettingsModal = ({ isOpen, onClose }) => {
  const { theme, toggleTheme } = useTheme();
  const { settings, updateSetting, toggleSetting } = useSettings();
  const { t } = useTranslation();

  // Local state for settings (to avoid updating global settings until saved)
  const [localSettings, setLocalSettings] = useState(settings);

  // Update local settings when settings change
  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleChange = (key, value) => {
    setLocalSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleToggle = (key) => {
    setLocalSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Save settings and close modal
  const handleSave = () => {
    // Update each setting that has changed
    Object.entries(localSettings).forEach(([key, value]) => {
      if (settings[key] !== value) {
        updateSetting(key, value);
      }
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div
        className={`w-full max-w-md rounded-lg shadow-lg overflow-hidden ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div
          className={`p-4 flex justify-between items-center border-b ${
            theme === "dark" ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <h2
            className={`text-xl font-semibold ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            App Settings
          </h2>
          <button
            onClick={onClose}
            className={`p-1 rounded-full ${
              theme === "dark"
                ? "hover:bg-gray-700 text-gray-400"
                : "hover:bg-gray-200 text-gray-600"
            }`}
            aria-label="Close settings"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Theme Setting */}
          <div className="space-y-3">
            <h3
              className={`font-medium ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Appearance
            </h3>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className={`flex-1 p-3 rounded-lg border flex items-center justify-center space-x-2 ${
                  theme === "light"
                    ? "bg-blue-100 border-blue-500 text-blue-700"
                    : "border-gray-600 text-gray-400"
                }`}
              >
                <Sun size={20} />
                <span>Light</span>
              </button>
              <button
                onClick={toggleTheme}
                className={`flex-1 p-3 rounded-lg border flex items-center justify-center space-x-2 ${
                  theme === "dark"
                    ? "bg-gray-700 border-blue-500 text-white"
                    : "border-gray-300 text-gray-700"
                }`}
              >
                <Moon size={20} />
                <span>Dark</span>
              </button>
            </div>
          </div>

          {/* Units Settings */}
          <div className="space-y-3">
            <h3
              className={`font-medium ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Units
            </h3>
            <div className="space-y-3">
              <div>
                <label
                  className={`block mb-2 text-sm ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Temperature
                </label>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleChange("temperatureUnit", "celsius")}
                    className={`flex-1 py-2 px-3 rounded-lg border flex items-center justify-center space-x-1 ${
                      localSettings.temperatureUnit === "celsius"
                        ? theme === "dark"
                          ? "bg-blue-600 border-blue-500 text-white"
                          : "bg-blue-100 border-blue-500 text-blue-700"
                        : theme === "dark"
                        ? "border-gray-600 text-gray-400"
                        : "border-gray-300 text-gray-700"
                    }`}
                  >
                    <Thermometer size={16} />
                    <span>Celsius (°C)</span>
                  </button>
                  <button
                    onClick={() =>
                      handleChange("temperatureUnit", "fahrenheit")
                    }
                    className={`flex-1 py-2 px-3 rounded-lg border flex items-center justify-center space-x-1 ${
                      localSettings.temperatureUnit === "fahrenheit"
                        ? theme === "dark"
                          ? "bg-blue-600 border-blue-500 text-white"
                          : "bg-blue-100 border-blue-500 text-blue-700"
                        : theme === "dark"
                        ? "border-gray-600 text-gray-400"
                        : "border-gray-300 text-gray-700"
                    }`}
                  >
                    <Thermometer size={16} />
                    <span>Fahrenheit (°F)</span>
                  </button>
                </div>
              </div>

              <div>
                <label
                  className={`block mb-2 text-sm ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Wind Speed
                </label>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleChange("windSpeedUnit", "ms")}
                    className={`flex-1 py-2 px-3 rounded-lg border flex items-center justify-center space-x-1 ${
                      localSettings.windSpeedUnit === "ms"
                        ? theme === "dark"
                          ? "bg-blue-600 border-blue-500 text-white"
                          : "bg-blue-100 border-blue-500 text-blue-700"
                        : theme === "dark"
                        ? "border-gray-600 text-gray-400"
                        : "border-gray-300 text-gray-700"
                    }`}
                  >
                    <Wind size={16} />
                    <span>m/s</span>
                  </button>
                  <button
                    onClick={() => handleChange("windSpeedUnit", "mph")}
                    className={`flex-1 py-2 px-3 rounded-lg border flex items-center justify-center space-x-1 ${
                      localSettings.windSpeedUnit === "mph"
                        ? theme === "dark"
                          ? "bg-blue-600 border-blue-500 text-white"
                          : "bg-blue-100 border-blue-500 text-blue-700"
                        : theme === "dark"
                        ? "border-gray-600 text-gray-400"
                        : "border-gray-300 text-gray-700"
                    }`}
                  >
                    <Wind size={16} />
                    <span>mph</span>
                  </button>
                  <button
                    onClick={() => handleChange("windSpeedUnit", "kmh")}
                    className={`flex-1 py-2 px-3 rounded-lg border flex items-center justify-center space-x-1 ${
                      localSettings.windSpeedUnit === "kmh"
                        ? theme === "dark"
                          ? "bg-blue-600 border-blue-500 text-white"
                          : "bg-blue-100 border-blue-500 text-blue-700"
                        : theme === "dark"
                        ? "border-gray-600 text-gray-400"
                        : "border-gray-300 text-gray-700"
                    }`}
                  >
                    <Wind size={16} />
                    <span>km/h</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="space-y-3">
            <h3
              className={`font-medium ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Preferences
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MapPin
                    size={20}
                    className={
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }
                  />
                  <label
                    className={
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }
                  >
                    Auto-detect location
                  </label>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={localSettings.autoLocation}
                    onChange={() => handleToggle("autoLocation")}
                  />
                  <div
                    className={`w-11 h-6 rounded-full peer ${
                      theme === "dark" ? "bg-gray-700" : "bg-gray-300"
                    } peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${
                      theme === "dark"
                        ? "peer-checked:bg-blue-600"
                        : "peer-checked:bg-blue-500"
                    }`}
                  ></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bell
                    size={20}
                    className={
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }
                  />
                  <label
                    className={
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }
                  >
                    Weather notifications
                  </label>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={localSettings.notificationsEnabled}
                    onChange={() => handleToggle("notificationsEnabled")}
                  />
                  <div
                    className={`w-11 h-6 rounded-full peer ${
                      theme === "dark" ? "bg-gray-700" : "bg-gray-300"
                    } peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${
                      theme === "dark"
                        ? "peer-checked:bg-blue-600"
                        : "peer-checked:bg-blue-500"
                    }`}
                  ></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {localSettings.soundsEnabled ? (
                    <Volume2
                      size={20}
                      className={
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }
                    />
                  ) : (
                    <VolumeX
                      size={20}
                      className={
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }
                    />
                  )}
                  <label
                    className={
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }
                  >
                    Sound effects
                  </label>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={localSettings.soundsEnabled}
                    onChange={() => handleToggle("soundsEnabled")}
                  />
                  <div
                    className={`w-11 h-6 rounded-full peer ${
                      theme === "dark" ? "bg-gray-700" : "bg-gray-300"
                    } peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${
                      theme === "dark"
                        ? "peer-checked:bg-blue-600"
                        : "peer-checked:bg-blue-500"
                    }`}
                  ></div>
                </label>
              </div>
            </div>
          </div>

          {/* Language Selection */}
          <div className="space-y-3">
            <h3
              className={`font-medium ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Language
            </h3>
            <select
              value={localSettings.language}
              onChange={(e) => handleChange("language", e.target.value)}
              className={`w-full p-2 rounded-lg border ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-700"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="it">Italiano</option>
              <option value="pt">Português</option>
              <option value="ru">Русский</option>
              <option value="zh">中文</option>
              <option value="ja">日本語</option>
              <option value="ko">한국어</option>
              <option value="ar">العربية</option>
              <option value="hi">हिन्दी</option>
            </select>
          </div>
        </div>

        <div
          className={`p-4 border-t ${
            theme === "dark" ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <div className="flex justify-end space-x-3">
            <button
              onClick={handleSave}
              className={`px-4 py-2 rounded-lg ${
                theme === "dark"
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white font-medium transition-colors`}
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
