import React, { useState, useEffect } from "react"; // Added useEffect import
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  createJournal,
  getJournals,
} from "../../store/features/journal/service"; // Ensure getJournals is imported

const Journal = ({ clientId }) => {
  // Removed journalEntries prop as it will come from Redux
  const dispatch = useDispatch();

  // Renamed for clarity: loading state for creating a journal entry
  const { isLoading: isCreatingJournal } = useSelector(
    (state) => state.journal.createJournal
  );
  // Loading state and data for fetching journal entries
  const { data: journalList, isLoading: isJournalsLoading } = useSelector(
    (state) => state.journal.getJournals
  );

  const JournalEntry = ({ entry }) => {
    const typeStyles = {
      "Client Meeting": { color: "text-green-700", bg: "bg-green-100" },
      "Phone Call": { color: "text-blue-600", bg: "bg-blue-100" },
      "Email / Message": { color: "text-purple-600", bg: "bg-purple-100" },
      "Viewing Feedback": { color: "text-yellow-700", bg: "bg-yellow-100" },
      "Offer Discussion": { color: "text-orange-600", bg: "bg-orange-100" },
      "Legal / Finance Update": { color: "text-red-600", bg: "bg-red-100" },
      "General Notes": { color: "text-gray-800", bg: "bg-gray-100" },
      Other: { color: "text-pink-600", bg: "bg-pink-100" },
    };

    // ✅ Use entry.status instead of entry.type
    const style = typeStyles[entry.status] || typeStyles["General Notes"];

    return (
      <div className="bg-[#F9FAFB] p-4 rounded-lg">
        <div className="flex justify-between items-center mb-3">
          <span
            className={`px-3 py-1 text-xs font-medium rounded-full ${style.bg} ${style.color}`}
          >
            {entry.status}
          </span>
          <p className="text-xs text-gray-800">
            {journalList?.assignedAgent?.name}
          </p>
        </div>
        <p className="text-sm text-gray-600 mb-4">{entry.note}</p>
        <p className="text-xs text-gray-400">{entry.createdAt.split("T")[0]}</p>
      </div>
    );
  };

  const [customType, setCustomType] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      note: "",
      status: "",
    },
  });

  const type = watch("type");

  const typeStyles = {
    "Client Meeting": { color: "text-green-700", bg: "bg-green-100" },
    "Phone Call": { color: "text-blue-600", bg: "bg-blue-100" },
    "Email / Message": { color: "text-purple-600", bg: "bg-purple-100" },
    "Viewing Feedback": { color: "text-yellow-700", bg: "bg-yellow-100" },
    "Offer Discussion": { color: "text-orange-600", bg: "bg-orange-100" },
    "Legal / Finance Update": { color: "text-red-600", bg: "bg-red-100" },
    "General Notes": { color: "text-gray-800", bg: "bg-gray-100" },
    Other: { color: "text-pink-600", bg: "bg-pink-100" },
  };

  // Fetch journals when clientId changes or component mounts
  useEffect(() => {
    if (clientId) {
      dispatch(getJournals(clientId));
    }
  }, [clientId, dispatch]);

  // Reset form after successful submission
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(); // Reset form fields to default values
      setCustomType(""); // Clear custom type input as well
    }
  }, [isSubmitSuccessful, reset]); //

  const onSubmit = async (data) => {
    if (data.note.trim() === "") return;

    const finalType =
      data.status === "Other" && customType.trim() !== ""
        ? customType
        : data.status;

    const journalData = {
      status: finalType,
      note: data.note,

      date: new Date().toISOString(),
    };

    const result = await dispatch(createJournal({ clientId, journalData }));

    if (createJournal.fulfilled.match(result)) {
      dispatch(getJournals(clientId));
    }
  };

  return (
    <div className="bg-white  border-gray-200 rounded-xl py-3 xl:py-6 px-4 h-full ">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Journal</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col flex-grow"
      >
        {/* Note Textarea */}
        <textarea
          {...register("note")}
          className="w-full p-3 border border-gray-300 rounded-lg resize-none mb-4 text-sm"
          rows="5"
          placeholder="Add a new note..."
        />

        {/* Type Selector + Add Button */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <select
            placeholder="add notes"
            {...register("status")}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            defaultValue="General Notes" // optional default value
          >
            <option value="">Select Status</option>
            <option value="Client Meeting">Client Meeting</option>
            <option value="General Notes">General Notes</option>
            <option value="Phone Call">Phone Call</option>
            <option value="Email / Message">Email / Message</option>
            <option value="Viewing Feedback">Viewing Feedback</option>
            <option value="Offer Discussion">Offer Discussion</option>
            <option value="Legal / Finance Update">
              Legal / Finance Update
            </option>
            <option value="Other">Other</option>
          </select>

          {type === "Other" && (
            <input
              type="text"
              placeholder="Enter custom type"
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm flex-1"
              value={customType}
              onChange={(e) => setCustomType(e.target.value)}
            />
          )}

          <button
            type="submit"
            disabled={isCreatingJournal} // Use specific loading state for creation
            className={`px-2 py-2 text-sm font-medium text-white rounded-md ${
              isCreatingJournal
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gray-800 hover:bg-gray-900"
            }`}
          >
            {isCreatingJournal ? "Adding..." : "Add Note"}
          </button>
        </div>
      </form>

      {/* Journal Entries */}
      <div className="space-y-4 items-start overflow-y-auto pr-2 h-[1410px]">
        {isJournalsLoading ? (
          <p>Loading journal entries...</p>
        ) : journalList && journalList?.journal?.length > 0 ? (
          journalList?.journal?.map((entry) => (
            <JournalEntry key={entry.id} entry={entry} />
          ))
        ) : (
          <p className="text-gray-500 text-center">No journal entries yet.</p>
        )}
      </div>
    </div>
  );
};

export default Journal;
