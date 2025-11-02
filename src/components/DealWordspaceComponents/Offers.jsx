import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import DetailItem from "../common/DetailItem";
import Icons from "../../assets/icons/Icons";
import { FiEdit2 } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { updateOffer, getSingleDeal } from "../../store/features/deal/service";

const Offers = ({ singleDeal }) => {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      offerNumber: "",
      date: "",
      amount: "",
      conditions: "",
      expiryDate: "",
      proofOfFundsAttached: "",
      status: "",
      currentPosition: "",
    },
  });

  // ✅ Load data from singleDeal
  useEffect(() => {
    if (singleDeal?.offers) {
      const offer = singleDeal.offers;
      reset({
        offerNumber: offer?.offerNumber || "",
        date: offer?.date || "",
        amount: offer?.amount || "",
        conditions: offer?.conditions || "",
        expiryDate: offer?.expiryDate || "",
        proofOfFundsAttached: !!offer?.proofOfFundsAttached,
        status: offer?.status || "",
        currentPosition: offer?.currentPosition || "",
      });
    }
  }, [singleDeal, reset]);

  // ✅ Handle form submit
  const onSubmit = async (data) => {
    const dealId = singleDeal?._id;
    if (!dealId) {
      console.error("❌ Deal ID not found.");
      return;
    }

    // Convert string to boolean for API
    const payload = {
      ...data,
      proofOfFundsAttached:
        data.proofOfFundsAttached === "Attached" ||
        data.proofOfFundsAttached === true,
    };

    try {
      await dispatch(updateOffer({ dealId, data: payload }));
      await dispatch(getSingleDeal({ dealId }));
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating offer:", error);
    }
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Edit / Save / Cancel Buttons */}
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

        {/* Offer Fields */}
        <div className="grid grid-cols-1 my-4 sm:grid-cols-2 md:grid-cols-2 gap-6">
          {/* Offer Number */}
          <Controller
            name="offerNumber"
            control={control}
            render={({ field }) => (
              <DetailItem
                dealPage
                label="Offer Number"
                type="text"
                isEditing={isEditing}
                {...field}
              />
            )}
          />

          {/* Date */}
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <DetailItem
                dealPage
                label="Date"
                type="date"
                isEditing={isEditing}
                {...field}
              />
            )}
          />

          {/* Amount */}
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <DetailItem
                dealPage
                label="Amount (£)"
                type="number"
                isEditing={isEditing}
                {...field}
              />
            )}
          />

          {/* Conditions */}
          <Controller
            name="conditions"
            control={control}
            render={({ field }) => (
              <DetailItem
                dealPage
                label="Conditions"
                type="text"
                isEditing={isEditing}
                {...field}
              />
            )}
          />

          {/* Expiry Date */}
          <Controller
            name="expiryDate"
            control={control}
            render={({ field }) => (
              <DetailItem
                dealPage
                label="Expiry Date (if necessary)"
                type="date"
                isEditing={isEditing}
                {...field}
              />
            )}
          />

          {/* Proof of Funds (boolean) */}
          <Controller
            name="proofOfFundsAttached"
            control={control}
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Proof of Funds Attached
                </label>
                <select
                  {...field}
                  disabled={!isEditing}
                  onChange={(e) =>
                    field.onChange(e.target.value === "Attached")
                  }
                  value={field.value ? "Attached" : "Not Attached"}
                  className={`w-full text-sm rounded-md ${
                    isEditing
                      ? "border border-gray-300 bg-white"
                      : "bg-[#f2f2f2]"
                  } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="Attached">Attached</option>
                  <option value="Not Attached">Not Attached</option>
                </select>
              </div>
            )}
          />

          {/* Status */}
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Status
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
                  <option value="Accepted">Accepted</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
            )}
          />

          {/* Current Position */}
          <Controller
            name="currentPosition"
            control={control}
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Current Position
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
                  <option value="First Time Buyer">First Time Buyer</option>
                  <option value="Investor">Investor</option>
                  <option value="Cash Buyer">Cash Buyer</option>
                  <option value="Mortgage Buyer">Mortgage Buyer</option>
                </select>
              </div>
            )}
          />
        </div>
      </form>
    </div>
  );
};

export default Offers;
