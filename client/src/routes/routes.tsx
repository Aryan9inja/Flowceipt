import { Route, Routes } from "react-router-dom";
import AuthPage from "../pages/authPage";
import HomePage from "../pages/homePage";
import Home from "../components/home/dashboard";
import ProtectedRoute from "../components/auth/protectedRoute";

const publicRoutes = [
  { path: "/", element: <HomePage /> },
  { path: "/auth", element: <AuthPage /> },
];

const protectedRoutes = [{ path: "/dashboard", element: <Home /> }];

const AppRoutes = () => {
  return (
    <Routes>
      {publicRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}

      <Route element={<ProtectedRoute />}>
        {protectedRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
