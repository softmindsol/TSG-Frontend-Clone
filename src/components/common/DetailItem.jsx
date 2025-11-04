import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const DetailItem = ({
  label,
  value,
  isEditing,
  className,
  type = "text",
  onChange,
  dealPage,
  ...props
}) => {
  // Helper: format date string for display
  const formatDateForDisplay = (dateValue) => {
    if (!dateValue) return "-";
    const date = new Date(dateValue);
    if (isNaN(date.getTime())) return dateValue;
    return date.toLocaleDateString("en-GB");
  };

  // Helper: format date for input[type=date]
  const formatDateForInput = (dateValue) => {
    if (!dateValue) return "";
    const date = new Date(dateValue);
    if (isNaN(date.getTime())) return dateValue;
    return date.toISOString().split("T")[0];
  };

  return (
    <div>
      <label className="text-sm font-medium text-gray-800 block mb-1">
        {label}
      </label>

      {isEditing ? (
        type === "phone" ? (
          <PhoneInput
            country={"us"}
            value={value}
            onChange={onChange}
            inputProps={{
              name: label,
              readOnly: props.readOnly,
              disabled: props.disabled,
              required: true,
            }}
            containerClass="w-full"
            inputClass={`!w-full  !h-10 px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 
              focus:outline-none focus:ring-2 focus:ring-blue-500 
              ${
                props.disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"
              } ${className}`}
          />
        ) : type === "date" ? (
          <input
            type="date"
            value={formatDateForInput(value)}
            onChange={(e) => onChange && onChange(e.target.value)}
            className={`w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
            {...props}
          />
        ) : (
          <input
            type={type}
            value={value ?? ""}
            onChange={(e) => onChange && onChange(e.target.value)}
            className={`${className} w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            {...props}
          />
        )
      ) : (
        <p
          className={`text-sm text-gray-600 h-10 ${
            dealPage ? "bg-[#f2f2f2]  rounded-md border-gray-300" : ""
          }  p-2  flex items-center ${className}`}
        >
          {type === "date" ? formatDateForDisplay(value) : value}
        </p>
      )}
    </div>
  );
};

export default DetailItem;
