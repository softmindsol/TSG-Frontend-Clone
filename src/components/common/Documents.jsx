// src/components/Documents.js

import React, { useState, useRef } from "react";
import {
  FiFileText,
  FiUploadCloud,
  FiEye,
  FiDownload,
  FiTrash2,
} from "react-icons/fi";
import { BiUpload } from "react-icons/bi";
import {
  deleteClientDocument,
  uploadClientDocument,
} from "../../store/features/clientDocument/service";
import { useDispatch } from "react-redux";
import { getClientById } from "../../store/features/client/service";
import Swal from "sweetalert2";
import { toast } from "sonner";

// --- Dummy Data ---
const initialDocuments = [
  { id: 1, name: "Property_Requirements.pdf", date: "23/05/2025" },
  { id: 2, name: "Financial_Preapproval.pdf", date: "23/05/2025" },
];

const DocumentItem = ({ doc, onDelete }) => (
  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-100">
        <FiFileText className="text-blue-600" size={20} />
      </div>
      <div>
        <p className="font-medium text-gray-800">{doc.filename}</p>
        <p className="text-sm text-gray-500">{doc.date}</p>
      </div>
    </div>
    <div className="flex items-center gap-2">
      <button className="p-2 rounded-md hover:bg-gray-100">
        <FiEye size={16} />
      </button>
      <button className="p-2 rounded-md hover:bg-gray-100">
        <FiDownload size={16} />
      </button>
      <button className="p-2 rounded-md hover:bg-gray-100" onClick={onDelete}>
        <FiTrash2 size={16} />
      </button>
    </div>
  </div>
);
const Documents = ({ documents, clientId, amlDocuments }) => {
  console.log("🚀 ~ Documents ~ amlDocuments:", amlDocuments);
  console.log("🚀 ~ Documents ~ documents:", documents);
  const dispatch = useDispatch();

  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const files = event.target.files;
    if (!files.length) return;

    const formData = new FormData();
    formData.append("document", files[0]);

    // loading toast
    const id = toast.loading("Uploading document...");

    dispatch(uploadClientDocument({ clientId, formData }))
      .unwrap()
      .then(() => {
        dispatch(getClientById(clientId));
        toast.success("Document uploaded successfully!");
      })
      .catch(() => {
        toast.error("Failed to upload document!");
      })
      .finally(() => {
        toast.dismiss(id);
      });
  };

  const handleDeleteDocument = (publicId) => {
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
        const id = toast.loading("Deleting document...");

        dispatch(deleteClientDocument({ clientId, publicId }))
          .unwrap()
          .then(() => {
            dispatch(getClientById(clientId));
            Swal.fire("Deleted!", "Document has been removed.", "success");
          })
          .catch(() => {
            Swal.fire("Error!", "Delete failed!", "error");
          })
          .finally(() => {
            toast.dismiss(id);
          });
      }
    });
  };

  const handleUploadAreaClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200">
      <input
        type="file"
        multiple
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileSelect}
      />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Documents</h2>
        <button
          onClick={handleUploadAreaClick}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-gray-900"
        >
          <BiUpload />
          Upload Document
        </button>
      </div>
      <div
        className="border border-dashed border-gray-300 rounded-lg p-8 text-center mb-6 cursor-pointer"
        onClick={handleUploadAreaClick}
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
        {documents?.map((doc) => (
          <DocumentItem
            key={doc.id}
            doc={doc}
            onDelete={() => handleDeleteDocument(doc.public_id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Documents;
