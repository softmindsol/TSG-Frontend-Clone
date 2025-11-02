import React from "react";
import { FiInfo } from "react-icons/fi";

const ReminderItem = ({ title, date, status }) => {
  const isError = status === "error";
  const containerClasses = `p-4 rounded-lg border ${
    isError ? "bg-red-50 border-red-200" : "bg-gray-50 border-gray-200"
  }`;

  return (
    <div className={containerClasses}>
      <div className="flex justify-between items-center">
        <div>
          <p className="font-medium text-gray-800 font-poppins">{title}</p>
          <p className="text-sm text-gray-500 font-poppins">{date}</p>
        </div>
        <div
          className={`text-sm font-medium ${
            isError ? "text-red-500" : "text-green-600"
          }`}
        >
          {isError && (
            <span className="inline-block mr-1">
              <FiInfo className="inline-block w-4 h-4 rotate-180" />
            </span>
          )}
          Completed
        </div>
      </div>
    </div>
  );
};

export default ReminderItem;
