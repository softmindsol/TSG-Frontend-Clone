import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import DetailItem from "../common/DetailItem";
import Icons from "../../assets/icons/Icons";
import { FiEdit2 } from "react-icons/fi";
import { useDispatch } from "react-redux";
import {
  updateFinancialDetails,
  getSingleDeal,
} from "../../store/features/deal/service";

const FinancialDetails = ({ singleDeal }) => {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      agreedPrice: "",
      estimatedSDLT: "",
    },
  });

  // ✅ populate form with backend data
  useEffect(() => {
    if (singleDeal?.financialDetails) {
      reset({
        agreedPrice: singleDeal?.financialDetails?.agreedPrice || "",
        estimatedSDLT: singleDeal?.financialDetails?.estimatedSDLT || "",
      });
    }
  }, [singleDeal, reset]);

  // ✅ handle form submit
  const onSubmit = async (data) => {
    const dealId = singleDeal?._id;
    if (!dealId) {
      console.error("❌ Deal ID missing, cannot update financial details");
      return;
    }

    try {
      await dispatch(updateFinancialDetails({ dealId, data }));
      await dispatch(getSingleDeal({ dealId })); // refresh updated deal
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating financial details:", error);
    }
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Buttons */}
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
              className="flex items-center font-semibold text-[#F87171]"
            >
              Cancel
            </button>
          </div>
        )}

        {/* Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 my-4">
          <Controller
            name="agreedPrice"
            control={control}
            render={({ field }) => (
              <DetailItem
                dealPage
                label="Agreed Price"
                type="number"
                isEditing={isEditing}
                {...field}
              />
            )}
          />

          <Controller
            name="estimatedSDLT"
            control={control}
            render={({ field }) => (
              <DetailItem
                dealPage
                label="Estimated SDLT"
                type="number"
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

export default FinancialDetails;
