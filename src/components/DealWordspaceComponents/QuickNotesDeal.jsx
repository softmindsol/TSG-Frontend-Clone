import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  updateQuickNotes,
  getSingleDeal,
} from "../../store/features/deal/service";

const QuickNotesDeal = ({ singleDeal }) => {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      note: "",
    },
  });

  // ✅ Populate with backend value
  useEffect(() => {
    if (singleDeal?.quickNotes) {
      reset({
        note: singleDeal?.quickNotes?.notes || "",
      });
    }
  }, [singleDeal, reset]);

  // ✅ Handle save
  const onSubmit = async (data) => {
    const dealId = singleDeal?._id;
    if (!dealId) {
      console.error("❌ Deal ID missing, cannot update quick notes.");
      return;
    }

    try {
      await dispatch(updateQuickNotes({ dealId, data: { notes: data.note } }));
      await dispatch(getSingleDeal({ dealId })); // refresh deal after save
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating quick notes:", error);
    }
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  return (
    <div className="bg-[#F9FAFB] rounded-lg p-4 relative">
      <form onSubmit={handleSubmit(onSubmit)}>
        {isEditing ? (
          <>
            <Controller
              control={control}
              name="note"
              render={({ field }) => (
                <textarea
                  {...field}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-blue-400"
                  rows={3}
                />
              )}
            />
            <div className="flex justify-end mt-2 gap-2">
              <button
                type="button"
                onClick={handleCancel}
                className="px-3 py-1 text-sm rounded-md border border-gray-300 text-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1 text-sm rounded-md bg-blue-600 text-white"
              >
                Save
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="text-sm text-[#6B7280] whitespace-pre-wrap">
              {watch("note") || "No notes added yet."}
            </p>
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="absolute top-2 right-2 text-blue-600 text-sm"
            >
              Edit
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default QuickNotesDeal;
