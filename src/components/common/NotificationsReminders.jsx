import React from "react";
import ReminderItem from "./ReminderItem"; // Adjust the import path
import { FaPlus } from "react-icons/fa6";
import CustomHeading from "./Heading";

const NotificationsReminders = () => {
  // Sample data
  const reminders = [
    {
      id: 1,
      title: "Follow up with Johnson Corp",
      date: "01-08-2025",
      status: "completed",
    },
    {
      id: 2,
      title: "Send proposal to Tech Solutions",
      date: "01-07-2025",
      status: "error",
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center ">
        <CustomHeading heading="Notifications & Reminders" />
        {/* <a
          href="#"
          className="text-xs md:text-sm font-medium text-gray-800 underline font-poppins"
        >
          View All
        </a> */}
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* Add New Reminder Form */}
        <div className="mb-6">
          <p className="font-medium text-gray-800 mb-2 font-poppins flex items-center gap-2">
            <FaPlus /> <span className="">Add New Reminder</span>
          </p>
          <div className="flex flex-wrap gap-4">
            <input
              type="date"
              placeholder="dd/mm/yyyy"
              className="flex-1 p-2 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              placeholder="Reminder Description"
              className="flex-1 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <button className="mt-4 px-6 py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-700 font-poppins">
            Add Reminder
          </button>
        </div>

        {/* Reminders List */}
        <div className="space-y-4 max-h-[270px] overflow-y-auto ">
          {reminders.map((reminder) => (
            <ReminderItem
              key={reminder.id}
              title={reminder.title}
              date={reminder.date}
              status={reminder.status}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationsReminders;
