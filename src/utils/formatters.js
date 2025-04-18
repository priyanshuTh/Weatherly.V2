// src/utils/formatters.js
/**
 * Format timestamp to time
 * @param {number} timestamp - Unix timestamp
 * @returns {string} Formatted time
 */
export const formatTime = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Format timestamp to date
 * @param {number} timestamp - Unix timestamp
 * @returns {string} Formatted date
 */
export const formatDate = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
};

/**
 * Format temperature with unit
 * @param {number} temp - Temperature value
 * @param {string} unit - Temperature unit (celsius or fahrenheit)
 * @returns {string} Formatted temperature
 */
export const formatTemperature = (temp, unit = "celsius") => {
  const roundedTemp = Math.round(temp);
  return `${roundedTemp}°${unit === "celsius" ? "C" : "F"}`;
};

/**
 * Format wind speed with unit
 * @param {number} speed - Wind speed value
 * @param {string} unit - Wind speed unit (ms, mph, or kmh)
 * @returns {string} Formatted wind speed
 */
export const formatWindSpeed = (speed, unit = "ms") => {
  const unitMap = {
    ms: "m/s",
    mph: "mph",
    kmh: "km/h",
  };

  // Convert if needed
  let convertedSpeed = speed;
  if (unit === "mph") {
    convertedSpeed = speed * 2.237;
  } else if (unit === "kmh") {
    convertedSpeed = speed * 3.6;
  }

  return `${convertedSpeed.toFixed(1)} ${unitMap[unit]}`;
};
