import React, { useState } from "react";
import Icons from "../../assets/icons/Icons";
import {
  deleteDocumentFromDocument,
  getDocumentReports,
} from "../../store/features/documents/service";
import { useDispatch } from "react-redux";

const ClientUploadSection = ({ allDocumentReports }) => {
  const dispatch = useDispatch();
  const documents = allDocumentReports?.data?.documents || [];

  const [showModal, setShowModal] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);

  const handleViewPDF = (doc) => {
    setSelectedDoc(doc);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedDoc(null);
    setShowModal(false);
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return "0 KB";
    const kb = bytes / 1024;
    return kb < 1024 ? `${kb.toFixed(1)} KB` : `${(kb / 1024).toFixed(1)} MB`;
  };

  const handleDeleteDoc = async (docId) => {
    if (window.confirm("Are you sure you want to delete this document?")) {
      try {
        // Wait for delete to complete
        await dispatch(deleteDocumentFromDocument(docId)).unwrap();

        // Now safely refresh list
        await dispatch(getDocumentReports());
      } catch (err) {
        console.error("Failed to delete document:", err);
      }
    }
  };

  return (
    <div>
      {/* --- Documents List --- */}
      <div>
        {documents.length > 0 ? (
          documents.map((doc) => (
            <div
              key={doc._id}
              className="flex flex-col lg:flex-row items-start lg:items-center gap-5 border border-[#E2E8F0] rounded-lg mb-3 justify-between p-4"
            >
              <div className="flex items-center space-x-3 flex-1">
                <div className="flex-1 space-y-3">
                  {/* --- File Name and Client --- */}
                  <div className="flex items-center space-x-3">
                    <h3 className="text-sm font-medium text-gray-900">
                      {doc?.file?.filename || doc?.name || "Unnamed File"}
                    </h3>
                    <span className="text-xs text-gray-500 flex items-center gap-2">
                      Client:
                      <span className="bg-gray-200 px-3 py-1 rounded-full text-[10px]">
                        {doc?.clientId?.clientName || "N/A"}
                      </span>
                    </span>
                  </div>

                  {/* --- Meta Info --- */}
                  <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                    <span>
                      📅 {new Date(doc?.uploadedAt).toLocaleDateString()}
                    </span>
                    <span>{formatFileSize(doc?.file?.size)}</span>
                    {doc?.notes && <span>📝 {doc.notes}</span>}
                  </div>
                </div>
              </div>

              {/* --- Action Buttons --- */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleViewPDF(doc)}
                  className="p-1.5 rounded hover:bg-gray-100"
                >
                  <Icons.EyeIcon className="w-4 h-4" />
                </button>
                <a
                  href={doc?.file?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded hover:bg-gray-100"
                >
                  <Icons.Download size={20} />
                </a>
                <button
                  onClick={() => handleDeleteDoc(doc._id)}
                  className="p-1.5 rounded hover:bg-gray-100"
                >
                  <Icons.DeleteIcon size={18} />
                </button>
              </div>
            </div>
          ))
        ) : (
          // --- No Documents Message ---
          <div className="text-center py-10 text-gray-500">
            📄 No documents uploaded yet.
          </div>
        )}
      </div>

      {/* --- PDF Modal --- */}
      {showModal && selectedDoc && (
        <div className="fixed inset-0 bg-[#00000060] bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-6xl rounded-2xl shadow-lg overflow-hidden animate-fadeIn">
            {/* --- Header --- */}
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {selectedDoc?.file?.filename || "PDF Preview"}
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>
            </div>

            {/* --- PDF Preview --- */}
            <div className="p-4 bg-gray-50">
              {selectedDoc?.file?.url?.endsWith(".pdf") ? (
                <iframe
                  src={selectedDoc.file.url}
                  title="PDF Preview"
                  className="w-full h-[80vh] rounded-lg border border-gray-300"
                ></iframe>
              ) : (
                <p className="text-sm text-gray-600 text-center py-10">
                  No PDF preview available.{" "}
                  <a
                    href={selectedDoc?.file?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Open file in new tab
                  </a>
                  .
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientUploadSection;
