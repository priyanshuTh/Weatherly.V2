// src/pages/Home.js
import React, { useState, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useSettings } from "../contexts/SettingsContext";
import { useTranslation } from "../utils/i18n";
import {
  Search,
  MapPin,
  CloudLightningRain,
  Map,
  Calendar,
} from "lucide-react";
import WeatherDisplay from "../components/WeatherDisplay";
import WeatherMap from "../components/WeatherMap";
import ForecastDisplay from "../components/ForecastDisplay";
import WeatherAlerts from "../components/WeatherAlerts";
import Toast from "../components/Toast";
import CookieConsent from "../components/CookieConsent";
import {
  getWeatherByLocation,
  getWeatherByCoords,
  getForecast,
  getForecastByCoords,
} from "../services/weatherService";
import { getLocalStorage, setLocalStorage } from "../utils/localStorage";

const Home = () => {
  // Hooks
  const { theme } = useTheme();
  const { settings } = useSettings();
  const { t } = useTranslation();

  // State management
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [showWeather, setShowWeather] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);
  const [showCookieNotice, setShowCookieNotice] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showMapsModal, setShowMapsModal] = useState(false);
  const [showForecastModal, setShowForecastModal] = useState(false);
  const [showAlertsModal, setShowAlertsModal] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "" });

  // Initialize app
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    // Get recent searches
    const savedSearches = getLocalStorage("recentSearches", []);
    setRecentSearches(savedSearches);

    // Check cookie notice
    const noticeSeen = document.cookie.includes("noticeSeen=true");
    if (!noticeSeen) {
      setTimeout(() => {
        setShowCookieNotice(true);
      }, 2000);
    }

    // Check location permission
    if (settings.autoLocation) {
      const locationPermission = localStorage.getItem("locationPermission");
      if (!locationPermission) {
        setTimeout(() => {
          setShowLocationModal(true);
        }, 3000);
      } else if (locationPermission === "granted") {
        requestLocation();
      }
    }

    return () => clearTimeout(timer);
  }, [settings.autoLocation]);

  // Location request
  const requestLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          handleLocationWeather(latitude, longitude);
        },
        (error) => {
          showToastMessage(t("locationAccessDenied"));
          setShowLocationModal(false);
        }
      );
    } else {
      showToastMessage(t("geolocationNotSupported"));
      setShowLocationModal(false);
    }
  };

  // Location permission handlers
  const allowLocation = () => {
    localStorage.setItem("locationPermission", "granted");
    setShowLocationModal(false);
    requestLocation();
  };

  const denyLocation = () => {
    localStorage.setItem("locationPermission", "denied");
    setShowLocationModal(false);
    showToastMessage(t("enableLocationMessage"));
  };

  // Cookie notice handler
  const dismissCookieNotice = () => {
    const date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    document.cookie = `noticeSeen=true; expires=${date.toUTCString()}; path=/`;
    setShowCookieNotice(false);
  };

  // Search handlers
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      performSearch(searchInput);
    }
  };

  const handleRecentSearchClick = (location) => {
    setSearchInput(location);
    performSearch(location);
  };

  // Toast notification
  const showToastMessage = (message) => {
    setToast({ show: true, message });
  };

  const hideToast = () => {
    setToast({ show: false, message: "" });
  };

  // Weather API functions
  const performSearch = async (location) => {
    try {
      if (!location) {
        showToastMessage(t("enterLocationMessage"));
        return;
      }

      showToastMessage(`${t("searchingFor")} ${location}...`);
      setShowWeather(false);

      // Get current weather
      const data = await getWeatherByLocation(
        location,
        settings.temperatureUnit === "fahrenheit" ? "imperial" : "metric"
      );
      setWeatherData(data);

      // Get forecast
      try {
        const forecastData = await getForecast(
          location,
          settings.temperatureUnit === "fahrenheit" ? "imperial" : "metric"
        );
        setForecastData(forecastData);
      } catch (forecastError) {
        console.error("Forecast error:", forecastError);
        // Continue showing weather even if forecast fails
      }

      setShowWeather(true);
      addRecentSearch(location);
    } catch (error) {
      showToastMessage(error.message || t("failedToGetWeather"));
    }
  };

  const handleLocationWeather = async (lat, lon) => {
    try {
      // Get current weather
      const data = await getWeatherByCoords(
        lat,
        lon,
        settings.temperatureUnit === "fahrenheit" ? "imperial" : "metric"
      );
      setWeatherData(data);

      // Get forecast
      try {
        const forecastData = await getForecastByCoords(
          lat,
          lon,
          settings.temperatureUnit === "fahrenheit" ? "imperial" : "metric"
        );
        setForecastData(forecastData);
      } catch (forecastError) {
        console.error("Forecast error:", forecastError);
        // Continue showing weather even if forecast fails
      }

      setShowWeather(true);
      addRecentSearch(data.name);
    } catch (error) {
      showToastMessage(t("locationWeatherError"));
    }
  };

  // Recent searches functions
  const addRecentSearch = (location) => {
    const searches = [...recentSearches];
    if (!searches.includes(location)) {
      searches.unshift(location);
      const updatedSearches = searches.slice(0, 5);
      setRecentSearches(updatedSearches);
      setLocalStorage("recentSearches", updatedSearches);
    }
  };

  // Get season for background
  const getSeason = () => {
    const date = new Date();
    const month = date.getMonth();

    if (month >= 2 && month <= 4) return "spring";
    if (month >= 5 && month <= 7) return "summer";
    if (month >= 8 && month <= 10) return "autumn";
    return "winter";
  };

  // Background image based on season
  const getBackgroundImage = () => {
    const season = getSeason();
    return `url('/assets/images/${season}.jpg')`;
  };

  // Toggle modal states
  const toggleMapsModal = () => setShowMapsModal(!showMapsModal);
  const toggleForecastModal = () => setShowForecastModal(!showForecastModal);
  const toggleAlertsModal = () => setShowAlertsModal(!showAlertsModal);

  return (
    <main className="flex-grow">
      {/* Preloader */}
      {loading && (
        <div
          className={`fixed inset-0 z-50 flex flex-col items-center justify-center ${
            theme === "dark" ? "bg-gray-900" : "bg-white"
          }`}
        >
          <img
            src="../public/assets/images/logo.png"
            alt="Weatherly logo"
            className="w-20 h-20"
          />
          <h1
            className={`text-2xl font-bold mt-4 ${
              theme === "dark" ? "text-blue-400" : "text-blue-600"
            }`}
          >
            {t("appName")}
          </h1>
          <div
            className={`mt-4 w-8 h-8 border-4 border-t-transparent rounded-full animate-spin ${
              theme === "dark" ? "border-blue-400" : "border-blue-600"
            }`}
          ></div>
          <p
            className={`mt-3 ${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {t("loadingMessage")}
          </p>
        </div>
      )}

      {/* Hero Section with Search */}
      <section
        className="relative py-16 bg-cover bg-center"
        style={{ backgroundImage: getBackgroundImage() }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/70"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto">
            <form
              onSubmit={handleSearchSubmit}
              className="bg-black/80 backdrop-blur-md p-8 rounded-lg shadow-xl"
            >
              <h2 className="text-white text-2xl font-bold mb-6 text-center">
                {t("findForecast")}
              </h2>
              <div className="flex">
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-l-lg focus:outline-none"
                  placeholder={t("search")}
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <button
                  type="submit"
                  className={`px-4 py-3 rounded-r-lg ${
                    theme === "dark"
                      ? "bg-blue-500 hover:bg-blue-600"
                      : "bg-blue-600 hover:bg-blue-700"
                  } text-white`}
                >
                  <Search size={20} />
                </button>
              </div>

              {/* Weather Results */}
              {showWeather && weatherData && (
                <WeatherDisplay
                  weatherData={weatherData}
                  units={settings.temperatureUnit}
                  windUnit={settings.windSpeedUnit}
                />
              )}

              {/* Recent Places */}
              <section className="mt-6 bg-white/10 p-4 rounded-lg">
                <h3 className="text-white text-sm font-semibold mb-2">
                  {t("recentPlaces")}
                </h3>
                {recentSearches.length > 0 ? (
                  <div className="space-y-1">
                    {recentSearches.map((location, index) => (
                      <button
                        key={index}
                        onClick={() => handleRecentSearchClick(location)}
                        className="w-full text-left text-white hover:bg-white/10 px-3 py-2 rounded flex items-center"
                      >
                        <MapPin size={16} className="mr-2" />
                        {location}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-white/50 text-sm">
                    {t("noRecentSearches")}
                  </p>
                )}
              </section>
            </form>
          </div>
        </div>
      </section>

      {/* Weather Features Section */}
      <section
        className={`py-16 ${theme === "dark" ? "bg-gray-900" : "bg-gray-100"}`}
      >
        <div className="container mx-auto px-4">
          <h2
            className={`text-3xl font-bold text-center mb-10 relative pb-3 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            <span>{t("weatherFeatures")}</span>
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-blue-500"></span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature Card - Warnings & Alerts */}
            <div
              className={`p-8 rounded-lg shadow-lg transition-transform duration-300 transform hover:-translate-y-2 hover:shadow-xl ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              }`}
            >
              <div className="w-16 h-16 mb-6 rounded-full bg-blue-100 flex items-center justify-center mx-auto">
                <CloudLightningRain size={32} className="text-blue-600" />
              </div>
              <h3
                className={`text-xl font-semibold mb-3 text-center ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                {t("warnings")}
              </h3>
              <p
                className={`mb-4 text-center ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {t("warningsDesc")}
              </p>
              <div className="text-center">
                <button
                  onClick={toggleAlertsModal}
                  disabled={!weatherData}
                  className={`px-4 py-2 rounded-md border ${
                    !weatherData
                      ? `${
                          theme === "dark"
                            ? "border-gray-600 text-gray-600"
                            : "border-gray-300 text-gray-400"
                        } cursor-not-allowed`
                      : theme === "dark"
                      ? "border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-gray-900"
                      : "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                  }`}
                >
                  {t("viewWarnings")}
                </button>
              </div>
            </div>

            {/* Feature Card - Weather Maps */}
            <div
              className={`p-8 rounded-lg shadow-lg transition-transform duration-300 transform hover:-translate-y-2 hover:shadow-xl ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              }`}
            >
              <div className="w-16 h-16 mb-6 rounded-full bg-blue-100 flex items-center justify-center mx-auto">
                <Map size={32} className="text-blue-600" />
              </div>
              <h3
                className={`text-xl font-semibold mb-3 text-center ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                {t("weatherMaps")}
              </h3>
              <p
                className={`mb-4 text-center ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {t("mapsDesc")}
              </p>
              <div className="text-center">
                <button
                  onClick={toggleMapsModal}
                  className={`px-4 py-2 rounded-md border ${
                    theme === "dark"
                      ? "border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-gray-900"
                      : "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                  }`}
                >
                  {t("exploreMaps")}
                </button>
              </div>
            </div>

            {/* Feature Card - 10-Day Forecast */}
            <div
              className={`p-8 rounded-lg shadow-lg transition-transform duration-300 transform hover:-translate-y-2 hover:shadow-xl ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              }`}
            >
              <div className="w-16 h-16 mb-6 rounded-full bg-blue-100 flex items-center justify-center mx-auto">
                <Calendar size={32} className="text-blue-600" />
              </div>
              <h3
                className={`text-xl font-semibold mb-3 text-center ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                {t("forecast")}
              </h3>
              <p
                className={`mb-4 text-center ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {t("forecastDesc")}
              </p>
              <div className="text-center">
                <button
                  onClick={toggleForecastModal}
                  disabled={!forecastData}
                  className={`px-4 py-2 rounded-md border ${
                    !forecastData
                      ? `${
                          theme === "dark"
                            ? "border-gray-600 text-gray-600"
                            : "border-gray-300 text-gray-400"
                        } cursor-not-allowed`
                      : theme === "dark"
                      ? "border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-gray-900"
                      : "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                  }`}
                >
                  {t("viewForecast")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Forecast Section */}
      <section
        className={`py-16 ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}
      >
        <div className="container mx-auto px-4">
          <h2
            className={`text-3xl font-bold text-center mb-10 relative pb-3 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            <span>{t("videoForecast")}</span>
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-blue-500"></span>
          </h2>
          <div className="max-w-4xl mx-auto">
            <div
              className={`rounded-lg overflow-hidden shadow-lg ${
                theme === "dark" ? "bg-gray-700" : "bg-white"
              }`}
            >
              <div
                className={`p-3 ${
                  theme === "dark" ? "bg-gray-600" : "bg-gray-100"
                }`}
              >
                <h5 className="font-bold text-lg">{t("todaysForecast")}</h5>
              </div>
              <div className="aspect-w-16 aspect-h-9">
                <video
                  className="w-full"
                  controls
                  poster="/assets/images/video_forecast.png"
                >
                  <source
                    src="/assets/videos/video_forecast.mp4"
                    type="video/mp4"
                  />
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Toast Notifications */}
      <Toast show={toast.show} message={toast.message} onClose={hideToast} />

      {/* Cookie Notice */}
      <CookieConsent show={showCookieNotice} onDismiss={dismissCookieNotice} />

      {/* Location Permission Modal */}
      {showLocationModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div
            className={`max-w-md w-full rounded-lg shadow-lg overflow-hidden ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div
              className={`p-4 flex justify-between items-center border-b ${
                theme === "dark" ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <h3
                className={`text-lg font-semibold ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                {t("allowLocationAccess")}
              </h3>
              <button
                onClick={() => setShowLocationModal(false)}
                className={`${
                  theme === "dark"
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                &times;
              </button>
            </div>
            <div className="p-6">
              <p
                className={`mb-3 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {t("locationAccessDescription")}
              </p>
              <p
                className={`text-sm ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {t("locationDataUsage")}
              </p>
            </div>
            <div
              className={`p-4 flex justify-end gap-3 border-t ${
                theme === "dark" ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <button
                onClick={denyLocation}
                className={`px-4 py-2 rounded-md border ${
                  theme === "dark"
                    ? "border-gray-600 hover:bg-gray-700 text-gray-300"
                    : "border-gray-300 hover:bg-gray-100 text-gray-700"
                }`}
              >
                {t("block")}
              </button>
              <button
                onClick={allowLocation}
                className={`px-4 py-2 rounded-md ${
                  theme === "dark"
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-blue-600 hover:bg-blue-700"
                } text-white`}
              >
                {t("allow")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Weather Maps Modal */}
      {showMapsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div
            className={`max-w-5xl w-full rounded-lg shadow-lg overflow-hidden ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div
              className={`p-4 flex justify-between items-center border-b ${
                theme === "dark" ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <h3
                className={`text-lg font-semibold ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                {t("interactiveWeatherMap")}
              </h3>
              <button
                onClick={toggleMapsModal}
                className={`${
                  theme === "dark"
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                &times;
              </button>
            </div>
            <div className="p-0">
              <WeatherMap weatherData={weatherData} isVisible={showMapsModal} />
            </div>
          </div>
        </div>
      )}

      {/* Forecast Modal */}
      {showForecastModal && forecastData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div
            className={`max-w-5xl w-full rounded-lg shadow-lg overflow-hidden ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div
              className={`p-4 flex justify-between items-center border-b ${
                theme === "dark" ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <h3
                className={`text-lg font-semibold ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                {t("tenDayForecast")}
              </h3>
              <button
                onClick={toggleForecastModal}
                className={`${
                  theme === "dark"
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                &times;
              </button>
            </div>
            <div className="p-6">
              <ForecastDisplay forecastData={forecastData} />
            </div>
          </div>
        </div>
      )}

      {/* Weather Alerts Modal */}
      {showAlertsModal && weatherData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div
            className={`max-w-2xl w-full rounded-lg shadow-lg overflow-hidden ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div
              className={`p-4 flex justify-between items-center border-b ${
                theme === "dark" ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <h3
                className={`text-lg font-semibold ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                {t("weatherAlerts")}
              </h3>
              <button
                onClick={toggleAlertsModal}
                className={`${
                  theme === "dark"
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                &times;
              </button>
            </div>
            <div className="p-6">
              <WeatherAlerts
                lat={weatherData.coord.lat}
                lon={weatherData.coord.lon}
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;
