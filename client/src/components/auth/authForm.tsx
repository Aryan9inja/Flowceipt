import { useState } from "react";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, signUpSchema } from "../../schemas/authSchema";
import FormInputBox from "../ui/formInput";

type LoginData = {
  email: string;
  password: string;
};

type SignupData = {
  name: string;
  email: string;
  password: string;
};

interface AuthFormProps {
  initialMode?: "signup" | "login";
}

export default function AuthForm({ initialMode = "login" }: AuthFormProps) {
  const [isLogin, setIsLogin] = useState(initialMode === "login");

  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const {
    register: registerSignup,
    handleSubmit: handleSignupSubmit,
    formState: { errors: signupErrors },
  } = useForm<SignupData>({
    resolver: zodResolver(signUpSchema),
  });

  const onLoginSubmit = (data: LoginData) => {
    console.log("Login data:", data);
  };

  const onSignupSubmit = (data: SignupData) => {
    console.log("Signup data:", data);
  };

  return (
    <div className="bg-card max-w-sm w-full p-6 sm:p-8 rounded-2xl shadow-lg overflow-hidden text-text">
      {/* Title */}
      <div
        className="flex w-[200%] transition-all duration-500"
        style={{ marginLeft: isLogin ? "0%" : "-100%" }}
      >
        <div className="w-1/2 text-center text-xl sm:text-2xl font-semibold">
          Login Form
        </div>
        <div className="w-1/2 text-center text-xl sm:text-2xl font-semibold">
          Signup Form
        </div>
      </div>

      {/* Slide controls */}
      <div className="relative flex h-11 sm:h-12 mt-6 mb-3 border border-border rounded-xl overflow-hidden">
        <button
          type="button"
          onClick={() => setIsLogin(true)}
          className={clsx(
            "w-1/2 z-10 font-medium transition-all duration-500",
            isLogin ? "text-white" : "text-text"
          )}
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => setIsLogin(false)}
          className={clsx(
            "w-1/2 z-10 font-medium transition-all duration-500",
            !isLogin ? "text-white" : "text-text"
          )}
        >
          Signup
        </button>

        {/* Slider tab */}
        <div
          className="absolute top-0 h-full w-1/2 rounded-xl bg-primary transition-all duration-500"
          style={{ left: isLogin ? "0%" : "50%" }}
        />
      </div>

      {/* Forms */}
      <div className="overflow-hidden w-full">
        <div
          className="flex w-[200%] transition-all duration-500"
          style={{ marginLeft: isLogin ? "0%" : "-100%" }}
        >
          {/* Login Form */}
          <form
            onSubmit={handleLoginSubmit(onLoginSubmit)}
            className="w-1/2 pr-1 space-y-4"
          >
            <FormInputBox
              label="Email Address"
              id="login-email"
              placeholder="Enter your email"
              register={registerLogin("email")}
              error={loginErrors.email?.message as string}
            />
            <FormInputBox
              label="Password"
              id="login-password"
              type="password"
              placeholder="Enter your password"
              register={registerLogin("password")}
              error={loginErrors.password?.message as string}
            />
            <div className="text-sm justify-self-center">
              <h1 className="text-text">Welcome back!!!</h1>
            </div>
            <button
              type="submit"
              className="relative w-full h-11 sm:h-12 text-lg font-medium text-white rounded-xl overflow-hidden bg-primary hover:bg-primary-hover focus:ring-2 focus:ring-primary-focus transition"
            >
              Login
            </button>
            <div className="text-center text-sm">
              Not a member?{" "}
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className="text-primary hover:text-primary-hover"
              >
                Signup now
              </button>
            </div>
          </form>

          {/* Signup Form */}
          <form
            onSubmit={handleSignupSubmit(onSignupSubmit)}
            className="w-1/2 pl-1 space-y-4"
          >
            <FormInputBox
              label="Name"
              id="signup-name"
              placeholder="Enter your name"
              register={registerSignup("name")}
              error={signupErrors.name?.message as string}
            />
            <FormInputBox
              label="Email Address"
              id="signup-email"
              placeholder="Enter your email"
              register={registerSignup("email")}
              error={signupErrors.email?.message as string}
            />
            <FormInputBox
              label="Password"
              id="signup-password"
              type="password"
              placeholder="Enter your password"
              register={registerSignup("password")}
              error={signupErrors.password?.message as string}
            />
            <button
              type="submit"
              className="relative w-full h-11 sm:h-12 text-lg font-medium text-white rounded-xl overflow-hidden bg-primary hover:bg-primary-hover focus:ring-2 focus:ring-primary-focus transition"
            >
              Signup
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
