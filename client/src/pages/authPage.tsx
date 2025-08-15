import AuthForm from "../components/auth/authForm";
import { useLocation } from "react-router-dom";
import { Toaster, toast } from "sonner";

const AuthPage = () => {
  const location = useLocation();
  const initialMode = location.state?.initialMode || "login";

  const handleAuthResult = (status: "success" | "error", message: string) => {
    if (status === "success") toast.success(message);
    if (status === "error") toast.error(message);
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center">
      <Toaster position="top-center" richColors />
      <AuthForm
        initialMode={initialMode}
        onAuthResult={handleAuthResult}
      />
    </div>
  );
};

export default AuthPage;
