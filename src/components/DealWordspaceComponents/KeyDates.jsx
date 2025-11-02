import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import DetailItem from "../common/DetailItem";
import Icons from "../../assets/icons/Icons";
import { FiEdit2 } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { updateKeyDates } from "../../store/features/deal/service";

const KeyDates = ({ singleDeal }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      targetExchangeDate: singleDeal?.keyDates?.targetExchangeDate || "",
      targetCompletionDate: singleDeal?.keyDates?.targetCompletionDate || "",
    },
  });

  // Reset form when new deal is loaded
  useEffect(() => {
    if (singleDeal?.keyDates) {
      reset({
        targetExchangeDate: singleDeal.keyDates.targetExchangeDate || "",
        targetCompletionDate: singleDeal.keyDates.targetCompletionDate || "",
      });
    }
  }, [singleDeal, reset]);

  const onSubmit = async (data) => {
    if (!singleDeal?._id) return;
    try {
      await dispatch(updateKeyDates({ dealId: singleDeal._id, data })).unwrap();
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update key dates:", error);
    }
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
          <div className="absolute right-1.5 flex -top-5 items-center gap-3">
            <button
              type="submit"
              className="flex cursor-pointer items-center font-semibold text-[#00AC4F]"
            >
              <Icons.CircleCheck className="mr-2" />
              Save
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
          {/* Target Exchange Date */}
          <Controller
            name="targetExchangeDate"
            control={control}
            render={({ field }) => (
              <DetailItem
                dealPage
                type="date"
                label="Target Exchange Date"
                value={field.value}
                onChange={field.onChange}
                isEditing={isEditing}
              />
            )}
          />

          {/* Target Completion Date */}
          <Controller
            name="targetCompletionDate"
            control={control}
            render={({ field }) => (
              <DetailItem
                dealPage
                type="date"
                label="Target Completion Date"
                value={field.value}
                onChange={field.onChange}
                isEditing={isEditing}
              />
            )}
          />
        </div>
      </form>
    </div>
  );
};

export default KeyDates;
