# Weatherly - Modern Weather Application

Weatherly is a modern, responsive weather application built with React that provides real-time weather information, forecasts, and interactive weather maps. It offers a sleek user interface with both light and dark themes.

![Weatherly Screenshot](screenshot.png)

## 🌟 Features

- **Real-time Weather Data**: Get current weather information for any location worldwide
- **Location-based Weather**: Automatically detect user's location for personalized forecasts
- **Interactive Weather Maps**: Explore temperature, precipitation, and wind patterns
- **10-Day Forecast**: Plan ahead with extended weather predictions
- **Weather Alerts**: Stay informed about severe weather conditions
- **Dark/Light Mode**: Choose your preferred theme for comfortable viewing
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile devices
- **Recent Searches**: Quick access to previously searched locations
- **Video Forecasts**: Multimedia weather presentations
- **Multilingual Support**: Available in 12 languages

## 🛠️ Technology Stack

- **React**: Component-based UI library for efficient rendering
- **React Router**: Client-side routing for seamless navigation
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **OpenWeatherMap API**: Reliable source for weather data
- **Leaflet.js**: Interactive mapping library
- **Lucide React**: Lightweight icon library
- **Context API**: State management for theme and global data

## 📋 Prerequisites

- Node.js (v14.0 or higher)
- npm or yarn

## ⚙️ Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/weatherly.git
   cd weatherly
   ```

2. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

3. Create a `.env` file in the root directory with your OpenWeatherMap API key:
   ```
   REACT_APP_OPENWEATHER_API_KEY=your_api_key_here
   ```
   > Note: The app includes a demo key for testing purposes, but it's recommended to use your own API key for production.

4. Start the development server:
   ```
   npm start
   ```
   or
   ```
   yarn start
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

## 📁 Project Structure

```
weatherly/
├── public/             # Static files and assets
│   ├── assets/         # Images and videos
│   │   ├── images/     # Image resources
│   │   └── videos/     # Video resources 
│   └── index.html      # HTML entry point
├── src/                # Source code
│   ├── components/     # Reusable UI components
│   ├── contexts/       # Context providers (theme, settings)
│   ├── pages/          # Page components
│   ├── services/       # API services and data fetching
│   ├── utils/          # Helper functions and utilities
│   ├── App.js          # Main application component
│   ├── index.js        # Application entry point
│   └── index.css       # Global styles
├── .env                # Environment variables
├── package.json        # Project dependencies and scripts
├── tailwind.config.js  # Tailwind CSS configuration
└── README.md           # Project documentation
```

## 🔄 API Integration

Weatherly uses the following OpenWeatherMap API endpoints:

- Current Weather: `api.openweathermap.org/data/2.5/weather`
- 5-Day Forecast: `api.openweathermap.org/data/2.5/forecast`
- Weather Alerts: `api.openweathermap.org/data/2.5/onecall`
- Weather Maps: `tile.openweathermap.org/map/{layer}/{z}/{x}/{y}.png`

## 🎨 Theme Configuration

The application supports light and dark themes. Theme preferences are stored in local storage for persistence between sessions. You can toggle the theme using the sun/moon icon in the navigation bar.

## 🌐 Language Support

Weatherly supports the following languages:
- English (en)
- Spanish (es)
- French (fr)
- German (de)
- Italian (it)
- Portuguese (pt)
- Russian (ru)
- Chinese (zh)
- Japanese (ja)
- Korean (ko)
- Arabic (ar)
- Hindi (hi)

Language preferences are stored in the user settings and can be changed through the settings modal.

## 📱 Responsive Design

Weatherly is fully responsive and provides an optimal viewing experience across a wide range of devices:

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🚀 Building for Production

To build the application for production, run:

```
npm run build
```
or
```
yarn build
```

This will create a `build` directory with optimized production files.

## 🧪 Testing

Run the test suite with:

```
npm test
```
or
```
yarn test
```

## 🔒 Privacy and Security

- Location data is only used for providing weather information
- No personal data is collected or stored
- HTTPS encryption for all API requests

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgements

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Map tiles from [OpenStreetMap](https://www.openstreetmap.org/)
- Icons from [Lucide](https://lucide.dev/)

## 👨‍💻 Author

Your Name - [GitHub](https://github.com/yourusername)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
