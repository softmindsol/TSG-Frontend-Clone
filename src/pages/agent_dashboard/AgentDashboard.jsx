import React, { useEffect } from "react";
import StatCard from "../../components/common/StatCard";
import NotificationsReminders from "../../components/common/NotificationsReminders";
import Announcements from "../../components/common/Announcements";
import TodaysFocus from "../../components/common/TodaysFocus";
import { Clients } from "../../assets/icons";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { selectAllClients } from "../../store/selector";
import { getAllCommissionSummary } from "../../store/features/commission/service";

// Import the reusable components we created

// --- Mock Icons for Demonstration ---
// In a real app, you would import these from an icon library
const ActiveClientsIcon = () => (
  <div className="w-20 h-20 flex items-center justify-center bg-blue-100 rounded-full">
    <Clients className="w-10 h-10 stroke-blue-500 text-blue-500" />
  </div>
);

const PipelineProgressIcon = () => (
  <div className="w-20 h-20 flex items-center justify-center bg-green-100 rounded-full">
    <svg
      className="w-10 h-10 text-green-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
      />
    </svg>
  </div>
);

const TotalCommissionIcon = () => (
  <div className="w-20 h-20 flex items-center justify-center bg-purple-100 rounded-full">
    <AiOutlineDollarCircle className="text-purple-500 w-10 h-10" />
  </div>
);
// --- End of Mock Icons ---

const AgentDashboard = () => {
  const { data } = useSelector(selectAllClients);

  const totlaClients = data?.clients?.length;

  const dispatch = useDispatch();

  // 🔹 Access data from Redux store
  const { allSummary, isLoading, isError, errorMessage } = useSelector(
    (state) => state.commission
  );
 

  // 🔹 Fetch data when component mounts
  useEffect(() => {
    dispatch(getAllCommissionSummary());
  }, [dispatch]);
  const earned = allSummary?.data?.breakdown?.earned?.net;
  const expected = allSummary?.data?.breakdown?.expected?.net;

  return (
    <div className="p-4 space-y-8">
      {/* Section 1: Stats Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 lg:gap-4 xl:gap-6">
        <StatCard
          icon={<ActiveClientsIcon />}
          title="Active Clients"
          value={totlaClients}
          change="16%"
          changeType="increase"
          footerText="this month"
        />
        <StatCard
          icon={<PipelineProgressIcon />}
          title="Average Pipeline Progress"
          value="67%"
          change="1%"
          changeType="decrease"
          footerText="this month"
        />
        <StatCard
          icon={<TotalCommissionIcon />}
          title="Total Commission"
          value={`£ ${earned}`}
          footerText={`£ ${expected} expected`}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          <NotificationsReminders />
        </div>
        <div className=" grid-cols-1 xl:col-span-2">
          <Announcements />
        </div>
      </div>

      <div>
        <TodaysFocus />
      </div>
    </div>
  );
};

export default AgentDashboard;
