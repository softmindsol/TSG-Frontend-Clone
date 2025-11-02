import React, { useState } from "react";
import DashboardSidebar from "./DashboardSideBar";
import DashboardHeader from "./DashboardHeader";

const DashboardLayout = ({ children }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleSidebar = () => {
    setIsMinimized((prev) => !prev);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 relative">
      {/* Sidebar for tablet/desktop only */}
      <div className="hidden md:block">
        <DashboardSidebar
          isMinimized={isMinimized}
          toggleSidebar={toggleSidebar}
        />
      </div>

      {/* Mobile Drawer Sidebar */}
      <div
        className={`fixed inset-0 z-[100] bg-black/40 md:hidden transition-opacity duration-300 ${
          isMobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={toggleMobileSidebar}
      >
        <div
          className={`absolute top-0 left-0 h-full bg-white shadow-lg transition-transform duration-300 ${
            isMobileOpen ? "translate-x-0" : "-translate-x-full"
          } w-[260px]`}
          onClick={(e) => e.stopPropagation()}
        >
          <DashboardSidebar
            isMobile={true}
            onCloseMobile={toggleMobileSidebar}
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div
        className={`transition-all duration-300 px-4 pt-[0px] md:pt-[30px] ${
          isMinimized ? "md:ml-[100px]" : "md:ml-[320px]"
        }`}
      >
        <DashboardHeader
          isMinimized={isMinimized}
          onMobileMenuClick={toggleMobileSidebar}
        />

        <main className="transition-all duration-300 relative z-0 overflow-x-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
