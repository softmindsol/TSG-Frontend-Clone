import { useState } from "react";

import SsoLogins from "../../components/common/SsoLogins";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { PATH } from "../../routes/paths";
import InputField from "../../components/common/InputField";
import PrimaryButton from "../../components/common/PrimaryButton";

const ForgotPassword = () => {
  const [email, setEmail] = useState("john.smith@gmail.com");
  const navigate = useNavigate();

  // ... other component logic

  const handleSubmit = async (e) => {
    e.preventDefault();
    // --- Logic to send reset email ---
    // On success:
    navigate(PATH.verifyCode);
  };
  return (
    <div className="space-y-8">
      {/* Back to Login */}
      <Link
        to={PATH.login}
        className="flex items-center gap-1 text-sm font-medium text-dark"
      >
        <FaArrowLeft />
        Back to login
      </Link>

      {/* Header */}
      <div>
        <h2 className="text-4xl font-semibold text-dark mb-4">
          Forgot your password?
        </h2>
        <p className="text-dark opacity-75">
          Don’t worry, happens to all of us. Enter your email below to recover
          your password
        </p>
      </div>

      <form className="space-y-8" onSubmit={handleSubmit}>
        {/* Email Field */}
        <InputField
          type="email"
          name="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />

        {/* Submit Button */}
        <PrimaryButton type="submit">Submit</PrimaryButton>
      </form>

      {/* Socials */}
      <SsoLogins withDivider />
    </div>
  );
};

export default ForgotPassword;
