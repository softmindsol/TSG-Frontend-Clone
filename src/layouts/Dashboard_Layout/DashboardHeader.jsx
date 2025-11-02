import React, { useState } from "react";
import NotificationsDropdown from "../../components/common/NotificationsDropdown";
import { useLocation, useNavigate } from "react-router-dom";
import { PATH } from "../../routes/paths";
import { BiMenu } from "react-icons/bi";
import { logoutAgent } from "../../store/features/agent/service";
import { useDispatch } from "react-redux";

const DashboardHeader = ({ isMinimized, onMobileMenuClick }) => {
  const [searchValue, setSearchValue] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearchChange = (e) => setSearchValue(e.target.value);

  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev);
    setShowProfileMenu(false);
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu((prev) => !prev);
    setShowNotifications(false);
  };

  const handleLogout = async () => {
    await dispatch(logoutAgent());
    navigate(PATH.login, { replace: true });
  };
  const headerConfig = {
    [PATH.agentDashboard]: {
      title: "Dashboard",
      subtitle: "Here’s an overview of your activities.",
    },
    [PATH.agentClients]: {
      title: "Clients",
      subtitle: "Manage and view your clients here.",
    },
    [PATH.agentCalendar]: {
      title: "Diary / Calendar",
      subtitle: "Plan and organize your meetings.",
    },
    [PATH.agentDocuments]: {
      title: "Documents",
      subtitle: "Access and manage your documents.",
    },
    [PATH.agentAML]: {
      title: "AML",
      subtitle: "Stay compliant with AML regulations.",
    },
    [PATH.agentAI]: {
      title: "AI Assistant",
      subtitle: "Get help from AI for your tasks.",
    },
    [PATH.agentProfileSettings]: {
      title: "Profile Settings",
      subtitle: "Manage your profile",
    },
    [PATH.agentManageTeams]: {
      title: "Manage Teams",
      subtitle: "Manage your Team Members",
    },
    [PATH.agentSubscriptionBilling]: {
      title: "Subscription & Billing",
      subtitle: "Manage your Subscription & Billing",
    },
    [PATH.agentAMLCompliance]: {
      title: "AML Compliance",
      subtitle: "",
    },
    [PATH.agentAMLAIAssistant]: {
      title: "AI Assistant",
      subtitle: "Ask Saxon Anything",
    },
  };

  const { title, subtitle } = headerConfig[location.pathname] || {
    title: "Hello, John! 👋",
    subtitle: "Ready to close some deals today??",
  };

  return (
    <header
      className={`h-fit md:h-[72px] px-0 p-[10px] md:p-[30px] flex items-center justify-between transition-all duration-300`}
    >
      {/* LEFT SIDE: Mobile Menu + Greeting */}
      <div className="flex items-center gap-3">
        {/* Mobile Menu Button */}
        <button
          onClick={onMobileMenuClick}
          className="md:hidden flex items-center justify-center w-10 h-10 bg-white border border-[#E2E8F0] rounded-md shadow-sm hover:shadow-md transition-all duration-200"
        >
          <BiMenu size={22} className="text-gray-700" />
        </button>

        {/* Greeting (hidden on mobile) */}
        <div className="hidden md:block">
          <h1 className="font-poppins text-lg md:text-2xl lg:text-[28px] font-semibold text-dark leading-snug md:leading-[42px]">
            {title}
          </h1>
          <p className="hidden lg:block font-poppins text-xs md:text-sm md:text-base text-gray leading-relaxed md:leading-[28px]">
            {subtitle}
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: Search, Notifications, Profile */}
      <div className="flex items-center space-x-3">
        {/* Search Bar */}
        <div className="relative hidden sm:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
                stroke="#6B7280"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19 19L14.65 14.65"
                stroke="#6B7280"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search"
            value={searchValue}
            onChange={handleSearchChange}
            className="lg:w-[461px] w-full h-[40px] pl-12 pr-4 bg-white border border-[#E2E8F0] rounded-md shadow-[0px_10px_60px_rgba(8,23,34,0.12)] font-poppins text-xs md:text-sm text-dark placeholder-gray focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
          {searchValue && (
            <button
              onClick={() => setSearchValue("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray hover:text-dark transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M12 4L4 12M4 4L12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={toggleNotifications}
            className="w-[40px] h-[40px] bg-white border border-[#E2E8F0] rounded-md flex items-center justify-center hover:bg-gray-50 transition-all duration-200 hover:shadow-md"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 2.66667C6.16 2.66667 4.66667 4.16 4.66667 6V8.66667C4.66667 9.4 4.4 10.1067 3.93333 10.6667L2.66667 12.3333H13.3333L12.0667 10.6667C11.6 10.1067 11.3333 9.4 11.3333 8.66667V6C11.3333 4.16 9.84 2.66667 8 2.66667Z"
                stroke="#081722"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.33337 14C9.13671 14.3067 8.86004 14.56 8.53337 14.7333C8.20671 14.9067 7.84004 15 7.46671 15C7.09337 15 6.72671 14.9067 6.40004 14.7333C6.07337 14.56 5.79671 14.3067 5.60004 14"
                stroke="#081722"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#EF4444] rounded-full animate-pulse"></div>
          </button>

          {showNotifications && (
            <NotificationsDropdown showNotifications={showNotifications} />
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={toggleProfileMenu}
            className="w-[42px] h-[42px] rounded-full bg-gray-300 overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-500 hover:ring-offset-2 transition-all duration-200"
          >
            <img
              src="https://avatar.iran.liara.run/public/42"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-[#E2E8F0] rounded-lg shadow-[0px_10px_60px_rgba(8,23,34,0.12)] z-50">
              <div className="p-4">
                <div className="flex items-center space-x-3 mb-4">
                  <img
                    src="https://avatar.iran.liara.run/public/42"
                    alt="Profile"
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <div className="font-poppins text-xs md:text-sm font-medium text-dark">
                      John Smith
                    </div>
                    <div className="font-poppins text-xs text-gray">
                      john.smith@company.com
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <button className="w-full text-left px-3 py-2 text-xs md:text-sm text-dark hover:bg-gray-50 rounded-md transition-colors">
                    View Profile
                  </button>
                  <button className="w-full text-left px-3 py-2 text-xs md:text-sm text-dark hover:bg-gray-50 rounded-md transition-colors">
                    Settings
                  </button>
                  <button className="w-full text-left px-3 py-2 text-xs md:text-sm text-dark hover:bg-gray-50 rounded-md transition-colors">
                    Help & Support
                  </button>
                  <hr className="my-2 border-[#E2E8F0]" />
                  <button
                    className="w-full text-left px-3 py-2 text-xs md:text-sm text-[#EF4444] hover:bg-red-50 rounded-md transition-colors"
                    onClick={handleLogout}
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Overlay to close dropdowns */}
      {(showNotifications || showProfileMenu) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowNotifications(false);
            setShowProfileMenu(false);
          }}
        ></div>
      )}
    </header>
  );
};

export default DashboardHeader;
