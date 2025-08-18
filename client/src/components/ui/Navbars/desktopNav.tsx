import { useTheme } from "../../../hooks/useTheme";
import DarkLogo from "../../../assets/DarkLogo.png";
import Logo from "../../../assets/Logo.png";
import { NavLink } from "react-router-dom";
import { Home, FileText, BarChart, User, Sun, Moon } from "lucide-react";

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: Home },
  { name: "Receipts", path: "/receipts", icon: FileText },
  { name: "Analytics", path: "/analytics", icon: BarChart },
  { name: "Profile", path: "/profile", icon: User },
];

const DesktopNav = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <aside className="left-0 bg-bg border-r h-screen w-52 flex flex-col gap-8">
      {/* Logo */}
      <div className="pt-6 px-4">
        <img
          src={theme === "dark" ? DarkLogo : Logo}
          className="h-10 object-contain"
          alt="Flowceipt logo"
        />
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        <ul className="flex flex-col gap-2 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 text-text text-lg p-2 rounded hover:bg-primary-hover transition-colors ${
                      isActive ? "bg-primary text-white" : ""
                    }`
                  }
                >
                  <Icon className="w-5 h-5" />
                  {item.name}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Theme Toggle */}
      <div className="px-4 pb-6">
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 w-full p-2 rounded-lg bg-card hover:bg-primary-hover transition-colors text-text"
        >
          {theme === "dark" ? (
            <>
              <Sun className="w-5 h-5 text-yellow-400" />
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <Moon className="w-5 h-5 text-indigo-500" />
              <span>Dark Mode</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
};

export default DesktopNav;
