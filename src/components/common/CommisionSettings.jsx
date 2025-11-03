import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { commissionSetting } from "../../store/features/client/service";
import InfoCard from "./InfoCard";
import { getClientCommissionSummary } from "../../store/features/commission/service";
import { toast } from "sonner";

const CommissionSettings = ({ clientId, commission }) => {
  console.log("🚀 ~ CommissionSettings ~ commission:", commission);
  const dispatch = useDispatch();
  const { commissionSetting: commissionState } = useSelector(
    (state) => state.client
  );
  const { summary, isLoading, isError, errorMessage } = useSelector(
    (state) => state.commission
  );
  console.log("🚀 ~ CommissionSettings ~ summary:", summary);

  useEffect(() => {
    if (clientId) {
      dispatch(getClientCommissionSummary(clientId));
    }
  }, [clientId]);

  // 🟢 Local state
  const [isEditing, setIsEditing] = useState(false);
  const [engagementType, setEngagementType] = useState(
    commission?.engagementType || ""
  );
  const [commissionType, setCommissionType] = useState(
    commission?.commissionType || ""
  );
  const [ratePct, setRatePct] = useState(commission?.ratePct || "");
  const [fixedFee, setFixedFee] = useState(commission?.fixedFee || "");
  const [currency, setCurrency] = useState(commission?.currency || "");

  const ENGAGEMENT_OPTIONS = ["Sourcing", "Rental"];
  const COMMISSION_TYPE_OPTIONS = ["Percentage", "Fixed"];

  // 🟡 Save handler
  const handleSave = async () => {
    if (!engagementType || !commissionType) {
  toast.error("Please fill all required fields.");
  return;
}

    const payload = {
      engagementType,
      commissionType,
      // currency,
    };

    if (commissionType === "Percentage") {
      payload.ratePct = Number(ratePct);
    } else if (commissionType === "Fixed") {
      payload.fixedFee = Number(fixedFee);
    }

    await dispatch(commissionSetting({ clientId, data: payload }));
    setIsEditing(false);
  };

  return (
    <InfoCard
      title="Commission Setting"
      isEditing={isEditing}
      onEditToggle={() => setIsEditing(!isEditing)}
      onSave={handleSave}
      isLoading={commissionState.isLoading}
    >
      <div className="bg-white p-6 rounded-xl  border-gray-200 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Commission Summary
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* 🟩 Expected Commission */}
          <div className="flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
            <p className="text-sm font-medium text-blue-700">
              Expected Commission
            </p>
            <p className="text-2xl font-semibold text-blue-900 mt-1">
              {summary?.data?.totals?.expected ?? "--"}
            </p>
          </div>

          {/* 🟨 Earned Commission */}
          <div className="flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
            <p className="text-sm font-medium text-green-700">
              Earned Commission
            </p>
            <p className="text-2xl font-semibold text-green-900 mt-1">
              {summary?.data?.totals?.earned ?? "--"}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 p-4">
        {/* 🟩 Engagement Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Engagement Type
          </label>
          {isEditing ? (
            <select
              className="w-full border rounded-lg p-2"
              value={engagementType}
              onChange={(e) => setEngagementType(e.target.value)}
            >
              <option value="">Select engagement type</option>
              {ENGAGEMENT_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ) : (
            <p className="p-2 bg-gray-50 rounded-lg">
              {engagementType || "--"}
            </p>
          )}
        </div>

        {/* 🟨 Commission Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Commission Type
          </label>
          {isEditing ? (
            <select
              className="w-full border rounded-lg p-2"
              value={commissionType}
              onChange={(e) => {
                setCommissionType(e.target.value);
                setRatePct("");
                setFixedFee("");
              }}
            >
              <option value="">Select commission type</option>
              {COMMISSION_TYPE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ) : (
            <p className="p-2 bg-gray-50 rounded-lg">
              {commissionType || "--"}
            </p>
          )}
        </div>

        {/* 🟦 Conditional Field */}
        {commissionType === "Percentage" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rate (%)
            </label>
            {isEditing ? (
              <input
                type="number"
                className="w-full border rounded-lg p-2"
                value={ratePct}
                onChange={(e) => setRatePct(e.target.value)}
                placeholder="Enter rate percentage"
              />
            ) : (
              <p className="p-2 bg-gray-50 rounded-lg">{ratePct || "--"}</p>
            )}
          </div>
        )}

        {commissionType === "Fixed" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fixed Fee
            </label>
            {isEditing ? (
              <input
                type="number"
                className="w-full border rounded-lg p-2"
                value={fixedFee}
                onChange={(e) => setFixedFee(e.target.value)}
                placeholder="Enter fixed fee"
              />
            ) : (
              <p className="p-2 bg-gray-50 rounded-lg">{fixedFee || "--"}</p>
            )}
          </div>
        )}

        {/* 🪙 Currency */}
        {/* <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Currency
          </label>
          {isEditing ? (
            <input
              type="text"
              className="w-full border rounded-lg p-2"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              placeholder="Enter currency (e.g. GBP)"
            />
          ) : (
            <p className="p-2 bg-gray-50 rounded-lg">{currency || "--"}</p>
          )}
        </div> */}
      </div>
    </InfoCard>
  );
};

export default CommissionSettings;
