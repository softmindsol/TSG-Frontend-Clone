import React, { useEffect, useState } from "react";
import DetailItem from "../common/DetailItem";
import Icons from "../../assets/icons/Icons";
import { useForm, Controller } from "react-hook-form";
import { FiEdit2 } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import {
  updateConveyancingMilestones,
  getSingleDeal,
} from "../../store/features/deal/service";

const ConveyancingMilestone = ({ singleDeal }) => {
  const dispatch = useDispatch();
  const dealId = singleDeal?._id;
  const [isEditing, setIsEditing] = useState(false);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      milestone: "",
      date: "",
      ownerName: "",
      notes: "",
      file: null,
      status: "",
    },
  });

  // ✅ Load data from backend into form when singleDeal updates
  useEffect(() => {
    if (
      singleDeal?.conveyancingMilestones &&
      singleDeal.conveyancingMilestones.length > 0
    ) {
      const c = singleDeal.conveyancingMilestones[0]; // use first milestone
      reset({
        milestone: c?.milestone || "",
        date: c?.date ? c.date.split("T")[0] : "",
        ownerName: c?.ownerName || "",
        notes: c?.notes || "",
        file: c?.file,
        status: c?.status || "",
      });
    }
  }, [singleDeal, reset]);

  // ✅ Submit handler
  const onSubmit = async (formData) => {
    if (!dealId) return toast.error("Deal ID missing!");

    const fd = new FormData();
    fd.append("milestone", formData.milestone || "");
    fd.append("date", formData.date || "");
    fd.append("ownerName", formData.ownerName || "");
    fd.append("notes", formData.notes || "");
    fd.append("status", formData.status || "");
    if (formData.file instanceof File) {
      fd.append("file", formData.file);
    }

    try {
      await dispatch(updateConveyancingMilestones({ dealId, data: fd }));
      await dispatch(getSingleDeal({ dealId })); // refresh redux store
      setIsEditing(false);
      toast.success("Conveyancing milestone updated successfully!");
    } catch (error) {
      toast.error("Failed to update conveyancing milestone!");
    }
  };

  // ✅ Cancel button resets to backend values
  const handleCancel = () => {
    if (
      singleDeal?.conveyancingMilestones &&
      singleDeal.conveyancingMilestones.length > 0
    ) {
      const c = singleDeal.conveyancingMilestones[0];
      reset({
        milestone: c?.milestone || "",
        date: c?.date ? c.date.split("T")[0] : "",
        ownerName: c?.ownerName || "",
        notes: c?.notes || "",
        file: null,
        status: c?.status || "",
      });
    }
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

        {/* Milestone */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-800 mb-2">
            Choose Milestone
          </label>
          <Controller
            name="milestone"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                disabled={!isEditing}
                className={`w-full text-sm rounded-md ${
                  isEditing ? "border border-gray-300" : "bg-[#f2f2f2]"
                } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <option value="">Select Milestone</option>
                <option value="HSBC">HSBC</option>
                <option value="Barclays">Barclays</option>
                <option value="Lloyds">Lloyds</option>
                <option value="NatWest">NatWest</option>
              </select>
            )}
          />
        </div>

        <div className="grid grid-cols-1 my-4 sm:grid-cols-2 md:grid-cols-2 gap-6">
          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Status
            </label>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  disabled={!isEditing}
                  className={`w-full text-sm rounded-md ${
                    isEditing ? "border border-gray-300" : "bg-[#f2f2f2]"
                  } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="">Select Status</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                </select>
              )}
            />
          </div>

          {/* Owner Name */}
          <Controller
            name="ownerName"
            control={control}
            render={({ field }) => (
              <DetailItem
                dealPage
                label="Owner Name"
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

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              File Upload (If relevant)
            </label>
            <Controller
              name="file"
              control={control}
              render={({ field }) => (
                <input
                  type="file"
                  disabled={!isEditing}
                  onChange={(e) => field.onChange(e.target.files[0])}
                  className={`w-full text-sm rounded-md ${
                    isEditing ? "border border-gray-300" : "bg-[#f2f2f2]"
                  } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              )}
            />
            {!isEditing &&
              singleDeal?.conveyancingMilestones?.[0]?.file?.url && (
                <p className="text-sm text-gray-600 mt-1">
                  Current file:{" "}
                  <a
                    href={singleDeal.conveyancingMilestones[0].file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    {singleDeal.conveyancingMilestones[0].file.filename ||
                      "View File"}
                  </a>
                </p>
              )}
          </div>

          {/* Notes */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Notes
            </label>
            <Controller
              name="notes"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  rows="3"
                  disabled={!isEditing}
                  className={`w-full text-sm rounded-md ${
                    isEditing ? "border border-gray-300" : "bg-[#f2f2f2]"
                  } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              )}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ConveyancingMilestone;
