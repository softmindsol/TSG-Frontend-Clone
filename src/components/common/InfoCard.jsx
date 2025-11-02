import React from "react";
import { FiEdit2 } from "react-icons/fi";
import { FaSave } from "react-icons/fa";
import Icons from "../../assets/icons/Icons";

const InfoCard = ({ title, isEditing, onEditToggle, children, onSave }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-[#081722]">{title}</h2>
        <button
          className={`flex items-center text-base cursor-pointer font-semibold ${
            isEditing ? " text-[#00AC4F]" : "text-[#1877F2]"
          }  transition-colors`}
        >
          {isEditing ? (
            <button className="flex items-center" onClick={onSave}>
              <Icons.CircleCheck className="mr-2" />
              Save
            </button>
          ) : (
            <button className="flex items-center" onClick={onEditToggle}>
              <FiEdit2 className="mr-2" />
              Edit
            </button>
          )}
        </button>
      </div>
      {children}
    </div>
  );
};

export default InfoCard;
