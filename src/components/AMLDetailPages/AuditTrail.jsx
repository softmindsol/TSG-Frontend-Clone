import React, { useEffect, useMemo } from "react";
import CustomHeading from "../common/Heading";
import GlobalButton from "../common/GlobalButton";
import ReusableTable from "../common/ReusableTable";
import { useDispatch, useSelector } from "react-redux";
import { getVerificationTimeline } from "../../store/features/amlCompliance/service";
import { format } from "date-fns";
import { saveAs } from "file-saver";
import Papa from "papaparse";

const AuditTrail = ({ client }) => {
  const dispatch = useDispatch();
  const { verificationTimeline, loading } = useSelector(
    (state) => state.amlCompliance
  );

  useEffect(() => {
    if (client?._id) {
      dispatch(getVerificationTimeline(client._id));
    }
  }, [client?._id, dispatch]);

  // 🧠 Map API response to table format
  const tableData = useMemo(() => {
    return (
      verificationTimeline?.map((item) => ({
        timeStamp: format(new Date(item.createdAt), "dd/MM/yyyy HH:mm"),
        actionPerformed: item.action,
        performedBy: item.performedBy?.firstName || "N/A",
        notes: item.notes || "-",
      })) || []
    );
  }, [verificationTimeline]);

  const tableColumns = [
    { key: "timeStamp", label: "Timestamp" },
    {
      key: "actionPerformed",
      label: "Action Performed",
      render: (actionPerformed) => (
        <div className="text-sm font-medium bg-[#6B7280]/8  text-center p-1 rounded-md text-gray-900">
          {actionPerformed}
        </div>
      ),
    },
    { key: "performedBy", label: "Performed by" },
    { key: "notes", label: "Notes or Details" },
  ];

  // 🧾 Export Function (CSV)
  const handleExport = () => {
    if (!tableData.length) return alert("No audit log data to export.");

    const csv = Papa.unparse(tableData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const filename = `AuditLog_${client?.firstName || "Client"}_${new Date().toISOString().slice(0, 10)}.csv`;
    saveAs(blob, filename);
  };

  return (
    <section>
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <CustomHeading
            heading="Audit Trail"
            fontSize="text-[20px]"
            textAlign="text-left"
          />
          <GlobalButton variant="primary" className="px-10" onClick={handleExport}>
            Export Audit Log
          </GlobalButton>
        </div>

        <div className="mt-6">
          <ReusableTable
            data={tableData}
            columns={tableColumns}
            loading={loading}
          />
        </div>
      </div>
    </section>
  );
};

export default AuditTrail;
