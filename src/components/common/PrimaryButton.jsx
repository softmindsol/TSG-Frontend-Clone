import React from "react";

const PrimaryButton = ({
  children,
  type = "button",
  onClick,
  disabled = false,
  loading = false,
  className = "",
  ...rest
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`w-full bg-dark text-white py-3 rounded-md hover:opacity-90 transition-opacity disabled:opacity-50 ${className}`}
      {...rest}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default PrimaryButton;
