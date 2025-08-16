import { useState } from "react";
import ThemeSlider from "../themeSlider";
import { Link } from "react-router-dom";
import Logo from "../../../assets/Logo.png";
import DarkLogo from "../../../assets/DarkLogo.png";
import { useTheme } from "../../../hooks/useTheme";
import { Menu, X } from "lucide-react";

function LandingNav() {
  const { theme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="h-16 flex items-center justify-between border-b border-b-border px-4 sm:px-8 relative">
      <Link to="/" className="flex items-center">
        <img
          src={theme === "dark" ? DarkLogo : Logo}
          className="h-8 w-auto"
          alt="Flowceipt logo"
        />
      </Link>

      <div className="flex items-center gap-4">
        <ThemeSlider />

        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/auth"
            aria-label="Register"
            state={{ initialMode: "signup" }}
            className="bg-primary hover:bg-primary-hover text-white/80 py-2 px-4 rounded-2xl"
          >
            Register
          </Link>
          <Link
            to="/auth"
            aria-label="Login"
            state={{ initialMode: "login" }}
            className="bg-primary hover:bg-primary-hover text-white/80 py-2 px-4 rounded-2xl"
          >
            Login
          </Link>
        </div>

        {/* Mobile hamburger button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <X size={22} color={theme === "dark" ? "white" : "black"} />
          ) : (
            <Menu size={22} color={theme === "dark" ? "white" : "black"} />
          )}
        </button>
      </div>

      {menuOpen && (
        <div className="absolute top-16 right-0 w-48 bg-white dark:bg-gray-900 border border-border rounded-lg shadow-md p-4 flex flex-col gap-3 md:hidden">
          <Link
            to="/register"
            className="bg-primary hover:bg-primary-hover text-white/80 py-2 px-4 rounded-2xl text-center"
            onClick={() => setMenuOpen(false)}
          >
            Register
          </Link>
          <Link
            to="/login"
            className="bg-primary hover:bg-primary-hover text-white/80 py-2 px-4 rounded-2xl text-center"
            onClick={() => setMenuOpen(false)}
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}

export default LandingNav;
