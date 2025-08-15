import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../store/store";
import Landing from "../components/home/landing";

const HomePage = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return <Landing />;
};

export default HomePage;
