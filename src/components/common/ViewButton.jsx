import React from "react";
import { FaEye } from "react-icons/fa";

const ViewButton = (props) => {
  return (
    <button
      {...props}
      className="
        group
        flex 
        items-center 
        justify-center 
        px-6 
        py-2 
        rounded-md 
        font-inter 
        text-xs 
        font-medium
        bg-gray-100 
        text-gray-500 
        hover:bg-gray-800 
        hover:text-white
        transition-colors
        duration-200
        cursor-pointer
      "
    >
      <FaEye className="mr-2 text-gray-500  group-hover:text-white transition-colors duration-200" />
      <span>View</span>
    </button>
  );
};

export default ViewButton;
