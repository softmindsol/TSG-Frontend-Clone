import { Link } from "react-router-dom";
import images from "../../assets/images";
import { PATH } from "../../routes/paths";

const ApplicationSubmitted = () => {
  return (
    <div>
      <div className="text-center space-y-8 py-12">
        {/* Icon */}
        <div className="flex justify-center">
          <img src={images.SuccessTickIcon} />
        </div>

        {/* Header */}
        <div>
          <h2 className="text-4xl font-semibold text-dark mb-4">
            Application Submitted!
          </h2>
          <p className="text-dark opacity-75 max-w-lg mx-auto">
            Your application has been successfully submitted to the admin. Once
            approved, your login credentials will be sent to your registered
            email. Thank you for applying.
          </p>
        </div>
      </div>
      <p className="text-center text-sm">
        Go to?{"    "}
        <Link
          to={PATH.login}
          className="font-semibold text-blue-600 hover:underline"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default ApplicationSubmitted;
