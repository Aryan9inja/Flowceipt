import { NavLink } from "react-router-dom";
import { Home, FileText, BarChart, User } from "lucide-react";

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: Home },
  { name: "Receipts", path: "/receipts", icon: FileText },
  { name: "Analytics", path: "/analytics", icon: BarChart },
  { name: "Profile", path: "/profile", icon: User },
];

const MobileNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-bg border-t flex justify-around items-center py-2 sm:hidden">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center text-sm text-text transition-colors ${
                isActive ? "text-primary" : "hover:text-primary-hover"
              }`
            }
          >
            <Icon className="w-6 h-6 mb-1" />
            <span>{item.name}</span>
          </NavLink>
        );
      })}
    </nav>
  );
};

export default MobileNav;
