import { useTheme } from "../../../hooks/useTheme";
import DarkLogo from "../../../assets/DarkLogo.png";
import Logo from "../../../assets/Logo.png";
import { NavLink } from "react-router-dom";
import { Home, FileText, BarChart, User } from "lucide-react";

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: Home },
  { name: "Receipts", path: "/receipts", icon: FileText },
  { name: "Analytics", path: "/analytics", icon: BarChart },
  { name: "Profile", path: "/profile", icon: User },
];

const DesktopNav = () => {
  const { theme } = useTheme();

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
    </aside>
  );
};

export default DesktopNav;
