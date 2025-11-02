import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { PATH } from "../../routes/paths";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../components/common/InputField";
import PrimaryButton from "../../components/common/PrimaryButton";
// MOCK API: Simulates verifying the code and returning a token
const verifyCodeAPI = async (code) => {
  console.log(`Verifying code: ${code}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (code === "123456") {
        // Simulate a valid code
        resolve({
          success: true,
          resetToken: "aBcDeFgHiJkLmNoPqRsTuVwXyZ123456",
        });
      } else {
        reject(new Error("The verification code is incorrect."));
      }
    }, 1000); // Simulate 1-second delay
  });
};
const VerificationCode = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await verifyCodeAPI(code);
      if (response.success) {
        // On successful verification, navigate to the reset password page.
        // Pass the token securely via route state.
        navigate(PATH.resetPassword, {
          state: { resetToken: response.resetToken },
        });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <Link
        to={PATH.login}
        className="flex items-center gap-1 text-sm font-medium text-dark"
      >
        <FaArrowLeft />
        Back to login
      </Link>
      <div>
        <h2 className="text-4xl font-semibold text-dark mb-4">
          Verification code
        </h2>
        <p className="text-dark opacity-75">
          An authentication code has been sent to your email.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        <InputField
          type="text"
          name="code"
          label="Enter Code"
          id="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter your verification code"
        />

        {error && <p className="text-red-500 text-xs">{error}</p>}
        <p className="text-sm text-dark">
          Didn’t receive a code?{" "}
          <a href="#" className="font-semibold text-blue-600 hover:underline">
            Resend
          </a>
        </p>
        <div className="pt-4">
          <PrimaryButton type="submit" loading={loading}>
            Verify
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
};

export default VerificationCode;
