import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";
import { logoutThunk } from "../store/thunks/authThunk";
import { useNavigate } from "react-router-dom";
import DesktopNav from "../components/ui/Navbars/desktopNav";
import MobileNav from "../components/ui/Navbars/mobileNav";

const ProfilePage = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logoutThunk());
      navigate("/", { replace: true });
      navigate("/auth", { state: { initialMode: "login" }, replace: false });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Desktop sidebar */}
      <div className="hidden sm:flex">
        <DesktopNav />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center items-center gap-4 p-4">
        <div className="text-2xl text-center">This is protected '/profile' route</div>
        <button
          className="border-2 border-border px-4 py-2 rounded hover:bg-primary-hover transition"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {/* Mobile bottom nav */}
      <div className="sm:hidden">
        <MobileNav />
      </div>
    </div>
  );
};

export default ProfilePage;
