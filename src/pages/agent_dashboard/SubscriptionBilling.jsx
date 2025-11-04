import React, { useState } from "react";
import CustomHeading from "../../components/common/Heading";
import StatusBadge from "../../components/common/StatusBadge";
import GlobalButton from "../../components/common/GlobalButton";
import ReusableTable from "../../components/common/ReusableTable";
import Icons from "../../assets/icons/Icons";
import SubscriptionPlan from "../../components/common/SubscriptionPlan";
import { useSelector } from "react-redux";

const SubscriptionBilling = () => {
  const { data, isLoading, isSuccess, errorMessage } = useSelector(
    (state) => state.agent.CurrentAgent
  );

  const Details = [
    {
      title: "Current Plan",
      desc: "Standard Plan",
    },
    {
      title: "Monthly Price",
      desc: "£99/month",
    },
    {
      title: "Renewal Date",
      desc: data?.data?.billingPeriodEnd,
    },
  ];
  const tableColumns = [
    { key: "date", label: "Date" },
    { key: "description", label: "Description" },
    { key: "amount", label: "Amount" },

    // {
    //   key: "progress",
    //   label: "Progress",
    //   render: (progress) =>
    //     progress !== undefined ? <ProgressBar percentage={progress} /> : null,
    // },

    { key: "status", label: "Status" },

    {
      key: "receipt",
      label: "Receipts",
      render: (_, row) => (
        <div className="flex text-[#137DC5] items-center gap-2">
          <Icons.DownloadIcon size={17} />
          Receipt
        </div>
      ),
    },
  ];
  const tableData = [
    {
      date: "Apr 27, 2025",
      description: "+44 7346 876 773",
      amount: "£99.00",

      status: "Successful",
    },
    {
      date: "Apr 27, 2025",
      description: "+44 7346 876 773",
      amount: "£99.00",

      status: "Successful",
    },
  ];
  const [showPlan, setShowPlan] = useState(false);
  
  return (
    <>
      {showPlan ? (
        <SubscriptionPlan />
      ) : (
        <>
          <div className="bg-white border border-gray-200 rounded-md p-6 mt-5">
            <div className="flex items-center justify-between">
              <CustomHeading
                heading="Subscription Details"
                fontSize="text-[20px]"
              />
              <div className="flex items-center gap-1">
                <p className="text-[#6B7280] font-normal text-sm">Status:</p>
                <StatusBadge status={data?.data?.subscriptionStatus} />
              </div>
            </div>
            <div className=" space-y-6  mt-6">
              {Details.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center ${
                    index === 0 || index === 1 ? "border-b border-gray-300" : ""
                  }  pb-4 justify-between w-full`}
                >
                  <div className="space-y-1">
                    <p className="text-[#6B7280] font-normal text-sm">
                      {item.title}
                    </p>
                    <CustomHeading heading={item.desc} fontSize="text-[16px]" />
                  </div>

                  {index === 0 && ( // only show button for first item
                    <GlobalButton onClick={()=> setShowPlan(true)} variant="secondary" className="px-8">
                      Change Plan
                    </GlobalButton>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-md p-6 mt-5">
            <CustomHeading
              heading="Billing History"
              textAlign="text-left"
              fontSize="text-[20px]"
            />
            <p className="text-[#6B7280] mb-5 font-normal text-base">
              View your previous transactions and download invoices
            </p>
            <ReusableTable data={tableData} columns={tableColumns} />
          </div>
        </>
      )}
    </>
  );
};

export default SubscriptionBilling;
