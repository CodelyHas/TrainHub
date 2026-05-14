import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { LoginFormData } from "../../features/auth/loginSchema";

interface LoginFormFieldsProps {
  register: UseFormRegister<LoginFormData>;
  errors: FieldErrors<LoginFormData>;
}

function LoginFormFields({ register, errors }: LoginFormFieldsProps) {
  return (
    <>
      <div className="relative w-full">
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Email
        </label>

        <i className="fa-solid fa-envelope loginInputIcon"></i>

        <input
          type="email"
          autoComplete="new-email"
          placeholder="staff@trainhub.com"
          {...register("email")}
          className={`w-full rounded-lg border py-2 pl-10 pr-3 outline-none transition ${
            errors.email
              ? "border-red-500 bg-red-50"
              : "border-gray-300 focus:border-blue-500"
          }`}
        />

        {errors.email && (
          <p className="mt-1 text-sm font-medium text-red-600">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="relative w-full mt-4">
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Password
        </label>

        <i className="fa-solid fa-lock loginInputIcon"></i>

        <input
          type="password"
          autoComplete="new-password"
          placeholder="Enter your password"
          {...register("password")}
          className={`w-full rounded-lg border py-2 pl-10 pr-3 outline-none transition ${
            errors.password
              ? "border-red-500 bg-red-50"
              : "border-gray-300 focus:border-blue-500"
          }`}
        />

        {errors.password && (
          <p className="mt-1 text-sm font-medium text-red-600">
            {errors.password.message}
          </p>
        )}
      </div>
    </>
  );
}

export default LoginFormFields;