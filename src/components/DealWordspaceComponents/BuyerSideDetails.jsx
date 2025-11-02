import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import DetailItem from "../common/DetailItem";
import Icons from "../../assets/icons/Icons";
import { FiEdit2 } from "react-icons/fi";
import { useDispatch } from "react-redux";
import {
  updateBuyerDetails,
  getSingleDeal,
} from "../../store/features/deal/service";

const BuyerSideDetails = ({ singleDeal }) => {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      buyerSolicitorName: "",
      buyerSolicitorFirm: "",
      buyerEmailAddress: "",
      buyerPhoneNumber: "",
      mortgageBrokerName: "",
      mortgageBrokerFirm: "",
      lender: "",
    },
  });

  // ✅ When singleDeal changes, update form values
  useEffect(() => {
    if (singleDeal?.buyerDetails) {
      const { buyerDetails } = singleDeal;
      reset({
        buyerSolicitorName: buyerDetails?.buyerSolicitorName || "",
        buyerSolicitorFirm: buyerDetails?.buyerSolicitorFirm || "",
        buyerEmailAddress: buyerDetails?.buyerEmailAddress || "",
        buyerPhoneNumber: buyerDetails?.buyerPhoneNumber || "",
        mortgageBrokerName: buyerDetails?.mortgageBrokerName || "",
        mortgageBrokerFirm: buyerDetails?.mortgageBrokerFirm || "",
        lender: buyerDetails?.lender || "",
      });
    }
  }, [singleDeal, reset]);

  const onSubmit = async (data) => {
    const dealId = singleDeal?._id;
    console.log("🚀 ~ onSubmit ~ dealId:", dealId);

    if (!dealId) {
      console.error("❌ Deal ID not found, cannot update buyer details.");
      return;
    }

    try {
      await dispatch(updateBuyerDetails({ dealId, data }));
      await dispatch(getSingleDeal({ dealId })); // ✅ refresh after update
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating buyer details:", error);
    }
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit(onSubmit)}>
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

        {/* GRID */}
        <div className="grid grid-cols-1 my-4 sm:grid-cols-2 md:grid-cols-2 gap-6">
          <Controller
            name="buyerSolicitorName"
            control={control}
            render={({ field }) => (
              <DetailItem
                dealPage
                label="Buyer’s Solicitor Name"
                isEditing={isEditing}
                {...field}
              />
            )}
          />
          <Controller
            name="buyerSolicitorFirm"
            control={control}
            render={({ field }) => (
              <DetailItem
                dealPage
                label="Buyer’s Solicitor Firm"
                isEditing={isEditing}
                {...field}
              />
            )}
          />
          <Controller
            name="buyerEmailAddress"
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
            name="buyerPhoneNumber"
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
            name="mortgageBrokerName"
            control={control}
            render={({ field }) => (
              <DetailItem
                dealPage
                label="Mortgage Broker Name"
                isEditing={isEditing}
                {...field}
              />
            )}
          />
          <Controller
            name="mortgageBrokerFirm"
            control={control}
            render={({ field }) => (
              <DetailItem
                dealPage
                label="Mortgage Broker Firm"
                isEditing={isEditing}
                {...field}
              />
            )}
          />
        </div>

        {/* LENDER SELECT */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-800 mb-2">
            Lender
          </label>
          <Controller
            name="lender"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                className={`w-full text-sm rounded-md ${
                  isEditing ? "border border-gray-300" : "bg-[#f2f2f2]"
                } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                disabled={!isEditing}
              >
                <option value="HSBC">HSBC</option>
                <option value="Barclays">Barclays</option>
                <option value="Lloyds">Lloyds</option>
                <option value="NatWest">NatWest</option>
              </select>
            )}
          />
        </div>
      </form>
    </div>
  );
};

export default BuyerSideDetails;
