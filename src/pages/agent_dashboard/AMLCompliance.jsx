import React, { useEffect, useState } from "react";
import SearchAndFilterComponent from "../../components/common/SearchAndFilterComponent";
import ReusableTable from "../../components/common/ReusableTable";
import StatusBadge from "../../components/common/StatusBadge";
import ViewButton from "../../components/common/ViewButton";
import AMLDetailPage from "../../components/common/AMLDetailPage";
import { useDispatch, useSelector } from "react-redux";
import { getAllClients } from "../../store/features/client/service";
import { selectAllClients } from "../../store/selector";

const AMLCompliance = () => {
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]); // Track selected filters
  const [searchText, setSearchText] = useState(""); // Track search input

  const dispatch = useDispatch();
  const { data: allClientsData } = useSelector(selectAllClients);

  useEffect(() => {
    dispatch(getAllClients());
  }, [dispatch]);

  // Filter clients based on selected filters and search text
  const tableData = allClientsData?.clients
    ?.filter((client) => {
      // Filter by selected AML status
      if (selectedFilters.length > 0 && !selectedFilters.includes(client.amlStatus)) return false;
      // Filter by search text
      if (
        searchText &&
        !(
          client.clientName.toLowerCase().includes(searchText.toLowerCase()) ||
          client.clientCode.toLowerCase().includes(searchText.toLowerCase())
        )
      )
        return false;
      return true;
    })
    .map((c) => ({
      _id: c._id,
      client: {
        clientName: c.clientName,
        clientEmail: c.clientEmail,
      },
      clientCode: c.clientCode,
      assignedAgent: c.assignedAgent,
      dateAdded: c.createdAt,
      status: c.amlStatus || "N/A",
    })) || [];

  const tableColumns = [
    {
      key: "client",
      label: "Client",
      render: (client) => (
        <div>
          <div className="text-sm font-medium text-gray-900">{client?.clientName}</div>
          <div className="text-sm text-gray-500">{client?.clientEmail}</div>
        </div>
      ),
    },
    {
      key: "clientCode",
      label: "Client Code",
      render: (clientCode) => (
        <div className="text-sm font-medium bg-[#6B7280]/8 text-center p-1 rounded-md text-gray-900">
          {clientCode}
        </div>
      ),
    },
    {
      key: "assignedAgent",
      label: "Assigned Agent",
      render: (agent) => agent?.firstName || "N/A",
    },
    {
      key: "dateAdded",
      label: "Last Checked",
      render: (date) => <div className="text-sm text-gray-500">{new Date(date).toLocaleDateString()}</div>,
    },
    {
      key: "status",
      label: "Status",
      render: (status) => <StatusBadge status={status} />,
    },
    {
      key: "actions",
      label: "Actions",
      render: (_, row) => <ViewButton onClick={() => setSelectedClient(row)} />,
    },
  ];

  // AML Status filter options
  const filters = [
    { label: "Verified", value: "verified" },
    { label: "Pending", value: "pending" },
    { label: "Flagged", value: "flagged" },
    { label: "Not Started", value: "not_started" },
  ];

  return (
    <>
      {selectedClient ? (
        <AMLDetailPage client={selectedClient} onBack={() => setSelectedClient(null)} />
      ) : (
        <div className="mt-7 bg-opacity">
          <SearchAndFilterComponent
            filters={filters}
            selectedFilters={selectedFilters}
            onFilterChange={setSelectedFilters}
            onSearchChange={setSearchText}
          />
          <div className="mt-6">
            <ReusableTable data={tableData} columns={tableColumns} />
          </div>
        </div>
      )}
    </>
  );
};

export default AMLCompliance;
