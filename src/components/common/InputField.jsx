// src/components/common/InputField.jsx
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const InputField = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  name,
  className = "",
  error,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  const baseClasses =
    "w-full border border-gray-300 font-poppins text-base rounded-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-primary text-primary pr-12";

  return (
    <div className="relative w-full my-6">
      {/* Floating Label */}
      {label && (
        <label className="absolute -top-2 left-2 bg-white px-1 font-poppins text-sm text-primary">
          {label}
        </label>
      )}

      {/* Input */}
      <input
        type={inputType}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${baseClasses} ${
          error ? "border-red-500" : ""
        } ${className}`}
        {...rest}
      />

      {/* Password Toggle */}
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2  hover:text-gray-700 focus:outline-none"
        >
          {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
        </button>
      )}

      {/* Error Message */}
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default InputField;
