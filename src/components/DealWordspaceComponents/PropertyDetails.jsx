import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { FiEdit2 } from "react-icons/fi";
import Icons from "../../assets/icons/Icons";
import DetailItem from "../common/DetailItem";
import {
  updatePropertyDetails,
  getSingleDeal,
} from "../../store/features/deal/service";

const PropertyDetails = ({ singleDeal }) => {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      askingPrice: "",
      portalLink: "",
      propertyAddress: "",
      propertyType: "",
      tenure: "",
      designStyle: "",
      numberBedroom: "",
      numberBathroom: "",
      numberParking: "",
      EPCRating: "",
      leaseTerm: "",
      groundRent: "",
      serviceCharge: "",
      reviewClauses: "",
      titleReference: "",
      chainPosition: "",
      chainNotes: "",
      listedBuilding: "",
      conservationArea: "",
    },
  });

  // ✅ Load existing backend values
  useEffect(() => {
    if (singleDeal?.propertyDetails) {
      const d = singleDeal.propertyDetails;
      reset({
        askingPrice: d?.guidePrice || "",
        portalLink: d?.portalLink || "",
        propertyAddress: d?.propertyAddress || "",
        propertyType: d?.propertyType || "",
        tenure: d?.tenure || "",
        designStyle: d?.designStyle || "",
        numberBedroom: d?.bedrooms || "",
        numberBathroom: d?.bathrooms || "",
        numberParking: d?.parkingSpaces || "",
        EPCRating: d?.epcRating || "",
        leaseTerm: d?.leaseTerm || "",
        groundRent: d?.groundRent || "",
        serviceCharge: d?.serviceCharge || "",
        reviewClauses: d?.reviewClauses || "",
        titleReference: d?.titleReference || "",
        chainPosition: d?.chainPosition || "",
        chainNotes: d?.chainNotes || "",
        listedBuilding: d?.listedBuilding || "",
        conservationArea: d?.conservationArea || "",
      });
    }
  }, [singleDeal, reset]);

  // ✅ Submit and update backend
  const onSubmit = async (data) => {
    const dealId = singleDeal?._id;
    if (!dealId) return;

    const payload = {
      guidePrice: Number(data.askingPrice) || 0, // 👈 ensure number
      portalLink: data.portalLink,
      propertyAddress: data.propertyAddress,
      propertyType: data.propertyType,
      tenure: data.tenure,
      designStyle: data.designStyle,
      bedrooms: Number(data.numberBedroom) || 0, // 👈 ensure number
      bathrooms: Number(data.numberBathroom) || 0, // 👈 ensure number
      parkingSpaces: Number(data.numberParking) || 0, // 👈 ensure number
      epcRating: data.EPCRating,
      leaseTerm: data.leaseTerm,
      groundRent: Number(data.groundRent) || 0,
      serviceCharge: Number(data.serviceCharge) || 0,
      reviewClauses: data.reviewClauses,
      titleReference: data.titleReference,
      chainPosition: data.chainPosition,
      chainNotes: data.chainNotes,
      listedBuilding: data.listedBuilding,
      conservationArea: data.conservationArea,
    };

    await dispatch(updatePropertyDetails({ dealId, data: payload }));
    await dispatch(getSingleDeal({ dealId }));
    setIsEditing(false);
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* === Action Buttons === */}
        {!isEditing ? (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="absolute right-1.5 flex items-center -top-5 text-base cursor-pointer font-semibold text-[#1877F2]"
          >
            <FiEdit2 className="mr-2" />
            Edit
          </button>
        ) : (
          <div className="absolute right-1.5 -top-5 flex items-center gap-3">
            <button
              type="submit"
              className="flex items-center font-semibold text-[#00AC4F]"
            >
              <Icons.CircleCheck className="mr-2" />
              Save
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="flex cursor-pointer items-center font-semibold text-[#F87171]"
            >
              Cancel
            </button>
          </div>
        )}

        {/* === Main Details === */}
        <div className="grid grid-cols-1 my-4 sm:grid-cols-2 md:grid-cols-2 gap-6">
          {/* Asking Price */}
          <Controller
            name="askingPrice"
            control={control}
            render={({ field }) => (
              <DetailItem
                dealPage
                label="Guide/Asking Price (£)"
                type="number"
                isEditing={isEditing}
                {...field}
              />
            )}
          />

          {/* Portal Link */}
          <Controller
            name="portalLink"
            control={control}
            render={({ field }) => (
              <DetailItem
                dealPage
                label="Portal Link"
                type="text"
                isEditing={isEditing}
                {...field}
              />
            )}
          />

          {/* Property Address */}
          <Controller
            name="propertyAddress"
            control={control}
            render={({ field }) => (
              <DetailItem
                dealPage
                label="Property Address"
                type="text"
                isEditing={isEditing}
                {...field}
              />
            )}
          />

          {/* Property Type */}
          <Controller
            control={control}
            name="propertyType"
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Property Type
                </label>
                <select
                  {...field}
                  disabled={!isEditing}
                  className={`w-full text-sm rounded-md ${
                    isEditing
                      ? "border border-gray-300 bg-white"
                      : "bg-[#f2f2f2]"
                  } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="">Select Property Type</option>
                  <option value="Detached">Detached</option>
                  <option value="Semi-Detached">Semi-Detached</option>
                  <option value="Terraced">Terraced</option>
                  <option value="Flat / Apartment">Flat / Apartment</option>
                  <option value="Bungalow">Bungalow</option>
                  <option value="Maisonette">Maisonette</option>
                  <option value="Cottage">Cottage</option>
                </select>
              </div>
            )}
          />

          {/* Tenure */}
          <Controller
            control={control}
            name="tenure"
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Tenure
                </label>
                <select
                  {...field}
                  disabled={!isEditing}
                  className={`w-full text-sm rounded-md ${
                    isEditing
                      ? "border border-gray-300 bg-white"
                      : "bg-[#f2f2f2]"
                  } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="">Select Tenure</option>
                  <option value="Freehold">Freehold</option>
                  <option value="Leasehold">Leasehold</option>
                  <option value="Share of Freehold">Share of Freehold</option>
                </select>
              </div>
            )}
          />

          {/* Design Style */}
          <Controller
            control={control}
            name="designStyle"
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Design Style / Subtype
                </label>
                <select
                  {...field}
                  disabled={!isEditing}
                  className={`w-full text-sm rounded-md ${
                    isEditing
                      ? "border border-gray-300 bg-white"
                      : "bg-[#f2f2f2]"
                  } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="">Select Design Style</option>
                  <option value="Modern">Modern</option>
                  <option value="Traditional">Traditional</option>
                  <option value="Victorian">Victorian</option>
                  <option value="Georgian">Georgian</option>
                  <option value="Contemporary">Contemporary</option>
                </select>
              </div>
            )}
          />

          {/* No. Of Bedrooms */}
          <Controller
            control={control}
            name="numberBedroom"
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  No. of Bedrooms
                </label>
                <select
                  {...field}
                  disabled={!isEditing}
                  className={`w-full text-sm rounded-md ${
                    isEditing
                      ? "border border-gray-300 bg-white"
                      : "bg-[#f2f2f2]"
                  } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="">Select</option>
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>
            )}
          />

          {/* No. Of Bathrooms */}
          <Controller
            control={control}
            name="numberBathroom"
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  No. of Bathrooms
                </label>
                <select
                  {...field}
                  disabled={!isEditing}
                  className={`w-full text-sm rounded-md ${
                    isEditing
                      ? "border border-gray-300 bg-white"
                      : "bg-[#f2f2f2]"
                  } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="">Select</option>
                  {[1, 2, 3, 4].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>
            )}
          />

          {/* No. Of Parking Spaces */}
          <Controller
            control={control}
            name="numberParking"
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  No. of Parking Spaces
                </label>
                <select
                  {...field}
                  disabled={!isEditing}
                  className={`w-full text-sm rounded-md ${
                    isEditing
                      ? "border border-gray-300 bg-white"
                      : "bg-[#f2f2f2]"
                  } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="">Select</option>
                  <option value="0">None</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3+</option>
                </select>
              </div>
            )}
          />

          {/* EPC Rating */}
          <Controller
            control={control}
            name="EPCRating"
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  EPC Rating
                </label>
                <select
                  {...field}
                  disabled={!isEditing}
                  className={`w-full text-sm rounded-md ${
                    isEditing
                      ? "border border-gray-300 bg-white"
                      : "bg-[#f2f2f2]"
                  } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="">Select Rating</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                  <option value="F">F</option>
                  <option value="G">G</option>
                </select>
              </div>
            )}
          />

          <Controller
            name="listedBuilding"
            control={control}
            render={({ field: { value, onChange } }) => (
              <div className="flex flex-col gap-3">
                <label className="text-sm font-medium text-gray-800">
                  Listed Building
                </label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={value}
                    disabled={!isEditing}
                    onChange={(e) => onChange(e.target.checked)}
                  />
                  <div
                    className={`w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-black transition-all ${
                      !isEditing ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  ></div>
                  <div
                    className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5`}
                  ></div>
                </label>
              </div>
            )}
          />

          {/* Conservation Area */}
          <Controller
            name="conservationArea"
            control={control}
            render={({ field: { value, onChange } }) => (
              <div className="flex flex-col gap-3">
                <label className="text-sm font-medium text-gray-800">
                  Conservation Area
                </label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={value}
                    disabled={!isEditing}
                    onChange={(e) => onChange(e.target.checked)}
                  />
                  <div
                    className={`w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-black transition-all ${
                      !isEditing ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  ></div>
                  <div
                    className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5`}
                  ></div>
                </label>
              </div>
            )}
          />
        </div>

        {/* === Leasehold Details === */}
        <h2 className="font-semibold text-lg py-5 text-[#081722]">
          Leasehold Details (if applicable):
        </h2>
        <div className="grid grid-cols-1 my-4 sm:grid-cols-2 md:grid-cols-2 gap-6">
          <Controller
            name="leaseTerm"
            control={control}
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Lease Term
                </label>
                <select
                  {...field}
                  disabled={!isEditing}
                  className={`w-full text-sm rounded-md ${
                    isEditing
                      ? "border border-gray-300 bg-white"
                      : "bg-[#f2f2f2]"
                  } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="HSBC">HSBC</option>
                  <option value="Barclays">Barclays</option>
                  <option value="Lloyds">Lloyds</option>
                  <option value="NatWest">NatWest</option>
                </select>
              </div>
            )}
          />

          {[
            { label: "Ground Rent", name: "groundRent" },
            { label: "Service Charge", name: "serviceCharge" },
            // { label: "Review Clauses", name: "reviewClauses" },
          ].map((item) => (
            <Controller
              key={item.name}
              name={item.name}
              control={control}
              render={({ field }) => (
                <DetailItem
                  dealPage
                  label={item.label}
                  isEditing={isEditing}
                  type="number"
                  {...field}
                />
              )}
            />
          ))}
          <Controller
            name="reviewClauses"
            control={control}
            render={({ field }) => (
              <DetailItem
                dealPage
                label="Review Clauses"
                isEditing={isEditing}
                type="text"
                {...field}
              />
            )}
          />
        </div>

        {/* === Chain Info === */}
        <div className="space-y-6">
          {[
            { label: "Title Reference", name: "titleReference" },
            { label: "Chain Position", name: "chainPosition" },
            { label: "Chain Notes", name: "chainNotes" },
          ].map((item) => (
            <Controller
              key={item.name}
              name={item.name}
              control={control}
              render={({ field }) => (
                <DetailItem
                  dealPage
                  label={item.label}
                  isEditing={isEditing}
                  type="text"
                  {...field}
                />
              )}
            />
          ))}
        </div>
      </form>
    </div>
  );
};

export default PropertyDetails;
