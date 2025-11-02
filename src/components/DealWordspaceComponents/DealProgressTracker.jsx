import React, { useEffect, useState } from "react";
import { FiCheckCircle } from "react-icons/fi";
import { GoCircle } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { dealStageTracker } from "../../store/features/client/service";

const DealProgressTracker = ({ singleDeal }) => {
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector(
    (state) => state.client.dealStageTracker
  );

  const dealId = singleDeal?._id;

  const steps = [
    "Discovery",
    "Viewings",
    "Offer Mode",
    "Offer Accepted",
    "Exchange",
    "Completion",
  ];

  // Local stage tracking
  const [currentStep, setCurrentStep] = useState(1);

  // 🟢 Initialize progress when singleDeal.stage is available
  useEffect(() => {
    if (singleDeal?.stage) {
      const index = steps.findIndex((s) => s === singleDeal.stage);
      if (index !== -1) setCurrentStep(index + 1);
    }
  }, [singleDeal?.stage]);

  // 🟢 Update UI when API responds
  useEffect(() => {
    if (data?.stage) {
      const index = steps.findIndex((s) => s === data.stage);
      if (index !== -1) setCurrentStep(index + 1);
    }
  }, [data]);

  // 🟢 Handle stage click
  const handleStageClick = (stepName, index) => {
    setCurrentStep(index + 1);
    dispatch(dealStageTracker({ dealId, stage: stepName }));
  };

  return (
    <div className="bg-white border-[#E2E8F0] p-5 font-poppins w-full">
      <div className="flex flex-col md:flex-row md:justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber <= currentStep;
          const isLastStep = index === steps.length - 1;

          return (
            <div
              key={step}
              className={`flex md:flex-col items-start md:items-center ${
                !isLastStep ? "flex-1" : ""
              }`}
            >
              <div className="flex items-center w-full">
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => handleStageClick(step, index)}
                    disabled={isLoading}
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2
                      transition-all duration-300 ease-in-out
                      ${
                        isCompleted
                          ? "bg-[#22C55E] border-[#22C55E]"
                          : "bg-white border-[#D1D5DB]"
                      }`}
                  >
                    {isCompleted ? (
                      <FiCheckCircle className="text-white" />
                    ) : (
                      <GoCircle className="text-[#9CA3AF]" />
                    )}
                  </button>

                  {!isLastStep && (
                    <div
                      className={`w-0.5 h-12 mt-1 md:hidden transition-colors duration-300 ${
                        isCompleted ? "bg-[#22C55E]" : "bg-[#D1D5DB]"
                      }`}
                    />
                  )}
                </div>

                {!isLastStep && (
                  <div
                    className={`h-0.5 w-full hidden md:block transition-colors duration-300 ${
                      isCompleted ? "bg-[#22C55E]" : "bg-[#D1D5DB]"
                    }`}
                  />
                )}

                <p
                  className={`ml-4 font-semibold text-sm md:hidden ${
                    isCompleted ? "text-[#081722]" : "text-[#6B7280]"
                  }`}
                >
                  {step}
                </p>
              </div>

              <p
                className={`hidden md:block mt-3 text-xs text-start w-full ${
                  isCompleted
                    ? "font-semibold text-[#081722]"
                    : "font-normal text-[#6B7280]"
                }`}
              >
                {step}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DealProgressTracker;
