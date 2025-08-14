import { Route, Routes } from "react-router-dom";
import AuthPage from "../pages/authPage";
import HomePage from "../pages/homePage";

const publicRoutes = [
  { path: "/", element: <HomePage /> },
  { path: "/auth", element: <AuthPage /> },
];

const AppRoutes = () => {
  return (
    <Routes>
      {publicRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  );
};

export default AppRoutes;
