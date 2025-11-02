import React from "react";
import AnnouncementItem from "./AnnouncementItem"; // Adjust the import path
import { FaRegStar } from "react-icons/fa";
import { FiCalendar } from "react-icons/fi";
import { FiMessageSquare } from "react-icons/fi";
import CustomHeading from "./Heading";

const Announcements = () => {
  // Sample Data
  const announcements = [
    {
      id: 1,
      iconBg: "bg-[#00AC4F1A]",
      icon: <FaRegStar color="#00AC4F" size={18} />,
      title: "New CRM Integration",
      description: "Connect with Salesforce seamlessly",
    },
    {
      id: 2,
      iconBg: "bg-[#1877F21A]",
      icon: <FiCalendar color="#1877F2" size={18} />,
      title: "Sales Training Webinar",
      description: "Jan 15, 2025 at 2 PM EST",
    },
    {
      id: 3,
      iconBg: "bg-[#9333EA1A]",
      icon: <FiMessageSquare color="#9333EA" size={18} />,
      title: "Pro Tip: Use AI Assistant",
      description: "Ask Saxon for quick reminders and insights",
    },
    {
      id: 4,
      iconBg: "bg-[#9333EA1A]",
      icon: <FiMessageSquare color="#9333EA" size={18} />,
      title: "Pro Tip: Use AI Assistant",
      description: "Ask Saxon for quick reminders and insights",
    },
  ];
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <CustomHeading heading="Announcements" />

        <a
          href="#"
          className="text-xs md:text-sm font-medium text-gray-800 underline font-poppins"
        >
          View All
        </a>
      </div>
      <div className="space-y-6  overflow-y-auto max-h-[564px]">
        {announcements.map((item) => (
          <AnnouncementItem
            key={item.id}
            icon={item.icon}
            iconBg={item.iconBg}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Announcements;
