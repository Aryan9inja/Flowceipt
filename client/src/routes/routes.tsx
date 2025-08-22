import { Route, Routes } from "react-router-dom";
import AuthPage from "../pages/authPage";
import HomePage from "../pages/homePage";
import Dashboard from "../components/home/dashboard";
import ProtectedRoute from "../components/auth/protectedRoute";
import ProfilePage from "../pages/profilePage";
import ReceiptPage from "../pages/receiptsPage";

const publicRoutes = [
  { path: "/", element: <HomePage /> },
  { path: "/auth", element: <AuthPage /> },
];

const protectedRoutes = [
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/profile", element: <ProfilePage /> },
  { path: "/receipts", element: <ReceiptPage /> },
];

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
