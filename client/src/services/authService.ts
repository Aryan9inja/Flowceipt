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

export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface ApiError {
  message: string;
}

/**
 * Register a new user
 */
export const registerUser = async (
  formData: RegisterFormData
): Promise<User> => {
  try {
    const { data } = await axios.post<{ data: { user: User } }>(
      "/users/register",
      formData
    );
    return data.data.user;
  } catch (error: any) {
    throw error?.response?.data || { message: "Error registering user" };
  }
};

/**
 * Login user
 */
export const loginUser = async (
  credentials: LoginCredentials
): Promise<User> => {
  try {
    const { data } = await axios.post<{ data: { user: User } }>(
      "/users/login",
      credentials
    );
    return data.data.user;
  } catch (error: any) {
    throw error?.response?.data || { message: "Error logging in" };
  }
};

/**
 * Refresh access token using refresh token
 */
export const refreshTokens = async (): Promise<User> => {
  try {
    const { data } = await axios.post<{ data: { user: User } }>(
      "/users/refresh-tokens"
    );
    return data.data.user;
  } catch (error: any) {
    throw error?.response?.data || { message: "Error refreshing tokens" };
  }
};

/**
 * Logout the current user
 */
export const logoutUser = async (): Promise<{ message: string }> => {
  try {
    const { data } = await axios.post<{ message: string }>("/users/logout");
    return data;
  } catch (error: any) {
    throw error?.response?.data || { message: "Error logging out" };
  }
};

/**
 * Get details of the current authenticated user
 */
export const getCurrentUser = async (): Promise<User> => {
  try {
    const { data } = await axios.get<{ data: { user: User } }>("/users/me");
    return data.data.user;
  } catch (error: any) {
    throw error?.response?.data || { message: "Error fetching current user" };
  }
};
