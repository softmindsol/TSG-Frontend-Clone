import React from "react";

const ReusableTable = ({ data, columns }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl w-full h-auto overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 font-poppins">
          <thead className="bg-gray-50">
            <tr>
              {columns?.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold text-[#081722] uppercase tracking-wider"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data?.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                  >
                    {col.render
                      ? col.render(row[col.key], row) // custom render if provided
                      : row[col.key]}{" "}
                    {/* fallback to plain value */}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReusableTable;
