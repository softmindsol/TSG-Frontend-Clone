import React, { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";

const SelectInput = ({
  label,
  placeholder = "Select an option",
  id,
  options = [],
  value,
  onChange,
  className = "",
  multiSelect = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(value || "");
  const [multiValues, setMultiValues] = useState(value || []);
  const [otherValue, setOtherValue] = useState("");
  const [localOptions, setLocalOptions] = useState(options);
  const ref = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🔹 Single select behavior
  const handleSelect = (val) => {
    setSelected(val);
    setIsOpen(false);
    if (val !== "Other") {
      setOtherValue("");
      onChange?.(val);
    } else {
      onChange?.("");
    }
  };

  // 🔹 Multi select toggle
  const toggleMulti = (val) => {
    let updated;
    if (multiValues.includes(val)) {
      updated = multiValues.filter((item) => item !== val);
    } else {
      updated = [...multiValues, val];
    }
    setMultiValues(updated);
    onChange?.(updated);
  };

  // 🔹 Input for "Other"
  const handleOtherChange = (e) => {
    setOtherValue(e.target.value);
  };

  // 🔹 Press Enter to add new custom option ABOVE "Other"
  const handleOtherKeyDown = (e) => {
    if (multiSelect && e.key === "Enter" && otherValue.trim() !== "") {
      e.preventDefault();
      const newOption = { value: otherValue.trim(), label: otherValue.trim() };

      // If not already present, insert above "Other"
      if (!localOptions.some((opt) => opt.value === newOption.value)) {
        const otherIndex = localOptions.findIndex(
          (opt) => opt.value === "Other"
        );
        if (otherIndex !== -1) {
          const updatedOpts = [
            ...localOptions.slice(0, otherIndex),
            newOption,
            ...localOptions.slice(otherIndex),
          ];
          setLocalOptions(updatedOpts);
        } else {
          setLocalOptions([...localOptions, newOption]);
        }
      }

      const updated = [
        ...multiValues.filter((v) => v !== "Other"),
        otherValue.trim(),
      ];
      setMultiValues(updated);
      onChange?.(updated);

      setOtherValue("");
      setIsOpen(false);
    }
  };

  const renderButtonText = () => {
    if (multiSelect) {
      if (multiValues.length === 0) return placeholder;
      const joined = multiValues.join(", ");
      return joined.length > 40 ? joined.slice(0, 40) + "..." : joined;
    } else {
      return selected ? selected : placeholder;
    }
  };

  return (
    <div className={`w-full relative ${className}`} ref={ref}>
      {label && (
        <label
          htmlFor={id}
          className="block text-base font-medium text-[#081722] mb-2"
        >
          {label}
        </label>
      )}

      {/* 🔹 Dropdown trigger */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full h-[41px] px-3.5 border border-gray-300 rounded-lg bg-white text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors overflow-hidden"
      >
        <span
          className={`truncate ${
            !selected && multiValues.length === 0
              ? "text-gray-400"
              : "text-gray-800"
          }`}
        >
          {renderButtonText()}
        </span>

        <FiChevronDown
          className={`w-5 h-5 text-gray-600 flex-shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* 🔹 Dropdown menu */}
      {isOpen && (
        <div
          className="absolute left-0 top-full mt-2 bg-white border border-gray-200 rounded-xl shadow-md z-50 p-2 space-y-1 max-h-60 overflow-y-auto"
          style={{
            width: buttonRef.current
              ? `${buttonRef.current.offsetWidth}px`
              : "100%",
          }}
        >
          {localOptions.map((option, i) => (
            <div
              key={i}
              className={`flex items-center justify-between p-2 rounded-md hover:bg-gray-100 cursor-pointer ${
                !multiSelect && selected === option.value && "bg-blue-50"
              }`}
              onClick={() =>
                multiSelect
                  ? toggleMulti(option.value)
                  : handleSelect(option.value)
              }
            >
              <span className="text-sm">{option.label}</span>

              {multiSelect && (
                <input
                  type="checkbox"
                  checked={multiValues.includes(option.value)}
                  onChange={() => toggleMulti(option.value)}
                  className="cursor-pointer"
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* 🔹 Other input field */}
      {((!multiSelect && selected === "Other") ||
        (multiSelect && multiValues.includes("Other"))) && (
        <input
          type="text"
          placeholder={
            multiSelect
              ? "Type custom option & press Enter"
              : "Please specify..."
          }
          value={otherValue}
          onChange={handleOtherChange}
          onKeyDown={handleOtherKeyDown}
          className="mt-3 w-full h-11 px-4 border border-gray-300 rounded-md bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      )}
    </div>
  );
};

export default SelectInput;
