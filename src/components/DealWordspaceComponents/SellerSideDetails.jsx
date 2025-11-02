import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import DetailItem from "../common/DetailItem";
import Icons from "../../assets/icons/Icons";
import { FiEdit2 } from "react-icons/fi";
import { useDispatch } from "react-redux";
import {
  updateSellerDetails,
  getSingleDeal,
} from "../../store/features/deal/service";

const SellerSideDetails = ({ singleDeal }) => {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      vendorsName: "",
      vendorsEstateAgentName: "",
      vendorsEstateAgentFirm: "",
      vendorsEmailAddress: "",
      vendorsPhoneNumber: "",
      sellersSolicitorName: "",
      sellersSolicitorFirm: "",
      sellersSolicitorEmail: "",
      sellersSolicitorPhoneNumber: "",
      otherStakeholders: "",
    },
  });

  // ✅ Load seller details into the form when singleDeal updates
  useEffect(() => {
    if (singleDeal?.sellerDetails) {
      const { sellerDetails } = singleDeal;
      reset({
        vendorsName: sellerDetails?.vendorsName || "",
        vendorsEstateAgentName: sellerDetails?.vendorsEstateAgentName || "",
        vendorsEstateAgentFirm: sellerDetails?.vendorsEstateAgentFirm || "",
        vendorsEmailAddress: sellerDetails?.vendorsEmailAddress || "",
        vendorsPhoneNumber: sellerDetails?.vendorsPhoneNumber || "",
        sellersSolicitorName: sellerDetails?.sellersSolicitorName || "",
        sellersSolicitorFirm: sellerDetails?.sellersSolicitorFirm || "",
        sellersSolicitorEmail: sellerDetails?.sellersSolicitorEmail || "",
        sellersSolicitorPhoneNumber:
          sellerDetails?.sellersSolicitorPhoneNumber || "",
        otherStakeholders: sellerDetails?.otherStakeholders || "",
      });
    }
  }, [singleDeal, reset]);

  const onSubmit = async (data) => {
    const dealId = singleDeal?._id;
    if (!dealId) {
      console.error("❌ Deal ID not found, cannot update seller details.");
      return;
    }

    try {
      await dispatch(updateSellerDetails({ dealId, data }));
      await dispatch(getSingleDeal({ dealId })); // ✅ refresh after update
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating seller details:", error);
    }
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Edit/Save Buttons */}
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
              className="flex cursor-pointer items-center font-semibold text-[#00AC4F]"
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

        {/* Seller Fields */}
        <div className="grid grid-cols-1 my-4 sm:grid-cols-2 md:grid-cols-2 gap-6">
          <Controller
            name="vendorsName"
            control={control}
            render={({ field }) => (
              <DetailItem
                dealPage
                label="Vendor’s Name"
                isEditing={isEditing}
                {...field}
              />
            )}
          />
          <Controller
            name="vendorsEstateAgentName"
            control={control}
            render={({ field }) => (
              <DetailItem
                dealPage
                label="Estate Agent Name"
                isEditing={isEditing}
                {...field}
              />
            )}
          />
          <Controller
            name="vendorsEstateAgentFirm"
            control={control}
            render={({ field }) => (
              <DetailItem
                dealPage
                label="Estate Agent Firm"
                isEditing={isEditing}
                {...field}
              />
            )}
          />
          <Controller
            name="vendorsEmailAddress"
            control={control}
            render={({ field }) => (
              <DetailItem
                dealPage
                label="Email Address"
                type="email"
                isEditing={isEditing}
                {...field}
              />
            )}
          />
          <Controller
            name="vendorsPhoneNumber"
            control={control}
            render={({ field }) => (
              <DetailItem
                dealPage
                label="Phone Number"
                type="phone"
                isEditing={isEditing}
                {...field}
              />
            )}
          />
          <Controller
            name="sellersSolicitorName"
            control={control}
            render={({ field }) => (
              <DetailItem
                dealPage
                label="Seller’s Solicitor Name"
                isEditing={isEditing}
                {...field}
              />
            )}
          />
          <Controller
            name="sellersSolicitorFirm"
            control={control}
            render={({ field }) => (
              <DetailItem
                dealPage
                label="Seller’s Solicitor Firm"
                isEditing={isEditing}
                {...field}
              />
            )}
          />
          <Controller
            name="sellersSolicitorEmail"
            control={control}
            render={({ field }) => (
              <DetailItem
                dealPage
                label="Solicitor Email"
                type="email"
                isEditing={isEditing}
                {...field}
              />
            )}
          />
          <Controller
            name="sellersSolicitorPhoneNumber"
            control={control}
            render={({ field }) => (
              <DetailItem
                dealPage
                label="Solicitor Phone Number"
                type="phone"
                isEditing={isEditing}
                {...field}
              />
            )}
          />
          <Controller
            name="otherStakeholders"
            control={control}
            render={({ field }) => (
              <DetailItem
                dealPage
                label="Other Stakeholders"
                isEditing={isEditing}
                {...field}
              />
            )}
          />
        </div>
      </form>
    </div>
  );
};

export default SellerSideDetails;
