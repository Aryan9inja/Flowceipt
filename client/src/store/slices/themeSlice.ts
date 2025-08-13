import { createSlice,type PayloadAction } from "@reduxjs/toolkit";

type ThemeType = "light" | "dark";

interface ThemeState {
  theme: ThemeType;
}

const storedTheme = (localStorage.getItem("theme") as ThemeType) || "light";

document.documentElement.classList.toggle("dark", storedTheme === "dark");

const initialState: ThemeState = {
  theme: storedTheme,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      document.documentElement.classList.toggle("dark", state.theme === "dark");
      localStorage.setItem("theme", state.theme);
    },
    setTheme: (state, action: PayloadAction<ThemeType>) => {
      state.theme = action.payload;
      document.documentElement.classList.toggle(
        "dark",
        action.payload === "dark"
      );
      localStorage.setItem("theme", action.payload);
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
