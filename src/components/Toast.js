import React, { useEffect } from "react";

const Toast = ({ message, show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed top-4 right-4 max-w-xs bg-gray-800 text-white p-3 rounded-lg shadow-lg z-50 flex items-center animate-fade-in">
      <div className="mr-2">{message}</div>
      <button
        onClick={onClose}
        className="ml-auto text-white/70 hover:text-white"
      >
        &times;
      </button>
    </div>
  );
};

export default Toast;
