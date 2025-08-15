import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCurrentUser,
  loginUser,
  registerUser,
  logoutUser,
  refreshTokens,
} from "../../services/authService";
import type {
  RegisterFormData,
  LoginCredentials,
} from "../../services/authService";

export const signUpThunk = createAsyncThunk(
  "auth/signup",
  async ({ name, email, password }: RegisterFormData, { rejectWithValue }) => {
    try {
      await registerUser({ name, email, password });
      const user = await getCurrentUser();
      return user;
    } catch (error: any) {
      return rejectWithValue(error?.message || "User registration failed");
    }
  }
);

export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }: LoginCredentials, { rejectWithValue }) => {
    try {
      await loginUser({ email, password });
      const user = getCurrentUser();
      return user;
    } catch (error: any) {
      return rejectWithValue(error?.message || "Login failed");
    }
  }
);

export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await logoutUser();
      return true;
    } catch (error: any) {
      return rejectWithValue(error?.message || "Logout failed");
    }
  }
);

export const refreshTokensThunk = createAsyncThunk(
  "auth/refresh-tokens",
  async (_, { rejectWithValue }) => {
    try {
      await refreshTokens();
      const user = getCurrentUser();
      return user;
    } catch (error: any) {
      return rejectWithValue(error?.message || "Token Refresh failed");
    }
  }
);

export const getUserThunk = createAsyncThunk(
  "auth/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const user = await getCurrentUser();
      return user;
    } catch (error: any) {
      return rejectWithValue(error?.message || "Failed to get user details");
    }
  }
);
