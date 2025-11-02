import React, { useEffect, useState, useMemo } from "react";
import CustomHeading from "../common/Heading";
import GlobalButton from "../common/GlobalButton";
import Icons from "../../assets/icons/Icons";
import AMLUploadDocumentModal from "../common/AMLUploadDocumentModal";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAMLDocument,
  getAMLDocuments,
} from "../../store/features/amlCompliance/service";
import { toast } from "sonner";

const statusColor = (s) => {
  const v = (s || "").toLowerCase();
  if (v === "approved") return "bg-green-600";
  if (v === "pending" || v === "in_review") return "bg-yellow-600";
  if (v === "rejected" || v === "flagged") return "bg-red-600";
  return "bg-gray-500";
};

const formatBytes = (bytes) => {
  if (!bytes && bytes !== 0) return "";
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.min(
    Math.floor(Math.log(Math.max(bytes, 1)) / Math.log(1024)),
    sizes.length - 1
  );
  return `${(bytes / Math.pow(1024, i)).toFixed(i === 0 ? 0 : 1)} ${sizes[i]}`;
};

const isPdf = (mime) => (mime || "").toLowerCase().includes("pdf");
const isImage = (mime) => (mime || "").toLowerCase().startsWith("image/");

const Documents = ({ client }) => {
  const dispatch = useDispatch();
  const { amlDocuments = [], loading } = useSelector(
    (state) => state.amlCompliance
  );


  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [previewDoc, setPreviewDoc] = useState(null);

  // Fetch docs when client changes
  useEffect(() => {
    if (client?._id) {
      dispatch(getAMLDocuments(client._id));
    }
  }, [dispatch, client?._id]);

  const docs = useMemo(() => {
    // Ensure we have an array of your doc objects
    return Array.isArray(amlDocuments?.amlDocuments)
      ? amlDocuments.amlDocuments
      : [];
  }, [amlDocuments]);

  const handleDeleteDocument = async (documentId) => {
    try {
      await dispatch(
        deleteAMLDocument({ clientId: client._id, documentId })
      ).unwrap();

      // ✅ Fetch updated list after successful delete
      dispatch(getAMLDocuments(client._id));

      toast.success("Document deleted successfully!");
    } catch (error) {
      toast.error(error?.message || "Failed to delete document");
    }
  };

  return (
    <>
      {/* Upload modal (your existing component) */}
      {isUploadOpen && (
        <AMLUploadDocumentModal
          isOpen={isUploadOpen}
          onClose={() => setIsUploadOpen(false)}
          client={client?._id}
        />
      )}

      {/* Preview modal */}

      <section>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="lg:flex justify-between items-center mb-6">
            <CustomHeading
              heading="Client Verification Documents"
              fontSize="text-[20px]"
              textAlign="text-left"
            />
            <GlobalButton
              onClick={() => setIsUploadOpen(true)}
              variant="primary"
              className="px-10 lg:mt-0 mt-3"
            >
              Upload Document
            </GlobalButton>
          </div>

          {loading ? (
            <div className="text-sm text-gray-500">Loading documents…</div>
          ) : docs.length === 0 ? (
            <div className="text-sm text-gray-500">
              No documents uploaded yet.
            </div>
          ) : (
            <div className="space-y-2">
              {docs.map((doc) => (
                <div
                  key={doc._id}
                  className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {/* Left: icon + info */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex-shrink-0 bg-[#00AC4F]/10 p-2 rounded-md">
                      <Icons.Document size={22} className="text-green-600" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-medium text-[#081722] truncate">
                        {doc?.file?.filename || "Untitled"}
                      </h3>
                      <p className="text-xs text-gray-500 truncate">
                        {doc?.documentType || "document"} •{" "}
                        {formatBytes(doc?.file?.size)} •{" "}
                        {new Date(doc?.uploadedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Right: status + actions */}
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white ${statusColor(
                        doc?.status
                      )}`}
                    >
                      {doc?.status || "N/A"}
                    </span>

                    <div className="flex items-center gap-1">
                      {/* Preview */}
                      <button
                        className="p-1.5 text-gray-500 hover:text-gray-700 transition-colors"
                        // onClick={() => setPreviewDoc(doc)}
                        title="Preview"
                      >
                        <Icons.EyeIcon />
                      </button>

                      {/* Download */}
                      <a
                        className="p-1.5 text-gray-500 hover:text-gray-700 transition-colors"
                        // href={doc?.file?.url}
                        // download={doc?.file?.filename || true}
                        // title="Download"
                      >
                        <Icons.Download size={20} />
                      </a>

                      {/* Delete (wire this up to your delete endpoint) */}
                      <button
                        className="p-1.5 text-gray-500 hover:text-red-600 transition-colors"
                        onClick={() => {
                          handleDeleteDocument(doc._id);
                        }}
                        title="Delete"
                      >
                        <Icons.DeleteIcon size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Documents;
