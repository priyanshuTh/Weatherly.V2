// src/contexts/SettingsContext.js
import React, { createContext, useState, useEffect, useContext } from "react";

const defaultSettings = {
  temperatureUnit: "celsius",
  windSpeedUnit: "ms",
  notificationsEnabled: false,
  soundsEnabled: false,
  autoLocation: true,
  language: "en",
};

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(defaultSettings);

  // Load settings when component mounts
  useEffect(() => {
    const savedSettings = localStorage.getItem("weatherly-settings");
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (error) {
        console.error("Error parsing settings:", error);
        setSettings(defaultSettings);
      }
    }
  }, []);

  // Save settings when they change
  useEffect(() => {
    localStorage.setItem("weatherly-settings", JSON.stringify(settings));
  }, [settings]);

  const updateSetting = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const toggleSetting = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateSetting,
        toggleSetting,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
