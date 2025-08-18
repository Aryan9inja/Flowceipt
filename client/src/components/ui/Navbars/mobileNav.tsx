import { NavLink } from "react-router-dom";
import { Home, FileText, BarChart, User, Sun, Moon } from "lucide-react";
import { useTheme } from "../../../hooks/useTheme";

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: Home },
  { name: "Receipts", path: "/receipts", icon: FileText },
  { name: "Analytics", path: "/analytics", icon: BarChart },
  { name: "Profile", path: "/profile", icon: User },
];

const MobileNav = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-bg border-t flex justify-around items-center py-2 sm:hidden">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center text-xs text-text transition-colors ${
                isActive ? "text-primary" : "hover:text-primary-hover"
              }`
            }
          >
            <Icon className="w-6 h-6 mb-1" />
            <span>{item.name}</span>
          </NavLink>
        );
      })}

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="flex flex-col items-center text-xs text-text hover:text-primary-hover transition-colors"
      >
        {theme === "dark" ? (
          <>
            <Sun className="w-6 h-6 mb-1 text-yellow-400" />
            <span>Light</span>
          </>
        ) : (
          <>
            <Moon className="w-6 h-6 mb-1 text-indigo-500" />
            <span>Dark</span>
          </>
        )}
      </button>
    </nav>
  );
};

export default MobileNav;
