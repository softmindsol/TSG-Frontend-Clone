import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux"; // 👈 thunk import
import { PATH } from "../../routes/paths";
import InputField from "../../components/common/InputField";
import PrimaryButton from "../../components/common/PrimaryButton";
import { registerAgent } from "../../store/features/agent/service";
import { selectAgentRegister } from "../../store/selector";

const Registration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const AgentRegister = useSelector(selectAgentRegister);

  // ⚙️ React Hook Form Setup
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      companyName: "",
      operatingArea: "",
      backgroundExperience: "",
      agentType: "individual",
    },
  });

  const agreeToTerms = watch("agreeToTerms", false);

  // 🚀 Submit Handler
  const onSubmit = async (data) => {
    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      companyName: data.companyName,
      operatingArea: data.operatingArea,
      backgroundExperience: data.backgroundExperience,
      agentType: data.agentType,
    };

    const result = await dispatch(registerAgent(payload));

    if (registerAgent.fulfilled.match(result)) {
      navigate(PATH.applicationSubmitted);
    }
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-4xl font-semibold text-dark">Registration Form</h2>
        <p className="text-gray-500 mt-2">
          Let’s get you all set up so you can access your personal account.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 gap-y-[.05rem]">
          {/* First Name */}
          <InputField
            label="First Name"
            name="firstName"
            {...register("firstName", { required: "First name is required" })}
            error={errors.firstName?.message}
          />

          {/* Last Name */}
          <InputField
            label="Last Name"
            name="lastName"
            {...register("lastName", { required: "Last name is required" })}
            error={errors.lastName?.message}
          />

          {/* Email */}
          <InputField
            label="Email Address"
            name="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" },
            })}
            error={errors.email?.message}
          />

          {/* Phone */}
          <InputField
            label="Phone Number"
            name="phoneNumber"
            type="tel"
            {...register("phoneNumber", {
              required: "Phone number is required",
            })}
            error={errors.phoneNumber?.message}
          />

          {/* Company Name */}
          <InputField
            label="Company/Trading Name"
            name="companyName"
            {...register("companyName")}
          />

          {/* Operating Area */}
          <InputField
            label="Operating Area"
            name="operatingArea"
            {...register("operatingArea")}
          />
        </div>

        {/* Background Experience */}
        <div className="relative">
          <label
            htmlFor="backgroundExperience"
            className="block text-sm font-medium text-dark mb-2"
          >
            Tell us about your background and experience
          </label>
          <textarea
            id="backgroundExperience"
            rows="3"
            {...register("backgroundExperience")}
            className="w-full p-4 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-dark"
            placeholder="Write here..."
          />
        </div>

        {/* Agent Type */}
        <div>
          <label className="block text-sm font-medium text-dark mb-3">
            Select Agent Type*
          </label>
          <div className="space-y-3">
            <div className="flex items-center">
              <input
                id="individual"
                type="radio"
                value="individual"
                {...register("agentType")}
                className="h-4 w-4 text-dark focus:ring-dark border-gray-300"
              />
              <label
                htmlFor="individual"
                className="ml-3 text-sm text-gray-700"
              >
                Individual Agent
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="agency"
                type="radio"
                value="agency"
                {...register("agentType")}
                className="h-4 w-4 text-dark focus:ring-dark border-gray-300"
              />
              <label htmlFor="agency" className="ml-3 text-sm text-gray-700">
                Team / Agency Account
              </label>
            </div>
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="flex items-center">
          <input
            id="agreeToTerms"
            type="checkbox"
            {...register("agreeToTerms", {
              required: "You must agree to the terms",
            })}
            className="h-4 w-4 text-dark focus:ring-dark border-gray-300 rounded"
          />
          <label
            htmlFor="agreeToTerms"
            className="ml-2 block text-sm text-dark"
          >
            I agree to the{" "}
            <a href="#" className="font-semibold text-blue-600 hover:underline">
              Terms & Conditions
            </a>{" "}
            and{" "}
            <a href="#" className="font-semibold text-blue-600 hover:underline">
              Privacy Policy
            </a>
            .
          </label>
        </div>
        {errors.agreeToTerms && (
          <p className="text-red-500 text-sm mt-1">
            {errors.agreeToTerms.message}
          </p>
        )}

        {/* Submit */}
        <PrimaryButton
          type="submit"
          loading={AgentRegister.isLoading}
          disabled={AgentRegister.isLoading}
        >
          Register
        </PrimaryButton>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link
            to={PATH.login}
            className="font-semibold text-blue-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Registration;
