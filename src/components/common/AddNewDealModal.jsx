import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import GlobalButton from "./GlobalButton";
import FormInput from "./FormInput";
import SelectInput from "./SelectInput";
import Icons from "../../assets/icons/Icons";
import { createDeal } from "../../store/features/deal/service";
import { useParams } from "react-router-dom";

const AddNewDealModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { clientId } = useParams();
  const { register, handleSubmit, reset, control } = useForm();

  const { isLoading } = useSelector((state) => state.deal);

  if (!isOpen) return null;

  const onSubmit = async (data) => {
    try {
      const dealData = {
        propertyAddress: data.propertyAddress,
        dealType: data.dealType,
        stage: data.stage,
      };
      await dispatch(createDeal({ clientId, dealData })).unwrap();
      reset();
      onClose();
    } catch (error) {
      console.error("Error creating deal:", error);
      // Optionally, show a toast or inline error message
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 p-4 font-poppins">
      <div className="absolute inset-0 h-screen bg-black opacity-80"></div>

      <div className="bg-white rounded-2xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 relative">
        {/* Modal Header */}
        <div className="flex items-start pb-6 border-b border-gray-200">
          <div className="bg-blue-100 p-3 rounded-lg mr-4">
            <Icons.UserIcon className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Add Deal</h2>
            <p className="text-base text-gray-500">Create a new deal</p>
          </div>
          <button
            onClick={onClose}
            className="absolute top-6 cursor-pointer right-6 text-gray-500 hover:text-gray-800"
          >
            <Icons.Crossicon size={24} />
          </button>
        </div>

        {/* FORM START */}
        <form onSubmit={handleSubmit(onSubmit)} className="py-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Deal Details
            </h3>
            <div className="grid lg:grid-cols-2 gap-3.5">
              {/* Deal Name */}
              <FormInput
                label="Deal Name / Property Address"
                id="propertyAddress"
                type="text"
                placeholder="Enter"
                {...register("propertyAddress", { required: true })}
              />

              {/* Deal Type */}
              {/* Deal Type */}
              <Controller
                name="dealType"
                control={control}
                rules={{ required: "Deal type is required" }}
                render={({ field }) => (
                  <SelectInput
                    label="Deal Type"
                    id="dealType"
                    placeholder="Select Type"
                    options={[
                      { value: "Residential", label: "Residential" },
                      { value: "Commercial", label: "Commercial" },
                    ]}
                    value={field.value}
                    onChange={(val) => field.onChange(val)} // ✅ correctly binds
                  />
                )}
              />

              {/* Stage */}
              <Controller
                name="stage"
                control={control}
                rules={{ required: "Stage is required" }}
                render={({ field }) => (
                  <SelectInput
                    label="Stage"
                    id="stage"
                    placeholder="Select Stage"
                    options={[
                      { value: "Discovery", label: "Discovery" },
                      { value: "Viewings", label: "Viewings" },
                      { value: "Offer Mode", label: "Offer Mode" },
                      { value: "Offer Accepted", label: "Offer Accepted" },
                      { value: "Exchange", label: "Exchange" },
                      { value: "Completion", label: "Completion" },
                    ]}
                    value={field.value}
                    onChange={(val) => field.onChange(val)} // ✅ correctly binds
                  />
                )}
              />

              {/* Linked Client */}
              {/* <SelectInput
                label="Link to Client File (extra client)"
                id="clientType"
                placeholder="Select Type"
                options={[
                  { value: "residential_sales", label: "Residential Sales" },
                  {
                    value: "residential_lettings",
                    label: "Residential Lettings",
                  },
                  { value: "commercial_sales", label: "Commercial Sales" },
                  {
                    value: "commercial_lettings",
                    label: "Commercial Lettings",
                  },
                  { value: "investor", label: "Investor" },
                ]}
                {...register("clientType")}
              /> */}
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end items-center pt-6 border-t border-gray-200 space-x-4">
            <GlobalButton
              variant="secondary"
              type="button"
              onClick={onClose}
              className="px-8"
            >
              Cancel
            </GlobalButton>
            <GlobalButton
              variant="primary"
              type="submit"
              className="px-10"
              disabled={isLoading}
            >
              {isLoading ? "Adding..." : "Add Deal"}
            </GlobalButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewDealModal;
