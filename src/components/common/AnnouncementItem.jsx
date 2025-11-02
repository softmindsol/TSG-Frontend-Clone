import React from "react";

const AnnouncementItem = ({ icon, title, description, iconBg }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex  items-center">
      <div className={`mr-4 ${iconBg}  p-2 font-bold rounded-md`}>{icon}</div>
      <div>
        <h4 className="font-medium text-gray-800 font-poppins">{title}</h4>
        <p className="text-sm text-gray-500 font-poppins">{description}</p>
      </div>
    </div>
  );
};

export default AnnouncementItem;
