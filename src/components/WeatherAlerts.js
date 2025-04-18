import React, { useState, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { AlertTriangle, AlertCircle, Info, X } from "lucide-react";
import { getWeatherAlerts } from "../services/weatherService";
import { formatDate } from "../utils/formatters";

const WeatherAlerts = ({ lat, lon }) => {
  const { theme } = useTheme();
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expandedAlerts, setExpandedAlerts] = useState({});

  useEffect(() => {
    const fetchAlerts = async () => {
      if (!lat || !lon) return;

      setLoading(true);
      setError(null);

      try {
        const data = await getWeatherAlerts(lat, lon);
        if (data && data.alerts && data.alerts.length > 0) {
          setAlerts(data.alerts);
        } else {
          setAlerts([]);
        }
      } catch (err) {
        setError(err.message || "Failed to fetch weather alerts");
        setAlerts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, [lat, lon]);

  const toggleAlert = (index) => {
    setExpandedAlerts((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const dismissAlert = (index, e) => {
    e.stopPropagation();
    setAlerts((prev) => prev.filter((_, i) => i !== index));
  };

  // Get appropriate icon based on alert severity
  const getAlertIcon = (event) => {
    const eventLower = event.toLowerCase();
    if (eventLower.includes("warning") || eventLower.includes("severe")) {
      return <AlertTriangle className="text-red-500" size={24} />;
    } else if (
      eventLower.includes("watch") ||
      eventLower.includes("advisory")
    ) {
      return <AlertCircle className="text-yellow-500" size={24} />;
    } else {
      return <Info className="text-blue-500" size={24} />;
    }
  };

  // Get appropriate color based on alert severity
  const getAlertColor = (event) => {
    const eventLower = event.toLowerCase();
    if (eventLower.includes("warning") || eventLower.includes("severe")) {
      return theme === "dark"
        ? "bg-red-900/50 border-red-700"
        : "bg-red-100 border-red-300";
    } else if (
      eventLower.includes("watch") ||
      eventLower.includes("advisory")
    ) {
      return theme === "dark"
        ? "bg-yellow-900/50 border-yellow-700"
        : "bg-yellow-100 border-yellow-300";
    } else {
      return theme === "dark"
        ? "bg-blue-900/50 border-blue-700"
        : "bg-blue-100 border-blue-300";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`p-4 rounded-lg text-center ${
          theme === "dark"
            ? "bg-red-900/50 text-white"
            : "bg-red-100 text-red-700"
        }`}
      >
        <p>Error loading weather alerts: {error}</p>
      </div>
    );
  }

  if (alerts.length === 0) {
    return (
      <div
        className={`p-4 rounded-lg text-center ${
          theme === "dark"
            ? "bg-green-900/50 text-white"
            : "bg-green-100 text-green-700"
        }`}
      >
        <p>No active weather alerts for this location</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {alerts.map((alert, index) => (
        <div
          key={index}
          className={`rounded-lg border p-4 cursor-pointer transition-colors ${getAlertColor(
            alert.event
          )}`}
          onClick={() => toggleAlert(index)}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <div className="mt-0.5">{getAlertIcon(alert.event)}</div>
              <div>
                <h3
                  className={`font-bold ${
                    theme === "dark" ? "text-white" : "text-gray-800"
                  }`}
                >
                  {alert.event}
                </h3>
                <p
                  className={`text-sm ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {formatDate(alert.start)} - {formatDate(alert.end)}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                className={`p-1 rounded-full ${
                  theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-200"
                }`}
                onClick={(e) => dismissAlert(index, e)}
                aria-label="Dismiss alert"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {expandedAlerts[index] && (
            <div
              className={`mt-3 p-3 rounded ${
                theme === "dark" ? "bg-gray-800/50" : "bg-white/70"
              }`}
            >
              <p
                className={`text-sm ${
                  theme === "dark" ? "text-gray-200" : "text-gray-700"
                }`}
              >
                {alert.description}
              </p>
              {alert.sender_name && (
                <p
                  className={`mt-2 text-xs ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Source: {alert.sender_name}
                </p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default WeatherAlerts;
