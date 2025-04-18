// src/components/WeatherMap.js
import React, { useEffect, useRef } from "react";
import { useTheme } from "../contexts/ThemeContext";

const WeatherMap = ({ weatherData, isVisible }) => {
  const { theme } = useTheme();
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const layersRef = useRef({});

  useEffect(() => {
    let map;
    // Only initialize the map if it's visible
    if (isVisible && mapContainerRef.current) {
      // Dynamically import Leaflet to reduce initial bundle size
      const L = window.L; // Using Leaflet from CDN

      // Clean up any existing map
      if (mapRef.current) {
        mapRef.current.remove();
      }

      // Initialize the map centered on the weather data location or default view
      const initialView = weatherData
        ? [weatherData.coord.lat, weatherData.coord.lon]
        : [0, 0];
      const initialZoom = weatherData ? 8 : 2;

      map = L.map(mapContainerRef.current).setView(initialView, initialZoom);
      mapRef.current = map;

      // Add base layer (OpenStreetMap)
      const baseLayer = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?lang=en",
        {
          attribution: "© OpenStreetMap contributors",
          maxZoom: 19,
        }
      ).addTo(map);
      layersRef.current.baseLayer = baseLayer;

      // Add weather overlay layers
      const API_KEY = "95425a4f1ff33420efb87cc0706610af";

      // Temperature layer
      const tempLayer = L.tileLayer(
        `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${API_KEY}`,
        { maxZoom: 19, opacity: 0.5 }
      );
      layersRef.current.tempLayer = tempLayer;

      // Wind layer
      const windLayer = L.tileLayer(
        `https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${API_KEY}`,
        { maxZoom: 19, opacity: 0.5 }
      );
      layersRef.current.windLayer = windLayer;

      // Precipitation layer
      const precipLayer = L.tileLayer(
        `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${API_KEY}`,
        { maxZoom: 19, opacity: 0.5 }
      );
      layersRef.current.precipLayer = precipLayer;

      // Add default overlay
      tempLayer.addTo(map);

      // Define base layers and overlays for the layer control
      const baseLayers = {
        "Street Map": baseLayer,
      };

      const overlays = {
        Temperature: tempLayer,
        "Wind Speed": windLayer,
        Precipitation: precipLayer,
      };

      // Add layer control to map
      L.control
        .layers(baseLayers, overlays, {
          collapsed: false,
          position: "bottomright",
        })
        .addTo(map);

      // Add weather data marker if available
      if (weatherData) {
        const { lat, lon } = weatherData.coord;
        const marker = L.marker([lat, lon]).addTo(map);

        // Create popup content with weather info
        const popupContent = `
          <div class="map-popup">
            <h6 class="font-semibold mb-1">${weatherData.name}</h6>
            <div class="grid grid-cols-2 gap-1 text-sm">
              <div>
                <i class="bi bi-thermometer"></i> ${Math.round(
                  weatherData.main.temp
                )}°C<br>
                <i class="bi bi-wind"></i> ${weatherData.wind.speed} m/s
              </div>
              <div>
                <i class="bi bi-droplet"></i> ${weatherData.main.humidity}%<br>
                <i class="bi bi-clouds"></i> ${weatherData.clouds.all}%
              </div>
            </div>
          </div>
        `;

        marker.bindPopup(popupContent).openPopup();
      }
    }

    // Cleanup function
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [isVisible, weatherData]);

  // When the map container becomes visible or changes size, update the map
  useEffect(() => {
    if (isVisible && mapRef.current) {
      setTimeout(() => {
        mapRef.current.invalidateSize();
      }, 100);
    }
  }, [isVisible]);

  return (
    <div
      ref={mapContainerRef}
      className="w-full h-full"
      style={{ minHeight: "60vh" }}
    />
  );
};

export default WeatherMap;
