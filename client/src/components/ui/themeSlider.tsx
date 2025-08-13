import { useTheme } from "../../hooks/useTheme";
import SunIcon from "../../assets/sun-shape-svgrepo-com.svg?react";
import MoonIcon from "../../assets/crescent-moon-svgrepo-com.svg?react";

export default function ThemeSlider() {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      {/* Slider for medium+ screens */}
      <label className="relative items-center cursor-pointer group hidden md:inline-flex">
        <input
          type="checkbox"
          checked={theme === "dark"}
          onChange={toggleTheme}
          className="sr-only"
        />

        <div className="w-16 h-8 bg-gray-300 group-has-[:checked]:bg-gray-500 rounded-full transition-colors duration-300"></div>

        <div
          className="absolute left-1 top-1 w-6 h-6 rounded-full shadow-md flex items-center justify-center
          bg-gray-100 dark:bg-gray-900
          transition-transform duration-300 group-has-[:checked]:translate-x-8"
        >
          <SunIcon className="w-4 h-4 group-has-[:checked]:hidden" />
          <MoonIcon className="hidden w-4 h-4 group-has-[:checked]:block" />
        </div>
      </label>

      {/* Icon button for small screens */}
      <button
        onClick={toggleTheme}
        className="md:hidden p-2 rounded-full bg-gray-200 dark:bg-gray-800 shadow"
        aria-label="Toggle theme"
      >
        {theme === "light" ? (
          <SunIcon className="w-5 h-5" />
        ) : (
          <MoonIcon className="w-5 h-5" />
        )}
      </button>
    </>
  );
}
