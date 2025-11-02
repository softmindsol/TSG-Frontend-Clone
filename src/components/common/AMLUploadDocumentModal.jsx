import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import Icons from "../../assets/icons/Icons";
import SelectInput from "./SelectInput";
import GlobalButton from "./GlobalButton";
import FileUpload from "./FileUpload";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { addAMLDocument, getAMLDocuments } from "../../store/features/amlCompliance/service";

const AMLUploadDocumentModal = ({ isOpen, onClose, client }) => {
  console.log("🚀 ~ AMLUploadDocumentModal ~ client:", client)
  const dispatch = useDispatch();

  const [file, setFile] = useState(null);
  const [docType, setDocType] = useState("");
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const allowedDocTypes = [
    { value: "passport", label: "Passport" },
    { value: "id_card", label: "ID Card" },
    { value: "utility_bill", label: "Utility Bill" },
    { value: "property_doc", label: "Property Document" },
    { value: "other", label: "Other" },
  ];

  const allowedStatuses = [
    { value: "approved", label: "Approved" },
    { value: "rejected", label: "Rejected" },
    { value: "pending", label: "Pending" },
  ];

  if (!isOpen) return null;

  const resetState = () => {
    setFile(null);
    setDocType("");
    setStatus("");
    setNotes("");
    setLoading(false);
  };

  const handleClose = () => {
    resetState();
    onClose?.();
  };

  const handleUpload = async () => {
    if (!file || !docType || !status) {
      toast.error("Please fill in all required fields.");
      return;
    }


    const formData = new FormData();
    formData.append("file", file);
    formData.append("documentType", docType);
    // Use the same key your API returns in GET (status)
    formData.append("status", status);
    if (notes) formData.append("notes", notes);

    try {
      setLoading(true);
      await dispatch(addAMLDocument({ clientId: client, formData })).unwrap();
      toast.success("Document uploaded successfully!");
      dispatch(getAMLDocuments(client));
      handleClose();
    } catch (err) {
      const msg = (err && (err.message || err.error || err.data?.message)) || "Failed to upload document.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-[9999] bg-black/50 p-6 font-poppins">
      <div className="bg-white rounded-2xl shadow-lg p-4 w-full max-w-3xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center p-6 space-x-4 relative">
          <div className="w-12 h-12 flex items-center justify-center bg-[#1877F2]/10 rounded-lg">
            <Icons.Document className="text-[#1877F2]" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-[#081722]">Upload Document</h2>
            <p className="text-sm text-[#6B7280]">Upload a new document</p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="absolute cursor-pointer top-6 right-6 text-gray-500 hover:text-gray-800"
          >
            <IoClose size={24} />
          </button>
        </div>

        <hr className="border-slate-200/50" />

        {/* Body */}
        <div className="p-4">
          {/* If your FileUpload supports restrictions, pass accept/maxSize props */}
          <FileUpload onFileSelect={setFile} accept="application/pdf,image/*" />

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <SelectInput
              label="Document Type"
              id="documentType"
              placeholder="Select Document Type"
              options={allowedDocTypes}
              value={docType}
              onChange={setDocType}
              required
            />

            <SelectInput
              label="Status"
              id="status"
              placeholder="Select Status"
              options={allowedStatuses}
              value={status}
              onChange={setStatus}
              required
            />
          </div>

          <div className="mt-3">
            <label htmlFor="notes" className="font-medium text-[#081722] text-base">
              Notes
            </label>
            <textarea
              id="notes"
              placeholder="Add a message to accompany the document..."
              rows={3}
              className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-4 p-6 pt-2">
          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="h-10 px-8 font-medium text-[#081722] text-base border border-[#081722] rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <GlobalButton variant="primary" onClick={handleUpload} disabled={loading}>
            {loading ? "Uploading..." : "Upload Document"}
          </GlobalButton>
        </div>
      </div>
    </div>
  );
};

export default AMLUploadDocumentModal;
