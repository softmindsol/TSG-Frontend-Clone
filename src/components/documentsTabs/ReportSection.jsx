import React, { useState } from "react";
import Icons from "../../assets/icons/Icons";
import {
  deleteReport,
  getDocumentReports,
} from "../../store/features/documents/service";
import { useDispatch } from "react-redux";

const ReportSection = ({ allDocumentReports }) => {
  const dispatch = useDispatch();
  const reports = allDocumentReports?.data?.reports || [];

  // --- Modal States ---
  const [selectedReport, setSelectedReport] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  // --- Open Modal ---
  const handleViewReport = (report) => {
    setSelectedReport(report);
    setSubject(`Report: ${report?.reportType || "Untitled"}`);
    setBody(report?.content || "");
    setShowModal(true);
  };

  // --- Close Modal ---
  const handleCloseModal = () => {
    setSelectedReport(null);
    setShowModal(false);
  };

  // --- Send via Gmail ---
  const handleSendGmail = () => {
    if (!subject && !body) return alert("Please add subject and body");
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&su=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, "_blank");
  };

  const handleDeleteReport = (reportId) => {
    if (window.confirm("Are you sure you want to delete this report?")) {
      dispatch(deleteReport(reportId));
      dispatch(getDocumentReports());
    }
  };

  return (
    <div className="">
      {/* --- Zero Report Case --- */}
      {reports.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center text-gray-500">
          <Icons.FileText className="w-12 h-12 mb-3 text-gray-400" />
          <p className="text-lg font-medium">No reports available</p>
          <p className="text-sm text-gray-400 mt-1">
            Once reports are generated, they'll appear here.
          </p>
        </div>
      ) : (
        /* --- Report List --- */
        <div>
          {reports.map((doc) => (
            <div
              key={doc._id}
              className="flex flex-col lg:flex-row items-start lg:items-center gap-5 border border-[#E2E8F0] rounded-lg mb-3 justify-between p-4"
            >
              <div className="flex items-center space-x-3 flex-1">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-sm font-medium text-gray-900">
                      {doc?.reportType}
                    </h3>
                    <span className="text-xs text-gray-500 flex items-center gap-2">
                      Assigned By:
                      <span className="bg-gray-200 px-3 py-1 rounded-full text-[10px]">
                        {doc?.generatedBy?.firstName}
                      </span>
                    </span>
                  </div>

                  <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                    <span>
                      📅 {new Date(doc?.generatedDate).toLocaleDateString()}
                    </span>
                    <span>{doc?.clientId?.clientName}</span>
                    {doc?.author && <span>👤 {doc?.author}</span>}
                  </div>
                </div>
              </div>

              {/* --- Action Buttons --- */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleViewReport(doc)}
                  className="p-1.5 rounded hover:bg-gray-100"
                >
                  <Icons.EyeIcon className="w-4 h-4" />
                </button>
                <button className="p-1.5 rounded hover:bg-gray-100">
                  <Icons.Download size={20} />
                </button>
                <button
                  onClick={handleSendGmail}
                  className="p-1.5 rounded hover:bg-gray-100"
                >
                  <Icons.send size={18} />
                </button>
                <button
                  className="p-1.5 rounded hover:bg-gray-100"
                  onClick={() => handleDeleteReport(doc._id)}
                >
                  <Icons.DeleteIcon size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- Modal --- */}
      {showModal && selectedReport && (
        <div className="fixed inset-0 bg-[#00000060] bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-4xl rounded-2xl shadow-lg overflow-hidden animate-fadeIn">
            {/* --- Header --- */}
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">
                {selectedReport.reportType} Report
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>
            </div>

            {/* --- Subject --- */}
            <div className="p-4 border-b border-gray-100">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter email subject..."
              />
            </div>

            {/* --- Body --- */}
            <div className="p-4 max-h-[60vh] overflow-y-auto">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Body
              </label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={16}
                className="w-full border border-gray-300 rounded-lg p-3 text-sm font-mono whitespace-pre-wrap focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                placeholder="Edit the report content here..."
              />
            </div>

            {/* --- Footer --- */}
            <div className="flex justify-end gap-3 p-4 border-t border-gray-200 bg-gray-50">
              <button
                onClick={handleSendGmail}
                className="px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-700 transition"
              >
                Send via Gmail
              </button>
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg text-sm hover:bg-gray-400 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportSection;
