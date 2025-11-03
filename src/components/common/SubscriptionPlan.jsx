import React, { useState } from "react";
import CustomHeading from "./Heading";
import Icons from "../../assets/icons/Icons";
import { useDispatch, useSelector } from "react-redux";
import { createCheckoutSession } from "../../store/features/stripe/service";

const SubscriptionPlan = () => {
  const { data, isLoading, isSuccess, errorMessage } = useSelector(
    (state) => state.agent.CurrentAgent
  );
  const dispatch = useDispatch();

  const [billingPeriod, setBillingPeriod] = useState("monthly");
  console.log("🚀 ~ SubscriptionPlan ~ billingPeriod:", billingPeriod)
  const [planType, setPlanType] = useState("individual"); // 👈 added

  const subscriptionPlan = [
    {
      planName: "Demo Plan",
      price: "£0",
      period: "14 Days Free Trial",
      perfectUsage: "Perfect for small teams getting started",
      features: [
        { name: "1 Seller Account", demo: true, standard: true },
        {
          name: "SmartMatch: Limited project visibility",
          demo: true,
          standard: true,
        },
        {
          name: "Send Pitch on Only 10 projects/month",
          demo: true,
          standard: true,
        },
        { name: "3-minute video pitch limit", demo: true, standard: true },
        { name: "Priority SmartMatch ranking", demo: false, standard: false },
        { name: "CRM integrations", demo: false, standard: false },
        { name: "Advanced filters", demo: false, standard: false },
      ],
    },
    {
      planName: "Standard Plan",
      price: billingPeriod === "monthly" ? "£39" : "£400",
      period: billingPeriod === "monthly" ? "per month" : "per year",
      perfectUsage: "Perfect for small teams getting started",
      features: [
        { name: "1 Seller Account", demo: true, standard: true },
        {
          name: "SmartMatch: Limited project visibility",
          demo: true,
          standard: true,
        },
        {
          name: "Send Pitch on Only 10 projects/month",
          demo: true,
          standard: true,
        },
        { name: "3-minute video pitch limit", demo: true, standard: true },
        { name: "Priority SmartMatch ranking", demo: false, standard: false },
        { name: "CRM integrations", demo: false, standard: false },
        { name: "Advanced filters", demo: false, standard: false },
      ],
    },
  ];
  return (
    <>
      <div className="mt-5">
        <CustomHeading
          heading="Change Plan"
          textAlign="text-left"
          fontSize="text-[20px]"
        />
        <div className="flex items-center gap-1.5 mt-4">
          <button
            onClick={() => setPlanType("individual")}
            className={`px-6 py-2 flex items-center gap-2 rounded-md font-poppins font-semibold transition-colors ${
              planType === "individual"
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Icons.UserIcon />
            Individual Agent
          </button>

          <button
            onClick={() => setPlanType("team")}
            className={`px-6 py-2 flex items-center gap-2 rounded-md font-poppins font-semibold transition-colors ${
              planType === "team"
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Icons.userPlus />
            Team/Agency
          </button>
        </div>
        <div className="max-w-4xl mx-auto p-6">
          {/* Billing Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 rounded-full p-1 flex">
              <button
                onClick={() => setBillingPeriod("monthly")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  billingPeriod === "monthly"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingPeriod("yearly")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  billingPeriod === "yearly"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Yearly
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Demo Plan */}
            {subscriptionPlan.map((item, index) => (
              <div
                key={index}
                className="relative bg-white border border-gray-200 rounded-lg shadow-sm"
              >
                <div className="text-center p-6 pb-4">
                  {index === 0 && (
                    <span className="absolute top-4 right-4 bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded">
                      10 days left
                    </span>
                  )}

                  <h3 className="text-xl font-semibold mb-2">
                    {item.planName}
                  </h3>
                  <div className="mb-2 flex items-center justify-center gap-2.5">
                    <span className="text-4xl font-bold">{item.price}</span>
                    <p className="text-gray-600 text-sm">{item.period}</p>
                  </div>
                  <p className="text-gray-500 text-xs mt-1">
                    {item.perfectUsage}
                  </p>
                </div>
                <div className="px-6 pb-6 space-y-3">
                  {item?.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      {feature.demo ? (
                        <Icons.CheckIcon className="w-4 h-4 text-green-500 flex-shrink-0" />
                      ) : (
                        <Icons.Crossicon className="w-4 h-4 text-gray-300 flex-shrink-0" />
                      )}
                      <span
                        className={`text-sm ${
                          feature.demo ? "text-gray-900" : "text-gray-400"
                        }`}
                      >
                        {feature.name}
                      </span>
                    </div>
                  ))}
                  <div className="pt-4">
                    {item.planName === "Standard Plan" ? (
                      <button
                        disabled={isLoading}
                        onClick={async () => {
                          const payload = {
                            agentId: data?.data?._id,
                            planType, // "individual" or "team"
                            billingInterval: billingPeriod, // "monthly" or "yearly"
                          };
                          const result = await dispatch(
                            createCheckoutSession(payload)
                          );
                          if (result.meta.requestStatus === "fulfilled") {
                            window.location.href = result.payload.data.url;
                          }
                        }}
                        className="w-full border border-transparent bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors font-medium disabled:opacity-50"
                      >
                        {isLoading ? "Redirecting..." : "Start Plan"}
                      </button>
                    ) : (
                      <button
                        disabled
                        className="w-full border border-gray-300 bg-transparent text-gray-700 py-2 px-4 rounded-md cursor-not-allowed font-medium"
                      >
                        Current Plan
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SubscriptionPlan;
