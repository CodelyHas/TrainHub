import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AuthHeader from "../components/AuthHeader";
import LoginFormFields from "../components/auth/LoginFormFields";
import { loginSchema } from "../features/auth/loginSchema";
import type { LoginFormData } from "../features/auth/loginSchema";
import { saveAuthSession } from "../features/auth/authStorage";
import { loginApi } from "../features/auth/authApi";

function LoginPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const login = async (data: LoginFormData) => {
    try {
      const result = await loginApi(data);

      saveAuthSession(result.token, result.user);

      toast.success("Login successful");

      navigate("/dashboard");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Could not connect to the server";

      console.error("Login error:", error);
      toast.error(message);
    }
  };

  return (
    <div className="loginPage">
      <AuthHeader />

      <div className="loginBlock">
        <form className="loginForm" onSubmit={handleSubmit(login)} noValidate autoComplete="off">
          <div className="text-center mb-6">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <i className="fa-solid fa-user-shield text-2xl"></i>
            </div>

            <h1 className="text-3xl font-bold text-gray-900">
              Staff Login
            </h1>

            <p className="mt-2 text-sm font-medium text-gray-500">
              Authorized personnel only
            </p>
          </div>

          <LoginFormFields register={register} errors={errors} />

          <button
            className="mt-6 w-full rounded-lg bg-blue-600 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700 cursor-pointer disabled:opacity-60"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "LOGIN"}
          </button>

          <div className="mt-6 rounded-lg bg-gray-100 px-4 py-3 text-center">
            <p className="text-xs font-medium text-gray-600">
              Forgot password? Contact the administrator.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;