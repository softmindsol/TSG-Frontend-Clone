import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FiEdit2 } from "react-icons/fi";
import Icons from "../../assets/icons/Icons";
import { toast } from "sonner";
import {
  updateDueDiligence,
  getSingleDeal,
} from "../../store/features/deal/service";

const DuiDiligence = ({ singleDeal }) => {
  const dispatch = useDispatch();
  const dealId = singleDeal?._id;

  const [isEditing, setIsEditing] = useState(false);
  const [checkedItems, setCheckedItems] = useState({
    ricsSurvey: false,
    searchesLocalAuthority: false,
    titleReview: false,
    planning: false,
    epcCertificate: false,
    defects: false,
    insuranceConsiderations: false,
  });

  const [originalState, setOriginalState] = useState(checkedItems);

  // ✅ Load existing due diligence data from deal
  useEffect(() => {
    if (singleDeal?.dueDiligence) {
      const d = singleDeal.dueDiligence;
      const loadedState = {
        ricsSurvey: d?.ricsSurvey ?? false,
        searchesLocalAuthority: d?.searchesLocalAuthority ?? false,
        titleReview: d?.titleReview ?? false,
        planning: d?.planning ?? false,
        epcCertificate: d?.epcCertificate ?? false,
        defects: d?.defects ?? false,
        insuranceConsiderations: d?.insuranceConsiderations ?? false,
      };
      setCheckedItems(loadedState);
      setOriginalState(loadedState);
    }
  }, [singleDeal]);

  // ✅ Handle toggle (only when editing)
  const handleCheckboxChange = (key) => {
    if (!isEditing) return;
    setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // ✅ Save handler (hit API)
  const handleSave = async () => {
    if (!dealId) return toast.error("Deal ID missing!");

    const toastId = toast.loading("Updating due diligence...");

    dispatch(updateDueDiligence({ dealId, data: checkedItems }))
      .unwrap()
      .then(() => {
        toast.success("Due diligence updated successfully!");
        dispatch(getSingleDeal({ dealId }));
        setIsEditing(false);
        setOriginalState(checkedItems);
      })
      .catch(() => toast.error("Failed to update due diligence!"))
      .finally(() => toast.dismiss(toastId));
  };

  // ✅ Cancel handler (revert state)
  const handleCancel = () => {
    setCheckedItems(originalState);
    setIsEditing(false);
  };

  const CheckboxItem = ({ id, label, description }) => (
    <div className="flex items-start space-x-3 mb-4">
      <input
        type="checkbox"
        id={id}
        checked={checkedItems[id]}
        disabled={!isEditing}
        onChange={() => handleCheckboxChange(id)}
        className={`mt-1 h-4 w-4 border-gray-300 rounded focus:ring-black accent-black ${
          !isEditing ? "opacity-70 cursor-not-allowed" : ""
        }`}
      />
      <label
        htmlFor={id}
        className="flex-1 text-base font-medium text-[#6B7280] leading-relaxed"
      >
        <span className="font-medium">{label}</span> — {description}
      </label>
    </div>
  );

  return (
    <div className="relative bg-white p-4 rounded-md">
      {/* Edit / Save / Cancel Buttons */}
      {!isEditing ? (
        <button
          type="button"
          onClick={() => setIsEditing(true)}
          className="absolute right-1.5 -top-5 flex items-center text-base cursor-pointer font-semibold text-[#1877F2]"
        >
          <FiEdit2 className="mr-2" />
          Edit
        </button>
      ) : (
        <div className="absolute right-1.5 -top-5 flex items-center gap-3">
          <button
            onClick={handleSave}
            className="flex items-center cursor-pointer font-semibold text-[#00AC4F]"
          >
            <Icons.CircleCheck className="mr-2" />
            Save
          </button>
          <button
            onClick={handleCancel}
            className="flex items-center cursor-pointer font-semibold text-[#F87171]"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Checkboxes */}
      <div className="space-y-6 mt-6">
        <CheckboxItem
          id="ricsSurvey"
          label="RICS Survey"
          description="Level 2 / Level 3 / Other, ordered (Y/N), date, summary, file."
        />
        <CheckboxItem
          id="searchesLocalAuthority"
          label="Searches"
          description="Local Authority, Water & Drainage, Environmental, Chancel, Coal, etc."
        />
        <CheckboxItem
          id="titleReview"
          label="Title Review"
          description="Covenants, easements, rights of way, notes, file."
        />
        <CheckboxItem
          id="planning"
          label="Planning / Building Regulations"
          description="Approvals, outstanding notices, historic applications, links/files."
        />
        <CheckboxItem
          id="epcCertificate"
          label="EPC Certificate"
          description="+ expiry date."
        />
        <CheckboxItem
          id="defects"
          label="Defects / Work Required"
          description="Issues with severity, cost estimate, responsible party, due date."
        />
        <CheckboxItem
          id="insuranceConsiderations"
          label="Insurance Considerations"
          description="Flood, subsidence, high-risk flags."
        />
      </div>
    </div>
  );
};

export default DuiDiligence;
