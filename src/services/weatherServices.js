// API key for OpenWeatherMap
const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

/**
 * Error handler for weather API requests
 * @param {Response} response - Fetch response object
 * @returns {Promise} - Resolved response or rejected with custom error
 */
const handleResponse = async (response) => {
  if (!response.ok) {
    // Get error message from the API if available
    try {
      const errorData = await response.json();
      throw new Error(errorData.message || `API Error: ${response.status}`);
    } catch (e) {
      throw new Error(`Weather service error: ${response.status}`);
    }
  }
  return response.json();
};

/**
 * Get current weather by location name
 * @param {string} location - City name, state code and country code separated by comma
 * @param {string} units - Units of measurement (metric, imperial, standard)
 * @returns {Promise} - Weather data object
 */
export const getWeatherByLocation = async (location, units = "metric") => {
  try {
    const url = `${BASE_URL}/weather?q=${encodeURIComponent(
      location
    )}&appid=${API_KEY}&units=${units}`;
    const response = await fetch(url);
    return handleResponse(response);
  } catch (error) {
    if (error.message === "Failed to fetch") {
      throw new Error("Network error - please check your connection");
    }
    throw error;
  }
};

/**
 * Get current weather by geographic coordinates
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @param {string} units - Units of measurement (metric, imperial, standard)
 * @returns {Promise} - Weather data object
 */
export const getWeatherByCoords = async (lat, lon, units = "metric") => {
  try {
    const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`;
    const response = await fetch(url);
    return handleResponse(response);
  } catch (error) {
    throw new Error("Couldn't get location weather. Search manually instead.");
  }
};

/**
 * Get 5-day/3-hour forecast by location name
 * @param {string} location - City name, state code and country code separated by comma
 * @param {string} units - Units of measurement (metric, imperial, standard)
 * @returns {Promise} - Forecast data object
 */
export const getForecast = async (location, units = "metric") => {
  try {
    const url = `${BASE_URL}/forecast?q=${encodeURIComponent(
      location
    )}&appid=${API_KEY}&units=${units}`;
    const response = await fetch(url);
    return handleResponse(response);
  } catch (error) {
    if (error.message === "Failed to fetch") {
      throw new Error("Network error - please check your connection");
    }
    throw error;
  }
};

/**
 * Get 5-day/3-hour forecast by geographic coordinates
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @param {string} units - Units of measurement (metric, imperial, standard)
 * @returns {Promise} - Forecast data object
 */
export const getForecastByCoords = async (lat, lon, units = "metric") => {
  try {
    const url = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`;
    const response = await fetch(url);
    return handleResponse(response);
  } catch (error) {
    throw new Error("Couldn't get location forecast. Search manually instead.");
  }
};

/**
 * Get weather alerts and warnings for a location
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise} - Weather alerts data object
 */
export const getWeatherAlerts = async (lat, lon) => {
  try {
    // Check if the OneCall API is available with your API key
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,daily&appid=${API_KEY}`;
    const response = await fetch(url);
    const data = await handleResponse(response);

    // If no alerts property exists or it's empty, return a mock response
    if (!data.alerts || data.alerts.length === 0) {
      return {
        alerts: [],
      };
    }

    return data;
  } catch (error) {
    console.error("Error fetching weather alerts:", error);
    // Return empty alerts array to avoid breaking the UI
    return { alerts: [] };
  }
};

/**
 * Get icon URL for weather condition
 * @param {string} iconCode - OpenWeatherMap icon code
 * @param {string} size - Icon size (2x or 4x)
 * @returns {string} - Icon URL
 */
export const getWeatherIconUrl = (iconCode, size = "4x") => {
  return `https://openweathermap.org/img/wn/${iconCode}@${size}.png`;
};

/**
 * Convert units between metric and imperial
 * @param {number} value - Value to convert
 * @param {string} from - Source unit system ('metric' or 'imperial')
 * @param {string} to - Target unit system ('metric' or 'imperial')
 * @param {string} type - Type of measurement ('temp', 'speed', 'distance')
 * @returns {number} - Converted value
 */
export const convertUnits = (value, from, to, type) => {
  if (from === to) return value;

  switch (type) {
    case "temp":
      return from === "metric"
        ? (value * 9) / 5 + 32 // Celsius to Fahrenheit
        : ((value - 32) * 5) / 9; // Fahrenheit to Celsius
    case "speed":
      return from === "metric"
        ? value * 2.237 // m/s to mph
        : value / 2.237; // mph to m/s
    case "distance":
      return from === "metric"
        ? value * 0.621371 // km to miles
        : value / 0.621371; // miles to km
    default:
      return value;
  }
};
