import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    appName: "Weatherly",
    search: "Search for a place",
    findForecast: "Find a Forecast",
    recentPlaces: "YOUR RECENT PLACES",
    noRecentSearches: "Your recent searches will appear here",
    weatherFeatures: "Weather Features",
    warnings: "Warnings & Alerts",
    warningsDesc:
      "Stay informed about severe weather warnings and alerts in your area.",
    weatherMaps: "Weather Maps",
    mapsDesc:
      "Interactive maps showing precipitation, temperature, wind, and more.",
    forecast: "10-Day Forecast",
    forecastDesc: "Plan ahead with accurate 10-day weather forecasts.",
    videoForecast: "Video Forecast",
    todaysForecast: "Today's Weather Forecast",
    temperature: "Temperature",
    feelsLike: "Feels Like",
    humidity: "Humidity",
    pressure: "Pressure",
    minMax: "Min/Max",
    wind: "Wind",
    clouds: "Clouds",
    sunrise: "Sunrise",
    sunset: "Sunset",
    viewWarnings: "View Warnings",
    exploreMaps: "Explore Maps",
    viewForecast: "View Forecast",
    aboutUs: "About Us",
    login: "Login",
    signup: "Sign Up",
    settings: "Settings",
    loadingMessage: "Loading your weather companion...",
    allowLocationAccess: "Allow Location Access",
    locationAccessDescription:
      "Weatherly would like to access your location to provide personalized weather forecasts.",
    locationDataUsage:
      "Your location data will only be used to show relevant weather information and will not be stored permanently.",
    block: "Block",
    allow: "Allow",
    interactiveWeatherMap: "Interactive Weather Map",
    tenDayForecast: "10-Day Forecast",
    weatherAlerts: "Weather Alerts",
    pageNotFound: "Page Not Found",
    pageNotFoundDesc: "Sorry, the page you are looking for does not exist.",
    backToHome: "Back to Home",
    enterLocationMessage: "Please enter a location to search",
    searchingFor: "Searching for",
    failedToGetWeather: "Failed to get weather data",
    locationWeatherError:
      "Couldn't get location weather. Search manually instead.",
  },
  es: {
    appName: "Weatherly",
    search: "Buscar un lugar",
    findForecast: "Encontrar un Pronóstico",
    recentPlaces: "TUS LUGARES RECIENTES",
    noRecentSearches: "Tus búsquedas recientes aparecerán aquí",
    weatherFeatures: "Características del Clima",
    warnings: "Advertencias y Alertas",
    warningsDesc:
      "Mantente informado sobre advertencias y alertas de clima severo en tu área.",
    weatherMaps: "Mapas Meteorológicos",
    mapsDesc:
      "Mapas interactivos que muestran precipitación, temperatura, viento y más.",
    forecast: "Pronóstico de 10 días",
    forecastDesc:
      "Planifica con anticipación con pronósticos precisos de 10 días.",
    videoForecast: "Pronóstico en Video",
    todaysForecast: "Pronóstico del Tiempo de Hoy",
    temperature: "Temperatura",
    feelsLike: "Sensación Térmica",
    humidity: "Humedad",
    pressure: "Presión",
    minMax: "Mín/Máx",
    wind: "Viento",
    clouds: "Nubes",
    sunrise: "Amanecer",
    sunset: "Atardecer",
    viewWarnings: "Ver Advertencias",
    exploreMaps: "Explorar Mapas",
    viewForecast: "Ver Pronóstico",
    // Add more translations as needed
  },
  // Add other languages as needed
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
