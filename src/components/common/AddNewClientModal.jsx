import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { LuUser } from "react-icons/lu";
import FormInput from "./FormInput";
import SelectInput from "./SelectInput";
import FileUpload from "./FileUpload";
import GlobalButton from "./GlobalButton";
import {
  avoidOptions,
  commercialPropertyOptions,
  commercialReasons,
  currentPositionOptions,
  designStyleOptions,
  mustHaveOptions,
  preferredAreaOptions,
  purchaseMethodOptions,
  residentialPropertyOptions,
  residentialReasons,
  timeframeOptions,
} from "../../constant/option";
import {
  createClient,
  getAllClients,
} from "../../store/features/client/service";

const AddNewClientModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.client.createClient);

  const {
    register,
    handleSubmit,
    reset,
    resetField,
    watch,
    setValue,
    control,
    unregister,
    formState: { errors },
  } = useForm();

  const [category, setCategory] = useState("");

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "category") {
        setValue("propertyType", "");
        setValue("reasonForMove", "");
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue]);

  if (!isOpen) return null;

  const onSubmit = async (data) => {
    const clientsData = {
      clientName: data.clientName,
      clientEmail: data.clientEmail,
      phoneNumber: data.phoneNumber,
      clientType: data.clientType,
      address: data.address,
      currentPosition: data.currentPosition,
      category: data.category,
      buyingPreference: {
        budgetMin: data.budgetMin,
        budgetMax: data.budgetMax,
        propertyType: data.propertyType,
        reasonForMove: data.reasonForMove,
        timeframe: data.timeframe,
        designStyle: data.designStyle,
        avoids: data.avoid || [],
        mustHaves: data.mustHaves || [],
        purchaseMethod: data.purchaseMethod,
        preferredLocation: data.preferredArea,
        quickNotes: data.quickNotes,
      },
      documents: data.documents || [],
    };

    const formData = new FormData();

    formData.append("clientName", clientsData.clientName);
    formData.append("clientEmail", clientsData.clientEmail);
    formData.append("phoneNumber", clientsData.phoneNumber);
    formData.append("clientType", clientsData.clientType);
    formData.append("address", clientsData.address);
    formData.append("currentPosition", clientsData.currentPosition);

    formData.append("budgetMin", clientsData.buyingPreference.budgetMin);
    formData.append("budgetMax", clientsData.buyingPreference.budgetMax);
    formData.append("propertyType", clientsData.buyingPreference.propertyType);
    formData.append(
      "reasonForMove",
      clientsData.buyingPreference.reasonForMove
    );
    formData.append("timeframe", clientsData.buyingPreference.timeframe);
    formData.append("designStyle", clientsData.buyingPreference.designStyle);

    clientsData.buyingPreference.avoids.forEach((item) =>
      formData.append("avoids[]", item)
    );
    clientsData.buyingPreference.mustHaves.forEach((item) =>
      formData.append("mustHaves[]", item)
    );
    formData.append(
      "purchaseMethod",
      clientsData.buyingPreference.purchaseMethod
    );
    formData.append(
      "preferredLocation",
      clientsData.buyingPreference.preferredLocation
    );
    formData.append("quickNotes", clientsData.buyingPreference.quickNotes);

    if (clientsData.documents.length > 0) {
      clientsData.documents.forEach((file) =>
        formData.append("documents", file)
      );
    }

    await dispatch(createClient(formData)).unwrap();
    dispatch(getAllClients());
    onClose();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 p-4 font-poppins">
      <div className="absolute inset-0 h-screen bg-black opacity-80"></div>

      <div className="bg-white rounded-2xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 relative">
        {/* Header */}
        <div className="flex items-start pb-6 border-b border-gray-200">
          <div className="bg-blue-100 p-3 rounded-lg mr-4">
            <LuUser className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Add New Client
            </h2>
            <p className="text-base text-gray-500">
              Create a new client profile
            </p>
          </div>
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-500 hover:text-gray-800"
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* FORM START */}
        <form onSubmit={handleSubmit(onSubmit)} className="py-6">
          {/* Client Overview */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-5">
              Client Overview
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div>
                <FormInput
                  label="Client Name"
                  name="clientName"
                  placeholder="Enter Client Name"
                  {...register("clientName", {
                    required: "Client name is required",
                  })}
                />
                {errors.clientName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.clientName.message}
                  </p>
                )}
              </div>

              <div>
                <FormInput
                  label="Client Email Address"
                  type="email"
                  name="clientEmail"
                  placeholder="Enter Email"
                  {...register("clientEmail", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email address",
                    },
                  })}
                />
                {errors.clientEmail && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.clientEmail.message}
                  </p>
                )}
              </div>

              <Controller
                name="phoneNumber"
                control={control}
                rules={{ required: "Phone number is required" }}
                render={({ field }) => (
                  <div>
                    <FormInput
                      type="phone"
                      label="Phone Number"
                      placeholder="+44 7346 876 773"
                      value={field.value}
                      onChange={field.onChange}
                    />
                    {errors.phoneNumber && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.phoneNumber.message}
                      </p>
                    )}
                  </div>
                )}
              />

              <Controller
                name="clientType"
                control={control}
                rules={{ required: "Client type is required" }}
                render={({ field }) => (
                  <div>
                    <SelectInput
                      label="Client Type"
                      placeholder="Select Type"
                      options={[
                        {
                          value: "Residential Sales",
                          label: "Residential Sales",
                        },
                        {
                          value: "Residential Lettings",
                          label: "Residential Lettings",
                        },
                        {
                          value: "Commercial Sales",
                          label: "Commercial Sales",
                        },
                        {
                          value: "Commercial Lettings",
                          label: "Commercial Lettings",
                        },
                        { value: "Investor", label: "Investor" },
                      ]}
                      value={field.value}
                      onChange={field.onChange}
                    />
                    {errors.clientType && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.clientType.message}
                      </p>
                    )}
                  </div>
                )}
              />

              <div>
                <FormInput
                  label="Home/ Business Address"
                  placeholder="Enter Address or Postcode"
                  {...register("address", {
                    required: "Address is required",
                  })}
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.address.message}
                  </p>
                )}
              </div>

              <Controller
                name="currentPosition"
                control={control}
                rules={{ required: "Current position is required" }}
                render={({ field }) => (
                  <div>
                    <SelectInput
                      label="Current Position"
                      placeholder="Select"
                      options={currentPositionOptions}
                      value={field.value}
                      onChange={field.onChange}
                    />
                    {errors.currentPosition && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.currentPosition.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
          </div>
          {/* Buying Preferences */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-5">
              Buying Preferences
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {/* Budget */}
              <div>
                <label className="block text-base font-medium text-gray-800 mb-2">
                  Budget
                </label>
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <label className="text-xs text-gray-700">Min</label>
                    <FormInput
                      type="number"
                      placeholder="e.g £500,000"
                      {...register("budgetMin", {
                        required: "Minimum budget is required",
                      })}
                    />
                    {errors.budgetMin && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.budgetMin.message}
                      </p>
                    )}
                  </div>
                  <span className="mt-5">-</span>
                  <div className="flex-1">
                    <label className="text-xs text-gray-700">Max</label>
                    <FormInput
                      type="number"
                      placeholder="e.g £750,000"
                      {...register("budgetMax", {
                        required: "Maximum budget is required",
                      })}
                    />
                    {errors.budgetMax && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.budgetMax.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Category */}
              <Controller
                name="category"
                control={control}
                rules={{ required: "Category is required" }}
                render={({ field }) => (
                  <div>
                    <SelectInput
                      label="Property Category"
                      placeholder="Select Category"
                      options={[
                        { value: "residential", label: "Residential" },
                        { value: "commercial", label: "Commercial" },
                      ]}
                      value={field.value}
                      onChange={field.onChange}
                    />
                    {errors.category && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.category.message}
                      </p>
                    )}
                  </div>
                )}
              />

              {/* Conditional fields */}
              {watch("category") === "residential" && (
                <>
                  <Controller
                    name="propertyType"
                    control={control}
                    rules={{ required: "Property type is required" }}
                    render={({ field }) => (
                      <div>
                        <SelectInput
                          label="Residential Property Types"
                          placeholder="Select Type"
                          options={residentialPropertyOptions}
                          value={field.value}
                          onChange={field.onChange}
                        />
                        {errors.propertyType && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.propertyType.message}
                          </p>
                        )}
                      </div>
                    )}
                  />

                  <Controller
                    name="reasonForMove"
                    control={control}
                    rules={{ required: "Reason is required" }}
                    render={({ field }) => (
                      <div>
                        <SelectInput
                          label="Reason for Residential Purchase"
                          options={residentialReasons}
                          value={field.value}
                          onChange={field.onChange}
                        />
                        {errors.reasonForMove && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.reasonForMove.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                </>
              )}

              {watch("category") === "commercial" && (
                <>
                  <Controller
                    name="propertyType"
                    control={control}
                    rules={{ required: "Property type is required" }}
                    render={({ field }) => (
                      <div>
                        <SelectInput
                          label="Commercial Property Types"
                          placeholder="Select Commercial Property Types"
                          options={commercialPropertyOptions}
                          value={field.value}
                          onChange={field.onChange}
                        />
                        {errors.propertyType && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.propertyType.message}
                          </p>
                        )}
                      </div>
                    )}
                  />

                  <Controller
                    name="reasonForMove"
                    control={control}
                    rules={{ required: "Reason is required" }}
                    render={({ field }) => (
                      <div>
                        <SelectInput
                          label="Reason for Commercial Purchase"
                          options={commercialReasons}
                          value={field.value}
                          onChange={field.onChange}
                        />
                        {errors.reasonForMove && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.reasonForMove.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                </>
              )}

              {/* Common fields */}
              <Controller
                name="timeframe"
                control={control}
                rules={{ required: "Timeframe is required" }}
                render={({ field }) => (
                  <div>
                    <SelectInput
                      label="Timeframe"
                      options={timeframeOptions}
                      value={field.value}
                      onChange={field.onChange}
                    />
                    {errors.timeframe && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.timeframe.message}
                      </p>
                    )}
                  </div>
                )}
              />

              <Controller
                name="mustHaves"
                control={control}
                rules={{ required: "Must Haves is required" }}
                render={({ field }) => (
                  <div>
                    <SelectInput
                      label="Must-Haves"
                      options={mustHaveOptions}
                      value={field.value}
                      onChange={field.onChange}
                      multiSelect
                    />
                    {errors.mustHaves && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.mustHaves.message}
                      </p>
                    )}
                  </div>
                )}
              />

              <Controller
                name="avoid"
                control={control}
                rules={{ required: "Avoid is required" }}
                render={({ field }) => (
                  <div>
                    <SelectInput
                      label="Avoid"
                      options={avoidOptions}
                      value={field.value}
                      onChange={field.onChange}
                      multiSelect
                    />
                    {errors.avoid && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.avoid.message}
                      </p>
                    )}
                  </div>
                )}
              />

              <Controller
                name="designStyle"
                control={control}
                rules={{ required: "Design style is required" }}
                render={({ field }) => (
                  <div>
                    <SelectInput
                      label="Design Style"
                      options={designStyleOptions}
                      value={field.value}
                      onChange={field.onChange}
                    />
                    {errors.designStyle && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.designStyle.message}
                      </p>
                    )}
                  </div>
                )}
              />

              <Controller
                name="purchaseMethod"
                control={control}
                rules={{ required: "Purchase method is required" }}
                render={({ field }) => (
                  <div>
                    <SelectInput
                      label="Purchase Method"
                      options={purchaseMethodOptions}
                      value={field.value}
                      onChange={field.onChange}
                    />
                    {errors.purchaseMethod && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.purchaseMethod.message}
                      </p>
                    )}
                  </div>
                )}
              />

              <Controller
                name="preferredArea"
                control={control}
                rules={{ required: "Preferred area is required" }}
                render={({ field }) => (
                  <div>
                    <SelectInput
                      label="Preferred Area"
                      options={preferredAreaOptions}
                      value={field.value}
                      onChange={field.onChange}
                    />
                    {errors.preferredArea && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.preferredArea.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
          </div>
          {/* Notes */}
          <div className="mb-8">
            <label className="block text-lg font-semibold text-gray-800 mb-3">
              Notes
            </label>
            <textarea
              rows="4"
              placeholder="e.g Looking for move-in ready properties..."
              className={`w-full p-4 border rounded-md text-sm focus:outline-none focus:ring-2 ${
                errors.quickNotes
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              {...register("quickNotes", {
                required: "Notes are required",
                minLength: {
                  value: 10,
                  message: "Please enter at least 10 characters",
                },
              })}
            ></textarea>

            {errors.quickNotes && (
              <p className="text-red-500 text-sm mt-1">
                {errors.quickNotes.message}
              </p>
            )}
          </div>

          <Controller
            name="documents"
            control={control}
            rules={{
              validate: {
                fileType: (files) => {
                  if (!files?.length) return true;
                  const validTypes = [
                    "application/pdf",
                    "application/msword",
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                  ];
                  for (let file of files) {
                    const extension = file.name.split(".").pop().toLowerCase();
                    if (
                      !validTypes.includes(file.type) &&
                      !["pdf", "doc", "docx"].includes(extension)
                    ) {
                      return "Only PDF or DOC/DOCX files are allowed";
                    }
                  }
                  return true;
                },
              },
            }}
            render={({ field, fieldState }) => (
              <>
                <FileUpload
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  ref={field.ref}
                  value={field.value}
                  accept=".pdf,.doc,.docx"
                />
                {fieldState.error && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldState.error.message}
                  </p>
                )}
              </>
            )}
          />
          {/* Footer */}
          <div className="flex justify-end items-center pt-6 border-t border-gray-200 space-x-4">
            <GlobalButton
              variant="secondary"
              onClick={onClose}
              type="button"
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
              {isLoading ? "Adding..." : "Add Client"}
            </GlobalButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewClientModal;
