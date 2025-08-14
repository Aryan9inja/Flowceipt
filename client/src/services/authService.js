// src/services/userService.js
import { axios } from "../lib/axios";

/**
 * Register a new user
 * @param {Object} formData - { name, email, password }
 */
export const registerUser = async (formData) => {
  try {
    const response = await axios.post("/users/register", formData);
    return response.data;
  } catch (error) {
    throw error?.response?.data || { message: "Error registering user" };
  }
};

/**
 * Login user
 * @param {Object} credentials - { email, password }
 */
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post("/users/login", credentials);
    return response.data;
  } catch (error) {
    throw error?.response?.data || { message: "Error logging in" };
  }
};

/**
 * Refresh access token using refresh token
 */
export const refreshTokens = async () => {
  try {
    const response = await axios.post("/users/refresh-tokens");
    return response.data;
  } catch (error) {
    throw error?.response?.data || { message: "Error refreshing tokens" };
  }
};

/**
 * Logout the current user
 */
export const logoutUser = async () => {
  try {
    const response = await axios.post("/users/logout");
    return response.data;
  } catch (error) {
    throw error?.response?.data || { message: "Error logging out" };
  }
};

/**
 * Get details of the current authenticated user
 */
export const getCurrentUser = async () => {
  try {
    const response = await axios.get("/users/me");
    return response.data;
  } catch (error) {
    throw error?.response?.data || { message: "Error fetching current user" };
  }
};
