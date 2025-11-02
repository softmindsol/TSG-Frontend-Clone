import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import Icons from "../../assets/icons/Icons";
import CustomHeading from "./Heading";
import SelectInput from "./SelectInput";
import GlobalButton from "./GlobalButton";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "sonner";
import { generateAMLReport } from "../../store/features/report/service";

const GenerateReportModal = ({ isOpen, onClose, client }) => {
  console.log("🚀 ~ GenerateReportModal ~ client:", client)
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.amlReport);

  const [reportType, setReportType] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");

  if (!isOpen) return null;

  const handleGenerateReport = () => {
  if (!reportType) {
    toast.error("Please select a report type.");
    return;
  }

  if (!client?._id) {
    toast.error("Invalid client ID.");
    return;
  }

  dispatch(
    generateAMLReport({
      clientId: client?._id,       
      reportType: reportType,
      additionalNotes: additionalNotes,  
    })
  )
    .unwrap()
    .then(() => {
      onClose(); // close modal on success
    })
    .catch((error) => {
      // handle any additional error logic if needed
      console.error("Error generating report: ", error);
    });
};


  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 p-4 font-poppins">
      <div className="absolute inset-0 h-screen bg-black opacity-80" />

      {/* Modal Panel */}
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 relative">
        {/* Header */}
        <div className="flex items-start pb-6 border-b border-gray-200">
          <div className="bg-blue-100 p-3 rounded-lg mr-4">
            <Icons.Document className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Generate AML Report
            </h2>
            <p className="text-base text-gray-500">Generate your report</p>
          </div>
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-500 hover:text-gray-800"
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-3 mt-6">
          <CustomHeading
            heading="Report Details"
            fontSize="text-[18px]"
            textAlign="text-left"
          />

          {/* Report Type */}
          <SelectInput
            label="Report Type"
            id="reportType"
            value={reportType}
            onChange={setReportType}
            placeholder="Select report type"
            options={[
              { value: "compliance", label: "Compliance Summary" },
              { value: "document", label: "Document Report" },
              {
                value: "verification_timeline",
                label: "Verification Timeline",
              },
            ]}
          />

          {/* Notes */}
          <label className="block text-base font-medium text-gray-800 mb-2">
            Additional Notes
          </label>
          <textarea
            rows="3"
            value={additionalNotes}
            onChange={(e) => setAdditionalNotes(e.target.value)}
            placeholder="Add any comments or report context..."
            className="w-full text-sm rounded-md px-3 border border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end items-center pt-6 space-x-4">
          <GlobalButton variant="secondary" onClick={onClose} className="px-8">
            Cancel
          </GlobalButton>

          <GlobalButton
            variant="primary"
            className="px-10"
            onClick={handleGenerateReport}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Report"}
          </GlobalButton>
        </div>
      </div>
    </div>
  );
};

export default GenerateReportModal;
