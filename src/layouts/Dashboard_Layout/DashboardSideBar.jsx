import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import images from "../../assets/images";
import {
  KeyMinimalisticSquareLinear,
  UserSquare,
  CalendarLinear,
  DocumentLinear,
  CoinWallet,
  ChatQuestion,
  Bookmark,
} from "../../assets/icons";
import Icons from "../../assets/icons/Icons";
import { PATH } from "../../routes/paths";
import { getCurrentAgent } from "../../store/features/agent/service";
import { useDispatch, useSelector } from "react-redux";

const DashboardSidebar = ({
  isMinimized = false,
  toggleSidebar,
  isMobile = false,
  onCloseMobile,
}) => {
  const location = useLocation();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { data, isLoading, isSuccess, errorMessage } = useSelector(
    (state) => state.agent.CurrentAgent
  );
  console.log("🚀 ~ DashboardSidebar ~ data:", data);

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentAgent());
  }, [dispatch]);
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <KeyMinimalisticSquareLinear />,
      path: "/agent/dashboard",
    },
    {
      id: "clients",
      label: "Clients",
      icon: <UserSquare />,
      path: PATH.agentClients,
    },
    {
      id: "calendar",
      label: "Diary/Calendar",
      icon: <CalendarLinear />,
      path: PATH.agentCalendar,
    },
    {
      id: "documents",
      label: "Documents",
      icon: <DocumentLinear />,
      path: PATH.agentDocument,
    },
    {
      id: "aml",
      label: "AML",
      icon: <CoinWallet />,
      path: PATH.agentAMLCompliance,
    },
    {
      id: "ai-assistant",
      label: "AI Assistant",
      icon: <ChatQuestion />,
      path: PATH.agentAMLAIAssistant,
    },
  ];

  const bottomMenu = [
    {
      label: "Profile Settings",
      icon: <Icons.userSetting size={20} />,
      path: PATH.agentProfileSettings,
    },
    {
      label: "Manage Teams",
      icon: <Icons.userPlus size={20} />,
      path: PATH.agentManageTeams,
    },
    {
      label: "Subscription & Billing",
      icon: <Bookmark size={20} />,
      path: PATH.agentSubscriptionBilling,
    },
  ];

  const accountMenu = [
    {
      label: "Sign Out",
      icon: <Icons.logout size={20} />,
      path: PATH.logout,
      danger: true,
    },
  ];

  const handleLogout = async () => {
    await dispatch(logoutAgent());
    navigate(PATH.login, { replace: true });
  };
  return (
    <div
      className={`bg-white rounded-[10px] shadow-[0px_10px_60px_rgba(8,23,34,0.12)] flex flex-col transition-all duration-300 
        ${
          isMobile
            ? "w-[260px] h-full"
            : `fixed left-[30px] top-[30px] h-[calc(100vh-10px)] ${
                isMinimized ? "w-[80px]" : "w-[290px]"
              }`
        }`}
    >
      {/* Toggle Button (only desktop) */}
      {!isMobile && (
        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-6 w-6 h-6 bg-white border border-[#E2E8F0] rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 z-10"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className={`transition-transform duration-300 ${
              isMinimized ? "rotate-180" : ""
            }`}
          >
            <path
              d="M7.5 9L4.5 6L7.5 3"
              stroke="#6B7280"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}

      {/* Logo */}
      <div
        className={`flex pl-7 pt-5 pb-8 ${isMinimized ? "px-2" : ""}`}
      >
        {isMinimized ? (
          <div className="w-12 h-12 rounded-lg flex items-center justify-center">
            <img src={images.logo_light} alt="Logo" />
          </div>
        ) : (
          <img src={images.logo_2} alt="Logo" className=" w-[171px]" />
        )}
      </div>

      {/* Navigation Items */}
      <div
        className={`flex-1 overflow-y-auto overflow-x-hidden ${
          isMinimized ? "px-3" : "px-5"
        }`}
      >
        {menuItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.id}
              to={item.path}
              onClick={isMobile ? onCloseMobile : undefined}
              className={`relative flex items-center h-[46px] rounded-lg cursor-pointer transition-all duration-200 group
                ${
                  isActive
                    ? "bg-[#081722] text-white"
                    : "text-[#6B7280] hover:bg-gray-50"
                }
                ${
                  isMinimized ? "justify-center px-0" : "justify-between px-3"
                }`}
            >
              <div
                className={`flex items-center ${
                  isMinimized ? "justify-center" : "space-x-3"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                {!isMinimized && (
                  <span className="font-poppins text-xs md:text-sm font-medium leading-[21px] tracking-[-0.01em] whitespace-nowrap">
                    {item.label}
                  </span>
                )}
              </div>

              {/* Tooltip for minimized mode */}
              {isMinimized && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-[#081722] text-white text-xs md:text-sm rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-50">
                  {item.label}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-[#081722]" />
                </div>
              )}
            </Link>
          );
        })}
      </div>

      {/* Profile Section */}
      <div className={`pb-5 ${isMinimized ? "px-3" : "px-5"}`}>
        <div
          className={`flex items-center h-[42px] transition-all duration-300 ${
            isMinimized ? "justify-center" : "justify-between"
          }`}
        >
          <div
            onClick={toggleProfileMenu}
            className={`flex items-center cursor-pointer relative ${
              isMinimized ? "justify-center" : "space-x-3"
            }`}
          >
            <div className="w-[42px] h-[42px] rounded-full bg-gray-300 overflow-hidden flex-shrink-0">
              <img
                src={images.userProfile}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            {!isMinimized && (
              <div>
                <div className="font-poppins text-xs md:text-sm font-medium text-[#081722]">
                  {data?.data?.firstName}
                </div>
                <div className="font-poppins text-xs text-[#6B7280]">
                  {data?.data?.companyName}
                </div>
              </div>
            )}

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div className="absolute bottom-20 mt-2 w-64 bg-white border border-[#E2E8F0] rounded-lg shadow-[0px_10px_60px_rgba(8,23,34,0.12)] z-50">
                <div className="p-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <img
                      src={images.userProfile}
                      alt="Profile"
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <div className="font-poppins text-xs md:text-sm font-medium text-dark">
                        {data?.data?.firstName}
                      </div>
                      <div className="font-poppins text-xs text-gray">
                        {data?.data?.email}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 font-poppins">
                    {bottomMenu.map((item) => (
                      <Link
                        key={item.label}
                        to={item.path}
                        onClick={isMobile ? onCloseMobile : undefined}
                        className="w-full flex items-center gap-2.5 text-left px-3 py-2 text-xs md:text-sm text-dark hover:bg-gray-50 rounded-md transition-colors"
                      >
                        {item.icon}
                        {item.label}
                      </Link>
                    ))}

                    <hr className="my-2 border-[#E2E8F0]" />

                    {accountMenu.map((item) => (
                      <Link
                        key={item.label}
                        to={item.path}
                        onClick={isMobile ? onCloseMobile : undefined}
                        className="w-full text-left px-3 py-2 flex items-center gap-2.5 text-xs md:text-sm text-[#FF2C2C] hover:bg-red-50 rounded-md transition-colors"
                      >
                        {item.icon}
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {!isMinimized && !isMobile && (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="text-[#6B7280] rotate-180"
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
