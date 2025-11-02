import React, { forwardRef } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const FormInput = forwardRef(
  (
    {
      label,
      type = "text",
      placeholder,
      value,
      id,
      disabled = false,
      readOnly = false,
      onChange,
      ...props
    },
    ref
  ) => (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="block text-base font-medium text-[#081722] mb-2"
        >
          {label}
        </label>
      )}

      {type === "phone" ? (
        <PhoneInput
          country={"us"}
          value={value}
          onChange={onChange}
          inputProps={{
            name: props.name || id,
            id,
            readOnly,
            disabled,
            required: true,
          }}
          {...props}
          containerClass="w-full"
          inputClass={`!w-full !h-11  !py-3 border border-gray-300 rounded-md text-sm text-gray-700 placeholder-gray-400 
            focus:outline-none focus:ring-2 focus:ring-blue-500
            ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}`}
        />
      ) : (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
           value={value}                // ✅ added
          onChange={onChange}    
          ref={ref} // ✅ this is the missing piece
          className={`w-full h-11 px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500
            ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}`}
          {...props}
        />
      )}
    </div>
  )
);

export default FormInput;
