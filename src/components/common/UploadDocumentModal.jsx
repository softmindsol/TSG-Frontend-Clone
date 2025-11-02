import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import Icons from "../../assets/icons/Icons";
import SelectInput from "./SelectInput";
import GlobalButton from "./GlobalButton";
import FileUpload from "./FileUpload";
import { getSimpleClients } from "../../store/features/client/service";
import {
  getDocumentReports,
  uploadDocumentFromDocument,
} from "../../store/features/documents/service";

const UploadDocumentModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  // ✅ Local state
  const [selectedClient, setSelectedClient] = useState("");
  const [category, setCategory] = useState("");
  const [notes, setNotes] = useState("");
  const [file, setFile] = useState(null);

  // ✅ Get clients from Redux
  const { data: simpleClients, isLoading } = useSelector(
    (state) => state.client.simpleClients
  );

  // ✅ Uploading state
  const { isLoading: uploading } = useSelector(
    (state) =>
      state.documents?.clientUploads?.uploadDocument || { isLoading: false }
  );

  // ✅ Fetch clients when modal opens
  useEffect(() => {
    if (isOpen) {
      dispatch(getSimpleClients());
    }
  }, [isOpen, dispatch]);

  // ✅ Dropdown options
  const clientOptions =
    simpleClients?.clients?.map((client) => ({
      value: client._id,
      label: client.clientName,
    })) || [];

  // ✅ Handle file change
  const handleFileChange = (selectedFile) => {
    setFile(selectedFile);
  };

  // ✅ Handle upload
  const handleUpload = async () => {
    if (!file || !selectedClient || !category) {
      alert("Please select client, category and upload a file!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("clientId", selectedClient); // 🔹 send client _id only
    formData.append("category", category);
    formData.append("notes", notes);

    try {
      await dispatch(uploadDocumentFromDocument(formData)).unwrap();
      dispatch(getDocumentReports());

      setFile(null);
      setSelectedClient("");
      setCategory("");
      setNotes("");

      onClose();
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/50 p-6 font-poppins">
      <div className="bg-white rounded-2xl shadow-lg p-4 w-full max-w-3xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center p-6 space-x-4 relative">
          <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-[#1877F2]/10 rounded-lg">
            <Icons.Document className="text-[#1877F2]" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-[#081722]">
              Upload Document
            </h2>
            <p className="text-sm text-[#6B7280]">Upload a new document</p>
          </div>
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-500 hover:text-gray-800"
            aria-label="Close modal"
          >
            <IoClose size={24} />
          </button>
        </div>

        <hr className="border-slate-200/50" />

        {/* Body */}
        <div className="p-4">
          <FileUpload onFileSelect={handleFileChange} />

          <div className="mt-4 grid grid-cols-2 gap-1.5">
            {/* ✅ Link to Client Dropdown (from API) */}
            <div>
              <label className="font-medium text-[#081722] text-base mb-1 block">
                Link to Client
              </label>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedClient}
                onChange={(e) => setSelectedClient(e.target.value)}
                disabled={isLoading}
              >
                <option value="">
                  {isLoading ? "Loading clients..." : "Select Client"}
                </option>
                {clientOptions.map((client) => (
                  <option key={client.value} value={client.value}>
                    {client.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Dropdown */}
            <div>
              <label className="font-medium text-[#081722] text-base mb-1 block">
                Category
              </label>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="ClientUpload">Client Upload</option>
                <option value="Contract">Contract</option>
              </select>
            </div>
          </div>

          {/* Notes */}
          <div className="mt-3">
            <label className="font-medium text-[#081722] text-base">
              Notes
            </label>
            <textarea
              placeholder="Add a message to accompany the document..."
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-4 p-6 pt-2">
          <button
            onClick={onClose}
            className="h-10 px-8 font-medium text-[#081722] text-base border border-[#081722] rounded-lg hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <GlobalButton
            variant="primary"
            onClick={handleUpload}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Upload Document"}
          </GlobalButton>
        </div>
      </div>
    </div>
  );
};

export default UploadDocumentModal;
