import { VscAccount } from "react-icons/vsc";
import { FaRegStar } from "react-icons/fa";
import { HiOutlineDocumentText } from "react-icons/hi";

const NotificationsDropdown = ({ showNotifications }) => {
  // Sample data to mimic the notifications in the design
  const notifications = [
    {
      id: 1,
      icon: <VscAccount className="text-[#00AC4F]" size={16} />,
      title: "Client Meeting- Sarah Wilson",
      subtitle: "Meeting At 9:00 AM",
      time: "5 mins ago",
      isRead: false,
    },
    {
      id: 2,
      icon: <FaRegStar className="text-[#00AC4F]" size={16} />,
      title: "New CRM Integration",
      subtitle: "Connect with Salesforce seamlessly",
      time: "5 mins ago",
      isRead: false,
    },
    {
      id: 3,
      icon: <HiOutlineDocumentText className="text-[#00AC4F]" size={16} />,
      title: "TechCorp Ltd",
      subtitle: "Document Uploaded",
      time: "5 mins ago",
      isRead: true, // Example of a read notification
    },
  ];

  return (
    <>
      {/* Notification Dropdown */}
      {showNotifications && (
        <div
          className="absolute right-0 top-full mt-2 w-[265px] rounded-[10px] border border-[#E2E8F0] bg-white z-50"
          style={{
            filter: "drop-shadow(0px 4px 50.6px rgba(0, 0, 0, 0.12))",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-[14px] pt-[15px] pb-[13px]">
            <h3 className="font-poppins text-[12px] font-medium text-[#081722]">
              Notifications
            </h3>
            <button className="font-poppins text-[8px] font-semibold text-[#081722] underline">
              Mark all as read
            </button>
          </div>

          <hr className="border-t border-[#E7EAEE]" />

          {/* Notifications List */}
          <div className="flex flex-col">
            {notifications.map((notification, index) => (
              <div
                key={notification.id}
                className={`flex items-center p-4 ${
                  index !== notifications.length - 1
                    ? "border-b border-[#E2E8F0]"
                    : ""
                } ${notification.id === 1 ? "bg-[#F9FAFB]" : "bg-white"}`}
              >
                {/* Icon */}
                <div className="mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-[6px] bg-[rgba(0,172,79,0.1)]">
                  {notification.icon}
                </div>

                {/* Content */}
                <div className="flex-grow">
                  <p className="font-poppins text-[10px] font-medium text-[#081722]">
                    {notification.title}
                  </p>
                  <p className="font-poppins text-[8px] text-[#6B7280]">
                    {notification.subtitle}
                  </p>
                  <p className="font-poppins text-[6px] text-[#9CA3AF] mt-1">
                    {notification.time}
                  </p>
                </div>

                {/* Unread Indicator */}
                {!notification.isRead && (
                  <div className="ml-2 h-[6px] w-[6px] flex-shrink-0 rounded-full bg-[#F50408]"></div>
                )}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="text-center py-3">
            <button className="font-inter text-[8px] font-semibold text-[#081722] underline">
              See all recent Activity
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationsDropdown;
