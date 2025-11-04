import React, { useEffect, useState } from "react";
import CustomHeading from "../common/Heading";
import Icons from "../../assets/icons/Icons";
import GlobalButton from "../common/GlobalButton";
import UpdateStatus from "../common/UpdateStatus";
import GenerateReportModal from "../common/GenerateReportModal";
import StatusBadge from "../common/StatusBadge";
import { useDispatch, useSelector } from "react-redux";
import { getVerificationTimeline } from "../../store/features/amlCompliance/service";

const Overview = ({ client }) => {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const { verificationTimeline, loading } = useSelector(
    (state) => state.amlCompliance
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (client?._id) dispatch(getVerificationTimeline(client?._id));
  }, [client?._id]);
  const getVerificationIcon = (action) => {
    const normalized = action.toLowerCase();
    

    if (normalized.includes("document")) {
      // blue or purple for document-related actions
      return {
        icon: <Icons.Document size={19} className="text-[#2563EB]" />,
        bgColor: "bg-[#2563EB]/20",
      };
    }

    if (
      normalized.includes("client marked") ||
      normalized.includes("verified") ||
      normalized.includes("pending") ||
      normalized.includes("not started")
    ) {
      // green for status/user actions
      return {
        icon: <Icons.UserIcon size={19} className="text-[#00AC4F]" />,
        bgColor: "bg-[#00AC4F]/20",
      };
    }

    // default gray fallback
    return {
      icon: <Icons.Document size={19} className="text-gray-500" />,
      bgColor: "bg-gray-200",
    };
  };
  return (
    <>
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="bg-white  p-6 rounded-lg shadow border border-gray-200">
          <CustomHeading
            heading="Client Information"
            fontSize="text-[20px]"
            textAlign="text-left"
          />
          <div className="grid grid-cols-[1fr_2fr] mt-6 ">
            <div className="space-y-6">
              <div>
                <CustomHeading
                  heading="Client Code"
                  fontWeight="font-medium"
                  fontSize="text-[14px]"
                  textAlign="text-left"
                />
                <p className="text-[#6B7280] bg-[#F3F4F6] px-3 py-2 rounded-md w-32 text-center mt-2 text-[14px]">
                  {client?.clientCode}
                </p>
              </div>
              <div>
                <CustomHeading
                  heading="Assigned Agent"
                  fontWeight="font-medium"
                  fontSize="text-[14px]"
                  textAlign="text-left"
                />
                <p className="text-[#6B7280]  rounded-md mt-2 text-[14px]">
                  {client?.assignedAgent?.firstName}
                </p>
              </div>
              <div>
                <CustomHeading
                  heading="Compliance Status"
                  fontWeight="font-medium"
                  fontSize="text-[14px]"
                  textAlign="text-left"
                />
                <div className="mt-3">
                  <StatusBadge status={client?.status} />
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <CustomHeading
                  heading="Name"
                  fontWeight="font-medium"
                  fontSize="text-[14px]"
                  textAlign="text-left"
                />
                <p className="text-[#6B7280] mt-2 py-2 text-[14px]">
                  {client?.client?.clientName}
                </p>
              </div>
              <div>
                <CustomHeading
                  heading="Date of Onboarding"
                  fontWeight="font-medium"
                  fontSize="text-[14px]"
                  textAlign="text-left"
                />
                <p className="text-[#6B7280] rounded-md mt-2 text-[14px]">
                  {client?.dateAdded
                    ? new Date(client.dateAdded).toLocaleDateString("en-US")
                    : ""}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 justify-end">
            <GlobalButton onClick={() => setIsModalOpen(true)}>
              Update Status
            </GlobalButton>
            <GlobalButton
              onClick={() => setIsGenerateModalOpen(true)}
              variant="secondary"
            >
              Generate Report
            </GlobalButton>
          </div>
        </div>
        <div className="bg-white  p-6 rounded-lg shadow border border-gray-200">
          <CustomHeading
            heading="Verification Timeline"
            fontSize="text-[20px]"
            textAlign="text-left"
          />

          <div className="space-y-8 mt-6 h-72 overflow-y-auto">
            {verificationTimeline?.map((item, index) => {
              const { icon, bgColor } = getVerificationIcon(item.action);

              return (
                <div key={index} className="flex items-start gap-3">
                  <div
                    className={`${bgColor} p-2 rounded-lg flex items-center justify-center`}
                  >
                    {icon}
                  </div>
                  <div>
                    <CustomHeading
                      heading={item.action}
                      fontWeight="font-medium"
                      fontSize="text-[16px]"
                      textAlign="text-left"
                    />
                    <p className="text-[#6B7280] text-[14px]">{item.notes}</p>
                    <div className="text-xs flex items-center gap-1">
                      <p className="text-[#6B7280]">
                        {new Date(item.createdAt).toLocaleString("en-US", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </p>
                      <span className="text-[#6B7280]">
                        • {item?.performedBy?.firstName}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <UpdateStatus
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        amlId={client?._id}
      />
      <GenerateReportModal
        isOpen={isGenerateModalOpen}
        client={client}
        onClose={() => setIsGenerateModalOpen(false)}
      />
    </>
  );
};

export default Overview;
