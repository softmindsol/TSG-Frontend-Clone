import React from "react";

const ProgressBar = ({ percentage }) => {
  let barColor = "bg-green-500"; // Default to green for 100%
  if (percentage < 35) {
    barColor = "bg-yellow-500";
  } else if (percentage < 90) {
    barColor = "bg-gray-600";
  } else if (percentage < 100) {
    barColor = "bg-gray-600"; // Or another color based on your logic
  }

  // Handle the special case from the image (85% and 65% are gray)
  if (percentage === 85 || percentage === 65) {
    barColor = "bg-gray-600";
  }

  return (
    <div className="flex flex-col items-start">
      <div className="flex-col justify-end text-right mb-1">
        <span className="text-xs font-medium text-gray-500 mr-3 mb-1">
          {percentage}%
        </span>
        <div className="w-24 bg-gray-200 rounded-full h-2 mr-4">
          <div
            className={`h-2 rounded-full ${barColor}`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
