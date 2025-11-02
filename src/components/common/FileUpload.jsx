import React, { useRef, useState } from "react";
import { FiUploadCloud } from "react-icons/fi";

const FileUpload = ({ onFileSelect }) => {
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      onFileSelect?.(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      onFileSelect?.(file);
    }
  };

  return (
    <div>
      <label className="block text-lg font-semibold text-gray-800 mb-3">
        Upload Documents
      </label>

      <div
        className={`flex flex-col items-center justify-center w-full h-44 p-4 rounded-md text-center cursor-pointer transition-all ${
          dragActive
            ? "bg-blue-50 border-blue-400"
            : "bg-white border-gray-300"
        } border-2 border-dashed hover:border-blue-400`}
        onClick={() => fileInputRef.current.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
      >
        <FiUploadCloud className="w-8 h-8 text-gray-500 mb-3" />
        {!selectedFile ? (
          <>
            <p className="text-base text-gray-600">
              Drag and drop files here, or{" "}
              <span className="font-semibold text-blue-600">click to browse</span>
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Supports PDF, DOC, DOCX, JPG, PNG
            </p>
          </>
        ) : (
          <div className="flex flex-col items-center">
            <p className="text-gray-800 font-medium">{selectedFile.name}</p>
            <p className="text-sm text-gray-400">
              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        )}
      </div>

      <input
        type="file"
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default FileUpload;
