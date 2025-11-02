import React, { useEffect, useState } from "react";
import CustomHeading from "../../components/common/Heading";
import GlobalButton from "../../components/common/GlobalButton";
import AddNewTeamMemberModal from "../../components/common/AddNewTeamMemberModal";
import ReusableTable from "../../components/common/ReusableTable";
import ViewButton from "../../components/common/ViewButton";
import Icons from "../../assets/icons/Icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeamMembers } from "../../store/features/member/service";
import {
  selectTeamError,
  selectTeamIsLoading,
  selectTeamMembers,
} from "../../store/features/member/slice";

const ManageTeams = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const tableColumns = [
    {
      key: "member",
      label: "MEMBER NAME",
      render: (member) => (
        <div>
          <div className="text-sm font-medium text-gray-900">{member.name}</div>
          <div className="text-sm text-gray-500">{member.email}</div>
        </div>
      ),
    },
    { key: "phoneNumber", label: "PHONE NUMBER" },
    { key: "companyName", label: "COMPANY NAME" },

    // {
    //   key: "progress",
    //   label: "Progress",
    //   render: (progress) =>
    //     progress !== undefined ? <ProgressBar percentage={progress} /> : null,
    // },
    {
      key: "operatingArea",
      label: "OPERATING AREA",
      render: (date) => (
        <div className="flex items-center text-sm text-gray-500">
          {/* <FaCalendarAlt className="mr-2" /> */}
          {date}
        </div>
      ),
    },
    { key: "bio", label: "BIO & INTRO" },

    // {
    //   key: "status",
    //   label: "Status",
    //   render: (status) => <StatusBadge status={status} />,
    // },
    {
      key: "actions",
      label: "Actions",
      render: (_, row) => (
        <div className="flex items-center gap-6">
          <Icons.EyeIcon />
          <Icons.DeleteIcon />
        </div>
      ),
    },
  ];
  const tableData = [
    {
      member: { name: "Green Energy Co", email: "info@greenenergy.com" },
      phoneNumber: "+44 7346 876 773",
      companyName: "Alex Thompson",
      bio: "Experienced real estate professional...",
      operatingArea: "27/01/2025",
      status: "Active",
    },
    {
      member: { name: "Johnson Corp", email: "johnson@corp.com" },
      phoneNumber: "+44 7346 876 773",
      companyName: "Alex Thompson",
      bio: "Experienced real estate professional...",
      operatingArea: "27/01/2025",
      status: "Inactive",
    },
    {
      member: { name: "Maria Rodriguez", email: "maria.rodriguez@email.com" },
      phoneNumber: "+44 7346 876 773",
      companyName: "Alex Thompson",
      bio: "Experienced real estate professional...",
      operatingArea: "27/01/2025",
      status: "Active",
    },
    {
      member: { name: "Sarah Wilson", email: "sarah.wilson@email.com" },
      phoneNumber: "+44 7346 876 773",
      companyName: "Alex Thompson",
      bio: "Experienced real estate professional...",
      operatingArea: "27/01/2025",
      status: "Active",
    },
    {
      member: { name: "StartupX", email: "hello@startupx.com" },
      phoneNumber: "+44 7346 876 773",
      companyName: "Alex Thompson",
      bio: "Experienced real estate professional...",
      operatingArea: "27/01/2025",
      status: "Inactive",
    },
  ];
  const dispatch = useDispatch();
  const { data: agentData } = useSelector((state) => state.agent.CurrentAgent);
  const agentId = agentData?.data?._id;

  // 👇 get team members and loading state
  const items = useSelector((state) => state.team);
  console.log("🚀 ~ ManageTeams ~ teamMembers:", items);
  const isLoading = useSelector(selectTeamIsLoading);
  const error = useSelector(selectTeamError);

  useEffect(() => {
    if (agentId) {
      dispatch(fetchTeamMembers({ agentId })); // ✅ pass as object
    }
  }, [agentId, dispatch]);

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-md p-6 mt-5">
        <div className="flex items-center justify-between">
          <CustomHeading
            heading="List of Team Members"
            fontSize="text-[20px]"
          />
          <GlobalButton variant="primary" onClick={() => setIsModalOpen(true)}>
            + Add New Memeber
          </GlobalButton>
        </div>
        <AddNewTeamMemberModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          agentId={agentId}
        />
        <div className="mt-5">
          <ReusableTable data={tableData} columns={tableColumns} />
        </div>
      </div>
    </>
  );
};

export default ManageTeams;
