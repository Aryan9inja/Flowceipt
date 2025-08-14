import AuthForm from "../components/auth/authForm";
import { useLocation } from "react-router-dom";

const AuthPage = () => {
  const location = useLocation();
  const initialMode = location.state?.initialMode || "login";

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center">
      <AuthForm initialMode={initialMode} />
    </div>
  );
};

export default AuthPage;
