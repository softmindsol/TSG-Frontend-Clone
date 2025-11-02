// src/components/AddExtraContactModal.js

import React, { useState } from "react";
import { FiUser, FiX } from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa";
import FormInput from "./FormInput";
import {
  createExtraContact,
  getExtraContacts,
} from "../../store/features/extraContact/service";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const AddExtraContactModal = ({ isOpen, onClose, onAddContact, clientId }) => {
  const dispatch = useDispatch();

  const { register, handleSubmit, watch, reset, control } = useForm();
  const contactType = watch("contactType");

  const { isLoading } = useSelector(
    (state) => state.extraContact.createExtraContact
  );

  if (!isOpen) return null;

  const onSubmit = async (data) => {
    console.log("data", data);
    if (!clientId) {
      toast.error("Client ID is missing!");
      return;
    }

    const extraContactData = {
      ...data,
      contactType:
        data.contactType === "Other"
          ? data.customContactType
          : data.contactType,
    };
    try {
      console.log("📤 Dispatching createExtraContact:", extraContactData);

      const resultAction = await dispatch(
        createExtraContact({ clientId, extraContactData })
      );

      // ✅ Check if contact was successfully created
      if (createExtraContact.fulfilled.match(resultAction)) {
        // 🔄 Immediately refetch updated contacts list
        await dispatch(getExtraContacts(clientId));

        toast.success("Extra contact added successfully!");
        reset();
        onClose();
      }
    } catch (error) {
      console.error("❌ Failed to create contact:", error);
      toast.error("Failed to create extra contact");
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/60 p-4 font-poppins">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Header */}
          <div className="flex items-center p-6 space-x-4 relative border-b border-slate-200/80">
            <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-blue-100 rounded-lg">
              <FiUser className="text-blue-600" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[#081722]">
                Add Extra Contact
              </h2>
              <p className="text-sm text-[#6B7280]">
                Create a new contact profile
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="absolute top-6 right-6 text-gray-500 hover:text-gray-800"
              aria-label="Close modal"
            >
              <FiX size={24} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6">
            <h3 className="text-lg font-semibold text-[#081722]">
              Contact Details
            </h3>

            {/* Contact Type */}
            <div className="relative">
              <label className="block text-base font-medium text-[#081722] mb-2">
                Select Contact Type <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full appearance-none h-11 px-4 py-2 border border-[#E2E8F0] rounded-md bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("contactType", { required: true })}
              >
                <option value="">Select</option>
                <option value="Spouse / Partner">Spouse / Partner</option>
                <option value="Parent">Parent</option>
                <option value="Friend / Family">Friend / Family</option>
                <option value="Mortgage Broker">Mortgage Broker</option>
                <option value="Solicitor / Conveyancer">
                  Solicitor / Conveyancer
                </option>
                <option value="Estate Agent (if selling a property)">
                  Estate Agent (if selling a property)
                </option>
                <option value="Architect">Architect</option>
                <option value="Builder / Contractor">
                  Builder / Contractor
                </option>
                <option value="Surveyor">Surveyor</option>
                <option value="Financial Adviser">Financial Adviser</option>
                <option value="Other">Other</option>
              </select>
              <FaChevronDown className="absolute right-4 top-11 text-gray-400 pointer-events-none" />
            </div>

            {/* Show text input if Other is selected */}
            {contactType === "Other" && (
              <FormInput
                label="Specify Contact Type"
                placeholder="Enter contact type"
                {...register("customContactType", { required: true })}
              />
            )}

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Name"
                placeholder="Enter Name"
                {...register("name", { required: true })}
              />
              <FormInput
                label="Company Name"
                placeholder="e.g saxon"
                {...register("companyName")}
              />
              <FormInput
                label="Email Address"
                type="email"
                placeholder="Enter Email"
                {...register("email")}
              />
              <div>
                <div className="relative">
                  <Controller
                    name="phoneNumber"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <FormInput
                        label="Phone Number"
                        type="phone"
                        value={field.value}
                        onChange={field.onChange}
                        id="phoneNumber"
                      />
                    )}
                  />
                </div>
              </div>
              <FormInput
                label="Home/ Business Address"
                placeholder="Enter Address or Postcode"
                {...register("address")}
              />
              <FormInput
                label="Job Title"
                placeholder="e.g Manager"
                {...register("jobTitle")}
              />
            </div>

            {/* Extra Notes */}
            <div>
              <label className="block text-base font-medium text-[#081722] mb-2">
                Extra Notes
              </label>
              <textarea
                {...register("notes")}
                placeholder="Notes here..."
                rows="4"
                className="w-full p-4 border border-[#E2E8F0] rounded-md bg-white text-sm text-gray-700 placeholder:text-gray-400/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end space-x-4 p-6 bg-gray-50/50">
            <button
              type="button"
              onClick={onClose}
              className="h-10 px-8 font-medium text-[#081722] text-base border border-[#081722] rounded-lg hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-10 px-8 font-medium text-white text-base bg-[#081722] rounded-lg hover:bg-gray-900 transition-colors"
            >
              Add Contact
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExtraContactModal;
