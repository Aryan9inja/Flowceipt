import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={"/auth"} state={{ initialMode: "login" }} replace />
  );
};

export default ProtectedRoute;
