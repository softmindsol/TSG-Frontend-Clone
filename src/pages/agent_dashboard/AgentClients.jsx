import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import SearchAndFilterComponent from "../../components/common/SearchAndFilterComponent";
import ReusableTable from "../../components/common/ReusableTable";
import AddNewClientModal from "../../components/common/AddNewClientModal";
import ProgressBar from "../../components/common/ProgressBar";
import StatusBadge from "../../components/common/StatusBadge";
import ViewButton from "../../components/common/ViewButton";

import { getAllClients } from "../../store/features/client/service";
import { selectAllClients } from "../../store/selector";
import { PATH } from "../../routes/paths";

const AgentClients = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 🧭 Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 📦 Redux data
  const {
    data: allClientsData,
    isLoading: allClientsLoading,
    errorMessage: allClientsError,
  } = useSelector(selectAllClients);

  const clients = allClientsData?.clients || [];
  const pagination = allClientsData?.pagination || {};

  useEffect(() => {
    dispatch(getAllClients({ page: currentPage }));
  }, [dispatch, currentPage]);

  const handleViewClient = (clientId) => {
    const path = PATH.agentClientsDetail.replace(":clientId", clientId);
    navigate(path);
  };

  // 🧱 Table column definitions
  const tableColumns = [
    {
      key: "client",
      label: "Client",
      render: (client) => (
        <div>
          <div className="text-sm font-medium text-gray-900">
            {client?.clientName || "N/A"}
          </div>
          <div className="text-sm text-gray-500">{client?.clientEmail}</div>
        </div>
      ),
    },
    { key: "clientCode", label: "Client Code" },
    {
      key: "assignedAgent",
      label: "Assigned Agent",
      render: (agent) => agent?.firstName || "N/A",
    },
    {
      key: "progress",
      label: "Progress",
      render: (averageDealPercentage) => (
        <ProgressBar percentage={averageDealPercentage || 0} />
      ),
    },
    {
      key: "dateAdded",
      label: "Date Added",
      render: (date) =>
        date ? (
          <div className="flex items-center text-sm text-gray-500">
            {new Date(date).toLocaleDateString()}
          </div>
        ) : (
          "N/A"
        ),
    },
    {
      key: "status",
      label: "Status",
      render: (status) => <StatusBadge status={status || "N/A"} />,
    },
    {
      key: "actions",
      label: "Actions",
      render: (_, row) => (
        <ViewButton onClick={() => handleViewClient(row._id)} />
      ),
    },
  ];

  // 🧩 Convert API data → table rows
  const tableData = clients.map((c) => ({
    _id: c._id,
    client: { clientName: c.clientName, clientEmail: c.clientEmail },
    clientCode: c.clientCode,
    assignedAgent: c.assignedAgent,
    progress: c.averageDealPercentage,
    dateAdded: c.createdAt,
    status: c.amlStatus || "N/A",
  }));

  const handlePageChange = (page) => {
    if (page >= 1 && page <= pagination.pages) {
      setCurrentPage(page);
    }
  };

  if (allClientsLoading)
    return (
      <p className="text-center text-gray-500 mt-8">Loading all clients...</p>
    );

  // if (allClientsError)
  //   return (
  //     <p className="text-center text-red-500 mt-8">Error: {allClientsError}</p>
  //   );

  return (
    <div className="mt-4 xl:mt-8">
      <div className="flex justify-end">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-700 font-poppins"
        >
          + Add New Client
        </button>
      </div>

      <div className="mt-4 xl:my-7">
        <SearchAndFilterComponent />

        <div className="my-3 xl:mt-6">
          <ReusableTable data={tableData} columns={tableColumns} />

          {/* ✅ Pagination controls */}
          {pagination?.pages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-4 font-poppins">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 text-sm rounded-md border ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                Previous
              </button>

              {Array.from({ length: pagination.pages }).map((_, idx) => {
                const page = idx + 1;
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 text-sm rounded-md border ${
                      page === currentPage
                        ? "bg-gray-800 text-white"
                        : "bg-white hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === pagination.pages}
                className={`px-3 py-1 text-sm rounded-md border ${
                  currentPage === pagination.pages
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      <AddNewClientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default AgentClients;
