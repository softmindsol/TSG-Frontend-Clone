import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GlobalButton from "./GlobalButton";
import FormInput from "./FormInput";
import Icons from "../../assets/icons/Icons";
import {
  addTeamMember,
  fetchTeamMembers,
} from "../../store/features/member/service";
import { selectTeamIsAdding } from "../../store/features/member/slice";

const AddNewTeamMemberModal = ({ isOpen, onClose, agentId, onSuccess }) => {
  const dispatch = useDispatch();
  const isAdding = useSelector(selectTeamIsAdding);

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    companyName: "",
    operatingArea: "",
  });
  console.log("🚀 ~ AddNewTeamMemberModal ~ values:", values);

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const setField = (key, val) => setValues((prev) => ({ ...prev, [key]: val }));

  const validate = () => {
    const newErrors = {};

    if (!values.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!values.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!values.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      newErrors.email = "Invalid email format";

    if (!values.companyName.trim())
      newErrors.companyName = "Company name is required";

    if (!values.operatingArea.trim())
      newErrors.operatingArea = "Operating area is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // ✅ fixed missing parentheses
    // if (!validate()) return;

    const payload = {
      agentId,
      newSubAgent: {
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        email: values.email.trim(),
        phoneNumber: values.phoneNumber.trim(),
        companyName: values.companyName.trim(),
        operatingArea: values.operatingArea.trim(),
      },
    };

    const action = await dispatch(addTeamMember(payload));

    if (addTeamMember.fulfilled.match(action)) {
      await dispatch(fetchTeamMembers({ agentId }));
      onSuccess?.(action.payload);
      onClose();

      // reset form
      setValues({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        companyName: "",
        operatingArea: "",
      });
      setErrors({});
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 p-4 font-poppins">
      {/* Overlay */}
      <div className="absolute inset-0 h-screen bg-black opacity-80"></div>

      {/* Modal */}
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 relative animate-fadeIn">
        {/* Header */}
        <div className="flex items-start pb-6 border-b border-gray-200">
          <div className="bg-blue-100 p-3 rounded-lg mr-4">
            <Icons.UserIcon className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Add New Member
            </h2>
            <p className="text-base text-gray-500">Send invite to agents</p>
          </div>
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-500 hover:text-gray-800 disabled:opacity-50"
            disabled={isAdding}
          >
            <Icons.Crossicon size={24} />
          </button>
        </div>

        {/* Form */}
        <form className="py-6 space-y-6" onSubmit={handleSubmit}>
          {/* Basic Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Member Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* First Name */}
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-base font-medium text-[#081722] mb-2"
                >
                  First Name *
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="Ali"
                  value={values.firstName}
                  onChange={(e) => setField("firstName", e.target.value)}
                  className="w-full h-11 px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 placeholder-gray-400 
          focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-base font-medium text-[#081722] mb-2"
                >
                  Last Name *
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Khan"
                  value={values.lastName}
                  onChange={(e) => setField("lastName", e.target.value)}
                  className="w-full h-11 px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 placeholder-gray-400 
          focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-base font-medium text-[#081722] mb-2"
                >
                  Email Address *
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="ali.khan@example.com"
                  value={values.email}
                  onChange={(e) => setField("email", e.target.value)}
                  className="w-full h-11 px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 placeholder-gray-400 
          focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-base font-medium text-[#081722] mb-2"
                >
                  Phone Number
                </label>
                <input
                  id="phoneNumber"
                  type="text"
                  placeholder="+92xxxxxxxxxx"
                  value={values.phoneNumber}
                  onChange={(e) => setField("phoneNumber", e.target.value)}
                  className="w-full h-11 px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 placeholder-gray-400 
          focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Company & Area
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Company Name */}
              <div>
                <label
                  htmlFor="companyName"
                  className="block text-base font-medium text-[#081722] mb-2"
                >
                  Company Name *
                </label>
                <input
                  id="companyName"
                  type="text"
                  placeholder="Soft Mind Sub"
                  value={values.companyName}
                  onChange={(e) => setField("companyName", e.target.value)}
                  className="w-full h-11 px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 placeholder-gray-400 
          focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.companyName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.companyName}
                  </p>
                )}
              </div>

              {/* Operating Area */}
              <div>
                <label
                  htmlFor="operatingArea"
                  className="block text-base font-medium text-[#081722] mb-2"
                >
                  Operating Area *
                </label>
                <input
                  id="operatingArea"
                  type="text"
                  placeholder="Karachi"
                  value={values.operatingArea}
                  onChange={(e) => setField("operatingArea", e.target.value)}
                  className="w-full h-11 px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 placeholder-gray-400 
          focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.operatingArea && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.operatingArea}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end items-center pt-6 border-t border-gray-200 space-x-4">
            <GlobalButton
              type="button"
              variant="secondary"
              onClick={onClose}
              className="px-8"
              disabled={isAdding}
            >
              Cancel
            </GlobalButton>
            <GlobalButton
              type="submit"
              variant="primary"
              className="px-10"
              disabled={isAdding}
            >
              {isAdding ? "Sending…" : "Send Invite"}
            </GlobalButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewTeamMemberModal;
