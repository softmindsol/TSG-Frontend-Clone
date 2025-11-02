// src/components/QuickNotes.js

import React, { useState } from "react";
import InfoCard from "./InfoCard"; // Assumed to exist

// --- Dummy Data ---
const initialQuickNote =
  "Looking for move-in ready properties with good foot traffic";

const QuickNotes = ({ handleEditOverviewToggle, notes }) => {
  // --- State Management is now internal to the component ---
  const [note, setNote] = useState(notes);
  const [isEditing, setIsEditing] = useState(false);
  const [currentNote, setCurrentNote] = useState(note);

  const handleSave = () => {
    setNote(currentNote); // Update the main note state
    setIsEditing(false);
  };

  const handleToggle = () => {
    if (isEditing) {
      setCurrentNote(note); // Revert changes if canceling
    }
    setIsEditing(!isEditing);
  };

  return (
    <InfoCard
      title="Quick Notes"
      isEditing={isEditing}
      onEditToggle={handleToggle}
    >
      <div className="bg-[#F9FAFB] rounded-lg p-4">
        {isEditing ? (
          <textarea
            value={currentNote}
            onChange={(e) => setCurrentNote(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md text-sm text-[#6B7280]"
            rows={3}
          />
        ) : (
          <p className="text-sm text-[#6B7280]">{note}</p>
        )}
      </div>
      {isEditing && (
        <div className="flex justify-end mt-4">
          <button
            onClick={handleEditOverviewToggle}
            className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-gray-900"
          >
            Save
          </button>
        </div>
      )}
    </InfoCard>
  );
};

export default QuickNotes;
