import React, { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import Overview from "../AMLDetailPages/Overview";
import Documents from "../AMLDetailPages/Documents";
import AuditTrail from "../AMLDetailPages/AuditTrail";
import { FiHome, FiFileText, FiActivity } from "react-icons/fi";

const AMLDetailPage = ({ onBack , client}) => {
console.log("🚀 ~ AMLDetailPage ~ client:", client)


  const [activeTab, setActiveTab] = useState("Overview");
  

  const renderTab = () => {
    switch (activeTab) {
      case "Overview":
        return <Overview client={client} />;
      case "Documents":
        return <Documents client={client} />;
      case "Audit Trail":
        return <AuditTrail client={client}/>;
      default:
        return null;
    }
  };

  const tabs = [
    { name: "Overview", icon: <FiHome size={18} /> },
    { name: "Documents", icon: <FiFileText size={18} /> },
    { name: "Audit Trail", icon: <FiActivity size={18} /> },
  ];

  return (
    <>
      <div className="flex items-center">
        <button
          onClick={onBack}
          className="mr-4 p-2 rounded-full hover:bg-gray-200"
        >
          <IoArrowBack size={20} />
        </button>
        <p className="font-bold text-xl">
          Assigned Agent:{" "}
          <span className="font-normal text-gray-500">{client?.assignedAgent?.firstName}</span>
        </p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 my-6">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`lg:px-6 px-2 flex items-center lg:gap-2 gap-1 lg:py-2 py-1 font-medium cursor-pointer text-base rounded-lg transition-all duration-200
              ${
                activeTab === tab.name
                  ? "bg-[#081722] text-white"
                  : "bg-[#E5E7EB80] text-gray-600 hover:bg-gray-200"
              }`}
          >
            {tab.icon}
            {tab.name}
          </button>
        ))}
      </div>

      <div className="">{renderTab()}</div>
    </>
  );
};

export default AMLDetailPage;
