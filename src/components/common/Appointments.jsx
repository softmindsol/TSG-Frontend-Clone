// src/components/Appointments.js

import React, { useState } from "react";
import {
  IoHomeOutline,
  IoCallOutline,
  IoTrashOutline,
  IoAdd,
} from "react-icons/io5";

// --- Dummy Data ---
const initialAppointments = [
  {
    id: 1,
    type: "Viewing",
    icon: <IoHomeOutline className="text-blue-600" size={20} />,
    iconBg: "bg-blue-100",
    dateTime: "01/11/2024 at 14:00",
    status: "scheduled",
    statusColor: "text-blue-600",
    statusBg: "bg-blue-100",
    details: "123 Main Street, Downtown",
    description: "Property viewing for office space",
  },
  {
    id: 2,
    type: "Call",
    icon: <IoCallOutline className="text-green-600" size={20} />,
    iconBg: "bg-green-100",
    dateTime: "01/11/2024 at 14:00",
    status: "completed",
    statusColor: "text-green-600",
    statusBg: "bg-green-100",
    details: "Phone call",
    description: "Follow-up on requirements",
  },
];

const AppointmentItem = ({ appointment }) => (
  <div className="p-4 border border-gray-200 rounded-lg flex flex-col gap-2">
    <div className="flex items-center gap-2.5">
      <div className="flex items-center gap-4">
        <div
          className={`w-10 h-10 flex items-center justify-center rounded-lg ${appointment.iconBg}`}
        >
          {appointment.icon}
        </div>
        <div className="flex items-center gap-2">
          <p className="font-medium text-gray-800">{appointment.type}</p>
          <p className="text-sm text-gray-400">{appointment.dateTime}</p>
        </div>
      </div>
      <span
        className={`px-3 py-1 text-xs font-medium rounded-full ${appointment.statusBg} ${appointment.statusColor}`}
      >
        {appointment.status}
      </span>
    </div>
    <div className="pl-14">
      <p className="text-sm text-gray-600">{appointment.details}</p>
      <p className="text-sm text-gray-600">{appointment.description}</p>
    </div>
  </div>
);

const Appointments = () => {
  // --- State Management is now internal to the component ---
  const [appointments, setAppointments] = useState(initialAppointments);

  const handleDeleteAppointment = (appointmentId) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      setAppointments((prev) => prev.filter((app) => app.id !== appointmentId));
    }
  };

  const [addNewAppointment, setAddNewAppointment] = useState(false);

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Appointments</h2>
        {!addNewAppointment && (
          <button
            onClick={() => setAddNewAppointment(!addNewAppointment)}
            className="flex items-center gap-2 px-4 py-2 text-sm cursor-pointer font-medium text-white bg-[#081722] rounded-md hover:bg-gray-900"
          >
            <IoAdd color="white" />
            Add Appointment
          </button>
        )}
      </div>
      {addNewAppointment && (
        <div className="bg-[#F9FAFB] border-[#E2E8F0] p-5 rounded-lg mb-4">
          <div className="grid lg:grid-cols-4 grid-cols-2 gap-1.5">
            <select
              className={`w-full text-sm rounded-md border border-[#E2E8F0] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="HSBC">HSBC</option>
              <option value="Barclays">Barclays</option>
              <option value="Lloyds">Lloyds</option>
              <option value="NatWest">NatWest</option>
            </select>
            <input
              type="date"
              className="w-full text-sm rounded-md border border-[#E2E8F0] px-3 py-2"
            />
            <input
              type="date"
              className="w-full text-sm rounded-md border border-[#E2E8F0] px-3 py-2"
            />
            <input
              type="text"
              placeholder="Location"
              className="w-full text-sm rounded-md border border-[#E2E8F0] px-3 py-2"
            />
          </div>
          <div className="grid lg:grid-cols-2 grid-cols-2 mt-3 gap-1.5">
            <select
              className="w-full text-sm rounded-md border border-[#E2E8F0] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue=""
            >
              <option value="" disabled hidden>
                Add extra contact
              </option>
              <option value="HSBC">HSBC</option>
              <option value="Barclays">Barclays</option>
              <option value="Lloyds">Lloyds</option>
              <option value="NatWest">NatWest</option>
            </select>

            <input
              type="text"
              placeholder="Location"
              className="w-full text-sm rounded-md border border-[#E2E8F0] px-3 py-2"
            />
          </div>
          <div className="flex items-center justify-end gap-3 mt-3">
            <button
              onClick={() => setAddNewAppointment(!addNewAppointment)}
              className="flex items-center gap-2 px-4 py-2 text-sm cursor-pointer font-medium text-[#081722] bg-transparent border border-[#081722] rounded-md "
            >
              Cancel
            </button>
            <button className="flex items-center gap-2 px-4 py-2 cursor-pointer text-sm font-medium  text-white bg-[#081722] border rounded-md hover:bg-gray-900">
              Add Appointment
            </button>
          </div>
        </div>
      )}
      <div className="space-y-4">
        {appointments.map((app) => (
          <AppointmentItem
            key={app.id}
            appointment={app}
            onDelete={handleDeleteAppointment}
          />
        ))}
      </div>
    </div>
  );
};

export default Appointments;
