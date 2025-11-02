import React from "react";

// You can pass an SVG icon component as a prop
const StatCard = ({ icon, title, value, change, changeType, footerText }) => {
  const isIncrease = changeType === "increase";
  const changeColor = isIncrease ? "text-[#00AC4F]" : "text-[#F50408]";
  const Arrow = isIncrease ? "↑" : "↓";

  return (
    <div className="flex-1 bg-white p-2 md:p-4 sm:p-6 rounded-lg shadow-md flex items-center max-sm:flex-col max-sm:text-center">
      {/* Icon */}
      <div className="mr-4 sm:mr-6 mb-2 sm:mb-0 flex-shrink-0 text-xl sm:text-2xl md:text-3xl">
        {icon}
      </div>

      {/* Text Content */}
      <div>
        {/* Title */}
        <h3 className="text-[10px] sm:text-xs md:text-sm text-[#6B7280] font-poppins">
          {title}
        </h3>

        {/* Value */}
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-[#081722] my-1 font-poppins">
          {value}
        </p>

        {/* Change + Footer */}
        <div className="flex max-sm:justify-center items-center text-[9px] sm:text-[11px] md:text-xs lg:text-sm">
          {change && (
            <span className={`font-bold mr-1 ${changeColor}`}>
              {Arrow} {change}
            </span>
          )}
          <span className="text-[#9197B3] font-poppins">{footerText}</span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
