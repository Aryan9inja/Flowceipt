import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/store";
import { logoutThunk } from "../../store/thunks/authThunk";
import { useNavigate } from "react-router-dom";

const Home = () => {
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
    <div className="flex gap-2 text-2xl m-auto">
      This is protected '/' route
      <button className="border-4 border-border" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Home;
