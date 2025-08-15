import { axios } from "../lib/axios";

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    _id: string;
    name: string;
    email: string;
  };
  accessToken: string;
}

export interface ApiError {
  message: string;
}

/**
 * Register a new user
 */
export const registerUser = async (
  formData: RegisterFormData
): Promise<AuthResponse> => {
  try {
    const response = await axios.post<AuthResponse>("/users/register", formData);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || { message: "Error registering user" };
  }
};

/**
 * Login user
 */
export const loginUser = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  try {
    const response = await axios.post<AuthResponse>("/users/login", credentials);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || { message: "Error logging in" };
  }
};

/**
 * Refresh access token using refresh token
 */
export const refreshTokens = async (): Promise<AuthResponse> => {
  try {
    const response = await axios.post<AuthResponse>("/users/refresh-tokens");
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || { message: "Error refreshing tokens" };
  }
};

/**
 * Logout the current user
 */
export const logoutUser = async (): Promise<{ message: string }> => {
  try {
    const response = await axios.post<{ message: string }>("/users/logout");
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || { message: "Error logging out" };
  }
};

/**
 * Get details of the current authenticated user
 */
export const getCurrentUser = async (): Promise<AuthResponse["user"]> => {
  try {
    const response = await axios.get<AuthResponse["user"]>("/users/me");
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || { message: "Error fetching current user" };
  }
};
