// hooks/useTheme.ts
import { useSelector, useDispatch } from "react-redux";
import { type RootState, type AppDispatch } from "../store/store";
import { toggleTheme, setTheme } from "../store/slices/themeSlice";

export function useTheme() {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const dispatch: AppDispatch = useDispatch();

  return {
    theme,
    toggleTheme: () => dispatch(toggleTheme()),
    setTheme: (t: "light" | "dark") => dispatch(setTheme(t)),
  };
}
