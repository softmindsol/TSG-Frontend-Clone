import { Link, useNavigate } from "react-router-dom";
import images from "../../assets/images";
import { PATH } from "../../routes/paths";
import PrimaryButton from "../../components/common/PrimaryButton";

const PasswordResetSuccess = () => {
  const navigate = useNavigate();
  return (
    <div className=" space-y-3">
      {/* Icon */}
      <div className="flex justify-start">
        <img
          src={images.SuccessTickIcon}
          alt="Success"
          className="w-16 h-16 "
        />
      </div>

      {/* Header */}
      <div>
        <h2 className="text-4xl font-semibold text-dark mb-4">
          Password Reset!
        </h2>
        <p className="text-dark opacity-75 max-w-sm ">
          Your password has been successfully reset. Click below to continue to
          login.
        </p>
      </div>

      {/* Continue Button */}
      <div className="pt-4">
        <PrimaryButton onClick={() => navigate(PATH.login)}>
          Continue
        </PrimaryButton>
      </div>
    </div>
  );
};

export default PasswordResetSuccess;
