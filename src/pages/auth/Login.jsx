import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import InputField from "../../components/common/InputField";
import PrimaryButton from "../../components/common/PrimaryButton";
import SsoLogins from "../../components/common/SsoLogins";
import { PATH } from "../../routes/paths";
import { selectAgentLogin } from "../../store/selector";
import { loginAgent } from "../../store/features/agent/service";
import { useEffect } from "react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Selector to access login state
  const AgentLogin = useSelector(selectAgentLogin);
  const { isLoading, errorMessage, isSuccess } = AgentLogin;

  // ✅ React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // ✅ On form submit
  const onSubmit = async (formData) => {
    try {
      const result = await dispatch(loginAgent(formData)).unwrap();

      if (result) {
        toast.success("Login successful!");
        // Optional: navigate or set token here
        // navigate(PATH.dashboard);
      }
    } catch (err) {
      toast.error(err || "Login failed");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("agentToken");

    if (isSuccess || token) {
      navigate(PATH.agentDashboard, { replace: true });
    }
  }, [isSuccess, navigate]);

  return (
    <div className="flex justify-center items-center font-sans">
      <div className="w-full">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-semibold text-dark mb-2">Login</h1>
          <p className="text-gray-500">Login to access your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Field */}
          <InputField
            label="Email"
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
            error={errors.email?.message}
          />

          {/* Password Field */}
          <InputField
            label="Password"
            type="password"
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            error={errors.password?.message}
          />

          {/* Error Message from backend */}
          {errorMessage && (
            <p className="text-red-500 text-xs">{errorMessage}</p>
          )}

          {/* Submit Button */}
          <PrimaryButton type="submit" loading={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </PrimaryButton>

          <div className="text-center text-sm">
            <span className="text-dark">Don't have an account? </span>
            <Link
              to={PATH.register}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Register here
            </Link>
          </div>

          <SsoLogins withDivider />
        </form>
      </div>
    </div>
  );
};

export default Login;
