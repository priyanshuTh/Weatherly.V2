// src/utils/localStorage.js
/**
 * Get item from localStorage with error handling
 * @param {string} key - Local storage key
 * @param {any} defaultValue - Default value if key doesn't exist
 * @returns {any} Parsed value or default value
 */
export const getLocalStorage = (key, defaultValue) => {
  try {
    const value = localStorage.getItem(key);
    return value !== null ? JSON.parse(value) : defaultValue;
  } catch (error) {
    console.error(`Error getting item ${key} from localStorage:`, error);
    return defaultValue;
  }
};

/**
 * Set item in localStorage with error handling
 * @param {string} key - Local storage key
 * @param {any} value - Value to store
 * @returns {boolean} Success status
 */
export const setLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error setting item ${key} in localStorage:`, error);
    return false;
  }
};

/**
 * Remove item from localStorage with error handling
 * @param {string} key - Local storage key
 * @returns {boolean} Success status
 */
export const removeLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing item ${key} from localStorage:`, error);
    return false;
  }
};
