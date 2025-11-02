import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/common/InputField";
import { PATH } from "../../routes/paths";
import PrimaryButton from "../../components/common/PrimaryButton";

// MOCK API: Simulates saving the new password.
// In a real app, this would make a network request to your backend.
const resetPasswordAPI = async (password) => {
  console.log(`Resetting password to: ${password}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 1500); // Simulate a 1.5-second network delay
  });
};

const SetPassword = () => {
  const [password, setPassword] = useState("Test@123456JSX_");
  const [confirmPassword, setConfirmPassword] = useState("Test@123456JSX_");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the browser from reloading the page

    // 1. Validate that passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match. Please try again.");
      return;
    }

    // Clear any previous errors and set loading state
    setError("");
    setLoading(true);

    try {
      // 2. Call the API to update the password
      const response = await resetPasswordAPI(password);

      if (response.success) {
        // 3. On success, navigate to the success screen
        navigate(PATH.passwordResetSuccess);
      }
    } catch (apiError) {
      console.log("apiError: ", apiError);
      // Handle potential errors from the API
      setError("Something went wrong. Please try again later.");
    } finally {
      // 4. Reset loading state
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-4xl font-semibold text-dark mb-4">
          Set a password
        </h2>
        <p className="text-dark opacity-75">
          Your previous password has been reset. Please set a new password for
          your account.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Create Password Field */}
        <InputField
          type="password"
          name="password"
          label="Create Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your new password"
          required
        />

        {/* Re-enter Password Field */}
        <InputField
          type="password"
          name="confirmPassword" // It's good practice to have a unique name
          label="Re-enter Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your new password"
          required
        />

        {/* Display error message if it exists */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Submit Button */}
        <div className="pt-4">
          <PrimaryButton type="submit" loading={loading}>
            Submit
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
};

export default SetPassword;
