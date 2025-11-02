import React, { useRef } from "react";
import {
  FiFileText,
  FiUploadCloud,
  FiEye,
  FiDownload,
  FiTrash2,
} from "react-icons/fi";
import { BiUpload } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { toast } from "sonner";
import {
  uploadDocuments,
  deleteDocument,
  getDocuments,
} from "../../store/features/deal/service";

const DocumentItem = ({ doc, onDelete }) => (
  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-100">
        <FiFileText className="text-blue-600" size={20} />
      </div>
      <div>
        <p className="font-medium text-gray-800">{doc?.filename}</p>
        <p className="text-sm text-gray-500">
          {new Date(doc?.createdAt).toLocaleDateString() || ""}
        </p>
      </div>
    </div>

    <div className="flex items-center gap-2">
      {doc?.fileUrl && (
        <>
          <a
            href={doc.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <FiEye size={16} />
          </a>
          <a
            href={doc.fileUrl}
            download
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <FiDownload size={16} />
          </a>
        </>
      )}
      <button className="p-2 rounded-md hover:bg-gray-100" onClick={onDelete}>
        <FiTrash2 size={16} />
      </button>
    </div>
  </div>
);

const DealDocument = ({ singleDeal }) => {
  console.log("🚀 ~ DealDocument ~ singleDeal:", singleDeal);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const dealId = singleDeal?._id;
  const documents = singleDeal?.documents || [];
  const dealDocuments = useSelector((state) => state.deal.dealDocument);
  console.log("🚀 ~ DealDocument ~ dealDocuments:", dealDocuments)

  // ✅ Upload Documents + Refresh Immediately
  const handleFileSelect = (event) => {
    const files = event.target.files;
    if (!files?.length || !dealId) return;

    const formData = new FormData();
    formData.append("files", files[0]);

    const toastId = toast.loading("Uploading document...");

    // Dispatch upload
    dispatch(uploadDocuments({ dealId, formData }))
      .unwrap()
      .then(() => {
        toast.success("Document uploaded successfully!");
      })
      .catch(() => {
        toast.error("Failed to upload document!");
      })
      .finally(() => {
        toast.dismiss(toastId);
        // ✅ Always refresh after action — fori
        dispatch(getDocuments({ dealId }));
      });
  };

  // ✅ Delete Document + Refresh Immediately
  const handleDeleteDocument = (docId) => {
    if (!dealId || !docId) return;

    Swal.fire({
      title: "Are you sure?",
      text: "This document will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const toastId = toast.loading("Deleting document...");

        dispatch(deleteDocument({ dealId, docId }))
          .unwrap()
          .then(() => {
            toast.success("Document deleted successfully!");
          })
          .catch(() => {
            toast.error("Failed to delete document!");
          })
          .finally(() => {
            toast.dismiss(toastId);
            // ✅ Instantly refresh deal data
            dispatch(getDocuments({ dealId }));
          });
      }
    });
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileSelect}
      />

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Documents</h2>
        <button
          onClick={handleUploadClick}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-gray-900"
        >
          <BiUpload />
          Upload Document
        </button>
      </div>

      <div
        className="border border-dashed border-gray-300 rounded-lg p-8 text-center mb-6 cursor-pointer"
        onClick={handleUploadClick}
      >
        <FiUploadCloud className="mx-auto text-gray-500" size={24} />
        <p className="mt-2 text-base text-gray-600">
          Drag and drop files here, or{" "}
          <span className="font-medium text-black cursor-pointer">
            click to browse
          </span>
        </p>
        <p className="text-sm text-gray-400 mt-1">
          Supports PDF, DOC, DOCX, JPG, PNG
        </p>
      </div>

      <div className="space-y-4">
        {dealDocuments.length > 0 ? (
          dealDocuments.map((doc, index) => (
            <DocumentItem
              key={index}
              doc={doc}
              onDelete={() => handleDeleteDocument(doc?.public_id)}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center text-sm">
            No documents uploaded yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default DealDocument;
