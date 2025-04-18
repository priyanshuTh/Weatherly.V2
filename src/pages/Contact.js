import React, { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useTranslation } from "../utils/i18n";

const Contact = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Contact form submission logic would go here
    console.log("Contact form submitted:", formData);

    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

    // Show success message
    alert("Thank you for your message. We will get back to you soon!");
  };

  return (
    <div
      className={`min-h-screen py-12 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>

          <div
            className={`p-6 rounded-lg shadow-lg ${
              theme === "dark"
                ? "bg-gray-800"
                : "bg-white border border-gray-200"
            }`}
          >
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block mb-2 text-sm font-medium">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    className={`w-full px-3 py-2 border rounded-lg ${
                      theme === "dark"
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    className={`w-full px-3 py-2 border rounded-lg ${
                      theme === "dark"
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  className={`w-full px-3 py-2 border rounded-lg ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium">
                  Message
                </label>
                <textarea
                  name="message"
                  rows="5"
                  className={`w-full px-3 py-2 border rounded-lg ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className={`py-2 px-6 rounded-lg font-medium ${
                  theme === "dark"
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              className={`p-4 rounded-lg text-center ${
                theme === "dark" ? "bg-gray-800" : "bg-gray-100"
              }`}
            >
              <h3 className="font-semibold mb-2">Email Us</h3>
              <p
                className={`${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                support@weatherly.com
              </p>
            </div>

            <div
              className={`p-4 rounded-lg text-center ${
                theme === "dark" ? "bg-gray-800" : "bg-gray-100"
              }`}
            >
              <h3 className="font-semibold mb-2">Call Us</h3>
              <p
                className={`${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                +1 (123) 456-7890
              </p>
            </div>

            <div
              className={`p-4 rounded-lg text-center ${
                theme === "dark" ? "bg-gray-800" : "bg-gray-100"
              }`}
            >
              <h3 className="font-semibold mb-2">Visit Us</h3>
              <p
                className={`${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                123 Weather St, San Francisco, CA
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
