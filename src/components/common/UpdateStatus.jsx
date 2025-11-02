import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import Icons from "../../assets/icons/Icons";
import CustomHeading from "./Heading";
import GlobalButton from "./GlobalButton";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { updateAMLStatus } from "../../store/features/amlCompliance/service";
import { getAllClients } from "../../store/features/client/service";


const UpdateStatus = ({ isOpen, onClose, amlId }) => {
  const dispatch = useDispatch();

  if (!isOpen) return null;

  // Only one can be active at a time
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleCheckboxChange = (item) => {
    setSelectedStatus(item); // only one allowed
  };

  const handleUpdate = async () => {
    if (!selectedStatus) {
      toast.error("Please select a status before updating.");
      return;
    }

    // map notStarted → not_started
    const mappedStatus =
      selectedStatus === "notStarted" ? "not_started" : selectedStatus;

    try {
      await dispatch(
        updateAMLStatus({
          id: amlId,
          payload: { amlStatus: mappedStatus },
        })
      ).unwrap();

      toast.success("AML status updated successfully!");

      // ✅ refresh the clients list
      dispatch(getAllClients());

      onClose();
    } catch (error) {
      const message =
        error?.response?.data?.message || "Failed to update AML status.";
      toast.error(message);
      console.error(error);
    }
  };

  const CheckboxItem = ({ id, onChange, children }) => (
    <div className="flex items-start space-x-3 mb-4">
      <input
        type="checkbox"
        id={id}
        checked={selectedStatus === id}
        onChange={() => onChange(id)}
        className="mt-1 h-4 w-4 text-black border-gray-300 rounded focus:ring-black accent-black"
      />
      <label
        htmlFor={id}
        className="flex-1 text-base font-medium text-[#6B7280] leading-relaxed cursor-pointer"
      >
        {children}
      </label>
    </div>
  );

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 p-4 font-poppins">
      <div className="absolute inset-0 h-screen bg-black opacity-80"></div>
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 relative">
        {/* Header */}
        <div className="flex items-start pb-6 border-b border-gray-200">
          <div className="bg-blue-100 p-3 rounded-lg mr-4">
            <Icons.Document className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Update Status
            </h2>
            <p className="text-base text-gray-500">Update document status</p>
          </div>
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-500 hover:text-gray-800"
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Status Options */}
        <div className="space-y-3 mt-6">
          <CustomHeading
            heading="Select Status"
            fontSize="text-[18px]"
            textAlign="text-left"
          />
          <CheckboxItem id="verified" onChange={handleCheckboxChange}>
            <span className="font-medium">Verified</span>
          </CheckboxItem>
          <CheckboxItem id="pending" onChange={handleCheckboxChange}>
            <span className="font-medium">Pending</span>
          </CheckboxItem>
          <CheckboxItem id="flagged" onChange={handleCheckboxChange}>
            <span className="font-medium">Flagged</span>
          </CheckboxItem>
          <CheckboxItem id="notStarted" onChange={handleCheckboxChange}>
            <span className="font-medium">Not Started</span>
          </CheckboxItem>
        </div>

        {/* Footer */}
        <div className="flex justify-end items-center pt-6 border-t border-gray-200 space-x-4">
          <GlobalButton variant="secondary" onClick={onClose} className="px-8">
            Cancel
          </GlobalButton>
          <GlobalButton
            variant="primary"
            className="px-10"
            onClick={handleUpdate}
          >
            Update
          </GlobalButton>
        </div>
      </div>
    </div>
  );
};

export default UpdateStatus;
