import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/store";
import { logoutThunk } from "../../store/thunks/authThunk";
import { useNavigate } from "react-router-dom";

const ActivityPanel = () => {
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
    <div className="p-6 flex flex-col gap-6 text-text items-center">
      <h3 className="font-semibold text-lg">Account Settings</h3>
      <h2>(------This section is under construction------)</h2>

      <div>
        <button onClick={handleLogout} className="bg-error p-2 mt-4 rounded hover:bg-error-hover text-bg">
          Logout
        </button>
      </div>
    </div>
  );
};

export default ActivityPanel;
