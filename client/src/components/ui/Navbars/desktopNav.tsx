import { useTheme } from "../../../hooks/useTheme";
import DarkLogo from "../../../assets/DarkLogo.png";
import Logo from "../../../assets/Logo.png";
import { NavLink } from "react-router-dom";
import { Home, FileText, User, Sun, Moon } from "lucide-react";

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: Home },
  { name: "Receipts", path: "/receipts", icon: FileText },
  { name: "Profile", path: "/profile", icon: User },
];

const DesktopNav = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <aside className="fixed left-0 bg-card h-full w-64 flex flex-col justify-between py-10 px-6 shadow-xl gap-8">
      {/* Logo */}
      <div className="flex items-center justify-center pb-4">
        <img
          src={theme === "dark" ? DarkLogo : Logo}
          className="h-12 object-contain"
          alt="Flowceipt logo"
        />
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        <ul className="flex flex-col gap-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 text-text text-lg p-3 rounded-xl hover:bg-primary-hover transition-colors ${
                      isActive ? "bg-primary text-white" : ""
                    }`
                  }
                >
                  <Icon className="w-6 h-6" />
                  {item.name}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Theme Toggle */}
      <div className="pt-4">
        <button
          onClick={toggleTheme}
          className="flex items-center gap-3 w-full p-3 rounded-xl bg-bg hover:bg-primary-hover transition-colors text-text"
        >
          {theme === "dark" ? (
            <>
              <Sun className="w-6 h-6 text-yellow-400" />
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <Moon className="w-6 h-6 text-indigo-500" />
              <span>Dark Mode</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
};

export default DesktopNav;
