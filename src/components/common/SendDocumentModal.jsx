import React from "react";
import { IoClose } from "react-icons/io5";
import Icons from "../../assets/icons/Icons";
import SelectInput from "./SelectInput";
import { designStyleOptions } from "../../constant/option";
import GlobalButton from "./GlobalButton";
const SendDocumentModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/50 p-4 font-poppins">
      {/* Modal Card */}
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center p-6 space-x-4 relative">
          <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-[#1877F2]/10 rounded-lg">
            <Icons.Document className="text-[#1877F2]" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-[#081722]">
              Send Documents
            </h2>
            <p className="text-sm text-[#6B7280]">Send your document</p>
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
            className="block text-lg mb-4 font-semibold text-[#081722]"
          >
            Documents Details
          </label>
          <SelectInput
            label="Send to Client"
            id="client"
            placeholder="Enter client code or search by name "
            options={designStyleOptions}
          />
          <div className="mt-3">
            <label className=" font-medium text-[#081722] text-base">
              Message
            </label>
            <textarea
              placeholder="Add a message to accompany the document..."
              rows={3}
              className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
        </div>

        {/* Footer with Buttons */}
        <div className="flex justify-end space-x-4 p-6 pt-2">
          <button
            onClick={onClose}
            className="h-10 px-8 font-medium text-[#081722] text-base border border-[#081722] rounded-lg hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <GlobalButton variant="primary">Send Document</GlobalButton>
        </div>
      </div>
    </div>
  );
};

export default SendDocumentModal;
