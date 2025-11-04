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

    {
      key: "actions",
      label: "Actions",
      render: (_, row) => (
        <div className="flex items-center gap-6">
          <Icons.EyeIcon />
           {agentData?.data?.agentType === "agency" && (
          <Icons.DeleteIcon />
           )}
        </div>
      ),
    },
  ];

  const dispatch = useDispatch();
  const { data: agentData } = useSelector((state) => state.agent.CurrentAgent);
  
  const agentId = agentData?.data?._id;

  // 👇 get team members and loading state
  const { items, isLoading, error } = useSelector((state) => state.team);

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
          {agentData?.data?.agentType === "agency" && (
            <GlobalButton
              variant="primary"
              onClick={() => setIsModalOpen(true)}
            >
              + Add New Member
            </GlobalButton>
          )}
        </div>
        <AddNewTeamMemberModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          agentId={agentId}
        />
        <div className="mt-5">
          {isLoading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error: {error}</div>
          ) : (
            <ReusableTable
              data={items?.map((member) => ({
                member: {
                  name: `${member.firstName} ${member.lastName}`,
                  email: member.email,
                },
                phoneNumber: member.phoneNumber,
                companyName: member.companyName,
                bio: member.agentType,
                operatingArea: member.operatingArea,
                status: member.status,
              }))}
              columns={tableColumns}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ManageTeams;
