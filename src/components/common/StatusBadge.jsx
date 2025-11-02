import React from "react";

const StatusBadge = ({ status, icon }) => {
  const baseClasses = "px-2 py-1 rounded-full text-sm font-normal text-center";

  const statusClasses = {
    active: "bg-green-100 text-green-600",
    verified: "bg-green-100 w-32 text-green-600",
    flagged: "bg-red-100 w-32 text-red-600",
    pending: "bg-[#F6B31D]/20 w-32 text-[#F6B31D]  rounded",

    inactive: "bg-red-100 text-red-600",
  };

  return (
    <div
      className={`${baseClasses} flex  items-center gap-1 justify-center ${
        statusClasses[status] || "bg-gray-100 text-gray-800"
      }`}
    >
      {icon}
      {status}
    </div>
  );
};

export default StatusBadge;
