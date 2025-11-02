import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import { toast } from "sonner";
import { Controller } from "react-hook-form";
import FormInput from "./FormInput";
import SelectInput from "./SelectInput";
import GlobalButton from "./GlobalButton";
import Icons from "../../assets/icons/Icons";
import { createEvent } from "../../store/features/event/service";
import { selectIsCreatingEvent } from "../../store/features/event/slice";

const AddNewEventModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const isCreating = useSelector(selectIsCreatingEvent);
  const [activeTab, setActiveTab] = useState("Event Notes");

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      entryType: "meeting",
      date: "",
      startTime: "",
      endTime: "",
      allDay: false,
      address: "",
      notes: "",
      followUpNotes: "",
      status: "scheduled",
    },
  });

  // 👇 Watch allDay to control validation & UI
  const allDay = watch("allDay");

  // 👇 Optional: when switching to all-day, clear times so they don't validate
  useEffect(() => {
    if (allDay) {
      setValue("startTime", "");
      setValue("endTime", "");
    }
  }, [allDay, setValue]);

  const onSubmit = async (data) => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

      let startISO, endISO;
      if (data.allDay) {
        const d = new Date(data.date);
        const dayStart = new Date(d);
        dayStart.setHours(0, 0, 0, 0);
        const dayEnd = new Date(d);
        dayEnd.setHours(23, 59, 59, 999);

        // Convert local day bounds to UTC ISO
        startISO = new Date(
          Date.UTC(
            dayStart.getFullYear(),
            dayStart.getMonth(),
            dayStart.getDate(),
            dayStart.getHours(),
            dayStart.getMinutes(),
            dayStart.getSeconds(),
            dayStart.getMilliseconds()
          )
        ).toISOString();

        endISO = new Date(
          Date.UTC(
            dayEnd.getFullYear(),
            dayEnd.getMonth(),
            dayEnd.getDate(),
            dayEnd.getHours(),
            dayEnd.getMinutes(),
            dayEnd.getSeconds(),
            dayEnd.getMilliseconds()
          )
        ).toISOString();
      } else {
        // Quick client guard
        const s = new Date(`${data.date}T${data.startTime}`);
        const e = new Date(`${data.date}T${data.endTime}`);
        if (s >= e) {
          toast.error("End time must be after start time");
          return;
        }
        startISO = s.toISOString();
        endISO = e.toISOString();
      }

      const payload = {
        title: data.title,
        entryType: data.entryType,
        start: startISO,
        end: endISO,
        allDay: data.allDay,
        address: data.address,
        notes: data.notes,
        followUpNotes: data.followUpNotes,
        status: data.status,
        timeZone: tz,
      };

      const res = await dispatch(createEvent(payload)).unwrap();
      if (res.statusCode === 201) {
        toast.success("Event created successfully");
        reset();
        onClose();
      }
    } catch (err) {
      toast.error(err?.message || "Failed to create event");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 p-4 font-poppins">
      <div className="absolute inset-0 h-screen bg-black opacity-80"></div>

      <div className="bg-white rounded-2xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 relative">
        {/* Header */}
        <div className="flex items-start pb-6 border-b border-gray-200">
          <div className="bg-blue-100 p-3 rounded-lg mr-4">
            <Icons.CameraIcons className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Add Event</h2>
            <p className="text-base text-gray-500">Create a new Event</p>
          </div>
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-500 hover:text-gray-800"
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="py-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-5">
              Event Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Title"
                id="title"
                error={errors.title}
                {...register("title", { required: "Title is required" })}
              />

              <Controller
                name="entryType"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <SelectInput
                    label="Entry Type"
                    id="entryType"
                    placeholder="Select Type"
                    options={[
                      { value: "meeting", label: "Meeting" },
                      { value: "review", label: "Review" },
                      { value: "call", label: "Call" },
                      { value: "viewing", label: "Viewing" },
                      { value: "Other", label: "Other" },
                    ]}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              <FormInput
                type="date"
                label="Date"
                {...register("date", { required: "Date is required" })}
                error={errors.date}
              />
              <FormInput
                type="time"
                label="Start Time"
                disabled={allDay}
                {...register("startTime", {
                  required: !allDay
                    ? "Start time required"
                    : false /* 👈 conditional */,
                })}
                error={errors.startTime}
              />
              <FormInput
                type="time"
                label="End Time"
                disabled={allDay}
                {...register("endTime", {
                  required: !allDay
                    ? "End time required"
                    : false /* 👈 conditional */,
                })}
                error={errors.endTime}
              />
            </div>

            <div className="flex items-center space-x-3 mt-4">
              <input
                type="checkbox"
                {...register("allDay")}
                className="mt-1 h-4 w-4 text-black border-gray-300 rounded focus:ring-black accent-black"
              />
              <label className="text-base font-medium text-gray-700 leading-relaxed">
                All Day
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
              <FormInput
                label="Address"
                id="address"
                {...register("address")}
              />
            </div>
          </div>

          {/* Notes Tabs */}
          <div className="border-b border-gray-200 mb-4">
            <nav className="flex gap-6 -mb-px">
              {["Event Notes", "Follow-Up Notes"].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`py-3 px-1 text-sm font-medium ${
                    activeTab === tab
                      ? "border-b-2 border-[#081722] text-[#081722]"
                      : "border-b-2 border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {activeTab === "Event Notes" ? (
            <textarea
              {...register("notes")}
              placeholder="Write event notes here..."
              className="w-full min-h-[120px] p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
            />
          ) : (
            <textarea
              {...register("followUpNotes")}
              placeholder="Write follow-up notes here..."
              className="w-full min-h-[120px] p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
            />
          )}

          {/* Status */}
          <Controller
            name="status"
            control={control}
            rules={{ required: "Status is required" }}
            render={({ field }) => (
              <SelectInput
                label="Status"
                id="status"
                placeholder="Select Status"
                options={[
                  { value: "scheduled", label: "Scheduled" },
                  { value: "completed", label: "Completed" },
                  { value: "canceled", label: "Canceled" },
                  { value: "no-show", label: "No Show" },
                ]}
                value={field.value}
                onChange={field.onChange} // ✅ ensures RHF sees updates
              />
            )}
          />

          {/* Footer */}
          <div className="flex justify-end items-center pt-6 border-t border-gray-200 space-x-4">
            <GlobalButton variant="secondary" onClick={onClose}>
              Cancel
            </GlobalButton>
            <GlobalButton type="submit" variant="primary" disabled={isCreating}>
              {isCreating ? "Adding..." : "Add Event"}
            </GlobalButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewEventModal;
