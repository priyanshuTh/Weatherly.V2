import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { useTranslation } from "../utils/i18n";

const NotFound = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <div
      className={`min-h-screen flex items-center justify-center py-12 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="text-center px-4">
        <h1 className="text-9xl font-bold mb-4">404</h1>
        <h2 className="text-3xl font-semibold mb-4">{t("pageNotFound")}</h2>
        <p
          className={`mb-8 ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {t("pageNotFoundDesc")}
        </p>
        <Link
          to="/"
          className={`px-6 py-3 rounded-lg font-medium ${
            theme === "dark"
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          {t("backToHome")}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
