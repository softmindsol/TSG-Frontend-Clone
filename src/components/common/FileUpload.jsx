import React, { useRef, useState } from "react";
import { FiUploadCloud } from "react-icons/fi";

const FileUpload = React.forwardRef(
  (
    { onChange, onFileSelect, accept, multiple, label = "Upload Files" },
    ref
  ) => {
    const fileInputRef = useRef(null);
    const [dragActive, setDragActive] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFiles = (files) => {
      if (!files || files.length === 0) {
        setSelectedFiles([]);
        if (onChange) onChange([]);
        if (onFileSelect) onFileSelect([]);
        return;
      }

      const fileArray = Array.from(files);
      setSelectedFiles(fileArray);

      if (onChange) onChange(fileArray);
      if (onFileSelect) onFileSelect(fileArray);
    };

    const handleFileChange = (e) => handleFiles(e.target?.files);

    const handleDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      handleFiles(e.dataTransfer?.files);
    };

    return (
      <div>
        <label className="block text-lg font-semibold text-gray-800 mb-3">
          {label}
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

          {selectedFiles.length === 0 ? (
            <>
              <p className="text-base text-gray-600">
                Drag and drop files here, or{" "}
                <span className="font-semibold text-blue-600">
                  click to browse
                </span>
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Supports PDF, DOC, DOCX, JPG, PNG
              </p>
            </>
          ) : (
            <div className="flex flex-col items-center space-y-1">
              {selectedFiles.map((file, index) => (
                <p key={index} className="text-gray-800 font-medium text-sm">
                  {file.name}{" "}
                  <span className="text-gray-400 text-xs">
                    ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                </p>
              ))}
            </div>
          )}
        </div>

        <input
          type="file"
          accept={accept}
          multiple={multiple}
          ref={(el) => {
            fileInputRef.current = el;
            if (typeof ref === "function") ref(el);
            else if (ref) ref.current = el;
          }}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    );
  }
);

export default FileUpload;
