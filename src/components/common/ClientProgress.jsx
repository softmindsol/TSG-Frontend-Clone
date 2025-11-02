import React from "react";

const ClientProgress = ({ avatar, name, status, progress, progressColor }) => {
  return (
    <div className="flex items-strat py-2">
      <img src={avatar} alt={name} className="w-10 h-10 rounded-full mr-4" />
      <div className="flex-grow space-y-2">
        <p className="font-medium text-gray-800 font-poppins">{name}</p>
        <div className="flex justify-between items-center text-xs text-gray-500 mb-1">
          <span className="font-poppins">{status}</span>
          <span className="font-poppins">{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div
            className={`${progressColor} h-1.5 rounded-full`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ClientProgress;
