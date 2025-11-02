import React, { useEffect, useState } from "react";
import Icons from "../../assets/icons/Icons";
import GlobalButton from "../../components/common/GlobalButton";
import SearchAndFilterComponent from "../../components/common/SearchAndFilterComponent";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import DeleteDocument from "../../components/common/DeleteDocument";
import SendDocumentModal from "../../components/common/SendDocumentModal";
import UploadDocumentModal from "../../components/common/UploadDocumentModal";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllTemplates,
  getDocumentReports,
  getTemplateById,
} from "../../store/features/documents/service";
import { BiChevronDown, BiChevronRight, BiEdit } from "react-icons/bi";
import TemplateSection from "../../components/documentsTabs/TemplateSection";
import ReportSection from "../../components/documentsTabs/ReportSection";
import ClientUploadSection from "../../components/documentsTabs/ClientUploadSection";

const Documents = () => {
  const dispatch = useDispatch();

  // ---------------- STATE ----------------
  const [openCategory, setOpenCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedSections, setExpandedSections] = useState({
    contracts: true,
    templates: false,
    reports: false,
    clientUploads: false,
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSendDocument, setIsSendDocument] = useState(false);
  const [uploadDocumentModal, setUploadDocumentModal] = useState(false);

  // ---------------- REDUX DATA ----------------
  const templatesData = useSelector(
    (state) => state.documents.templates.getAllTemplates.data
  );
  const singleTemplate = useSelector(
    (state) => state.documents.templates.getTemplateById.data
  );

  const allClients = useSelector((state) => state.client.allClients);
  const allDocumentReports = useSelector(
    (state) => state.documents.reports.getDocumentReports
  );
  // ---------------- EFFECTS ----------------

  useEffect(() => {
    dispatch(getDocumentReports());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getAllTemplates());
  }, [dispatch]);

  // ---------------- HANDLERS ----------------
  const toggleCategory = (categoryId) => {
    setOpenCategory((prev) => (prev === categoryId ? null : categoryId));
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleTemplateTrigger = (templateId) => {
    dispatch(getTemplateById(templateId));
  };

  // ---------------- COMPONENTS ----------------
  const SidebarSection = ({
    title,
    count,
    icon,
    isExpanded,
    onToggle,
    children,
    categoryKey,
  }) => (
    <div className="my-4">
      <button
        onClick={() => {
          onToggle();
          if (categoryKey) {
            setSelectedCategory(categoryKey);
          }
        }}
        className={`w-full flex items-center justify-between p-2 text-left hover:bg-gray-50 rounded ${
          selectedCategory === categoryKey
            ? "bg-blue-50 border-l-4 border-blue-500"
            : ""
        }`}
      >
        <div className="flex items-center space-x-2">
          {icon}
          <span
            className={`text-base font-medium ${
              selectedCategory === categoryKey
                ? "text-blue-700"
                : "text-gray-700"
            }`}
          >
            {title}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {count && <span className=" text-xs ">{count}</span>}
          {isExpanded ? (
            <FaChevronDown className="w-3 h-3 text-gray-400" />
          ) : (
            <FaChevronRight className="w-3 h-3 text-gray-400" />
          )}
        </div>
      </button>
      {isExpanded && <div className="ml-6 mt-3 space-y-4">{children}</div>}
    </div>
  );

  // ---------------- RIGHT SIDE SECTIONS ----------------
  const ContractsSection = () => (
    <div>
      <h2 className="text-lg font-semibold mb-2">Contracts</h2>
      <p className="text-gray-600 text-sm">
        All your contracts are listed here.
      </p>
    </div>
  );

  const ReportsSection = () => (
    <div>
      <h2 className="text-lg font-semibold mb-2">Reports</h2>
      <p className="text-gray-600 text-sm">
        Your AI and manual reports appear here.
      </p>
    </div>
  );

  const ClientUploadsSection = () => (
    <div>
      <h2 className="text-lg font-semibold mb-2">Client Uploads</h2>
      <p className="text-gray-600 text-sm">
        All files uploaded by clients are displayed here.
      </p>
    </div>
  );

  // ---------------- RETURN JSX ----------------
  return (
    <>
      {/* Top Buttons */}
      <div className="flex items-center gap-1.5 my-3 xl:my-6 justify-end">
        <GlobalButton
          icon={Icons.PlusIcon}
          variant="secondary"
          iw="w-4"
          ih="h-4"
        >
          Document Branding
        </GlobalButton>
        <GlobalButton
          icon={Icons.Upload}
          variant="primary"
          onClick={() => setUploadDocumentModal(true)}
          iw="w-4"
          ih="h-4"
        >
          Upload Document
        </GlobalButton>
      </div>

      <SearchAndFilterComponent />

      {/* Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_4fr] gap-4 mt-4">
        {/* -------- Sidebar -------- */}
        <div className="bg-white rounded-2xl p-4 border border-[#E2E8F0]">
          {/* All Documents */}
          <div className="mb-4">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`w-full flex items-center space-x-2 py-[10px] px-4 text-base rounded ${
                selectedCategory === "all"
                  ? "bg-[#081722] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Icons.FolderIcon className="w-4 h-4" />
              <span className="text-sm font-medium">All Documents</span>
            </button>
          </div>

          {/* Contracts */}
          <SidebarSection
            title="Contracts"
            count="2"
            icon={<Icons.Document className="text-[#00AC4F]" size={20} />}
            isExpanded={expandedSections.contracts}
            onToggle={() => toggleSection("contracts")}
            categoryKey="contracts"
          >
            <div className="text-sm text-gray-600 py-1 px-2 hover:bg-gray-50 rounded cursor-pointer">
              Standard Forms
            </div>
            <div className="text-sm text-gray-600 py-1 px-2 hover:bg-gray-50 rounded cursor-pointer">
              Custom Agreements
            </div>
          </SidebarSection>

          {/* Templates */}
          <SidebarSection
            title="Templates"
            count={templatesData?.length ?? 0}
            icon={<BiEdit className="text-[#1877F2]" size={20} />}
            isExpanded={expandedSections.templates}
            onToggle={() => toggleSection("templates")}
            categoryKey="templates"
          >
            <div className="overflow-y-auto">
              {templatesData?.map((cat) => (
                <div key={cat.category} className="mb-1">
                  <div
                    onClick={() => toggleCategory(cat.category)}
                    className="flex justify-between items-center text-sm text-gray-700 py-1 px-2 hover:bg-gray-50 rounded cursor-pointer capitalize"
                  >
                    <span>{cat.category}</span>
                    {openCategory === cat.category ? (
                      <BiChevronDown size={14} className="text-gray-400" />
                    ) : (
                      <BiChevronRight size={14} className="text-gray-400" />
                    )}
                  </div>

                  {openCategory === cat.category && (
                    <div className="ml-2 mt-1 space-y-1">
                      {cat.templates?.map((template) => (
                        <div
                          key={template._id}
                          className="text-xs text-gray-600 py-1 px-2 hover:bg-gray-100 rounded cursor-pointer"
                          onClick={() => handleTemplateTrigger(template._id)}
                        >
                          {template.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </SidebarSection>

          {/* Reports */}
          <SidebarSection
            title="Reports"
            count="1"
            icon={<Icons.Document className="text-[#9333EA]" size={20} />}
            isExpanded={expandedSections.reports}
            onToggle={() => toggleSection("reports")}
            categoryKey="reports"
          >
            {/* <div className="text-sm text-gray-600 py-1 px-2 hover:bg-gray-50 rounded cursor-pointer">
              All reports
            </div> */}
          </SidebarSection>

          {/* Client Uploads */}
          <SidebarSection
            title="Client Uploads"
            count="1"
            icon={<Icons.Upload size={18} />}
            isExpanded={expandedSections.clientUploads}
            onToggle={() => toggleSection("clientUploads")}
            categoryKey="clientUploads"
          >
            {/* <div className="text-sm text-gray-600 py-1 px-2 hover:bg-gray-50 rounded cursor-pointer">
              Received Documents
            </div>
            <div className="text-sm text-gray-600 py-1 px-2 hover:bg-gray-50 rounded cursor-pointer">
              Shared Links
            </div> */}
          </SidebarSection>
        </div>

        {/* -------- Right Side Content -------- */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 min-h-[400px]">
          {selectedCategory === "contracts" && <ContractsSection />}
          {selectedCategory === "templates" && (
            <TemplateSection
              singleTemplate={singleTemplate}
              allClients={allClients}
            />
          )}
          {selectedCategory === "reports" && (
            <ReportSection allDocumentReports={allDocumentReports} />
          )}
          {selectedCategory === "clientUploads" && (
            <ClientUploadSection allDocumentReports={allDocumentReports} />
          )}
          {selectedCategory === "all" && (
            <div>
              <h2 className="text-lg font-semibold mb-2">All Documents</h2>
              <p className="text-gray-600 text-sm">
                View all documents across categories.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <DeleteDocument
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      />
      <SendDocumentModal
        isOpen={isSendDocument}
        onClose={() => setIsSendDocument(false)}
      />
      <UploadDocumentModal
        isOpen={uploadDocumentModal}
        onClose={() => setUploadDocumentModal(false)}
      />
    </>
  );
};

export default Documents;
