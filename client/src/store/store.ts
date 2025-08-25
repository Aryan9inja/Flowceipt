import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";
import authReducer from "./slices/authSlice";
import receiptReducer from "./slices/receiptSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    receipt: receiptReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
