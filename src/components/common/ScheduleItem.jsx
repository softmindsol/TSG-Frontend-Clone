import React from "react";
import { RiDeleteBinLine, RiInboxArchiveLine } from "react-icons/ri";

const ScheduleItem = ({
  time,
  title,
  entryType,
  completed,
  icon,
  iconBg,
  onDelete,
  onToggleComplete,
}) => {
  return (
    <div
      className={`flex items-center p-3 rounded-lg transition ${
        completed ? "bg-gray-50" : "hover:bg-gray-50"
      }`}
    >
      <label className="flex items-center cursor-pointer relative mr-4">
        <input
          type="checkbox"
          checked={completed}
          onChange={onToggleComplete}
          className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded border border-slate-300 checked:bg-green-600 checked:border-green-600"
        />
        <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            viewBox="0 0 20 20"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </label>

      <span className="w-20 text-right text-sm font-semibold text-gray-500 mr-4 font-poppins">
        {time}
      </span>

      <div className={`${iconBg} p-2 rounded-md mr-4`}>{icon}</div>

      <div className="flex-grow">
        <p className="font-medium text-gray-800">{title}</p>
        <p className="text-sm text-gray-500 capitalize">{entryType}</p>
      </div>

      <div className="flex gap-2 text-gray-400">
        <button>
          <RiInboxArchiveLine className="hover:text-gray-600" />
        </button>
        <button onClick={onDelete} disabled={false}>
          <RiDeleteBinLine className="hover:text-red-600" />
        </button>
      </div>
    </div>
  );
};

export default ScheduleItem;
