// src/components/common/DeleteClientModal.js

import React, { useState } from "react";
import { FiUser } from "react-icons/fi"; // A suitable user icon
import { IoClose } from "react-icons/io5";

const DeleteClientModal = ({
  isOpen,
  onClose,
  onDelete, // Added an onDelete handler for the final action
  clientName,
  clientCode,
}) => {
  const [inputValue, setInputValue] = useState("");

  if (!isOpen) return null;

  // The delete button is enabled only when the input matches the client code
  const isMatch = inputValue === clientCode;

  const handleDelete = () => {
    // alert("deleted");
    if (isMatch) {
    onDelete(); // Call the passed onDelete function
    }
  };

  return (
    // Overlay
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/50 p-4 font-poppins">
      {/* Modal Card */}
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center p-6 space-x-4 relative">
          <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-[#F50408]/10 rounded-lg">
            <FiUser className="text-[#F50408]" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-[#081722]">
              Delete Client
            </h2>
            <p className="text-sm text-[#6B7280]">Delete your client</p>
          </div>
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-500 hover:text-gray-800"
            aria-label="Close modal"
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Divider Line */}
        <hr className="border-slate-200/50" />

        {/* Body Content */}
        <div className="p-6">
          <label
            htmlFor="clientCode"
            className="block text-base font-semibold text-[#081722]"
          >
            Enter client code to delete "{clientName}"?
          </label>
          <input
            id="clientCode"
            type="text"
            placeholder={clientCode}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="mt-3 w-full h-11 px-4 py-2 border border-[#E2E8F0] rounded-md bg-white text-sm text-gray-700 placeholder:text-gray-400/50 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <p className="text-sm text-[#6B7280] mt-2">
            This action cannot be undone.
          </p>
        </div>

        {/* Footer with Buttons */}
        <div className="flex justify-end space-x-4 p-6 pt-2">
          <button
            onClick={onClose}
            className="h-10 px-8 font-medium text-[#081722] text-base border border-[#081722] rounded-lg hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={!isMatch}
            className="h-10 px-8 font-medium text-white text-base bg-[#F50408] rounded-lg hover:bg-red-700 disabled:bg-red-300 disabled:cursor-not-allowed transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteClientModal;
